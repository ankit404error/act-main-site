import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User, Tag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SEOHead from '@/components/SEOHead';
import { getBlogPosts, getFeaturedBlogPosts } from '@/data/blogData';
import { BlogPost } from '@/types/blog';

const Blog = () => {
  const allBlogPosts = getBlogPosts();
  const featuredBlogPosts = getFeaturedBlogPosts();
  const regularBlogPosts = allBlogPosts.filter(post => !post.featured);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const BlogCard = ({ post, featured = false }: { post: BlogPost; featured?: boolean }) => (
    <Card className={`group h-full hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:-translate-y-1 ${featured ? 'ring-2 ring-primary/20' : ''}`}>
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

          {/* Featured Posts Section */}
          {featuredBlogPosts.length > 0 && (
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