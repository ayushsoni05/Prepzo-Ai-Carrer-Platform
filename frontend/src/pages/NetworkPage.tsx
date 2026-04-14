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
} from 'lucide-react';
import { GlassCard, GlassButton } from '@/components/ui/GlassCard';
import { useAuthStore } from '@/store/authStore';
import { networkApi, Post, Connection, ConnectionSuggestion, UserSummary } from '@/api/network';
import ThinkingLoader from '@/components/ui/loading';
import toast from 'react-hot-toast';

export function NetworkPage() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();

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

  // Pagination
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

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
    }
  }, []);

  // Load connections
  const loadConnections = useCallback(async () => {
    try {
      const response = await networkApi.getConnections(1, 50);
      if (response.success) {
        setConnections(response.data.connections);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-black/30 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white">My Network</h1>
          
          {/* Tabs */}
          <div className="flex gap-2 md:gap-4 mt-4 md:mt-6 overflow-x-auto pb-2">
            {(['feed', 'connections', 'requests'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab
                    ? 'bg-purple-600 text-white'
                    : 'bg-white/5 text-purple-300 hover:bg-white/10'
                }`}
              >
                {tab === 'feed' && 'Feed'}
                {tab === 'connections' && (
                  <>
                    <span className="hidden sm:inline">Connections</span>
                    <span className="sm:hidden">Connect</span>
                    {` (${connections.length})`}
                  </>
                )}
                {tab === 'requests' && (
                  <>
                    Requests
                    {requests.received.length > 0 && (
                      <span className="ml-1 md:ml-2 px-1.5 md:px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                        {requests.received.length}
                      </span>
                    )}
                  </>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-8">
          {/* Sidebar - Hidden on mobile, shown in tabs/bottom */}
          <div className="hidden lg:block lg:col-span-1 space-y-6">
            {/* User Card */}
            <GlassCard className="p-4 md:p-6 text-center">
              <div className="w-16 md:w-20 h-16 md:h-20 bg-purple-500/30 rounded-full mx-auto mb-4 flex items-center justify-center">
<span className="text-3xl text-white">
                  {user?.fullName?.charAt(0) || 'U'}
                </span>
              </div>
              <h3 className="font-semibold text-white">{user?.fullName}</h3>
              <p className="text-purple-300 text-sm">{user?.targetRole || 'Student'}</p>
              <div className="flex justify-center gap-4 mt-4 text-sm">
                <div className="text-center">
                  <div className="font-semibold text-white">{connections.length}</div>
                  <div className="text-purple-400">Connections</div>
                </div>
              </div>
            </GlassCard>

            {/* Suggestions */}
            {suggestions.length > 0 && (
              <GlassCard className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  <h3 className="font-semibold text-white">People You May Know</h3>
                </div>
                <div className="space-y-3">
                  {suggestions.map((suggestion) => (
                    <div
                      key={suggestion.user._id}
                      className="flex items-center gap-3 p-2 bg-white/5 rounded-lg"
                    >
                      <div className="w-10 h-10 bg-purple-500/30 rounded-full flex items-center justify-center">
                        {suggestion.user.profileImage ? (
                          <img
                            src={suggestion.user.profileImage}
                            alt={suggestion.user.fullName}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <span className="text-white">
                            {suggestion.user.fullName.charAt(0)}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-white text-sm truncate">
                          {suggestion.user.fullName}
                        </p>
                        <p className="text-purple-400 text-xs truncate">
                          {suggestion.reason}
                        </p>
                      </div>
                      <button
                        onClick={() => handleSendRequest(suggestion.user._id)}
                        className="p-1 hover:bg-white/10 rounded text-purple-400"
                      >
                        <UserPlus className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </GlassCard>
            )}

            {/* Trending Hashtags */}
            {trendingHashtags.length > 0 && (
              <GlassCard className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  <h3 className="font-semibold text-white">Trending</h3>
                </div>
                <div className="space-y-2">
                  {trendingHashtags.slice(0, 5).map((tag) => (
                    <button
                      key={tag.hashtag}
                      onClick={() => navigate(`/network/hashtag/${tag.hashtag}`)}
                      className="flex items-center justify-between w-full p-2 hover:bg-white/5 rounded-lg transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Hash className="w-4 h-4 text-purple-400" />
                        <span className="text-purple-300 text-sm">{tag.hashtag}</span>
                      </div>
                      <span className="text-purple-500 text-xs">{tag.count} posts</span>
                    </button>
                  ))}
                </div>
              </GlassCard>
            )}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Feed Tab */}
            {activeTab === 'feed' && (
              <div className="space-y-6">
                {/* Create Post */}
                <GlassCard className="p-4">
                  <div
                    className="flex items-center gap-4 cursor-pointer"
                    onClick={() => setShowCreatePost(true)}
                  >
                    <div className="w-12 h-12 bg-purple-500/30 rounded-full flex items-center justify-center">
<span className="text-white">{user?.fullName?.charAt(0)}</span>
                    </div>
                    <div className="flex-1 py-3 px-4 bg-white/5 rounded-full text-purple-400 text-sm">
                      Share something with your network...
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-white/10">
                    <button className="flex items-center gap-2 text-purple-300 hover:text-purple-200 text-sm">
                      <Image className="w-5 h-5 text-blue-400" />
                      Photo
                    </button>
                    <button className="flex items-center gap-2 text-purple-300 hover:text-purple-200 text-sm">
                      <Video className="w-5 h-5 text-green-400" />
                      Video
                    </button>
                    <button className="flex items-center gap-2 text-purple-300 hover:text-purple-200 text-sm">
                      <FileText className="w-5 h-5 text-orange-400" />
                      Article
                    </button>
                  </div>
                </GlassCard>

                {/* Posts */}
                {loading ? (
                  <div className="flex items-center justify-center py-20">
                    <ThinkingLoader loadingText="Mapping Nodes" />
                  </div>
                ) : posts.length === 0 ? (
                  <GlassCard className="p-12 text-center">
                    <MessageSquare className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">No posts yet</h3>
                    <p className="text-purple-300">
                      Connect with others to see their posts or start sharing!
                    </p>
                  </GlassCard>
                ) : (
                  <AnimatePresence>
                    {posts.map((post, idx) => (
                      <motion.div
                        key={post._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <PostCard
                          post={post}
                          onLike={() => handleLikePost(post._id)}
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
              </div>
            )}

            {/* Connections Tab */}
            {activeTab === 'connections' && (
              <div>
                {connections.length === 0 ? (
                  <GlassCard className="p-12 text-center">
                    <Users className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">No connections yet</h3>
                    <p className="text-purple-300 mb-6">
                      Start building your professional network
                    </p>
                    <GlassButton onClick={() => setActiveTab('feed')}>
                      Find People
                    </GlassButton>
                  </GlassCard>
                ) : (
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
                )}
              </div>
            )}

            {/* Requests Tab */}
            {activeTab === 'requests' && (
              <div className="space-y-6">
                {/* Received Requests */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Received ({requests.received.length})
                  </h3>
                  {requests.received.length === 0 ? (
                    <p className="text-purple-300 text-center py-8">No pending requests</p>
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
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Sent ({requests.sent.length})
                  </h3>
                  {requests.sent.length === 0 ? (
                    <p className="text-purple-300 text-center py-8">No sent requests</p>
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

      {/* Create Post Modal */}
      <AnimatePresence>
        {showCreatePost && (
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
              className="bg-slate-900/95 border border-purple-500/30 rounded-2xl w-full max-w-lg"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-white">Create Post</h2>
                  <button
                    onClick={() => setShowCreatePost(false)}
                    className="p-2 hover:bg-white/10 rounded-lg"
                  >
                    <X className="w-5 h-5 text-purple-400" />
                  </button>
                </div>

                {/* Author */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-500/30 rounded-full flex items-center justify-center">
                    <span className="text-white">{user?.fullName?.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-medium text-white">{user?.fullName}</p>
                    <button className="flex items-center gap-1 text-purple-400 text-sm">
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

                {/* Content */}
                <textarea
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder="What would you like to share?"
                  className="w-full h-40 bg-transparent border-none text-white placeholder-purple-400 resize-none focus:outline-none"
                  autoFocus
                />

                {/* Visibility Toggle */}
                <div className="flex gap-4 mb-4">
                  <button
                    onClick={() => setPostVisibility('connections')}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
                      postVisibility === 'connections'
                        ? 'bg-purple-600 text-white'
                        : 'bg-white/5 text-purple-300'
                    }`}
                  >
                    <Users className="w-4 h-4" />
                    Connections
                  </button>
                  <button
                    onClick={() => setPostVisibility('public')}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
                      postVisibility === 'public'
                        ? 'bg-purple-600 text-white'
                        : 'bg-white/5 text-purple-300'
                    }`}
                  >
                    <Globe className="w-4 h-4" />
                    Public
                  </button>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-white/10 rounded-lg">
                      <Image className="w-5 h-5 text-blue-400" />
                    </button>
                    <button className="p-2 hover:bg-white/10 rounded-lg">
                      <Video className="w-5 h-5 text-green-400" />
                    </button>
                  </div>
                  <GlassButton
                    onClick={handleCreatePost}
                    disabled={posting || !newPostContent.trim()}
                    className="bg-purple-600 hover:bg-purple-500 disabled:opacity-50"
                  >
                    {posting ? 'Posting...' : 'Post'}
                  </GlassButton>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Post Card Component
function PostCard({
  post,
  onLike,
}: {
  post: Post;
  onLike: () => void;
}) {
  const [showComments, setShowComments] = useState(false);

  return (
    <GlassCard className="p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-purple-500/30 rounded-full flex items-center justify-center overflow-hidden">
            {post.author.profileImage ? (
              <img
                src={post.author.profileImage}
                alt={post.author.fullName}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-white">{post.author.fullName.charAt(0)}</span>
            )}
          </div>
          <div>
            <p className="font-medium text-white">{post.author.fullName}</p>
            <p className="text-purple-400 text-sm">{post.author.targetRole || 'Member'}</p>
            <div className="flex items-center gap-2 text-purple-500 text-xs">
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              {post.visibility === 'public' ? (
                <Globe className="w-3 h-3" />
              ) : (
                <Users className="w-3 h-3" />
              )}
            </div>
          </div>
        </div>
        <button className="p-2 hover:bg-white/10 rounded-lg">
          <MoreHorizontal className="w-5 h-5 text-purple-400" />
        </button>
      </div>

      {/* Content */}
      <p className="text-white whitespace-pre-wrap mb-4">{post.content}</p>

      {/* Hashtags */}
      {post.hashtags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {post.hashtags.map((tag) => (
            <span key={tag} className="text-purple-400 text-sm hover:underline cursor-pointer">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Images */}
      {post.images && post.images.length > 0 && (
        <div className="grid grid-cols-2 gap-2 mb-4">
          {post.images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt="Post image"
              className="w-full h-48 object-cover rounded-lg"
            />
          ))}
        </div>
      )}

      {/* Stats */}
      <div className="flex items-center justify-between py-3 border-t border-b border-white/10 mb-3 text-sm text-purple-400">
        <span>{post.likeCount} likes</span>
        <span>{post.commentCount} comments</span>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-around">
        <button
          onClick={onLike}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            post.isLiked
              ? 'text-red-400 bg-red-500/10'
              : 'text-purple-300 hover:bg-white/5'
          }`}
        >
          <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
          Like
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-2 px-4 py-2 text-purple-300 hover:bg-white/5 rounded-lg transition-colors"
        >
          <MessageSquare className="w-5 h-5" />
          Comment
        </button>
        <button className="flex items-center gap-2 px-4 py-2 text-purple-300 hover:bg-white/5 rounded-lg transition-colors">
          <Share2 className="w-5 h-5" />
          Share
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-purple-500/30 rounded-full flex-shrink-0" />
            <input
              type="text"
              placeholder="Write a comment..."
              className="flex-1 bg-white/5 border border-purple-500/30 rounded-full px-4 py-2 text-white text-sm placeholder-purple-400"
            />
          </div>
        </div>
      )}
    </GlassCard>
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
        <div className="w-14 h-14 bg-purple-500/30 rounded-full flex items-center justify-center overflow-hidden">
          {connection.user.profileImage ? (
            <img
              src={connection.user.profileImage}
              alt={connection.user.fullName}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-xl text-white">
              {connection.user.fullName.charAt(0)}
            </span>
          )}
        </div>
        <div className="flex-1">
          <h4 className="font-medium text-white">{connection.user.fullName}</h4>
          <p className="text-purple-400 text-sm">{connection.user.targetRole || 'Student'}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onMessage}
            className="p-2 hover:bg-white/10 rounded-lg text-purple-400"
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
        <div className="w-14 h-14 bg-purple-500/30 rounded-full flex items-center justify-center overflow-hidden">
          <span className="text-xl text-white">
            {user?.fullName?.charAt(0) || '?'}
          </span>
        </div>
        <div className="flex-1">
          <h4 className="font-medium text-white">{user?.fullName}</h4>
          <p className="text-purple-400 text-sm">{user?.targetRole || 'Student'}</p>
          {request.message && (
            <p className="text-purple-300 text-sm mt-1">"{request.message}"</p>
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
