import { useState, useRef, useEffect } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitSuccess(true);
    setFormData({ name: '', email: '', company: '', message: '' });

    // Reset success message after 5 seconds
    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
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
                Get in Touch
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Contact our team to learn more about how runwayml.com can transform your workflow with advanced AI technologies.
              </p>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <AnimatedElement>
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6">
                  Contact Information
                </h2>
                <p className="text-muted-foreground mb-8">
                  Reach out to us for enterprise solutions, partnerships, or general inquiries.
                </p>

                <div className="space-y-6">
                  <Card className="border-border hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <Mail className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-heading font-semibold text-foreground mb-1">Email</h3>
                          <p className="text-sm text-muted-foreground">contact@runwayml.com</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-border hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <Phone className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <h3 className="font-heading font-semibold text-foreground mb-1">Phone</h3>
                          <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-border hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <MapPin className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-heading font-semibold text-foreground mb-1">Location</h3>
                          <p className="text-sm text-muted-foreground">San Francisco, CA</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </AnimatedElement>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <AnimatedElement>
                <Card className="border-border shadow-xl">
                  <CardContent className="p-8">
                    <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6">
                      Send us a Message
                    </h2>

                    {submitSuccess && (
                      <div className="mb-6 p-4 bg-accent/10 border border-accent rounded-lg">
                        <p className="text-accent font-medium">
                          Thank you for your message! We&apos;ll get back to you soon.
                        </p>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="name" className="text-foreground mb-2 block">
                            Name *
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your name"
                            className="w-full"
                          />
                        </div>

                        <div>
                          <Label htmlFor="email" className="text-foreground mb-2 block">
                            Email *
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="your@email.com"
                            className="w-full"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="company" className="text-foreground mb-2 block">
                          Company
                        </Label>
                        <Input
                          id="company"
                          name="company"
                          type="text"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Your company name"
                          className="w-full"
                        />
                      </div>

                      <div>
                        <Label htmlFor="message" className="text-foreground mb-2 block">
                          Message *
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          required
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell us about your project or inquiry..."
                          rows={6}
                          className="w-full resize-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="w-full group"
                      >
                        {isSubmitting ? (
                          'Sending...'
                        ) : (
                          <>
                            Send Message
                            <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </AnimatedElement>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedElement>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
                Enterprise Solutions
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Looking for custom AI solutions for your organization? Our enterprise team is ready to help you integrate cutting-edge AI technologies into your workflow.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-border hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <h3 className="font-heading font-bold text-foreground mb-2">Custom Solutions</h3>
                    <p className="text-sm text-muted-foreground">
                      Tailored AI implementations for your specific needs
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-border hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <h3 className="font-heading font-bold text-foreground mb-2">Dedicated Support</h3>
                    <p className="text-sm text-muted-foreground">
                      24/7 technical support and consultation
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-border hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <h3 className="font-heading font-bold text-foreground mb-2">Training & Onboarding</h3>
                    <p className="text-sm text-muted-foreground">
                      Comprehensive training for your team
                    </p>
                  </CardContent>
                </Card>
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
