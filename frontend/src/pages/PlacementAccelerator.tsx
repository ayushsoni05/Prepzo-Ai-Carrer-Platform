import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { placementApi, ATSAnalysisResult, TailoredResumeResult, OutreachResult } from '@/api/placement';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { CircularProgress } from '@/components/ui/CircularProgress';
import { Badge } from '@/components/ui/badge';
import { Target, FileText, Send, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

const PlacementAccelerator = () => {
    const { user } = useAuthStore();
    const [loading, setLoading] = useState(false);
    
    // Inputs
    const [targetRole, setTargetRole] = useState(user?.targetRole || '');
    const [targetCompany, setTargetCompany] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [resumeText, setResumeText] = useState('');
    const [originalBullets, setOriginalBullets] = useState('');

    // Results
    const [atsResult, setAtsResult] = useState<ATSAnalysisResult | null>(null);
    const [tailoredResult, setTailoredResult] = useState<TailoredResumeResult | null>(null);
    const [outreachResult, setOutreachResult] = useState<OutreachResult | null>(null);

    // Active Tab
    const [activeTab, setActiveTab] = useState<'ats' | 'tailor' | 'outreach'>('ats');

    useEffect(() => {
        // Pre-fill resume text if user has a parsed resume in their profile
        if (user?.resumeText) {
            setResumeText(user.resumeText);
        }
    }, [user]);

    const handleAnalyzeAts = async () => {
        if (!resumeText.trim() || !jobDescription.trim()) {
            toast.error("Please provide both Resume Text and Job Description");
            return;
        }

        try {
            setLoading(true);
            const res = await placementApi.analyzeAtsMatch(resumeText, jobDescription);
            if (res.success) {
                setAtsResult(res.data);
                setActiveTab('ats');
                toast.success("ATS Analysis Complete");
            } else {
                toast.error("Failed to analyze ATS match");
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const handleTailorResume = async () => {
        if (!originalBullets.trim() || !jobDescription.trim()) {
            toast.error("Please provide Original Bullets and Job Description");
            return;
        }

        const bulletsArray = originalBullets.split('\n').filter(b => b.trim().length > 0);
        const missing = atsResult?.missing_keywords || [];

        try {
            setLoading(true);
            const res = await placementApi.tailorResumeBullets(bulletsArray, jobDescription, missing);
            if (res.success) {
                setTailoredResult(res.data);
                setActiveTab('tailor');
                toast.success("Resume Tailored Successfully");
            } else {
                toast.error("Failed to tailor resume");
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const handleGenerateOutreach = async () => {
        if (!resumeText.trim() || !jobDescription.trim() || !targetCompany.trim() || !targetRole.trim()) {
            toast.error("Please provide Resume, Job Description, Target Company, and Role");
            return;
        }

        try {
            setLoading(true);
            const res = await placementApi.generateColdOutreach(resumeText, jobDescription, targetCompany, targetRole);
            if (res.success) {
                setOutreachResult(res.data);
                setActiveTab('outreach');
                toast.success("Outreach Generated");
            } else {
                toast.error("Failed to generate outreach");
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto py-8 max-w-7xl">
            <div className="mb-8">
                <h1 className="text-4xl font-bold tracking-tight mb-2 flex items-center gap-3">
                    <Sparkles className="w-8 h-8 text-indigo-500" />
                    Placement Accelerator
                </h1>
                <p className="text-muted-foreground text-lg">
                    Bypass the ATS, tailor your resume, and generate high-converting cold outreach instantly.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* LEFT COLUMN - INPUTS */}
                <div className="flex flex-col gap-6">
                    <Card className="border-indigo-500/20 shadow-lg shadow-indigo-500/5">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-xl flex items-center gap-2">
                                <Target className="w-5 h-5 text-indigo-500" />
                                Target Opportunity
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Target Role</Label>
                                    <Input 
                                        placeholder="e.g. Frontend Engineer" 
                                        value={targetRole}
                                        onChange={(e) => setTargetRole(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Target Company</Label>
                                    <Input 
                                        placeholder="e.g. Google, Stripe" 
                                        value={targetCompany}
                                        onChange={(e) => setTargetCompany(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="flex items-center justify-between">
                                    Job Description
                                    <span className="text-xs text-muted-foreground font-normal">Paste full JD here</span>
                                </Label>
                                <Textarea 
                                    placeholder="Paste the job description here..." 
                                    className="min-h-[150px] font-mono text-sm resize-y"
                                    value={jobDescription}
                                    onChange={(e) => setJobDescription(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="flex items-center justify-between">
                                    Your Resume Text
                                    <span className="text-xs text-muted-foreground font-normal">Plain text format</span>
                                </Label>
                                <Textarea 
                                    placeholder="Paste your entire resume text here..." 
                                    className="min-h-[150px] font-mono text-sm resize-y"
                                    value={resumeText}
                                    onChange={(e) => setResumeText(e.target.value)}
                                />
                            </div>

                            <Button 
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white" 
                                onClick={handleAnalyzeAts}
                                disabled={loading || !resumeText || !jobDescription}
                            >
                                {loading && activeTab === 'ats' ? 'Analyzing...' : 'Step 1: Analyze ATS Match'}
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-4">
                            <CardTitle className="text-xl flex items-center gap-2">
                                <FileText className="w-5 h-5 text-emerald-500" />
                                Resume Magic Tailor
                            </CardTitle>
                            <CardDescription>Paste your existing bullet points to optimize them for this specific JD.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Textarea 
                                    placeholder="Paste 3-5 bullet points you want to tailor (one per line)..." 
                                    className="min-h-[120px] resize-y"
                                    value={originalBullets}
                                    onChange={(e) => setOriginalBullets(e.target.value)}
                                />
                            </div>
                            <Button 
                                variant="outline"
                                className="w-full border-emerald-500/30 hover:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" 
                                onClick={handleTailorResume}
                                disabled={loading || !originalBullets || !jobDescription}
                            >
                                {loading && activeTab === 'tailor' ? 'Tailoring...' : 'Step 2: Auto-Tailor Bullets'}
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-4">
                            <CardTitle className="text-xl flex items-center gap-2">
                                <Send className="w-5 h-5 text-blue-500" />
                                Cold Outreach Copilot
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Button 
                                variant="outline"
                                className="w-full border-blue-500/30 hover:bg-blue-500/10 text-blue-600 dark:text-blue-400" 
                                onClick={handleGenerateOutreach}
                                disabled={loading || !resumeText || !jobDescription || !targetCompany}
                            >
                                {loading && activeTab === 'outreach' ? 'Generating...' : 'Step 3: Generate Cold Outreach'}
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* RIGHT COLUMN - RESULTS */}
                <div className="flex flex-col gap-6">
                    {/* ATS RESULTS */}
                    {atsResult && (
                        <Card className={`border-2 ${activeTab === 'ats' ? 'border-indigo-500/50' : 'border-transparent'}`}>
                            <CardHeader className="pb-2 border-b">
                                <CardTitle className="text-xl flex items-center justify-between">
                                    <span>ATS Analysis Results</span>
                                    {atsResult.match_score >= 70 ? (
                                        <Badge className="bg-emerald-500 hover:bg-emerald-600">Strong Match</Badge>
                                    ) : atsResult.match_score >= 40 ? (
                                        <Badge className="bg-amber-500 hover:bg-amber-600">Needs Work</Badge>
                                    ) : (
                                        <Badge variant="destructive">Poor Match</Badge>
                                    )}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6 space-y-6">
                                <div className="flex flex-col md:flex-row items-center gap-8 justify-center">
                                    <div className="flex flex-col items-center gap-2">
                                        <CircularProgress 
                                            value={atsResult.match_score} 
                                            size={120} 
                                            strokeWidth={10} 
                                            color={atsResult.match_score >= 70 ? 'green' : atsResult.match_score >= 40 ? 'blue' : 'red'} 
                                        />
                                        <span className="font-semibold text-lg text-muted-foreground">Match Score</span>
                                    </div>
                                    <div className="flex-1 space-y-3 w-full">
                                        <div className="bg-muted/50 p-4 rounded-lg border">
                                            <h4 className="font-semibold text-sm flex items-center gap-2 mb-2 text-rose-500">
                                                <AlertCircle className="w-4 h-4" /> 
                                                Missing Keywords (Red Flags)
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {atsResult.missing_keywords.length > 0 ? atsResult.missing_keywords.map((kw, i) => (
                                                    <Badge key={i} variant="outline" className="border-rose-500/30 text-rose-600 dark:text-rose-400 bg-rose-500/10">
                                                        {kw}
                                                    </Badge>
                                                )) : <span className="text-sm text-emerald-500">None! You hit all keywords.</span>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-semibold text-sm flex items-center gap-2 mb-2 text-emerald-500">
                                            <CheckCircle2 className="w-4 h-4" /> 
                                            Matched Keywords
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {atsResult.matched_keywords.map((kw, i) => (
                                                <Badge key={i} variant="secondary" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                                                    {kw}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-lg text-amber-800 dark:text-amber-200 text-sm">
                                        <strong className="block mb-1">Critical Gaps:</strong>
                                        {atsResult.critical_gaps}
                                    </div>

                                    <div className="bg-indigo-500/10 border border-indigo-500/20 p-4 rounded-lg text-indigo-800 dark:text-indigo-200 text-sm">
                                        <strong className="block mb-1">Recommendation:</strong>
                                        {atsResult.recommendation}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* TAILORED BULLETS RESULTS */}
                    {tailoredResult && (
                        <Card className={`border-2 ${activeTab === 'tailor' ? 'border-emerald-500/50' : 'border-transparent'}`}>
                            <CardHeader className="pb-2 border-b bg-emerald-500/5">
                                <CardTitle className="text-xl text-emerald-600 dark:text-emerald-400">Optimized Resume Bullets</CardTitle>
                                <CardDescription>These bullets now naturally incorporate missing keywords.</CardDescription>
                            </CardHeader>
                            <CardContent className="pt-6 space-y-4">
                                <div className="space-y-3">
                                    {tailoredResult.tailored_bullets.map((bullet, i) => (
                                        <div key={i} className="flex gap-3 items-start group">
                                            <div className="mt-1 min-w-2 h-2 rounded-full bg-emerald-500"></div>
                                            <p className="text-sm leading-relaxed">{bullet}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-6 p-4 bg-muted rounded-lg border text-sm">
                                    <strong className="block mb-1 text-muted-foreground">Analysis Breakdown:</strong>
                                    {tailoredResult.explanation}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* OUTREACH RESULTS */}
                    {outreachResult && (
                        <Card className={`border-2 ${activeTab === 'outreach' ? 'border-blue-500/50' : 'border-transparent'}`}>
                            <CardHeader className="pb-2 border-b bg-blue-500/5">
                                <CardTitle className="text-xl text-blue-600 dark:text-blue-400">Cold Outreach Templates</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6 space-y-6">
                                <div className="space-y-2">
                                    <Label className="text-blue-500 font-semibold">LinkedIn DM (Max 300 chars)</Label>
                                    <div className="relative">
                                        <Textarea 
                                            readOnly 
                                            value={outreachResult.linkedin_dm} 
                                            className="min-h-[100px] bg-muted/50 cursor-text"
                                        />
                                        <Button 
                                            size="sm" 
                                            variant="secondary" 
                                            className="absolute top-2 right-2 h-7 text-xs"
                                            onClick={() => {
                                                navigator.clipboard.writeText(outreachResult.linkedin_dm);
                                                toast.success("Copied to clipboard!");
                                            }}
                                        >
                                            Copy
                                        </Button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-blue-500 font-semibold">Cold Email</Label>
                                    <div className="p-3 bg-muted/50 border rounded-t-lg text-sm font-medium">
                                        <span className="text-muted-foreground">Subject: </span>
                                        {outreachResult.email_subject}
                                    </div>
                                    <div className="relative">
                                        <Textarea 
                                            readOnly 
                                            value={outreachResult.email_body} 
                                            className="min-h-[250px] bg-muted/50 rounded-t-none border-t-0 cursor-text"
                                        />
                                        <Button 
                                            size="sm" 
                                            variant="secondary" 
                                            className="absolute top-2 right-2 h-7 text-xs"
                                            onClick={() => {
                                                navigator.clipboard.writeText(`Subject: ${outreachResult.email_subject}\n\n${outreachResult.email_body}`);
                                                toast.success("Copied to clipboard!");
                                            }}
                                        >
                                            Copy All
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {!atsResult && !tailoredResult && !outreachResult && (
                        <div className="h-full flex flex-col items-center justify-center text-center p-12 border-2 border-dashed rounded-xl bg-muted/20 text-muted-foreground">
                            <Sparkles className="w-12 h-12 mb-4 text-indigo-500/50" />
                            <h3 className="text-xl font-semibold mb-2">Ready to Accelerate</h3>
                            <p className="max-w-md mx-auto">Fill out the job details on the left and run the tools to generate your personalized placement assets.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PlacementAccelerator;
