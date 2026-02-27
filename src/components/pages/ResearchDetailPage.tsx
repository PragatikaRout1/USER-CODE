import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { ResearchUpdates } from '@/entities';
import { format } from 'date-fns';

export default function ResearchDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [research, setResearch] = useState<ResearchUpdates | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadResearch();
    }
  }, [id]);

  const loadResearch = async () => {
    try {
      const data = await BaseCrudService.getById<ResearchUpdates>('researchupdates', id!);
      setResearch(data);
    } catch (error) {
      console.error('Error loading research:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="min-h-[600px]">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <LoadingSpinner />
          </div>
        ) : !research ? (
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">Research Not Found</h2>
            <p className="text-muted-foreground mb-8">The research article you&apos;re looking for doesn&apos;t exist.</p>
            <Button asChild variant="outline">
              <Link to="/research">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Research
              </Link>
            </Button>
          </div>
        ) : (
          <>
            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
              <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedElement>
                  <Button asChild variant="ghost" size="sm" className="mb-6">
                    <Link to="/research">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Research
                    </Link>
                  </Button>
                </AnimatedElement>

                <div className="max-w-4xl mx-auto">
                  <AnimatedElement>
                    {research.publicationDate && (
                      <div className="flex items-center text-sm text-muted-foreground mb-4">
                        <Calendar className="h-4 w-4 mr-2" />
                        {format(new Date(research.publicationDate), 'MMMM d, yyyy')}
                      </div>
                    )}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-6">
                      {research.researchTitle}
                    </h1>
                  </AnimatedElement>

                  {research.coverImage && (
                    <AnimatedElement>
                      <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-8">
                        <Image
                          src={research.coverImage}
                          alt={research.researchTitle || 'Research'}
                          className="w-full h-auto"
                          width={800}
                        />
                      </div>
                    </AnimatedElement>
                  )}
                </div>
              </div>
            </section>

            {/* Abstract */}
            {research.abstract && (
              <section className="py-20 bg-background">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                  <AnimatedElement>
                    <div className="max-w-4xl mx-auto">
                      <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-8">
                        Abstract
                      </h2>
                      <div className="prose prose-lg max-w-none">
                        <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                          {research.abstract}
                        </p>
                      </div>
                    </div>
                  </AnimatedElement>
                </div>
              </section>
            )}

            {/* Full Article Content */}
            {research.fullArticleContent && (
              <section className="py-20 bg-muted/30">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                  <AnimatedElement>
                    <div className="max-w-4xl mx-auto">
                      <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-8">
                        Full Article
                      </h2>
                      <div className="prose prose-lg max-w-none bg-background rounded-2xl p-8 shadow-lg border border-border">
                        <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                          {research.fullArticleContent}
                        </p>
                      </div>
                    </div>
                  </AnimatedElement>
                </div>
              </section>
            )}

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-accent/10">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedElement>
                  <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
                      Interested in our research?
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8">
                      Explore more of our groundbreaking work in AI and world simulation.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button asChild size="lg">
                        <Link to="/research">View All Research</Link>
                      </Button>
                      <Button asChild variant="outline" size="lg">
                        <Link to="/company">Join Our Team</Link>
                      </Button>
                    </div>
                  </div>
                </AnimatedElement>
              </div>
            </section>
          </>
        )}
      </div>

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
