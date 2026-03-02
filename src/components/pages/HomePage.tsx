// Hyphen - Enterprise AI Solutions
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle,
  Workflow,
  BarChart3,
  Lightbulb,
  Rocket,
  Shield,
  Zap,
  MessageSquare,
  Layers,
  Video,
  Sparkles,
  ChevronRight,
  Code2,
  Database,
  Cloud
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { AIProducts } from '@/entities';

// --- Animation Components ---

const AnimatedSection = ({ 
  children, 
  className = '', 
  delay = 0, 
  animation = 'fade-up' 
}: { 
  children: React.ReactNode; 
  className?: string; 
  delay?: number;
  animation?: 'fade-up' | 'fade-in' | 'scale-up';
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(element);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [delay]);

  const getAnimationClass = () => {
    switch (animation) {
      case 'fade-in': return isVisible ? 'opacity-100' : 'opacity-0';
      case 'scale-up': return isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95';
      case 'fade-up':
      default: return isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8';
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${getAnimationClass()} ${className}`}
    >
      {children}
    </div>
  );
};

// --- Main Component ---

export default function HomePage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<AIProducts[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch Data
  useEffect(() => {
    const loadData = async () => {
      try {
        const productsData = await BaseCrudService.getAll<AIProducts>('aiproducts', [], { limit: 7 });
        setProducts(productsData.items);
      } catch (error) {
        console.error('Failed to load homepage data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const aiSolutions = [
    { title: 'AI Automation Systems', icon: <Workflow className="w-6 h-6" /> },
    { title: 'AI Chat & Support Platforms', icon: <MessageSquare className="w-6 h-6" /> },
    { title: 'AI for Insights & Analytics', icon: <BarChart3 className="w-6 h-6" /> },
    { title: 'AI Workflow Optimization', icon: <Zap className="w-6 h-6" /> },
  ];

  const buildProcess = [
    { step: '1', title: 'Discovery & Strategy', desc: 'Understanding your business needs and AI opportunities' },
    { step: '2', title: 'AI Architecture Design', desc: 'Designing scalable and secure AI systems' },
    { step: '3', title: 'LLM & Workflow Integration', desc: 'Integrating advanced language models and workflows' },
    { step: '4', title: 'Secure Deployment', desc: 'Enterprise-grade deployment with security protocols' },
    { step: '5', title: 'Monitoring & Optimization', desc: 'Continuous monitoring and performance optimization' },
  ];

  const differentiators = [
    'We build production-ready AI systems',
    'We design scalable AI architectures',
    'We combine product innovation with enterprise solutions',
    'We focus on measurable ROI',
    'We build beyond chatbots — full AI workflows',
  ];

  const technologies = [
    { name: 'OpenAI', icon: '🤖' },
    { name: 'Vector Databases', icon: '🗄️' },
    { name: 'RAG Systems', icon: '🔍' },
    { name: 'FastAPI', icon: '⚡' },
    { name: 'React', icon: '⚛️' },
    { name: 'Cloud Infrastructure', icon: '☁️' },
  ];

  const insights = [
    { title: 'AI Automation Trends', desc: 'Latest developments in enterprise AI automation' },
    { title: 'Enterprise AI Adoption', desc: 'How leading companies are implementing AI' },
    { title: 'Case Studies', desc: 'Real-world AI implementation success stories' },
    { title: 'Technical Deep Dives', desc: 'In-depth technical articles and research' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-paragraph overflow-x-hidden selection:bg-primary/20">
      <Header />

      {/* HERO SECTION */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://static.wixstatic.com/media/df2796_f4489e71df9f4f79824d73178d3bc969~mv2.png?originWidth=1600&originHeight=896" 
            alt="Enterprise AI solutions background" 
            className="w-full h-full object-cover scale-105 animate-slow-zoom"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-background" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
          <AnimatedSection animation="fade-up" delay={100}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-white mb-6 tracking-tight leading-[1.1]">
              Enterprise AI <br />
              <span className="text-white/90">Built for Scale</span>
            </h1>
          </AnimatedSection>
          
          <AnimatedSection animation="fade-up" delay={300}>
            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
              Custom AI automation systems tailored to healthcare, finance, education, retail, and enterprise operations.
            </p>
          </AnimatedSection>

          <AnimatedSection animation="scale-up" delay={500}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-white text-black hover:bg-white/90 rounded-full px-8 py-6 text-lg font-medium transition-all duration-300 hover:scale-105"
                onClick={() => navigate('/contact')}
              >
                Get Custom AI Proposal
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-transparent border-white/30 text-white hover:bg-white/10 rounded-full px-8 py-6 text-lg font-medium backdrop-blur-sm transition-all duration-300"
                onClick={() => navigate('/contact')}
              >
                Book Free Consultation
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* AI PRODUCTS SECTION */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-16">
            <div className="max-w-3xl">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">AI Products</Badge>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-6">
                AI Products Built for Real Business Impact
              </h2>
              <p className="text-lg text-muted-foreground">
                Hyphen delivers production-ready AI solutions that solve real business problems across industries.
              </p>
            </div>
          </AnimatedSection>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="h-96 bg-muted animate-pulse rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.slice(0, 7).map((product, idx) => (
                <AnimatedSection key={product._id} delay={idx * 100}>
                  <Link to={`/products/${product._id}`} className="block h-full group">
                    <div className="relative h-full flex flex-col bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                      <div className="relative aspect-video overflow-hidden bg-muted">
                        <Image
                          src={product.productImage || "https://static.wixstatic.com/media/df2796_9cc514cb371e44468a82c54a475b2d9e~mv2.png?originWidth=1600&originHeight=896"}
                          alt={product.productName || 'Product'}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                          {product.productName}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 flex-grow">
                          {product.shortDescription}
                        </p>
                        {product.useCases && (
                          <div className="mb-4 space-y-2">
                            <p className="text-xs font-semibold uppercase text-muted-foreground">Features:</p>
                            <div className="flex flex-wrap gap-2">
                              {product.useCases.split(',').slice(0, 3).map((feature, i) => (
                                <Badge key={i} variant="secondary" className="text-xs">
                                  {feature.trim()}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        <div className="flex items-center text-xs font-bold uppercase tracking-wider text-foreground group-hover:translate-x-1 transition-transform">
                          Learn More <ArrowRight className="ml-1 w-3 h-3" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* INDUSTRY & ENTERPRISE SOLUTIONS SECTION */}
      <section className="py-24 md:py-32 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-16">
            <div className="max-w-3xl">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Enterprise Solutions</Badge>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-6">
                Enterprise AI Solutions Designed for Scale
              </h2>
              <p className="text-lg text-muted-foreground">
                Hyphen builds custom AI automation systems tailored to healthcare, finance, education, retail, and enterprise operations.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiSolutions.map((solution, idx) => (
              <AnimatedSection key={idx} delay={idx * 100}>
                <div className="bg-background rounded-2xl p-8 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg group cursor-pointer h-full flex flex-col items-center text-center">
                  <div className="mb-4 text-primary group-hover:scale-110 transition-transform">
                    {solution.icon}
                  </div>
                  <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                    {solution.title}
                  </h3>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* HOW WE BUILD SECTION */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-16">
            <div className="max-w-3xl">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Our Process</Badge>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-6">
                How We Build Enterprise AI
              </h2>
              <p className="text-lg text-muted-foreground">
                A proven 5-step process to deliver production-ready AI systems.
              </p>
            </div>
          </AnimatedSection>

          {/* Process Flow */}
          <div className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-2">
              {buildProcess.map((item, idx) => (
                <AnimatedSection key={idx} delay={idx * 100}>
                  <div className="relative">
                    <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center font-bold mb-4 mx-auto">
                      {item.step}
                    </div>
                    <h3 className="font-bold text-center mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground text-center">{item.desc}</p>
                    {idx < buildProcess.length - 1 && (
                      <div className="hidden md:block absolute top-6 left-full w-4 h-0.5 bg-primary/20" />
                    )}
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>

          {/* Technologies */}
          <AnimatedSection>
            <div className="bg-secondary/50 rounded-2xl p-12 border border-border/50">
              <h3 className="text-2xl font-bold mb-8">Technologies We Use</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {technologies.map((tech, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center group cursor-pointer">
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{tech.icon}</div>
                    <p className="font-semibold text-sm">{tech.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* DIFFERENTIATION SECTION */}
      <section className="py-24 md:py-32 bg-[#1a1a1a] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-primary/10 to-transparent opacity-50 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-900/20 blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection className="mb-16">
            <div className="max-w-3xl">
              <Badge className="mb-4 bg-white/10 text-white border-white/20">Why Hyphen</Badge>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight">
                Why Hyphen Is Not Just Another AI Agency
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl">
            {differentiators.map((point, idx) => (
              <AnimatedSection key={idx} delay={idx * 100}>
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <p className="text-lg">{point}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF SECTION */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-16">
            <div className="max-w-3xl">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Social Proof</Badge>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-6">
                Trusted by Leading Organizations
              </h2>
              <p className="text-lg text-muted-foreground">
                See how Hyphen's AI solutions deliver measurable results.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((idx) => (
              <AnimatedSection key={idx} delay={idx * 100}>
                <div className="bg-secondary/50 rounded-2xl overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                  <div className="aspect-video bg-muted flex items-center justify-center">
                    <Image 
                      src="https://static.wixstatic.com/media/df2796_1b4436917d434f14971151ca09c0b401~mv2.png?originWidth=1600&originHeight=896" 
                      alt={`Project ${idx}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold mb-2">Enterprise Success Story {idx}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      "Hyphen's AI solution reduced our processing time by 80% and improved accuracy significantly."
                    </p>
                    <div className="flex items-center gap-2 text-xs font-semibold">
                      <BarChart3 className="w-4 h-4 text-primary" />
                      <span>+250% ROI in 6 months</span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* INSIGHTS & THOUGHT LEADERSHIP */}
      <section className="py-24 md:py-32 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-16">
            <div className="max-w-3xl">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Insights</Badge>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-6">
                AI Insights & Innovation
              </h2>
              <p className="text-lg text-muted-foreground">
                Stay updated with the latest in enterprise AI automation and implementation strategies.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {insights.map((insight, idx) => (
              <AnimatedSection key={idx} delay={idx * 100}>
                <Link to="/research" className="group block h-full">
                  <div className="bg-background rounded-2xl p-8 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg h-full flex flex-col">
                    <Lightbulb className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="font-bold mb-3 group-hover:text-primary transition-colors">
                      {insight.title}
                    </h3>
                    <p className="text-sm text-muted-foreground flex-grow mb-4">
                      {insight.desc}
                    </p>
                    <div className="flex items-center text-xs font-bold uppercase tracking-wider text-foreground group-hover:translate-x-1 transition-transform">
                      Read More <ArrowRight className="ml-1 w-3 h-3" />
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://static.wixstatic.com/media/df2796_78a7bd783ef741adaa680727a11bae81~mv2.png?originWidth=1600&originHeight=896" 
            alt="Abstract background" 
            className="w-full h-full object-cover blur-sm scale-110"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6 max-w-4xl mx-auto leading-tight">
              Ready to Build the Future with AI?
            </h2>
            <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto">
              Let's discuss how Hyphen can transform your business with enterprise-grade AI solutions.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-white text-black hover:bg-white/90 rounded-full px-8 py-6 text-lg"
                onClick={() => navigate('/contact')}
              >
                Get Custom AI Proposal
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="bg-transparent border-white/30 text-white hover:bg-white/10 rounded-full px-8 py-6 text-lg"
                onClick={() => navigate('/contact')}
              >
                Book Free Consultation
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
