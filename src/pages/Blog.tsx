import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User, Tag, Trash2, Pencil } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import SEOHead from '@/components/SEOHead';
import { BlogPost } from '@/types/blog';
import { getBlogPosts as getMockBlogPosts } from '@/data/blogData';

const Blog = () => {
  const [allBlogPosts, setAllBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Admin create form state
  const [form, setForm] = useState({
    title: '',
    slug: '',
    metaDescription: '',
    content: '',
    imageUrl: '',
    tags: '',
    featured: false,
  });

  const token = typeof window !== 'undefined' ? localStorage.getItem('ACT_ADMIN_TOKEN') : null;
  const isAdmin = Boolean(token);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL || '';
        const res = await fetch(`${baseUrl}/api/blogs`);
        if (!res.ok) throw new Error('Failed to load blogs');
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setAllBlogPosts(data);
        } else {
          // Fallback to previous static content when DB is empty
          setAllBlogPosts(getMockBlogPosts());
        }
      } catch (err: any) {
        // Fallback to previous static content on error
        setAllBlogPosts(getMockBlogPosts());
        setError(err.message || 'Failed to load blogs');
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const featuredBlogPosts = useMemo(() => allBlogPosts.filter(p => p.featured), [allBlogPosts]);
  const regularBlogPosts = useMemo(() => allBlogPosts.filter(post => !post.featured), [allBlogPosts]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Admin edit form state
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [editForm, setEditForm] = useState({
    title: '',
    slug: '',
    metaDescription: '',
    content: '',
    imageUrl: '',
    tags: '',
    featured: false,
  });

  const startEdit = (post: BlogPost) => {
    setEditingPost(post);
    setEditForm({
      title: post.title,
      slug: post.slug,
      metaDescription: post.metaDescription,
      content: post.content,
      imageUrl: post.imageUrl,
      tags: (post.tags || []).join(', '),
      featured: Boolean(post.featured),
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingPost(null);
  };

  const handleUpdate = async () => {
    if (!editingPost) return;
    try {
      const baseUrl = import.meta.env.VITE_API_URL || '';
      const res = await fetch(`${baseUrl}/api/blogs/${editingPost.slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: editForm.title,
          // slug updates are not supported via edit to avoid breaking links
          metaDescription: editForm.metaDescription,
          content: editForm.content,
          imageUrl: editForm.imageUrl,
          tags: editForm.tags.split(',').map(t => t.trim()).filter(Boolean),
          featured: editForm.featured,
        })
      });

      if (!res.ok) {
        let msg = `Failed to update blog (HTTP ${res.status})`;
        try {
          const errJson = await res.json();
          if (errJson?.message) msg = errJson.message;
        } catch {}
        if (res.status === 404) {
          // Treat as static blog update: update UI locally without showing an alert
          const updatedLocal = {
            ...editingPost,
            title: editForm.title,
            metaDescription: editForm.metaDescription,
            content: editForm.content,
            imageUrl: editForm.imageUrl,
            tags: editForm.tags.split(',').map(t => t.trim()).filter(Boolean),
            featured: editForm.featured,
            updatedAt: new Date().toISOString(),
          } as BlogPost;
          setAllBlogPosts(prev => prev.map(p => p.slug === updatedLocal.slug ? updatedLocal : p));
          setEditingPost(null);
          return;
        }
        throw new Error(msg);
      }

      const updated = await res.json();
      setAllBlogPosts(prev => prev.map(p => p.slug === updated.slug ? updated : p));
      setEditingPost(null);
      alert('Blog post updated successfully!');
    } catch (err: any) {
      alert(err.message || 'Failed to update blog');
    }
  };

  const handleDelete = async (slug: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }
    
    console.log('Attempting to delete blog:', slug);
    console.log('Token:', token ? 'Present' : 'Missing');
    
    try {
      const baseUrl = import.meta.env.VITE_API_URL || '';
      console.log('API URL:', baseUrl);
      
      const res = await fetch(`${baseUrl}/api/blogs/${slug}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      console.log('Response status:', res.status);
      console.log('Response headers:', Object.fromEntries(res.headers.entries()));
      
      let responseText;
      try {
        responseText = await res.text();
        console.log('Response body:', responseText);
      } catch (e) {
        console.log('Failed to read response body:', e);
      }
      
      if (!res.ok) {
        let errorMessage = 'Failed to delete blog post';
        try {
          if (responseText) {
            const errorData = JSON.parse(responseText);
            errorMessage = errorData.message || errorMessage;
          }
        } catch (e) {
          console.log('Failed to parse error response:', e);
          errorMessage = `HTTP ${res.status}: ${res.statusText}`;
        }
        
        // If it's a 404 or database error, it might be a static blog post
        // In that case, we can still remove it from the UI
        if (res.status === 404 || errorMessage.includes('Database not configured') || errorMessage.includes('Blog post not found')) {
          console.log('Treating as static blog post deletion');
          setAllBlogPosts(prev => prev.filter(p => p.slug !== slug));
          alert('Blog post removed from display (was static content)');
          return;
        }
        
        throw new Error(errorMessage);
      }
      
      console.log('Blog deleted successfully!');
      // Remove from local state
      setAllBlogPosts(prev => prev.filter(p => p.slug !== slug));
      alert('Blog post deleted successfully!');
    } catch (err: any) {
      console.error('Delete error:', err);
      alert(err.message || 'Failed to delete blog post');
    }
  };

  const BlogCard = ({ post, featured = false }: { post: BlogPost; featured?: boolean }) => (
    <Card className={`group h-full hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:-translate-y-1 ${featured ? 'ring-2 ring-primary/20' : ''} relative`}>
      {/* Admin Delete Button */}
      {isAdmin && (
        <div className="absolute top-2 right-2 z-10 flex gap-2">
          <Button
            variant="default"
            size="sm"
            className="bg-blue-600 text-white hover:bg-blue-700 shadow-md"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              startEdit(post);
            }}
          >
            <Pencil className="w-4 h-4 text-white" />
          </Button>
          <Button
            variant="destructive"
            size="sm"
            className="bg-red-600 text-white hover:bg-red-700 shadow-md"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleDelete(post.slug, post.title);
            }}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      )}
      <Link to={`/blog/${post.slug}`} className="block h-full no-underline">
        <div className="relative overflow-hidden">
          <img
            src={post.imageUrl}
            alt={post.title}
            className={`w-full object-cover transition-transform duration-300 group-hover:scale-105 ${featured ? 'h-64' : 'h-48'}`}
            loading="lazy"
            onError={(e) => {
              // Fallback image if the specified image doesn't exist
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1472&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          {featured && (
            <Badge className="absolute top-4 left-4 bg-gradient-to-r from-primary to-accent text-white shadow-lg">
              <span className="flex items-center gap-1">
                ✨ Featured
              </span>
            </Badge>
          )}
        </div>
        <CardHeader className={`pb-3 ${featured ? 'px-6 pt-6' : 'px-5 pt-5'}`}>
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs px-2 py-1 bg-primary text-white border-primary hover:bg-primary/90 transition-colors">
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>
          <CardTitle className={`line-clamp-2 group-hover:text-primary transition-colors leading-tight no-underline ${featured ? 'text-2xl font-bold' : 'text-xl font-semibold'}`}>
            {post.title}
          </CardTitle>
        </CardHeader>
        <CardContent className={`pt-0 ${featured ? 'px-6 pb-6' : 'px-5 pb-5'}`}>
          <p className={`text-muted-foreground mb-4 line-clamp-3 leading-relaxed ${featured ? 'text-base' : 'text-sm'}`}>
            {post.metaDescription}
          </p>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-1">
                <User className="w-4 h-4 text-primary/70" />
                <span className="font-medium">{post.author.name}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-primary/70" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-primary/70" />
                <span>{post.readTime} min read</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );

  return (
    <>
      <SEOHead
        title="Blog - Insights & Updates"
        description="Stay updated with the latest insights on software development, technology trends, and business solutions from Avyukt Core Technologies."
        keywords="technology blog, software development, ERP systems, CRM solutions, mobile app development, restaurant management, e-commerce, business automation"
        canonicalUrl={window.location.href}
      />
      
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-gray-50">
        <div className="container mx-auto px-4 py-16">
          {/* Header Section */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
              📚 Knowledge Hub
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-600 to-accent bg-clip-text text-transparent leading-tight">
              Our Blog
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover the latest insights, trends, and best practices in software development, 
              business automation, and technology solutions.
            </p>
          </div>

          {/* Admin Edit Blog */}
          {isAdmin && editingPost && (
            <div className="mb-12 bg-white border rounded-2xl shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-4">Edit Blog: {editingPost.title}</h2>
              <div className="grid grid-cols-1 gap-4">
                <Input placeholder="Title" value={editForm.title} onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} required />
                <Input placeholder="Slug (cannot change)" value={editForm.slug} disabled />
                <Input placeholder="Image URL" value={editForm.imageUrl} onChange={(e) => setEditForm({ ...editForm, imageUrl: e.target.value })} />
                <Input placeholder="Tags (comma separated)" value={editForm.tags} onChange={(e) => setEditForm({ ...editForm, tags: e.target.value })} />
                <Textarea placeholder="Short description" value={editForm.metaDescription} onChange={(e) => setEditForm({ ...editForm, metaDescription: e.target.value })} />
                <Textarea placeholder="Content (Markdown supported)" value={editForm.content} onChange={(e) => setEditForm({ ...editForm, content: e.target.value })} className="min-h-40" />
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={editForm.featured} onChange={(e) => setEditForm({ ...editForm, featured: e.target.checked })} /> Featured</label>
                <div className="flex gap-3">
                  <Button type="button" className="bg-blue-600 text-white" onClick={handleUpdate}>Save Changes</Button>
                  <Button type="button" variant="outline" onClick={cancelEdit}>Cancel</Button>
                </div>
              </div>
            </div>
          )}

          {/* Admin Create Blog */}
          {isAdmin && (
            <div className="mb-12 bg-white border rounded-2xl shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-4">Create New Blog</h2>
              <form
                className="grid grid-cols-1 gap-4"
                onSubmit={async (e) => {
                  e.preventDefault();
                  try {
                    if (!form.title || !form.slug || !form.metaDescription || !form.content) {
                      alert('Please fill Title, Slug, Short description, and Content.');
                      return;
                    }
                    const baseUrl = import.meta.env.VITE_API_URL || '';
                    const res = await fetch(`${baseUrl}/api/blogs`, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                      },
                      body: JSON.stringify({
                        title: form.title,
                        slug: form.slug,
                        metaDescription: form.metaDescription,
                        content: form.content,
                        imageUrl: form.imageUrl,
                        tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
                        featured: form.featured,
                      })
                    });
                    if (!res.ok) {
                      let msg = 'Failed to create blog';
                      try {
                        const errJson = await res.json();
                        if (errJson?.message) msg = errJson.message;
                      } catch {}
                      if (res.status === 409) msg = 'A blog with this slug already exists. Please choose a different slug.';
                      throw new Error(msg);
                    }
                    // refresh list
                    const data = await res.json();
                    setAllBlogPosts((prev) => [data, ...prev]);
                    setForm({ title: '', slug: '', metaDescription: '', content: '', imageUrl: '', tags: '', featured: false });
                  } catch (err: any) {
                    alert(err.message || 'Failed to create blog');
                  }
                }}
              >
                <Input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
                <Input placeholder="Slug (unique)" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required />
                <Input placeholder="Image URL" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
                <Input placeholder="Tags (comma separated)" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} />
                <Textarea placeholder="Short description" value={form.metaDescription} onChange={(e) => setForm({ ...form, metaDescription: e.target.value })} />
                <Textarea placeholder="Content (Markdown supported)" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="min-h-40" />
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} /> Featured</label>
                <div>
                  <Button type="submit" className="bg-blue-600 text-white">Publish</Button>
                </div>
              </form>
            </div>
          )}

          {/* Loading/Error */}
          {loading && (
            <div className="text-center py-16">Loading...</div>
          )}
          {error && !loading && (
            <div className="text-center py-16 text-red-600">{error}</div>
          )}

          {/* Featured Posts Section */}
          {!loading && featuredBlogPosts.length > 0 && (
            <div className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Featured Articles</h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Handpicked stories covering the most important topics in technology and business solutions.
                </p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                {featuredBlogPosts.map((post) => (
                  <BlogCard key={post.id} post={post} featured={true} />
                ))}
              </div>
            </div>
          )}

          {/* All Posts Section */}
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Latest Articles</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Stay updated with our newest insights and industry expertise.
              </p>
            </div>
            {allBlogPosts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl shadow-sm border">
                <div className="text-6xl mb-4">📝</div>
                <p className="text-xl text-muted-foreground font-medium mb-2">No blog posts available yet.</p>
                <p className="text-muted-foreground">Check back soon for new content!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {(regularBlogPosts.length > 0 ? regularBlogPosts : allBlogPosts).map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-20">
            <div className="bg-gradient-to-br from-primary/5 via-purple-50 to-accent/5 p-8 md:p-12 rounded-3xl border border-primary/10 shadow-lg">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Stay Updated</h3>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
                Want to stay informed about the latest technology trends and business solutions? 
                Follow our blog for regular updates and insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link 
                  to="/contact" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold no-underline"
                >
                  Get in Touch
                </Link>
                <Link 
                  to="/services" 
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary text-primary rounded-xl hover:bg-primary hover:text-white transition-all duration-300 font-semibold no-underline"
                >
                  Explore Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;