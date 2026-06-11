/**
 * Network Page
 * LinkedIn-style connections and professional feed
 */

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  UserPlus,
  MessageSquare,
  Heart,
  Share2,
  MoreHorizontal,
  Image,
  Video,
  FileText,
  Hash,
  TrendingUp,
  X,
  Check,
  Clock,
  Sparkles,
  Globe,
  ChevronDown,
  Bot,
  Search,
} from 'lucide-react';
import { GlassCard, GlassButton } from '@/components/ui/GlassCard';
import { GridBeam } from '@/components/ui/background-grid-beam';
import { useAuthStore } from '@/store/authStore';
import { useAppStore } from '@/store/appStore';
import { networkApi, Post, Connection, ConnectionSuggestion, UserSummary } from '@/api/network';
import ThinkingLoader from '@/components/ui/loading';
import toast from 'react-hot-toast';
import { BottomSheet } from '@/components/ui/BottomSheet';

export function NetworkPage() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const { setGlobalLoading } = useAppStore();

  // State
  const [activeTab, setActiveTab] = useState<'feed' | 'connections' | 'requests'>('feed');
  const [posts, setPosts] = useState<Post[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [requests, setRequests] = useState<{ received: Connection[]; sent: Connection[] }>({
    received: [],
    sent: [],
  });
  const [suggestions, setSuggestions] = useState<ConnectionSuggestion[]>([]);
  const [trendingHashtags, setTrendingHashtags] = useState<{ hashtag: string; count: number }[]>([]);
  const [loading, setLoading] = useState(true);
  
  // New post state
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [postVisibility, setPostVisibility] = useState<'public' | 'connections'>('connections');
  const [posting, setPosting] = useState(false);

  // User search state
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [userSearchResults, setUserSearchResults] = useState<UserSummary[]>([]);
  const [isSearchingUsers, setIsSearchingUsers] = useState(false);

  // Pagination
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Mobile viewport detection
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth?mode=login');
    }
  }, [isAuthenticated, navigate]);

  // Load feed
  const loadFeed = useCallback(async (pageNum = 1) => {
    if (pageNum === 1) setLoading(true);
    try {
      const response = await networkApi.getFeed(pageNum, 20);
      if (response.success) {
        if (pageNum === 1) {
          setPosts(response.data.posts);
        } else {
          setPosts((prev) => [...prev, ...response.data.posts]);
        }
        setHasMore(response.data.pagination.page < response.data.pagination.pages);
      }
    } catch (error) {
      console.error('Failed to load feed:', error);
    } finally {
      setLoading(false);
      setGlobalLoading(false);
    }
  }, [setGlobalLoading]);

  // Load connections
  const loadConnections = useCallback(async () => {
    try {
      const response = await networkApi.getConnections(1, 50);
      if (response.success) {
        setConnections(response.data);
      }
    } catch (error) {
      console.error('Failed to load connections:', error);
    }
  }, []);

  // Load requests
  const loadRequests = useCallback(async () => {
    try {
      const response = await networkApi.getPendingRequests();
      if (response.success) {
        setRequests(response.data);
      }
    } catch (error) {
      console.error('Failed to load requests:', error);
    }
  }, []);

  // Load suggestions and trending
  const loadExtra = useCallback(async () => {
    try {
      const [suggestionsRes, trendingRes] = await Promise.all([
        networkApi.getSuggestions(5),
        networkApi.getTrendingHashtags(),
      ]);
      
      if (suggestionsRes.success) setSuggestions(suggestionsRes.data);
      if (trendingRes.success) setTrendingHashtags(trendingRes.data);
    } catch (error) {
      console.error('Failed to load extra data:', error);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      if (activeTab === 'feed') loadFeed();
      else if (activeTab === 'connections') loadConnections();
      else if (activeTab === 'requests') loadRequests();
      
      loadExtra();
    }
  }, [activeTab, isAuthenticated, loadFeed, loadConnections, loadRequests, loadExtra]);

  // Handle user search
  useEffect(() => {
    const searchUsers = async () => {
      if (!userSearchQuery.trim()) {
        setUserSearchResults([]);
        return;
      }
      setIsSearchingUsers(true);
      try {
        const response = await networkApi.searchUsers(userSearchQuery);
        if (response.success) {
          setUserSearchResults(response.data);
        }
      } catch (error) {
        console.error('Failed to search users:', error);
      } finally {
        setIsSearchingUsers(false);
      }
    };

    const timer = setTimeout(searchUsers, 500);
    return () => clearTimeout(timer);
  }, [userSearchQuery]);

  // Handle create post
  const handleCreatePost = async () => {
    if (!newPostContent.trim()) {
      toast.error('Please enter some content');
      return;
    }

    setPosting(true);
    try {
      const response = await networkApi.createPost({
        content: newPostContent,
        visibility: postVisibility,
        postType: 'update',
      });
      
      if (response.success) {
        setPosts((prev) => [response.data, ...prev]);
        setNewPostContent('');
        setShowCreatePost(false);
        toast.success('Post created!');
      }
    } catch (error) {
      toast.error('Failed to create post');
    } finally {
      setPosting(false);
    }
  };

  // Handle like post
  const handleLikePost = async (postId: string) => {
    try {
      const response = await networkApi.toggleLike(postId);
      if (response.success) {
        setPosts((prev) =>
          prev.map((p) =>
            p._id === postId
              ? { ...p, isLiked: response.data.isLiked, likeCount: response.data.likeCount }
              : p
          )
        );
      }
    } catch (error) {
      toast.error('Failed to like post');
    }
  };

  // Handle comment on post
  const handleCommentPost = async (postId: string, text: string) => {
    try {
      const response = await networkApi.addComment(postId, text);
      if (response.success) {
        // We need to fetch the post again to get the populated comment, 
        // or optimistically add it if the backend returns the populated comment.
        // Assuming backend returns the full post in data, or the new comment in data.
        // Actually, we can just fetch the feed or update the specific post.
        setPosts((prev) =>
          prev.map((p) =>
            p._id === postId && response.data
              ? { ...p, comments: response.data.comments, commentCount: response.data.commentCount }
              : p
          )
        );
        toast.success('Comment added!');
      }
    } catch (error) {
      toast.error('Failed to add comment');
    }
  };

  // Handle share post
  const handleSharePost = async (postId: string) => {
    const postUrl = `${window.location.origin}/network/post/${postId}`;
    try {
      await navigator.clipboard.writeText(postUrl);
      toast.success('Link copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  // Handle connection request response
  const handleRequestResponse = async (connectionId: string, action: 'accept' | 'reject') => {
    try {
      const response = await networkApi.respondToRequest(connectionId, action);
      if (response.success) {
        setRequests((prev) => ({
          ...prev,
          received: prev.received.filter((r) => r._id !== connectionId),
        }));
        toast.success(action === 'accept' ? 'Connection accepted!' : 'Request declined');
        if (action === 'accept') {
          loadConnections();
        }
      }
    } catch (error) {
      toast.error('Failed to respond to request');
    }
  };

  // Handle send connection request
  const handleSendRequest = async (userId: string) => {
    try {
      const response = await networkApi.sendConnectionRequest(userId);
      if (response.success) {
        setSuggestions((prev) => prev.filter((s) => s.user._id !== userId));
        toast.success('Connection request sent!');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to send request';
      toast.error(errorMessage);
    }
  };

  // Extracted suggestions element
  const suggestionsElement = suggestions.length > 0 ? (
    <GlassCard className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-green-600" />
        <h3 className="font-semibold text-gray-900">People You May Know</h3>
      </div>
      <div className="space-y-3">
        {suggestions.map((suggestion) => (
          <div
            key={suggestion.user._id}
            className="flex items-center gap-3 p-2 bg-white border-gray-200 rounded-lg"
          >
            <div className="w-10 h-10 bg-green-600/30 rounded-full flex items-center justify-center">
              {suggestion.user.profileImage ? (
                <img
                  src={suggestion.user.profileImage}
                  alt={suggestion.user.fullName}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-gray-900">
                  {suggestion.user.fullName.charAt(0)}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 text-sm truncate">
                {suggestion.user.fullName}
              </p>
              <p className="text-green-600 text-xs truncate">
                {suggestion.reason}
              </p>
            </div>
            <button
              onClick={() => handleSendRequest(suggestion.user._id)}
              className="p-1 hover:bg-gray-50 rounded text-green-600"
            >
              <UserPlus className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </GlassCard>
  ) : null;

  // Extracted trending hashtags element
  const trendingElement = trendingHashtags.length > 0 ? (
    <GlassCard className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-green-400" />
        <h3 className="font-semibold text-gray-900">Trending</h3>
      </div>
      <div className="space-y-2">
        {trendingHashtags.slice(0, 5).map((tag) => (
          <button
            key={tag.hashtag}
            onClick={() => navigate(`/network/hashtag/${tag.hashtag}`)}
            className="flex items-center justify-between w-full p-2 hover:bg-white border-gray-200 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-2">
              <Hash className="w-4 h-4 text-green-600" />
              <span className="text-green-500 text-sm">{tag.hashtag}</span>
            </div>
            <span className="text-green-600 text-xs">{tag.count} posts</span>
          </button>
        ))}
      </div>
    </GlassCard>
  ) : null;

  // Extracted desktop author header
  const desktopAuthorHeader = (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Create Post</h2>
        <button
          onClick={() => setShowCreatePost(false)}
          className="p-2 hover:bg-gray-50 rounded-lg"
        >
          <X className="w-5 h-5 text-green-600" />
        </button>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-green-600/30 rounded-full flex items-center justify-center">
          <span className="text-gray-900">{user?.fullName?.charAt(0)}</span>
        </div>
        <div>
          <p className="font-medium text-gray-900">{user?.fullName}</p>
          <button className="flex items-center gap-1 text-green-600 text-sm">
            {postVisibility === 'public' ? (
              <Globe className="w-3 h-3" />
            ) : (
              <Users className="w-3 h-3" />
            )}
            {postVisibility === 'public' ? 'Public' : 'Connections'}
            <ChevronDown className="w-3 h-3" />
          </button>
        </div>
      </div>
    </>
  );

  // Extracted create post form content
  const createPostForm = (
    <div className="space-y-4">
      {isMobile && (
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-green-600/30 rounded-full flex items-center justify-center">
            <span className="text-gray-900">{user?.fullName?.charAt(0)}</span>
          </div>
          <div>
            <p className="font-medium text-gray-900">{user?.fullName}</p>
            <button className="flex items-center gap-1 text-green-600 text-sm">
              {postVisibility === 'public' ? (
                <Globe className="w-3 h-3" />
              ) : (
                <Users className="w-3 h-3" />
              )}
              {postVisibility === 'public' ? 'Public' : 'Connections'}
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      <textarea
        value={newPostContent}
        onChange={(e) => setNewPostContent(e.target.value)}
        placeholder="What would you like to share?"
        className="w-full h-40 bg-transparent border-none text-gray-900 placeholder-gray-400 resize-none focus:outline-none"
        autoFocus
      />

      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setPostVisibility('connections')}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
            postVisibility === 'connections'
              ? 'bg-[#057642] text-white'
              : 'bg-white border border-gray-200 text-gray-600'
          }`}
        >
          <Users className="w-4 h-4" />
          Connections
        </button>
        <button
          onClick={() => setPostVisibility('public')}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
            postVisibility === 'public'
              ? 'bg-[#057642] text-white'
              : 'bg-white border border-gray-200 text-gray-600'
          }`}
        >
          <Globe className="w-4 h-4" />
          Public
        </button>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex gap-2">
          <button className="p-2 hover:bg-gray-50 rounded-lg">
            <Image className="w-5 h-5 text-blue-500" />
          </button>
          <button className="p-2 hover:bg-gray-50 rounded-lg">
            <Video className="w-5 h-5 text-green-600" />
          </button>
        </div>
        <GlassButton
          onClick={handleCreatePost}
          disabled={posting || !newPostContent.trim()}
          className="bg-[#057642] text-white hover:bg-[#057642]/90 disabled:opacity-50"
        >
          {posting ? 'Posting...' : 'Post'}
        </GlassButton>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f3f2ef] selection:bg-[#057642] selection:text-gray-900 overflow-x-hidden relative">
      {/* Background Effect */}
      <div className="absolute inset-0 w-full h-full bg-[#f3f2ef] z-0 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <GridBeam className="absolute inset-0" />

      <div className="relative z-10 border-b border-gray-200 bg-white/80 backdrop-blur-3xl pt-6 pb-0">
        <div className="max-w-7xl mx-auto px-6 flex items-end justify-between">
            <div className="flex gap-6">
              {(['feed', 'connections', 'requests'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 px-2 relative transition-all ${
                    activeTab === tab
                      ? 'text-[#057642]'
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  <span className="text-[14px] font-semibold text-gray-600">
                    {tab === 'feed' && 'Feed'}
                    {tab === 'connections' && 'Connections'}
                    {tab === 'requests' && 'Pending'}
                  </span>
                  {activeTab === tab && (
                    <motion.div
                      layoutId="network-tab-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#057642]"
                    />
                  )}
                </button>
              ))}
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-8">
          {/* Sidebar - Hidden on mobile, shown in tabs/bottom */}
          <div className="hidden lg:block lg:col-span-1 space-y-6">
            {/* User Profile Overview */}
            <div className="bg-white/80 border border-gray-200 rounded-[40px] p-8 backdrop-blur-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-40">
                 <Bot size={24} className="text-[#057642]" />
              </div>
              <div className="w-24 h-24 bg-[#f3f2ef] border-4 border-gray-200 rounded-[32px] mx-auto mb-6 flex items-center justify-center overflow-hidden shadow-2xl relative z-10">
                <span className="text-4xl font-rubik font-[900] text-gray-900">
                  {user?.fullName?.charAt(0) || 'U'}
                </span>
                {user?.profileImage && (
                  <img src={user.profileImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
                )}
              </div>
              <h3 className="text-xl font-rubik font-[900] text-gray-900 uppercase tracking-tighter text-center mb-1">{user?.fullName}</h3>
              <p className="text-[14px] font-semibold text-gray-600 text-[#057642] text-center mb-8">{user?.targetRole || 'CORE ENTITY'}</p>
              
              <div className="grid grid-cols-2 gap-4 py-8 border-y border-gray-200">
                <div className="text-center">
                   <p className="text-2xl font-rubik font-[900] text-gray-900">{connections.length}</p>
                   <p className="text-[12px] font-normal text-gray-500 text-gray-500">Connections</p>
                </div>
                <div className="text-center">
                   <p className="text-2xl font-rubik font-[900] text-gray-900">42</p>
                   <p className="text-[12px] font-normal text-gray-500 text-gray-500">Profile viewers</p>
                </div>
              </div>
              
              <button 
                onClick={() => navigate(`/profile/${user?._id}`)}
                className="w-full mt-8 py-4 rounded-2xl bg-white border-gray-200 border border-gray-200 text-[11px] font-black uppercase tracking-[0.3em] text-gray-900 hover:bg-gray-50 transition-all"
              >
                View Profile
              </button>
            </div>

            {/* Suggestions */}
            {suggestionsElement}

            {/* Trending Hashtags */}
            {trendingElement}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Feed Tab */}
            {activeTab === 'feed' && (
              <div className="space-y-6">
                {/* Create Post - Premium Input Node */}
                <div className="bg-white/60 border border-gray-200 rounded-[32px] p-8 backdrop-blur-xl mb-10 overflow-hidden relative">
                   <div className="flex items-center gap-6">
                      <div className="w-14 h-14 bg-[#f3f2ef] border border-gray-300 rounded-2xl flex items-center justify-center overflow-hidden shrink-0 shadow-xl">
                         <span className="text-xl font-rubik font-[900] text-gray-900">{user?.fullName?.charAt(0)}</span>
                      </div>
                      <div 
                         onClick={() => setShowCreatePost(true)}
                         className="flex-1 py-4 px-8 bg-white border-gray-200 border border-gray-200 rounded-2xl text-gray-500 text-[14px] font-bold cursor-pointer hover:bg-gray-50 transition-all font-rubik"
                      >
                         Start a post
                      </div>
                   </div>
                   <div className="flex items-center gap-8 mt-8 pt-8 border-t border-gray-200">
                      <button onClick={() => setShowCreatePost(true)} className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-gray-500 hover:text-[#057642] transition-all">
                         <Image size={18} className="text-blue-400" />
                         Media
                      </button>
                      <button onClick={() => setShowCreatePost(true)} className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-gray-500 hover:text-[#057642] transition-all">
                         <Video size={18} className="text-[#057642]" />
                         Event
                      </button>
                      <button onClick={() => setShowCreatePost(true)} className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-gray-500 hover:text-[#057642] transition-all">
                         <FileText size={18} className="text-orange-400" />
                         Write article
                      </button>
                   </div>
                </div>

                {/* Posts */}
                {loading ? (
                  <div className="flex items-center justify-center py-32">
                    <ThinkingLoader loadingText="Loading Feed" />
                  </div>
                ) : posts.length === 0 ? (
                  <div className="bg-white/20 border border-gray-200 rounded-[40px] p-24 text-center backdrop-blur-xl">
                    <MessageSquare className="w-16 h-16 text-gray-900/10 mx-auto mb-8" />
                    <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter mb-4">No posts yet</h3>
                    <p className="text-gray-500 font-rubik font-bold uppercase text-[13px] tracking-wide">Be the first to post something in your network</p>
                  </div>
                ) : (
                  <AnimatePresence>
                    {posts.map((post, idx) => (
                      <motion.div
                        key={post._id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05, duration: 0.8 }}
                      >
                        <PostCard
                          post={post}
                          onLike={() => handleLikePost(post._id)}
                          onComment={(text) => handleCommentPost(post._id, text)}
                          onShare={() => handleSharePost(post._id)}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}

                {/* Load More */}
                {hasMore && posts.length > 0 && (
                  <div className="text-center">
                    <GlassButton onClick={() => {
                      setPage(p => p + 1);
                      loadFeed(page + 1);
                    }}>
                      Load More
                    </GlassButton>
                  </div>
                )}

                {/* Suggestions and trending on mobile below feed list */}
                {isMobile && (
                  <div className="space-y-6 mt-8 pt-8 border-t border-gray-200">
                    {suggestionsElement}
                    {trendingElement}
                  </div>
                )}
              </div>
            )}

            {/* Connections Tab */}
            {activeTab === 'connections' && (
              <div className="space-y-6">
                <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm relative">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={userSearchQuery}
                      onChange={(e) => setUserSearchQuery(e.target.value)}
                      placeholder="Search users by name or username..."
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-[#057642]/50 transition-all font-rubik"
                    />
                  </div>

                  {/* Search Results */}
                  {userSearchQuery.trim() !== '' && (
                    <div className="mt-4 space-y-3">
                      {isSearchingUsers ? (
                        <div className="text-center py-4 text-gray-500 font-medium text-sm">Searching...</div>
                      ) : userSearchResults.length === 0 ? (
                        <div className="text-center py-4 text-gray-500 font-medium text-sm">No users found for "{userSearchQuery}"</div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {userSearchResults.map((searchUser) => (
                            <div key={searchUser._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-[#057642]/30 transition-all">
                              <div className="flex items-center gap-3" onClick={() => navigate(`/profile/${searchUser._id}`)} style={{ cursor: 'pointer' }}>
                                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
                                  {searchUser.profileImage ? (
                                    <img src={searchUser.profileImage} alt="" className="w-full h-full object-cover" />
                                  ) : (
                                    <span className="text-xl font-bold text-gray-500">{searchUser.fullName.charAt(0)}</span>
                                  )}
                                </div>
                                <div>
                                  <div className="flex items-center gap-1">
                                    <p className="font-bold text-gray-900 truncate max-w-[150px]">{searchUser.fullName}</p>
                                    {(searchUser as any).isTopVoice && (
                                      <span className="bg-[#057642]/10 text-[#057642] text-[10px] font-bold px-1.5 rounded uppercase tracking-wider">Top Voice</span>
                                    )}
                                  </div>
                                  <p className="text-xs text-gray-500 truncate max-w-[180px]">{searchUser.targetRole || 'Member'}</p>
                                </div>
                              </div>
                              <button
                                onClick={() => handleSendRequest(searchUser._id)}
                                className="p-2 bg-white hover:bg-gray-100 rounded-lg border border-gray-200 text-[#057642] transition-colors"
                              >
                                <UserPlus className="w-5 h-5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {connections.length === 0 && userSearchQuery === '' ? (
                  <GlassCard className="p-12 text-center">
                    <Users className="w-16 h-16 text-green-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No connections yet</h3>
                    <p className="text-green-500 mb-6">
                      Start building your professional network
                    </p>
                    <GlassButton onClick={() => setActiveTab('feed')}>
                      Find People
                    </GlassButton>
                  </GlassCard>
                ) : userSearchQuery === '' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {connections.map((connection) => (
                      <ConnectionCard
                        key={connection._id}
                        connection={connection}
                        onView={() => navigate(`/profile/${connection.user._id}`)}
                        onMessage={() => toast('Messaging coming soon!')}
                      />
                    ))}
                  </div>
                ) : null}
              </div>
            )}

            {/* Requests Tab */}
            {activeTab === 'requests' && (
              <div className="space-y-6">
                {/* Received Requests */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Received ({requests.received.length})
                  </h3>
                  {requests.received.length === 0 ? (
                    <p className="text-green-500 text-center py-8">No pending requests</p>
                  ) : (
                    <div className="space-y-3">
                      {requests.received.map((request) => (
                        <RequestCard
                          key={request._id}
                          request={request}
                          type="received"
                          onAccept={() => handleRequestResponse(request._id, 'accept')}
                          onReject={() => handleRequestResponse(request._id, 'reject')}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Sent Requests */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Sent ({requests.sent.length})
                  </h3>
                  {requests.sent.length === 0 ? (
                    <p className="text-green-500 text-center py-8">No sent requests</p>
                  ) : (
                    <div className="space-y-3">
                      {requests.sent.map((request) => (
                        <RequestCard
                          key={request._id}
                          request={request}
                          type="sent"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create Post Modal / BottomSheet */}
      <AnimatePresence>
        {showCreatePost && (
          isMobile ? (
            <BottomSheet isOpen={showCreatePost} onClose={() => setShowCreatePost(false)} title="Create Post" theme="light">
              {createPostForm}
            </BottomSheet>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowCreatePost(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white/95 border border-green-600/30 rounded-2xl w-full max-w-lg"
              >
                <div className="p-6">
                  {desktopAuthorHeader}
                  {createPostForm}
                </div>
              </motion.div>
            </motion.div>
          )
        )}
      </AnimatePresence>
    </div>
  );
}

function PostCard({
  post,
  onLike,
  onComment,
  onShare,
}: {
  post: Post;
  onLike: () => void;
  onComment: (text: string) => void;
  onShare: () => void;
}) {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleCommentSubmit = async () => {
    if (!commentText.trim()) return;
    setSubmitting(true);
    await onComment(commentText);
    setCommentText('');
    setSubmitting(false);
  };

  return (
    <div className="group bg-white/40 border border-gray-200 rounded-[32px] p-8 md:p-10 transition-all hover:bg-gray-50 hover:border-gray-300 shadow-2xl backdrop-blur-sm relative overflow-hidden mb-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 bg-[#f3f2ef] border border-gray-300 rounded-[22px] flex items-center justify-center overflow-hidden shrink-0 shadow-lg p-1 group-hover:border-[#057642]/30 transition-colors">
            {post.author.profileImage ? (
              <img
                src={post.author.profileImage}
                alt={post.author.fullName}
                className="w-full h-full object-cover rounded-[18px]"
              />
            ) : (
              <span className="text-xl font-rubik font-[900] text-gray-900">{post.author.fullName.charAt(0)}</span>
            )}
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
               <p className="text-lg font-rubik font-[900] text-gray-900 uppercase tracking-tight group-hover:text-[#057642] transition-colors">{post.author.fullName}</p>
               <div className="w-1 h-1 rounded-full bg-[#057642]" />
               <p className="text-[10px] font-black uppercase text-gray-500">1st</p>
            </div>
            <p className="text-[14px] font-semibold text-gray-600 text-gray-500">{post.author.targetRole || 'MEMBER'}</p>
            <div className="flex items-center gap-3 mt-2 text-[12px] font-normal text-gray-500 text-gray-400">
              <span className="flex items-center gap-2">
                <Clock size={12} />
                {new Date(post.createdAt).toLocaleDateString()}
              </span>
              <span className="w-1 h-1 rounded-full bg-white border-gray-200" />
              <span className="flex items-center gap-2">
                {post.visibility === 'public' ? <Globe size={12} /> : <Users size={12} />}
                {post.visibility.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
        <button className="w-10 h-10 rounded-xl flex items-center justify-center bg-white border-gray-200 border border-gray-200 text-gray-500 hover:text-gray-900 transition-all">
           <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="relative mb-8">
        <p className="text-[16px] md:text-[18px] leading-relaxed text-gray-800 font-medium tracking-tight whitespace-pre-wrap font-rubik">
           {post.content}
        </p>
      </div>

      {/* Hashtags */}
      {post.hashtags.length > 0 && (
        <div className="flex flex-wrap gap-4 mb-8">
          {post.hashtags.map((tag) => (
            <span key={tag} className="text-[#057642] text-[11px] font-black uppercase tracking-widest hover:underline cursor-pointer bg-[#057642]/10 px-3 py-1 rounded-lg">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Images - Premium Display */}
      {post.images && post.images.length > 0 && (
        <div className={`grid gap-4 mb-8 ${post.images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
          {post.images.map((img, idx) => (
            <div key={idx} className="relative rounded-[24px] overflow-hidden border border-gray-300 group/img">
               <img
                 src={img}
                 alt="Post image"
                 className="w-full h-[400px] object-cover group-hover/img:scale-105 transition-transform duration-700"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c10]/40 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      )}

      {/* Stats - Tech Style */}
      <div className="flex items-center gap-10 py-6 border-y border-gray-200 mb-6 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
        <div className="flex items-center gap-3">
           <span className="text-gray-900">{post.likeCount}</span>
           LIKES
        </div>
        <div className="flex items-center gap-3">
           <span className="text-gray-900">{post.commentCount}</span>
           COMMENTS
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="flex gap-4">
           <button
             onClick={onLike}
             className={`flex items-center gap-3 px-8 py-4 rounded-2xl transition-all border ${
               post.isLiked
                 ? 'bg-[#ff3b3b]/10 border-[#ff3b3b]/30 text-[#ff3b3b]'
                 : 'bg-white border-gray-200 border-gray-200 text-gray-500 hover:bg-gray-50'
             }`}
           >
             <Heart size={18} className={post.isLiked ? 'fill-current' : ''} />
             <span className="text-[11px] font-black uppercase tracking-widest">Like</span>
           </button>
           
           <button
             onClick={() => setShowComments(!showComments)}
             className="flex items-center gap-3 px-8 py-4 bg-white border-gray-200 border border-gray-200 rounded-2xl text-gray-500 hover:bg-gray-50 transition-all"
           >
             <MessageSquare size={18} />
             <span className="text-[11px] font-black uppercase tracking-widest">Comment</span>
           </button>
        </div>

        <button 
          onClick={onShare}
          className="w-12 h-12 rounded-2xl bg-white text-[#0a0c10] flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-xl"
        >
           <Share2 size={20} />
        </button>
      </div>

      {/* Comments Section */}
      <AnimatePresence>
        {showComments && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-8 pt-8 border-t border-gray-200">
              {/* Existing Comments */}
              {post.comments && post.comments.length > 0 && (
                <div className="space-y-4 mb-6">
                  {post.comments.map((comment, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="w-10 h-10 bg-[#f3f2ef] border border-gray-300 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                        {comment.author.profileImage ? (
                          <img src={comment.author.profileImage} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-gray-900 font-black">{comment.author.fullName.charAt(0)}</span>
                        )}
                      </div>
                      <div className="flex-1 bg-white border border-gray-200 rounded-2xl p-4">
                        <p className="text-sm font-bold text-gray-900">{comment.author.fullName}</p>
                        <p className="text-sm text-gray-700 mt-1">{comment.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Comment Input */}
              <div className="flex gap-4 items-center bg-white border border-gray-200 rounded-2xl p-2 pr-6">
                <div className="w-10 h-10 bg-[#f3f2ef] border border-gray-300 rounded-xl flex items-center justify-center flex-shrink-0">
                   <span className="text-gray-900 font-black">U</span>
                </div>
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleCommentSubmit()}
                  placeholder="Add a comment..."
                  className="flex-1 bg-transparent border-none text-gray-900 text-[14px] font-bold placeholder-gray-400 focus:outline-none py-3"
                />
                <button 
                  onClick={handleCommentSubmit}
                  disabled={submitting || !commentText.trim()}
                  className="text-[#057642] text-[14px] font-bold disabled:opacity-50"
                >
                  Post
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Connection Card Component
function ConnectionCard({
  connection,
  onView,
  onMessage,
}: {
  connection: Connection;
  onView: () => void;
  onMessage: () => void;
}) {
  return (
    <GlassCard className="p-4">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-green-600/30 rounded-full flex items-center justify-center overflow-hidden">
          {connection.user.profileImage ? (
            <img
              src={connection.user.profileImage}
              alt={connection.user.fullName}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-xl text-gray-900">
              {connection.user.fullName.charAt(0)}
            </span>
          )}
        </div>
        <div className="flex-1">
          <h4 className="font-medium text-gray-900">{connection.user.fullName}</h4>
          <p className="text-green-600 text-sm">{connection.user.targetRole || 'Student'}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onMessage}
            className="p-2 hover:bg-gray-50 rounded-lg text-green-600"
          >
            <MessageSquare className="w-5 h-5" />
          </button>
          <GlassButton onClick={onView} className="text-sm">
            View
          </GlassButton>
        </div>
      </div>
    </GlassCard>
  );
}

// Request Card Component
function RequestCard({
  request,
  type,
  onAccept,
  onReject,
}: {
  request: Connection;
  type: 'received' | 'sent';
  onAccept?: () => void;
  onReject?: () => void;
}) {
  const user = type === 'received' 
    ? (request as unknown as { requester: UserSummary }).requester 
    : (request as unknown as { recipient: UserSummary }).recipient;

  return (
    <GlassCard className="p-4">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-green-600/30 rounded-full flex items-center justify-center overflow-hidden">
          <span className="text-xl text-gray-900">
            {user?.fullName?.charAt(0) || '?'}
          </span>
        </div>
        <div className="flex-1">
          <h4 className="font-medium text-gray-900">{user?.fullName}</h4>
          <p className="text-green-600 text-sm">{user?.targetRole || 'Student'}</p>
          {request.message && (
            <p className="text-green-500 text-sm mt-1">"{request.message}"</p>
          )}
        </div>
        {type === 'received' ? (
          <div className="flex gap-2">
            <button
              onClick={onAccept}
              className="p-2 bg-green-500/20 hover:bg-green-500/30 rounded-lg text-green-400"
            >
              <Check className="w-5 h-5" />
            </button>
            <button
              onClick={onReject}
              className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-red-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-sm rounded-full flex items-center gap-1">
            <Clock className="w-4 h-4" />
            Pending
          </span>
        )}
      </div>
    </GlassCard>
  );
}
