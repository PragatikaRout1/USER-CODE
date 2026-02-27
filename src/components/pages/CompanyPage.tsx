import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Target, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { IndustryPartnerships, ApplicationAreas } from '@/entities';

export default function CompanyPage() {
  const [partnerships, setPartnerships] = useState<IndustryPartnerships[]>([]);
  const [applicationAreas, setApplicationAreas] = useState<ApplicationAreas[]>([]);
  const [isLoadingPartnerships, setIsLoadingPartnerships] = useState(true);
  const [isLoadingAreas, setIsLoadingAreas] = useState(true);

  useEffect(() => {
    loadPartnerships();
    loadApplicationAreas();
  }, []);

  const loadPartnerships = async () => {
    try {
      const result = await BaseCrudService.getAll<IndustryPartnerships>('industrypartnerships');
      setPartnerships(result.items);
    } catch (error) {
      console.error('Error loading partnerships:', error);
    } finally {
      setIsLoadingPartnerships(false);
    }
  };

  const loadApplicationAreas = async () => {
    try {
      const result = await BaseCrudService.getAll<ApplicationAreas>('applicationareas');
      setApplicationAreas(result.items);
    } catch (error) {
      console.error('Error loading application areas:', error);
    } finally {
      setIsLoadingAreas(false);
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
                Building the Future of AI
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                We are building AI to simulate the world through merging art and science. Join our global team of researchers, engineers, artists and designers.
              </p>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedElement>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Runway is developing advanced AI technologies to simulate various realities through generative models, focusing on media, robotics, and interactive worlds.
              </p>
            </div>
          </AnimatedElement>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <AnimatedElement>
              <Card className="border-border hover:shadow-lg transition-all duration-300 text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                    Innovation
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Pushing the boundaries of what&apos;s possible with AI and generative models.
                  </p>
                </CardContent>
              </Card>
            </AnimatedElement>

            <AnimatedElement>
              <Card className="border-border hover:shadow-lg transition-all duration-300 text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                    Collaboration
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Working with leading organizations to advance industries worldwide.
                  </p>
                </CardContent>
              </Card>
            </AnimatedElement>

            <AnimatedElement>
              <Card className="border-border hover:shadow-lg transition-all duration-300 text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lightbulb className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                    Research
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Building foundational models that understand and simulate the world.
                  </p>
                </CardContent>
              </Card>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Application Areas */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedElement>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                Application Areas
              </h2>
              <p className="text-lg text-muted-foreground">
                Our AI technologies are transforming industries across the globe.
              </p>
            </div>
          </AnimatedElement>

          <div className="min-h-[400px]">
            {isLoadingAreas ? null : applicationAreas.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {applicationAreas.map((area, index) => (
                  <AnimatedElement key={area._id}>
                    <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] overflow-hidden border-border h-full">
                      {area.illustration && (
                        <div className="relative h-48 overflow-hidden bg-muted">
                          <Image
                            src={area.illustration}
                            alt={area.areaName || 'Application Area'}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            width={400}
                          />
                        </div>
                      )}
                      <CardContent className="p-6">
                        <h3 className="text-2xl font-heading font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                          {area.areaName}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          {area.description}
                        </p>
                        {area.useCasesSummary && (
                          <p className="text-xs text-muted-foreground mb-4 italic">
                            {area.useCasesSummary}
                          </p>
                        )}
                        {area.learnMoreUrl && (
                          <Button asChild variant="link" className="p-0 h-auto group/btn">
                            <a href={area.learnMoreUrl} target="_blank" rel="noopener noreferrer">
                              Learn More
                              <ArrowRight className="ml-2 h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
                            </a>
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  </AnimatedElement>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Application areas information coming soon.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Partnerships */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedElement>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                Industry Partnerships
              </h2>
              <p className="text-lg text-muted-foreground">
                We partner with the world&apos;s leading organizations to advance their industries.
              </p>
            </div>
          </AnimatedElement>

          <div className="min-h-[400px]">
            {isLoadingPartnerships ? null : partnerships.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {partnerships.map((partner, index) => (
                  <AnimatedElement key={partner._id}>
                    <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] overflow-hidden border-border h-full flex flex-col">
                      {partner.companyLogo && (
                        <div className="relative h-32 overflow-hidden bg-muted flex items-center justify-center p-6">
                          <Image
                            src={partner.companyLogo}
                            alt={partner.partnerName || 'Partner'}
                            className="max-w-full h-auto max-h-20 object-contain"
                            width={200}
                          />
                        </div>
                      )}
                      <CardContent className="p-6 flex-1 flex flex-col">
                        <h3 className="text-xl font-heading font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {partner.partnerName}
                        </h3>
                        {partner.partnershipType && (
                          <p className="text-xs text-accent font-semibold mb-3">
                            {partner.partnershipType}
                          </p>
                        )}
                        <p className="text-sm text-muted-foreground mb-4 flex-1">
                          {partner.collaborationDescription}
                        </p>
                        {partner.partnerWebsite && (
                          <Button asChild variant="outline" size="sm" className="group/btn w-full">
                            <a href={partner.partnerWebsite} target="_blank" rel="noopener noreferrer">
                              Visit Website
                              <ArrowRight className="ml-2 h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
                            </a>
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  </AnimatedElement>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Partnership information coming soon.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedElement>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
                Join Our Team
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                We&apos;re looking for talented individuals to help us build the future of AI. Explore career opportunities at runwayml.com.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="group">
                  <Link to="/contact">
                    Get in Touch
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/research">View Our Research</Link>
                </Button>
              </div>
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
