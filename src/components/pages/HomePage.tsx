// WI-HPI
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Play, 
  ChevronRight, 
  Box, 
  Cpu, 
  Globe, 
  MessageSquare, 
  Zap, 
  Layers, 
  Video, 
  Sparkles 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { AIProducts, ResearchUpdates, IndustryPartnerships } from '@/entities';

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
  const [research, setResearch] = useState<ResearchUpdates[]>([]);
  const [partnerships, setPartnerships] = useState<IndustryPartnerships[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch Data
  useEffect(() => {
    const loadData = async () => {
      try {
        const [productsData, researchData, partnershipsData] = await Promise.all([
          BaseCrudService.getAll<AIProducts>('aiproducts', [], { limit: 6 }),
          BaseCrudService.getAll<ResearchUpdates>('researchupdates', [], { limit: 4 }),
          BaseCrudService.getAll<IndustryPartnerships>('industrypartnerships', [], { limit: 8 })
        ]);
        
        setProducts(productsData.items);
        setResearch(researchData.items);
        setPartnerships(partnershipsData.items);
      } catch (error) {
        console.error('Failed to load homepage data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Static fallback data for visual structure if DB is empty (matches screenshot style)
  const modelCategories = [
    { name: 'Gen-4.5', icon: <Video className="w-4 h-4" />, status: 'New' },
    { name: 'Veo 3.1', icon: <Zap className="w-4 h-4" />, status: '' },
    { name: 'Nano Banana Pro', icon: <Cpu className="w-4 h-4" />, status: '' },
    { name: 'Kling 3.0', icon: <Layers className="w-4 h-4" />, status: '' },
    { name: 'Sora 2 Pro', icon: <Sparkles className="w-4 h-4" />, status: '' },
    { name: 'Claude Opus 4.6', icon: <MessageSquare className="w-4 h-4" />, status: '' },
    { name: 'GPT Image 1.5', icon: <Box className="w-4 h-4" />, status: '' },
    { name: 'WAN2.6 Pro', icon: <Globe className="w-4 h-4" />, status: 'Coming soon' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-paragraph overflow-x-hidden selection:bg-primary/20">
      <Header />

      {/* HERO SECTION - Cinematic Video/Image Background */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax Feel */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://static.wixstatic.com/media/df2796_b6b92f70abf046a588f5ffc1f72e677a~mv2.png?originWidth=1152&originHeight=576" 
            alt="Cinematic desert driving scene" 
            className="w-full h-full object-cover scale-105 animate-slow-zoom"
          />
          <div className="absolute inset-0 bg-black/30" /> {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-background" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
          <AnimatedSection animation="fade-up" delay={100}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-white mb-6 tracking-tight leading-[1.1]">
              Building AI to <br />
              <span className="text-white/90">Simulate the World</span>
            </h1>
          </AnimatedSection>
          
          <AnimatedSection animation="fade-up" delay={300}>
            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
              Advanced AI technologies to simulate various realities through generative models, focusing on media, robotics, and interactive worlds.
            </p>
          </AnimatedSection>

          <AnimatedSection animation="scale-up" delay={500}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-white text-black hover:bg-white/90 rounded-full px-8 py-6 text-lg font-medium transition-all duration-300 hover:scale-105"
                onClick={() => navigate('/signup')}
              >
                Get Started
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-transparent border-white/30 text-white hover:bg-white/10 rounded-full px-8 py-6 text-lg font-medium backdrop-blur-sm transition-all duration-300"
                onClick={() => navigate('/research')}
              >
                Read Research
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* MODEL TICKER / ICONS SECTION */}
      <section className="py-12 border-b border-border/40 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-8">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                Every model you need to make anything you want
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              {modelCategories.map((model, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 hover:border-primary/30 hover:bg-secondary transition-all duration-300 cursor-default group"
                >
                  <span className="text-muted-foreground group-hover:text-primary transition-colors">{model.icon}</span>
                  <span className="text-sm font-medium">{model.name}</span>
                  {model.status && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-sm bg-primary/10 text-primary font-bold uppercase tracking-wider">
                      {model.status}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* MISSION STATEMENT - Large Typography */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="max-w-5xl">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-medium leading-tight text-foreground">
                AI is changing how stories are told,
                <span className="text-muted-foreground"> how scientific progress is made and how the next frontiers of humanity are reached.</span>
              </h2>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FEATURED PRODUCTS GRID (Matches Screenshot "Gen-4.5", "GWM Robotics" etc) */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-96 bg-muted animate-pulse rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.slice(0, 4).map((product, idx) => (
                <AnimatedSection key={product._id} delay={idx * 100}>
                  <Link to={`/products/${product._id}`} className="block h-full group">
                    <div className="relative h-full flex flex-col">
                      <div className="relative aspect-[4/5] overflow-hidden rounded-xl mb-4 bg-muted">
                        <Image
                          src={product.productImage || "https://static.wixstatic.com/media/df2796_15b719c36d844d4abb6323aa1f8f7bbd~mv2.png?originWidth=768&originHeight=960"}
                          alt={product.productName || 'Product'}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                      </div>
                      <div className="flex flex-col flex-grow">
                        <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                          {product.productName}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-grow">
                          {product.shortDescription}
                        </p>
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

      {/* DARK FEATURE SECTION (GWM-1 Style) */}
      <section className="py-24 bg-[#1a1a1a] text-white relative overflow-hidden my-12">
        {/* Abstract Background Blur */}
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-primary/10 to-transparent opacity-50 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-900/20 blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection animation="fade-up">
              <div className="space-y-8">
                <Badge variant="outline" className="text-white border-white/20 bg-white/5 backdrop-blur-sm px-4 py-1">
                  Featured Research
                </Badge>
                <h2 className="text-4xl md:text-6xl font-heading font-bold leading-tight">
                  Introducing <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                    General World Models
                  </span>
                </h2>
                <p className="text-lg text-gray-400 max-w-xl leading-relaxed">
                  We are building foundational General World Models that will be capable of simulating all possible worlds and experiences. The next frontier of intelligence will come from models that can understand, perceive, generate and act in the world.
                </p>
                <Button 
                  className="bg-white text-black hover:bg-gray-200 rounded-full px-8"
                  onClick={() => navigate('/research')}
                >
                  Explore the Research
                </Button>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-in" delay={200}>
              <div className="space-y-6 border-l border-white/10 pl-8">
                {[
                  { title: 'GWM Worlds', desc: 'Interactive and Explorable World Models' },
                  { title: 'GWM Avatars', desc: 'Real-time Video Agents' },
                  { title: 'GWM Robotics', desc: 'General World Models for Robotics' }
                ].map((item, i) => (
                  <div key={i} className="group cursor-pointer">
                    <h3 className="text-xl font-bold mb-1 group-hover:text-blue-400 transition-colors flex items-center">
                      {item.title}
                      <ChevronRight className="w-4 h-4 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-2 transition-all" />
                    </h3>
                    <p className="text-gray-500 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* LATEST RESEARCH & PRODUCTS (Split Layouts) */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-16">
            <h2 className="text-3xl font-heading font-medium">Our latest Research and Products</h2>
          </AnimatedSection>

          <div className="space-y-24">
            {/* Item 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <AnimatedSection>
                <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/5">
                  <Image 
                    src="https://static.wixstatic.com/media/df2796_efe3e13ece744b80b3bfc9dfa12ecb03~mv2.png?originWidth=1152&originHeight=640" 
                    alt="GWM-1 Visualization" 
                    className="w-full aspect-video object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </AnimatedSection>
              <AnimatedSection delay={200}>
                <h3 className="text-3xl font-bold mb-4">Introducing GWM-1</h3>
                <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                  GWM-1 is our state-of-the-art General World Model, built to simulate reality in real time. Interactive, controllable and general-purpose.
                </p>
                <Button variant="outline" className="rounded-full" onClick={() => navigate('/research')}>
                  Read Paper
                </Button>
              </AnimatedSection>
            </div>

            {/* Item 2 (Reversed on desktop) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <AnimatedSection className="lg:order-2">
                <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/5">
                  <Image 
                    src="https://static.wixstatic.com/media/df2796_676944ddcfbf4cdd9ef1d87ef17b1dc2~mv2.png?originWidth=1152&originHeight=640" 
                    alt="Gen-4.5 Visualization" 
                    className="w-full aspect-video object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </AnimatedSection>
              <AnimatedSection delay={200} className="lg:order-1">
                <h3 className="text-3xl font-bold mb-4">Gen-4.5: A new frontier for video generation.</h3>
                <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                  Runway Gen-4.5 is the world's top-rated video model, offering unprecedented visual fidelity and creative control. It produces cinematic and highly realistic outputs.
                </p>
                <Button variant="outline" className="rounded-full" onClick={() => navigate('/products')}>
                  Try Gen-4.5
                </Button>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNERSHIPS / NEWS GRID */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12">
            <h2 className="text-3xl font-heading font-medium max-w-2xl">
              Runway is being used by the world's leading organizations across industries
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Dynamic Partnerships/News */}
            {partnerships.slice(0, 4).map((partner, idx) => (
              <AnimatedSection key={partner._id} delay={idx * 100}>
                <Link to={partner.partnerWebsite || '#'} className="group block bg-background rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full border border-border/50">
                  <div className="flex flex-col md:flex-row h-full">
                    <div className="md:w-2/5 h-48 md:h-auto relative overflow-hidden bg-muted">
                      <Image 
                        src={partner.companyLogo || "https://static.wixstatic.com/media/df2796_ba880c61e5ac4d66b48e518f08055a45~mv2.png?originWidth=512&originHeight=384"} 
                        alt={partner.partnerName || 'Partner'} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6 md:w-3/5 flex flex-col justify-center">
                      <h4 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                        {partner.partnerName}
                      </h4>
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                        {partner.collaborationDescription || "Partnering to advance creative tools and AI research."}
                      </p>
                      <div className="text-xs font-bold uppercase tracking-wider flex items-center mt-auto">
                        Read Story <ArrowRight className="ml-1 w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
            
            {/* Fallback if no partnerships loaded */}
            {!isLoading && partnerships.length === 0 && (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                Partnership news coming soon.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* LOGO STRIP (Static for visual completeness if no dynamic logos) */}
      <section className="py-12 border-t border-border/40">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Using text placeholders for logos to avoid broken images, styled to look like logos */}
            {['NVIDIA', 'LIONSGATE', 'GOOGLE', 'CBS', 'NEW BALANCE', 'PENTAGRAM'].map((logo, i) => (
              <span key={i} className="text-xl font-bold font-heading tracking-tighter">{logo}</span>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER CTA - Cinematic */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://static.wixstatic.com/media/df2796_cda922d58cc94bb1a42418b8b914ddb9~mv2.png?originWidth=1152&originHeight=576" 
            alt="Abstract background" 
            className="w-full h-full object-cover blur-sm scale-110"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6 max-w-4xl mx-auto leading-tight">
              We are building AI to simulate the world through merging art and science.
            </h2>
            <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto">
              Join our global team of researchers, engineers, artists and designers.
            </p>
            <Button 
              size="lg" 
              className="bg-white text-black hover:bg-white/90 rounded-full px-8 py-6 text-lg"
              onClick={() => navigate('/careers')}
            >
              See Careers
            </Button>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}