import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CollegeDropdown } from '@/components/ui/CollegeDropdown';
import { 
  SearchableDropdown, 
  genderOptions, 
  degreeOptions, 
  yearOfStudyOptions, 
  targetRoleOptions,
  getFieldsOfStudyByDegree
} from '@/components/ui/SearchableDropdown';
import { TechnologySelector } from '@/components/ui/TechnologySelector';
import { useAuthStore } from '@/store/authStore';
import { useAppStore } from '@/store/appStore';
import toast from 'react-hot-toast';
import { 
  Eye, 
  EyeOff, 
  CheckCircle, 
  XCircle, 
  ArrowLeft,
  Sparkles,
  Mail,
  Lock,
  User,
  Phone,
  Calendar,
  Target,
  Linkedin,
  Github,
  Users,
  GraduationCap,
  BookOpen,
  CalendarDays
} from 'lucide-react';
import { GridBeam } from '@/components/ui/background-grid-beam';

// Password validation schema with 8 parameters
const passwordSchema = z.string()
  .min(8, "Minimum 8 characters")
  .regex(/[A-Z]/, "One uppercase letter")
  .regex(/[a-z]/, "One lowercase letter")
  .regex(/[0-9]/, "One number")
  .regex(/[!@#$%^&*(),.?":{}|<>]/, "One special character")
  .refine((val) => !/\s/.test(val), "No spaces allowed");

const signupSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address").refine((val) => !/^[A-Z]/.test(val), {
    message: "Email must not start with a capital letter"
  }),
  phone: z.string().regex(/^\d{10}$/, "Mobile number must be exactly 10 digits"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.string().min(1, "Gender is required"),
  collegeName: z.string().min(2, "College name is required"),
  degree: z.string().min(1, "Degree is required"),
  fieldOfStudy: z.string().min(1, "Field of study is required"),
  yearOfStudy: z.string().min(1, "Year of study is required"),
  targetRole: z.string().min(1, "Target role is required"),
  knownTechnologies: z.string().min(1, "At least one technology is required"),
  linkedin: z.string().url("Invalid LinkedIn URL").optional().or(z.literal("")),
  github: z.string().url("Invalid GitHub URL").optional().or(z.literal("")),
  password: passwordSchema,
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine((val) => val === true, "You must accept the terms"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
}).refine((data) => !data.password.toLowerCase().includes(data.fullName.toLowerCase().split(' ')[0]), {
  message: "Password cannot contain your name",
  path: ["password"],
});

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type SignupFormData = z.infer<typeof signupSchema>;
type LoginFormData = z.infer<typeof loginSchema>;

interface AuthPageProps {
  mode: 'login' | 'signup';
  onNavigate: (page: string) => void;
}

const PasswordStrengthIndicator = ({ password, fullName }: { password: string; fullName: string }) => {
  const checks = [
    { label: "8+ characters", valid: password.length >= 8 },
    { label: "Uppercase letter", valid: /[A-Z]/.test(password) },
    { label: "Lowercase letter", valid: /[a-z]/.test(password) },
    { label: "Number", valid: /[0-9]/.test(password) },
    { label: "Special character", valid: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
    { label: "No spaces", valid: !/\s/.test(password) },
    { label: "Not your name", valid: !password.toLowerCase().includes(fullName.toLowerCase().split(' ')[0] || 'xxx') || fullName.length < 2 },
    { label: "Strong enough", valid: password.length >= 12 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4 px-2"
    >
      {checks.map((check, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          className={`flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest ${check.valid ? 'text-white' : 'text-white/20'}`}
        >
          {check.valid ? (
            <CheckCircle className="w-3 h-3 text-white" />
          ) : (
            <XCircle className="w-3 h-3 text-white/10" />
          )}
          {check.label}
        </motion.div>
      ))}
    </motion.div>
  );
};

// Get saved form data from localStorage
const getSavedSignupData = (): Partial<SignupFormData> => {
  try {
    const saved = localStorage.getItem('prepzo-signup-draft');
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
};

const getSavedLoginData = (): Partial<LoginFormData> => {
  try {
    const saved = localStorage.getItem('prepzo-login-draft');
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
};

const getSavedSignupStep = (): number => {
  try {
    const saved = localStorage.getItem('prepzo-signup-step');
    return saved ? parseInt(saved, 10) : 1;
  } catch {
    return 1;
  }
};

export const AuthPage = ({ mode, onNavigate }: AuthPageProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState(mode === 'signup' ? getSavedSignupStep() : 1);
  const [rememberMe, setRememberMe] = useState(() => {
    try {
      return localStorage.getItem('prepzo-remember-me') === 'true';
    } catch {
      return false;
    }
  });

  const { login, registerAsync, loginAsync } = useAuthStore();
  const {} = useAppStore(); // Removed unused darkMode

  const savedSignupData = getSavedSignupData();
  
  const {
    register: registerSignup,
    handleSubmit: handleSignupSubmit,
    formState: { errors: signupErrors },
    watch,
    control,
    setValue,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
    defaultValues: {
      fullName: savedSignupData.fullName || '',
      email: savedSignupData.email || '',
      phone: savedSignupData.phone || '',
      dateOfBirth: savedSignupData.dateOfBirth || '',
      gender: savedSignupData.gender || '',
      collegeName: savedSignupData.collegeName || '',
      degree: savedSignupData.degree || '',
      fieldOfStudy: savedSignupData.fieldOfStudy || '',
      yearOfStudy: savedSignupData.yearOfStudy || '',
      targetRole: savedSignupData.targetRole || '',
      knownTechnologies: savedSignupData.knownTechnologies || '',
      linkedin: savedSignupData.linkedin || '',
      github: savedSignupData.github || '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
  });

  const savedLoginData = getSavedLoginData();
  
  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
    watch: watchLogin,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: savedLoginData.email || '',
      password: '',
    },
  });

  const password = watch('password') || '';
  const fullName = watch('fullName') || '';
  const selectedDegree = watch('degree') || '';

  // Get dynamic field of study options based on selected degree
  const currentFieldOptions = getFieldsOfStudyByDegree(selectedDegree);

  // Track previous degree to detect actual changes
  const prevDegreeRef = useRef(selectedDegree);
  
  // Reset field of study when degree changes
  useEffect(() => {
    if (selectedDegree && prevDegreeRef.current !== selectedDegree) {
      setValue('fieldOfStudy', '');
      prevDegreeRef.current = selectedDegree;
    }
  }, [selectedDegree, setValue]);

  // Auto-save signup form data to localStorage
  const signupFormValues = watch();
  useEffect(() => {
    if (mode === 'signup') {
      const dataToSave = { ...signupFormValues };
      // Don't save password fields
      delete (dataToSave as Record<string, unknown>).password;
      delete (dataToSave as Record<string, unknown>).confirmPassword;
      delete (dataToSave as Record<string, unknown>).acceptTerms;
      localStorage.setItem('prepzo-signup-draft', JSON.stringify(dataToSave));
    }
  }, [signupFormValues, mode]);

  // Auto-save signup step
  useEffect(() => {
    if (mode === 'signup') {
      localStorage.setItem('prepzo-signup-step', String(step));
    }
  }, [step, mode]);

  // Auto-save login email to localStorage (not password)
  const loginEmail = watchLogin('email');
  useEffect(() => {
    if (mode === 'login' && loginEmail) {
      localStorage.setItem('prepzo-login-draft', JSON.stringify({ email: loginEmail }));
    }
  }, [loginEmail, mode]);

  const onSignup = async (data: SignupFormData) => {
    try {
      // Try to register via API
      await registerAsync({
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        dateOfBirth: data.dateOfBirth,
        gender: data.gender,
        collegeName: data.collegeName,
        degree: data.degree,
        fieldOfStudy: data.fieldOfStudy,
        yearOfStudy: data.yearOfStudy,
        targetRole: data.targetRole,
        knownTechnologies: data.knownTechnologies,
        linkedin: data.linkedin || '',
        github: data.github || '',
        password: data.password,
      });
      // Clear saved draft data after successful signup
      localStorage.removeItem('prepzo-signup-draft');
      localStorage.removeItem('prepzo-signup-step');
      toast.success('Account created successfully!');
      onNavigate('onboarding');
    } catch (error: unknown) {
      // Check if it's a validation/conflict error vs network error
      const axiosError = error as { response?: { status?: number; data?: { message?: string; code?: string; errors?: string[] } } };
      
      if (axiosError.response?.status === 400) {
        // Validation error or user exists
        const message = axiosError.response.data?.message || 'Registration failed';
        const errors = axiosError.response.data?.errors;
        if (errors && errors.length > 0) {
          toast.error(`${message}: ${errors.join(', ')}`);
        } else {
          toast.error(message);
        }
        return;
      }
      
      if (axiosError.response?.status === 429) {
        toast.error(axiosError.response.data?.message || 'Too many attempts. Please wait.');
        return;
      }
      
      toast.error(axiosError.response?.data?.message || 'Registration failed. Please make sure the server is running and try again.');
    }
  };

  const onLogin = async (data: LoginFormData) => {
    // Check for admin login first (demo mode)
    if (data.email === 'admin@prepzo.com' && data.password === 'Admin@123') {
      login({
        id: 'admin-1',
        fullName: 'Admin User',
        email: data.email,
        phone: '',
        dateOfBirth: '',
        gender: '',
        collegeName: '',
        degree: '',
        fieldOfStudy: '',
        yearOfStudy: '',
        targetRole: '',
        knownTechnologies: [],
        linkedin: '',
        github: '',
        role: 'admin',
        isOnboarded: true,
        isAssessmentComplete: true,
        isFieldTestComplete: true,
        isSkillTestComplete: true,
        placementReadinessScore: 100,
        atsScore: 100,
        skillGaps: [],
        strengths: [],
        weaknesses: [],
      });
      localStorage.removeItem('prepzo-login-draft');
      toast.success('Welcome back, Admin!');
      onNavigate('admin');
      return;
    }
    
    try {
      // Try to login via API
      const user = await loginAsync({
        email: data.email,
        password: data.password,
        rememberMe: rememberMe,
      });
      localStorage.removeItem('prepzo-login-draft');
      toast.success('Welcome back!');
      
      // Navigate based on user state
      if (user.role === 'admin') {
        onNavigate('admin');
      } else if (!user.isOnboarded) {
        onNavigate('onboarding');
      } else {
        onNavigate('dashboard');
      }
    } catch (error: unknown) {
      // Check if it's an authentication error (401) vs network/server error
      const axiosError = error as { response?: { status?: number; data?: { message?: string } } };
      
      if (axiosError.response?.status === 401) {
        // Authentication failed - show error, don't use demo mode
        toast.error(axiosError.response.data?.message || 'Invalid email or password');
        return;
      }
      
      if (axiosError.response?.status === 403) {
        // Account locked or other forbidden error
        toast.error(axiosError.response.data?.message || 'Account access denied');
        return;
      }
      
      if (axiosError.response?.status === 429) {
        // Rate limited
        toast.error(axiosError.response.data?.message || 'Too many attempts. Please wait.');
        return;
      }
      
      toast.error(axiosError.response?.data?.message || 'Login failed. Please check your credentials and try again.');
    }
  };

  const signupSteps = [
    { title: 'Personal Info', fields: ['fullName', 'email', 'phone', 'dateOfBirth', 'gender'] },
    { title: 'Education', fields: ['collegeName', 'degree', 'fieldOfStudy', 'yearOfStudy'] },
    { title: 'Career Goals', fields: ['targetRole', 'knownTechnologies', 'linkedin', 'github'] },
    { title: 'Security', fields: ['password', 'confirmPassword', 'acceptTerms'] },
  ];

  return (
    <div className="relative min-h-screen bg-[#161a20] overflow-hidden selection:bg-white selection:text-[#161a20]">
      <div className="absolute inset-0 w-full h-full bg-[#161a20] z-0 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <GridBeam className="absolute inset-0" />


      {/* Back button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => onNavigate('landing')}
        className="fixed left-6 top-6 z-50 inline-flex items-center gap-4 text-white/60 hover:text-white transition-all uppercase font-bold tracking-widest text-[11px]"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Landing
      </motion.button>

      <div className="mx-auto flex min-h-screen w-full max-w-7xl items-center justify-center px-4 py-20 relative z-20">

        {/* Center - Form */}
        <div className="flex w-full items-center justify-center p-2 sm:p-4">
          <div className="w-full max-w-xl">
            <AnimatePresence mode="wait">
              {mode === 'login' ? (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="w-full"
                >
                  <div className="bg-[#161a20] border border-white/10 rounded-[48px] p-8 md:p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden auth-card">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                        <Sparkles size={80} />
                    </div>
                    
                    <div className="text-center mb-12">
                      <h1 className="text-4xl md:text-5xl  font-[900] text-white uppercase tracking-tighter italic">Welcome Back</h1>
                      <p className="mt-4 text-[12px] text-white/30 font-bold uppercase tracking-[0.3em]">Sign in to the educational signal</p>
                    </div>

                    <form onSubmit={handleLoginSubmit(onLogin)} className="space-y-6">
                      <div className="space-y-5">
                        <div className="relative">
                          <Mail className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
                          <input
                            {...registerLogin('email')}
                            type="email"
                            placeholder="EMAIL ADDRESS"
                            onChange={(e) => {
                              e.target.value = e.target.value.toLowerCase();
                              registerLogin('email').onChange(e);
                            }}
                            className="w-full bg-white/5 border border-white/5 focus:border-white/20 rounded-2xl py-4 pl-14 pr-5 text-white placeholder-white/20 font-bold text-[13px] tracking-widest outline-none transition-all"
                          />
                        </div>
                        {loginErrors.email && (
                          <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest ml-2">{loginErrors.email.message}</p>
                        )}

                        <div className="relative">
                          <Lock className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
                          <input
                            {...registerLogin('password')}
                            type={showPassword ? 'text' : 'password'}
                            placeholder="PASSWORD"
                            className="w-full bg-white/5 border border-white/5 focus:border-white/20 rounded-2xl py-4 pl-14 pr-14 text-white placeholder-white/20 font-bold text-[13px] tracking-widest outline-none transition-all"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-5 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                        {loginErrors.password && (
                          <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest ml-2">{loginErrors.password.message}</p>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <label className="flex items-center gap-3 cursor-pointer group">
                          <input 
                            type="checkbox" 
                            className="w-4 h-4 rounded border-white/10 bg-white/5 checked:bg-white transition-all cursor-pointer"
                            checked={rememberMe}
                            onChange={(e) => {
                              setRememberMe(e.target.checked);
                              localStorage.setItem('prepzo-remember-me', String(e.target.checked));
                            }}
                          />
                          <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest group-hover:text-white transition-colors">Remember me</span>
                        </label>
                        <a href="#" className="text-[10px] text-white/40 font-bold uppercase tracking-widest hover:text-white transition-colors">Forgot password?</a>
                      </div>

                      <div className="pt-6 flex justify-center">
                        <button 
                          type="submit"
                          className="relative w-[184px] h-[65px] group active:scale-95 transition-transform"
                        >
                          <svg className="absolute inset-0 w-full h-full drop-shadow-xl transition-transform group-hover:scale-105" viewBox="0 0 184 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0H184L174 65H10L0 0Z" fill="white" />
                          </svg>
                          <span className="relative z-10 flex items-center justify-center h-full text-[#161a20]  font-[800] text-[18px] uppercase tracking-wide">
                            Sign In
                          </span>
                        </button>
                      </div>
                    </form>

                    <div className="mt-12 text-center">
                      <p className="text-[10px] text-white/20 font-bold uppercase tracking-[0.3em] mb-4">New to the signal?</p>
                      <button
                        onClick={() => onNavigate('signup')}
                        className="text-[12px] text-white font-black uppercase tracking-widest hover:scale-105 transition-transform"
                      >
                        Create Account
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="signup"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="w-full h-full flex flex-col items-center"
                >
                  <div className="bg-[#161a20] border border-white/10 rounded-[48px] p-8 md:p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden w-full max-w-xl auth-card">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                        <Sparkles size={80} />
                    </div>

                    <div className="text-center mb-10">
                      <h1 className="text-4xl md:text-5xl  font-[900] text-white uppercase tracking-tighter italic">Create Account</h1>
                      <p className="mt-4 text-[12px] text-white/30 font-bold uppercase tracking-[0.3em]">Step {step} — {signupSteps[step - 1].title}</p>
                    </div>

                    {/* Progress dots */}
                    <div className="flex justify-center gap-3 mb-12">
                      {signupSteps.map((_, index) => (
                        <div
                          key={index}
                          className={`h-1.5 rounded-full transition-all duration-500 ${index < step ? 'w-8 bg-white' : 'w-4 bg-white/10'}`}
                        />
                      ))}
                    </div>

                    <form onSubmit={handleSignupSubmit(onSignup)} className="space-y-6">
                      <AnimatePresence mode="wait">
                        {step === 1 && (
                          <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-5"
                          >
                            <div className="relative">
                              <User className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
                              <input
                                {...registerSignup('fullName')}
                                placeholder="FULL NAME"
                                className="w-full bg-white/5 border border-white/5 focus:border-white/20 rounded-2xl py-4 pl-14 pr-5 text-white placeholder-white/20 font-bold text-[13px] tracking-widest outline-none transition-all"
                              />
                            </div>
                            {signupErrors.fullName && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest ml-2">{signupErrors.fullName.message}</p>}

                            <div className="relative">
                              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
                              <input
                                {...registerSignup('email')}
                                type="email"
                                placeholder="EMAIL ADDRESS"
                                onChange={(e) => {
                                  e.target.value = e.target.value.toLowerCase();
                                  registerSignup('email').onChange(e);
                                }}
                                className="w-full bg-white/5 border border-white/5 focus:border-white/20 rounded-2xl py-4 pl-14 pr-5 text-white placeholder-white/20 font-bold text-[13px] tracking-widest outline-none transition-all"
                              />
                            </div>
                            {signupErrors.email && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest ml-2">{signupErrors.email.message}</p>}

                            <div className="relative">
                              <Phone className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
                              <input
                                {...registerSignup('phone')}
                                placeholder="PHONE NUMBER"
                                maxLength={10}
                                onInput={(e) => {
                                  e.currentTarget.value = e.currentTarget.value.replace(/\\D/g, '').slice(0, 10);
                                }}
                                className="w-full bg-white/5 border border-white/5 focus:border-white/20 rounded-2xl py-4 pl-14 pr-5 text-white placeholder-white/20 font-bold text-[13px] tracking-widest outline-none transition-all"
                              />
                            </div>
                            {signupErrors.phone && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest ml-2">{signupErrors.phone.message}</p>}

                            <div className="relative">
                              <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
                              <input
                                {...registerSignup('dateOfBirth')}
                                type="date"
                                className="w-full bg-white/5 border border-white/5 focus:border-white/20 rounded-2xl py-4 pl-14 pr-5 text-white placeholder-white/20 font-bold text-[13px] tracking-widest outline-none transition-all"
                              />
                            </div>
                            {signupErrors.dateOfBirth && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest ml-2">{signupErrors.dateOfBirth.message}</p>}

                            <Controller
                              name="gender"
                              control={control}
                              render={({ field }) => (
                                <SearchableDropdown
                                  value={field.value || ''}
                                  onChange={field.onChange}
                                  options={genderOptions}
                                  placeholder="SELECT GENDER"
                                  icon={Users}
                                  error={signupErrors.gender?.message}
                                  searchable={false}
                                />
                              )}
                            />
                          </motion.div>
                        )}

                        {step === 2 && (
                          <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-5"
                          >
                            <Controller
                              name="collegeName"
                              control={control}
                              render={({ field }) => (
                                <CollegeDropdown
                                  value={field.value || ''}
                                  onChange={field.onChange}
                                  error={signupErrors.collegeName?.message}
                                />
                              )}
                            />

                            <Controller
                              name="degree"
                              control={control}
                              render={({ field }) => (
                                <SearchableDropdown
                                  value={field.value || ''}
                                  onChange={field.onChange}
                                  options={degreeOptions}
                                  placeholder="SELECT DEGREE"
                                  icon={GraduationCap}
                                  error={signupErrors.degree?.message}
                                  searchable={false}
                                />
                              )}
                            />

                            <Controller
                              name="fieldOfStudy"
                              control={control}
                              render={({ field }) => (
                                <SearchableDropdown
                                  value={field.value || ''}
                                  onChange={field.onChange}
                                  options={currentFieldOptions}
                                  placeholder={selectedDegree ? "SELECT FIELD OF STUDY" : "SELECT DEGREE FIRST"}
                                  icon={BookOpen}
                                  error={signupErrors.fieldOfStudy?.message}
                                  searchable={true}
                                />
                              )}
                            />

                            <Controller
                              name="yearOfStudy"
                              control={control}
                              render={({ field }) => (
                                <SearchableDropdown
                                  value={field.value || ''}
                                  onChange={field.onChange}
                                  options={yearOfStudyOptions}
                                  placeholder="SELECT YEAR OF STUDY"
                                  icon={CalendarDays}
                                  error={signupErrors.yearOfStudy?.message}
                                  searchable={false}
                                />
                              )}
                            />
                          </motion.div>
                        )}

                        {step === 3 && (
                          <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-5"
                          >
                            <Controller
                              name="targetRole"
                              control={control}
                              render={({ field }) => (
                                <SearchableDropdown
                                  value={field.value || ''}
                                  onChange={field.onChange}
                                  options={targetRoleOptions}
                                  placeholder="SELECT TARGET ROLE"
                                  icon={Target}
                                  error={signupErrors.targetRole?.message}
                                  searchable={true}
                                />
                              )}
                            />

                            <Controller
                              name="knownTechnologies"
                              control={control}
                              render={({ field }) => (
                                <TechnologySelector
                                  value={field.value || ''}
                                  onChange={field.onChange}
                                  error={signupErrors.knownTechnologies?.message}
                                />
                              )}
                            />

                            <div className="relative">
                              <Linkedin className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
                              <input
                                {...registerSignup('linkedin')}
                                placeholder="LINKEDIN URL (OPTIONAL)"
                                className="w-full bg-white/5 border border-white/5 focus:border-white/20 rounded-2xl py-4 pl-14 pr-5 text-white placeholder-white/20 font-bold text-[13px] tracking-widest outline-none transition-all"
                              />
                            </div>

                            <div className="relative">
                              <Github className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
                              <input
                                {...registerSignup('github')}
                                placeholder="GITHUB URL (OPTIONAL)"
                                className="w-full bg-white/5 border border-white/5 focus:border-white/20 rounded-2xl py-4 pl-14 pr-5 text-white placeholder-white/20 font-bold text-[13px] tracking-widest outline-none transition-all"
                              />
                            </div>
                          </motion.div>
                        )}

                        {step === 4 && (
                          <motion.div
                            key="step4"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-5"
                          >
                            <div className="relative">
                              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
                              <input
                                {...registerSignup('password')}
                                type={showPassword ? 'text' : 'password'}
                                placeholder="CREATE PASSWORD"
                                className="w-full bg-white/5 border border-white/5 focus:border-white/20 rounded-2xl py-4 pl-14 pr-14 text-white placeholder-white/20 font-bold text-[13px] tracking-widest outline-none transition-all"
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-5 top-1/2 -translate-y-1/2 text-white/20 hover:text-white"
                              >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                              </button>
                            </div>
                            
                            {password && <PasswordStrengthIndicator password={password} fullName={fullName} />}

                            <div className="relative">
                              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
                              <input
                                {...registerSignup('confirmPassword')}
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder="CONFIRM PASSWORD"
                                className="w-full bg-white/5 border border-white/5 focus:border-white/20 rounded-2xl py-4 pl-14 pr-14 text-white placeholder-white/20 font-bold text-[13px] tracking-widest outline-none transition-all"
                              />
                              <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-5 top-1/2 -translate-y-1/2 text-white/20 hover:text-white"
                              >
                                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                              </button>
                            </div>
                            {signupErrors.confirmPassword && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest ml-2">{signupErrors.confirmPassword.message}</p>}

                            <div className="space-y-4 rounded-2xl border border-white/5 bg-white/[0.02] p-6">
                              <h4 className=" font-[900] text-[11px] uppercase tracking-[0.2em] text-white/40">Terms & Protocols</h4>
                              <div className="max-h-32 space-y-3 overflow-y-auto pr-2 custom-scrollbar">
                                <p className="text-[11px] text-white/30 leading-relaxed font-bold uppercase tracking-wider">
                                    BY CREATING AN ACCOUNT, YOU AGREE TO:
                                </p>
                                <ul className="space-y-2 text-[10px] text-white/40 font-bold uppercase tracking-widest">
                                  <li className="flex gap-2"><span>—</span> NO CHEATING POLICY</li>
                                  <li className="flex gap-2"><span>—</span> AI PROCTORED CONSENT</li>
                                  <li className="flex gap-2"><span>—</span> DATA PROCESSING SIGNAL</li>
                                  <li className="flex gap-2"><span>—</span> ATS SCAN CONSENT</li>
                                </ul>
                              </div>
                              <label className="flex items-center gap-3 cursor-pointer group pt-2">
                                <input
                                  {...registerSignup('acceptTerms')}
                                  type="checkbox"
                                  className="w-4 h-4 rounded border-white/10 bg-white/5 checked:bg-white transition-all"
                                />
                                <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest group-hover:text-white transition-colors">I accept the secure protocols</span>
                              </label>
                              {signupErrors.acceptTerms && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest ml-2">{signupErrors.acceptTerms.message}</p>}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="flex gap-6 pt-10">
                        {step > 1 && (
                          <button
                            type="button"
                            className="flex-1 text-[11px]  font-[900] text-white/40 uppercase tracking-[0.2em] hover:text-white transition-colors"
                            onClick={() => setStep(step - 1)}
                          >
                            Previous
                          </button>
                        )}
                        
                        <div className="flex-1 flex justify-center">
                          {step < signupSteps.length ? (
                            <button 
                              type="button"
                              onClick={() => setStep(step + 1)}
                              className="relative w-[184px] h-[65px] group active:scale-95 transition-transform"
                            >
                              <svg className="absolute inset-0 w-full h-full drop-shadow-xl transition-transform group-hover:scale-105" viewBox="0 0 184 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 0H184L174 65H10L0 0Z" fill="white" />
                              </svg>
                              <span className="relative z-10 flex items-center justify-center h-full text-[#161a20]  font-[800] text-[18px] uppercase tracking-wide">
                                Next
                              </span>
                            </button>
                          ) : (
                            <button 
                              type="submit"
                              className="relative w-[184px] h-[65px] group active:scale-95 transition-transform"
                            >
                              <svg className="absolute inset-0 w-full h-full drop-shadow-xl transition-transform group-hover:scale-105" viewBox="0 0 184 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 0H184L174 65H10L0 0Z" fill="white" />
                              </svg>
                              <span className="relative z-10 flex items-center justify-center h-full text-[#161a20]  font-[800] text-[18px] uppercase tracking-wide text-center leading-tight">
                                Create Account
                              </span>
                            </button>
                          )}
                        </div>
                      </div>
                    </form>

                    <div className="mt-12 text-center">
                      <p className="text-[10px] text-white/20 font-bold uppercase tracking-[0.3em] mb-4">Already on the radar?</p>
                      <button
                        onClick={() => onNavigate('login')}
                        className="text-[12px] text-white font-black uppercase tracking-widest hover:scale-105 transition-transform"
                      >
                        Sign In
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
