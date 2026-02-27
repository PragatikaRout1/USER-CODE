import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { ResearchUpdates } from '@/entities';
import { format } from 'date-fns';

export default function ResearchPage() {
  const [research, setResearch] = useState<ResearchUpdates[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadResearch();
  }, []);

  const loadResearch = async () => {
    try {
      const result = await BaseCrudService.getAll<ResearchUpdates>('researchupdates');
      setResearch(result.items);
    } catch (error) {
      console.error('Error loading research:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedElement>
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-6">
                Runway Research
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                We are building foundational General World Models that will be capable of simulating all possible worlds and experiences. The next frontier of intelligence will come from models that can understand, perceive, generate and act in the world.
              </p>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* Research Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="min-h-[500px]">
            {isLoading ? null : research.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {research.map((item, index) => (
                  <AnimatedElement key={item._id}>
                    <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] overflow-hidden border-border h-full flex flex-col">
                      {item.coverImage && (
                        <div className="relative h-64 overflow-hidden bg-muted">
                          <Image
                            src={item.coverImage}
                            alt={item.researchTitle || 'Research'}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            width={400}
                          />
                        </div>
                      )}
                      <CardContent className="p-6 flex-1 flex flex-col">
                        {item.publicationDate && (
                          <div className="flex items-center text-xs text-muted-foreground mb-3">
                            <Calendar className="h-3 w-3 mr-1" />
                            {format(new Date(item.publicationDate), 'MMMM d, yyyy')}
                          </div>
                        )}
                        <h3 className="text-xl font-heading font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                          {item.researchTitle}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 flex-1 line-clamp-4">
                          {item.abstract}
                        </p>
                        <Button asChild variant="outline" size="sm" className="group/btn w-full">
                          <Link to={`/research/${item._id}`}>
                            Read More
                            <ArrowRight className="ml-2 h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </AnimatedElement>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-lg text-muted-foreground">No research updates available at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Key Research Areas */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedElement>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                Our Research Focus
              </h2>
            </div>
          </AnimatedElement>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <AnimatedElement>
              <Card className="border-border hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                    GWM-1
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    A state-of-the-art General World Model built to interact with the real world. A major step towards universal simulation.
                  </p>
                  <Button asChild variant="link" className="p-0 h-auto">
                    <Link to="/research">Learn More</Link>
                  </Button>
                </CardContent>
              </Card>
            </AnimatedElement>

            <AnimatedElement>
              <Card className="border-border hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                    Gen-4.5
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    The world&apos;s best video model, featuring state-of-the-art motion quality, prompt adherence and visual fidelity.
                  </p>
                  <Button asChild variant="link" className="p-0 h-auto">
                    <Link to="/products">Explore Product</Link>
                  </Button>
                </CardContent>
              </Card>
            </AnimatedElement>

            <AnimatedElement>
              <Card className="border-border hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                    General World Models
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Our long-term research effort to build AI systems that understand the visual world and its dynamics.
                  </p>
                  <Button asChild variant="link" className="p-0 h-auto">
                    <Link to="/research">Learn More</Link>
                  </Button>
                </CardContent>
              </Card>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedElement>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
                Join our research team
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                We&apos;re looking for talented researchers, engineers, and scientists to help build the future of AI.
              </p>
              <Button asChild size="lg" className="group">
                <Link to="/company">
                  View Careers
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </AnimatedElement>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function AnimatedElement({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add('is-visible');
          observer.unobserve(element);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`opacity-0 translate-y-8 transition-all duration-700 ease-out ${className}`}
    >
      <style>{`
        .is-visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
      {children}
    </div>
  );
}
