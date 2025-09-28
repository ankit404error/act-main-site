import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Calendar, Clock, User, Tag, ArrowLeft, Share2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import SEOHead from '@/components/SEOHead';
import { getBlogPostBySlug, getBlogPosts } from '@/data/blogData';
import ReactMarkdown from 'react-markdown';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = React.useState<any>(null);
  const [allPosts, setAllPosts] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  if (!slug) {
    return <Navigate to="/blog" replace />;
  }

  React.useEffect(() => {
    const load = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL || '';
        const [oneRes, allRes] = await Promise.all([
          fetch(`${baseUrl}/api/blogs/${slug}`),
          fetch(`${baseUrl}/api/blogs`),
        ]);
        let one: any = null;
        if (oneRes.ok) {
          one = await oneRes.json();
        } else {
          // Fallback to static content for the post
          one = getBlogPostBySlug(slug!);
          if (!one) throw new Error('Not found');
        }
        const all = allRes.ok ? await allRes.json() : getBlogPosts();
        setPost(one);
        setAllPosts(Array.isArray(all) && all.length > 0 ? all : getBlogPosts());
      } catch (e) {
        // Fallback to static content
        const fallback = getBlogPostBySlug(slug!);
        setPost(fallback || null);
        setAllPosts(getBlogPosts());
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [slug]);

  if (!loading && !post) {
    return <Navigate to="/blog" replace />;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title || document.title,
        text: post?.metaDescription || '',
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast notification here
    }
  };

  // Get related posts (same tags, excluding current post)
  const relatedPosts = (allPosts || [])
    .filter((p) => p.slug !== (post?.slug))
    .filter((p) => p.tags?.some((tag: string) => post?.tags?.includes(tag)))
    .slice(0, 3);

  return (
    <>
      <SEOHead
        title={post?.title || ''}
        description={post?.metaDescription || ''}
        keywords={(post?.tags || []).join(', ')}
        canonicalUrl={window.location.href}
        ogTitle={post?.title || ''}
        ogDescription={post?.metaDescription || ''}
        ogImage={post?.imageUrl || ''}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": post?.title || '',
          "description": post?.metaDescription || '',
          "image": post?.imageUrl || '',
          "author": {
            "@type": "Person",
            "name": post?.author?.name || ''
          },
          "publisher": {
            "@type": "Organization",
            "name": "Avyukt Core Technologies",
            "logo": {
              "@type": "ImageObject",
              "url": window.location.origin + "/lovable-uploads/9a295041-b715-4e21-8400-d0ea69a1e49e.png"
            }
          },
          "datePublished": post?.publishedAt || '',
          "dateModified": post?.updatedAt || post?.publishedAt || '',
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": window.location.href
          }
        }}
      />
      
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <div className="mb-8">
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors no-underline"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </div>

          {/* Article Header */}
          <article className="max-w-4xl mx-auto">
            <div className="mb-8">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {(post?.tags || []).map((tag: string, index: number) => (
                  <Badge key={index} variant="secondary" className="text-sm px-3 py-1 bg-primary text-white border-primary">
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                {post?.title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span>{post?.author?.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{post?.publishedAt ? formatDate(post.publishedAt) : ''}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{post?.readTime} min read</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                  className="ml-auto"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>

              {/* Featured Image */}
              <div className="mb-8">
                <img
                  src={post?.imageUrl}
                  alt={post?.title || ''}
                  className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1472&q=80';
                  }}
                />
              </div>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none mb-12">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-3xl font-bold mb-6 text-gray-900">{children}</h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-bold mb-4 mt-8 text-gray-900">{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl font-semibold mb-3 mt-6 text-gray-900">{children}</h3>
                  ),
                  p: ({ children }) => (
                    <p className="mb-4 text-gray-700 leading-relaxed">{children}</p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside mb-4 text-gray-700 space-y-1">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside mb-4 text-gray-700 space-y-1">{children}</ol>
                  ),
                  li: ({ children }) => (
                    <li className="ml-4">{children}</li>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-semibold text-gray-900">{children}</strong>
                  ),
                  em: ({ children }) => (
                    <em className="italic">{children}</em>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-primary pl-6 my-6 italic text-gray-600 bg-gray-50 py-4 rounded-r-lg">
                      {children}
                    </blockquote>
                  ),
                  code: ({ children }) => (
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800">
                      {children}
                    </code>
                  ),
                  pre: ({ children }) => (
                    <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto mb-4">
                      {children}
                    </pre>
                  ),
                }}
              >
                {post?.content || ''}
              </ReactMarkdown>
            </div>

            {/* Call to Action */}
            <div className="bg-primary/5 p-8 rounded-lg mb-12 text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Interested in implementing the solutions discussed in this article? 
                Contact Avyukt Core Technologies to learn how we can help transform your business.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/contact" className="no-underline">
                  <Button size="lg" className="px-8 bg-primary hover:bg-primary/90 text-white">
                    Get in Touch
                  </Button>
                </Link>
                <Link to="/services" className="no-underline">
                  <Button variant="outline" size="lg" className="px-8 border-primary text-primary hover:bg-primary hover:text-white">
                    Explore Services
                  </Button>
                </Link>
              </div>
            </div>
          </article>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <Card key={relatedPost.id} className="group h-full hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:-translate-y-1">
                    <Link to={`/blog/${relatedPost.slug}`} className="block h-full no-underline">
                      <div className="relative overflow-hidden">
                        <img
                          src={relatedPost.imageUrl}
                          alt={relatedPost.title}
                          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1472&q=80';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      </div>
                      <CardContent className="p-6">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {relatedPost.tags.slice(0, 2).map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs px-2 py-1 bg-primary text-white border-primary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <h3 className="text-xl font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors no-underline">
                          {relatedPost.title}
                        </h3>
                        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                          {relatedPost.metaDescription}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4 text-primary/70" />
                            <span>{formatDate(relatedPost.publishedAt)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4 text-primary/70" />
                            <span>{relatedPost.readTime} min</span>
                          </div>
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogPost;