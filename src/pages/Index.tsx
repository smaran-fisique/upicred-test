import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { GraduationCap, Briefcase, HelpCircle, Users } from "lucide-react";
import CredUPILogo from "@/components/CredUPILogo";
import WaitlistModal from "@/components/WaitlistModal";
import { trackCTA1Click, trackPageView } from "@/lib/analytics";

const Index = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [disclaimerOpen, setDisclaimerOpen] = useState(false);
  const [waitlistCount, setWaitlistCount] = useState(2847);
  const [imageMaxHeight, setImageMaxHeight] = useState<number | null>(null);
  const heroSectionRef = useRef<HTMLDivElement>(null);

  // Simulate waitlist count (in real app, fetch from API)
  useEffect(() => {
    const stored = localStorage.getItem("credupi_waitlist");
    if (stored) {
      const entries = JSON.parse(stored);
      setWaitlistCount(2847 + entries.length);
    }
  }, [modalOpen]);

  // Track page view on mount
  useEffect(() => {
    trackPageView(window.location.pathname, 'CredUPI - Home');
  }, []);

  // Calculate available height for image to ensure it's visible above sticky CTA
  useEffect(() => {
    const calculateImageHeight = () => {
      if (!heroSectionRef.current) return;
      
      const viewportHeight = window.innerHeight;
      // Sticky CTA height: ~90px (py-3 + mb-2 + h-14 button + padding)
      const stickyCTAHeight = 90;
      
      // Measure actual header section height (logo + title + padding)
      const heroSection = heroSectionRef.current;
      const headerElements = heroSection.querySelectorAll('div:first-child, h1');
      let headerHeight = 0;
      headerElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        headerHeight += rect.height;
      });
      headerHeight += 40; // Add padding/margins
      
      // Description text below image: ~40px
      const descriptionHeight = 40;
      // Additional padding and margins: ~20px
      const padding = 20;
      
      // Calculate available height for the image
      const availableHeight = viewportHeight - stickyCTAHeight - headerHeight - descriptionHeight - padding;
      
      // Increase height by 40% more (total 96% increase from original)
      const increasedHeight = availableHeight * 1.96;
      
      // Set max height (with minimum of 250px to ensure visibility)
      setImageMaxHeight(Math.max(increasedHeight, 250));
    };

    // Calculate on mount and when window resizes
    calculateImageHeight();
    
    // Use ResizeObserver for more accurate measurements
    const resizeObserver = new ResizeObserver(calculateImageHeight);
    if (heroSectionRef.current) {
      resizeObserver.observe(heroSectionRef.current);
    }
    
    window.addEventListener('resize', calculateImageHeight);
    window.addEventListener('orientationchange', calculateImageHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', calculateImageHeight);
      window.removeEventListener('orientationchange', calculateImageHeight);
    };
  }, []);

  const handleCTA1Click = () => {
    trackCTA1Click();
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section ref={heroSectionRef} className="relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative max-w-lg mx-auto px-4 md:px-6 pt-6 md:pt-8 pb-4 md:pb-6">
          {/* Header with Logo */}
          <div className="flex items-center justify-center mb-4 md:mb-8">
            <CredUPILogo />
          </div>

          <h1 className="text-2xl md:text-4xl font-bold leading-tight mb-4 md:mb-6 text-center">
            Build your credit score while paying with UPI
          </h1>

          {/* How It Works - Infographic */}
          <div className="mb-0 relative overflow-hidden">
            <img 
              src="/images/how-it-works-infographic.png" 
              alt="How it works - Get Instant Credit, Use Credit For UPI, Boost Your Credit Score"
              className="w-full h-auto rounded-2xl"
              style={{
                maxHeight: imageMaxHeight ? `${imageMaxHeight}px` : 'none',
                objectFit: 'contain',
                objectPosition: 'top',
                display: 'block'
              }}
            />
          </div>

          <p className="text-sm md:text-lg text-muted-foreground mt-4 md:mt-6 mb-3 md:mb-4 text-center">
            Turn your everyday UPI payments into credit history. No credit card needed.
          </p>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="max-w-lg mx-auto px-4 md:px-6 pt-3 md:pt-4 pb-6 md:pb-8">
        <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-center">Perfect for you if you're:</h2>
        
        <div className="space-y-1.5 md:space-y-2 mb-3 md:mb-4">
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
            <GraduationCap className="w-5 h-5 text-primary shrink-0" />
            <span className="text-sm">A college student starting your credit journey</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
            <HelpCircle className="w-5 h-5 text-primary shrink-0" />
            <span className="text-sm">Someone with no credit history yet</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
            <Briefcase className="w-5 h-5 text-primary shrink-0" />
            <span className="text-sm">Planning your first loan or credit card</span>
          </div>
        </div>

        <p className="text-xs text-muted-foreground italic px-1">
          Already have a credit card? This might not be for you.
        </p>
      </section>

      {/* Footer */}
      <footer className="max-w-lg mx-auto px-6 pt-8 pb-32 border-t border-border/50">
        <div className="flex flex-col items-center gap-4">
          <CredUPILogo />
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <span>•</span>
            <button
              onClick={() => setDisclaimerOpen(true)}
              className="hover:text-foreground transition-colors cursor-pointer"
            >
              Legal Disclaimer
            </button>
          </div>
          
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} CredUPI • Made in India 🇮🇳
          </p>
        </div>
      </footer>

      {/* Legal Disclaimer Modal */}
      <Dialog open={disclaimerOpen} onOpenChange={setDisclaimerOpen}>
        <DialogContent className="sm:max-w-md mx-4 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Legal Disclaimer</DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-3">
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Important Notice:</strong> CredUPI is not a real company or application. 
              This website is a research project designed to gather insights on user interest through advertising.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              No actual credit products, services, or applications are being offered. This website is for market research purposes only.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              By using this website, you acknowledge that you understand this is a research project and not a real service offering.
            </p>
          </div>
          <Button
            onClick={() => setDisclaimerOpen(false)}
            className="w-full mt-6 bg-gradient-to-r from-primary to-accent hover:opacity-90"
          >
            Understood
          </Button>
        </DialogContent>
      </Dialog>

      {/* Waitlist Modal */}
      <WaitlistModal open={modalOpen} onOpenChange={setModalOpen} />

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t border-border/50 shadow-lg">
        <div className="max-w-lg mx-auto px-6 py-3">
          {/* Social Proof */}
          <div className="flex items-center justify-center gap-2 mb-2">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-primary">2 Lakh+ on the waitlist</span>
          </div>
          <Button
            onClick={handleCTA1Click}
            size="lg"
            className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity rounded-2xl shadow-lg shadow-primary/25 relative overflow-hidden"
          >
            <span className="relative z-10">Join Waitlist</span>
            <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
