import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { AIProducts } from '@/entities';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<AIProducts | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    try {
      const data = await BaseCrudService.getById<AIProducts>('aiproducts', id!);
      setProduct(data);
    } catch (error) {
      console.error('Error loading product:', error);
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
        ) : !product ? (
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">Product Not Found</h2>
            <p className="text-muted-foreground mb-8">The product you&apos;re looking for doesn&apos;t exist.</p>
            <Button asChild variant="outline">
              <Link to="/products">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Products
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
                    <Link to="/products">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Products
                    </Link>
                  </Button>
                </AnimatedElement>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <AnimatedElement>
                    <div>
                      <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-6">
                        {product.productName}
                      </h1>
                      <p className="text-lg md:text-xl text-muted-foreground mb-8">
                        {product.shortDescription}
                      </p>
                      <Button asChild size="lg" className="group">
                        <Link to="/contact">
                          Get Started
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                  </AnimatedElement>

                  {product.productImage && (
                    <AnimatedElement>
                      <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                        <Image
                          src={product.productImage}
                          alt={product.productName || 'Product'}
                          className="w-full h-auto"
                          width={600}
                        />
                      </div>
                    </AnimatedElement>
                  )}
                </div>
              </div>
            </section>

            {/* Detailed Capabilities */}
            {product.detailedCapabilities && (
              <section className="py-20 bg-background">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                  <AnimatedElement>
                    <div className="max-w-4xl mx-auto">
                      <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-8">
                        Capabilities
                      </h2>
                      <div className="prose prose-lg max-w-none">
                        <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                          {product.detailedCapabilities}
                        </p>
                      </div>
                    </div>
                  </AnimatedElement>
                </div>
              </section>
            )}

            {/* Use Cases */}
            {product.useCases && (
              <section className="py-20 bg-muted/30">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                  <AnimatedElement>
                    <div className="max-w-4xl mx-auto">
                      <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-8">
                        Use Cases
                      </h2>
                      <Card className="border-border">
                        <CardContent className="p-8">
                          <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                            {product.useCases}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </AnimatedElement>
                </div>
              </section>
            )}

            {/* Video Preview */}
            {product.videoPreviewUrl && (
              <section className="py-20 bg-background">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                  <AnimatedElement>
                    <div className="max-w-4xl mx-auto">
                      <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-8">
                        Video Preview
                      </h2>
                      <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl bg-muted">
                        <iframe
                          src={product.videoPreviewUrl}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
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
                      Ready to experience {product.productName}?
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8">
                      Contact our team to learn more about how this product can transform your workflow.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button asChild size="lg" className="group">
                        <Link to="/contact">
                          Contact Sales
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                      <Button asChild variant="outline" size="lg">
                        <Link to="/products">View All Products</Link>
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
