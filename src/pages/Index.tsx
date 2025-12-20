import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { GraduationCap, Briefcase, HelpCircle, Users, Timer, QrCode, Gauge } from "lucide-react";
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
      const viewportHeight = window.innerHeight;
      
      // Use 65% of viewport height for the image
      const imageHeight = viewportHeight * 0.65;
      
      // Set max height
      setImageMaxHeight(imageHeight);
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
          <div className="mb-0 relative" style={{ maxHeight: imageMaxHeight ? `${imageMaxHeight}px` : 'none', overflow: 'hidden' }}>
            {/* Dark indigo/blue gradient background */}
            <div className="relative rounded-2xl p-4 md:p-6" style={{
              background: 'linear-gradient(to bottom right, #1e1b4b, #312e81, #1e1b4b)',
            }}>
              {/* Title */}
              <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-center text-white">How it works</h2>
            
              {/* Three cards stacked vertically */}
              <div className="flex flex-col gap-3 md:gap-4">
                {/* Card 1: Get Instant Credit */}
                <div className="relative rounded-xl p-[2px]" style={{
                  background: 'linear-gradient(to right, #3b82f6, #ec4899)',
                  boxShadow: '0 0 20px rgba(59, 130, 246, 0.5), 0 0 40px rgba(236, 72, 153, 0.3)'
                }}>
                  <div className="rounded-xl p-4 md:p-5" style={{
                    background: 'rgba(30, 27, 75, 0.7)'
                  }}>
                  <div className="flex flex-col items-center text-center">
                    {/* Stopwatch Icon with speed lines */}
                    <div className="relative mb-3 md:mb-4">
                      <div className="absolute -left-2 md:-left-3 top-1/2 -translate-y-1/2 flex gap-1 opacity-70">
                        <div className="w-1 h-4 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full" />
                        <div className="w-1 h-3 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full mt-1" />
                        <div className="w-1 h-5 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full" />
                      </div>
                      <div className="p-2 md:p-3 rounded-xl" style={{
                        background: 'linear-gradient(to bottom right, #8b5cf6, #60a5fa)',
                        boxShadow: '0 0 15px rgba(139, 92, 246, 0.6)'
                      }}>
                        <Timer className="w-6 h-6 md:w-8 md:h-8 text-white" />
                      </div>
                    </div>
                    <h3 className="text-sm md:text-base font-bold uppercase text-white mb-1 md:mb-2">Get Instant Credit</h3>
                    <p className="text-xs md:text-sm text-gray-300 leading-relaxed">Get credit in minutes, anytime!</p>
                  </div>
                  </div>
                </div>

                {/* Card 2: Use Credit For UPI */}
                <div className="relative rounded-xl p-[2px]" style={{
                  background: 'linear-gradient(to right, #3b82f6, #ec4899)',
                  boxShadow: '0 0 20px rgba(59, 130, 246, 0.5), 0 0 40px rgba(236, 72, 153, 0.3)'
                }}>
                  <div className="rounded-xl p-4 md:p-5" style={{
                    background: 'rgba(30, 27, 75, 0.7)'
                  }}>
                  <div className="flex flex-col items-center text-center">
                    {/* QR Code with UPI text and logo */}
                    <div className="mb-3 md:mb-4">
                      <div className="mb-1.5 flex items-center justify-center gap-1.5">
                        <span className="text-white text-xs md:text-sm font-semibold">UPI</span>
                        {/* Triangular logo with green, orange, red gradient */}
                        <div className="w-4 h-4 md:w-5 md:h-5 relative">
                          <svg className="w-full h-full" viewBox="0 0 12 12">
                            <defs>
                              <linearGradient id="upiLogo" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#22c55e" />
                                <stop offset="50%" stopColor="#f97316" />
                                <stop offset="100%" stopColor="#ef4444" />
                              </linearGradient>
                            </defs>
                            <path d="M 6 0 L 12 12 L 0 12 Z" fill="url(#upiLogo)" />
                          </svg>
                        </div>
                      </div>
                      <div className="p-2 md:p-3 rounded-xl bg-slate-900" style={{
                        boxShadow: '0 0 15px rgba(139, 92, 246, 0.6)'
                      }}>
                        <div className="w-6 h-6 md:w-8 md:h-8 relative mx-auto">
                          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
                            {/* QR code pattern - dark with purple/blue blocks */}
                            <rect x="10" y="10" width="20" height="20" fill="#8b5cf6" />
                            <rect x="10" y="40" width="20" height="10" fill="#3b82f6" />
                            <rect x="10" y="60" width="20" height="20" fill="#8b5cf6" />
                            <rect x="40" y="10" width="10" height="20" fill="#3b82f6" />
                            <rect x="40" y="40" width="20" height="20" fill="#8b5cf6" />
                            <rect x="40" y="70" width="20" height="10" fill="#3b82f6" />
                            <rect x="70" y="10" width="20" height="20" fill="#8b5cf6" />
                            <rect x="70" y="40" width="10" height="20" fill="#3b82f6" />
                            <rect x="70" y="70" width="20" height="20" fill="#8b5cf6" />
                            {/* Corner markers */}
                            <rect x="10" y="10" width="30" height="30" fill="none" stroke="#8b5cf6" strokeWidth="3" />
                            <rect x="60" y="10" width="30" height="30" fill="none" stroke="#3b82f6" strokeWidth="3" />
                            <rect x="10" y="60" width="30" height="30" fill="none" stroke="#8b5cf6" strokeWidth="3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-sm md:text-base font-bold uppercase text-white mb-1 md:mb-2">Use Credit For UPI</h3>
                    <p className="text-xs md:text-sm text-gray-300 leading-relaxed">Keep making UPI payments - on credit!</p>
                  </div>
                  </div>
                </div>

                {/* Card 3: Boost Your Credit Score */}
                <div className="relative rounded-xl p-[2px]" style={{
                  background: 'linear-gradient(to right, #3b82f6, #ec4899)',
                  boxShadow: '0 0 20px rgba(59, 130, 246, 0.5), 0 0 40px rgba(236, 72, 153, 0.3)'
                }}>
                  <div className="rounded-xl p-4 md:p-5" style={{
                    background: 'rgba(30, 27, 75, 0.7)'
                  }}>
                  <div className="flex flex-col items-center text-center">
                    {/* Gauge Icon with orange-yellow-green gradient and purple needle */}
                    <div className="relative mb-3 md:mb-4">
                      <div className="p-2 md:p-3 rounded-xl bg-slate-900 relative" style={{
                        boxShadow: '0 0 15px rgba(139, 92, 246, 0.6)'
                      }}>
                        <div className="relative w-6 h-6 md:w-8 md:h-8">
                          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                            <defs>
                              <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#f97316" />
                                <stop offset="50%" stopColor="#eab308" />
                                <stop offset="100%" stopColor="#22c55e" />
                              </linearGradient>
                            </defs>
                            {/* Gauge arc */}
                            <path
                              d="M 10,90 A 40,40 0 0,1 90,90"
                              fill="none"
                              stroke="url(#gaugeGradient)"
                              strokeWidth="8"
                              strokeLinecap="round"
                            />
                            {/* Purple needle pointing to green (right side) */}
                            <line
                              x1="50"
                              y1="50"
                              x2="80"
                              y2="25"
                              stroke="#a855f7"
                              strokeWidth="3"
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>
                        {/* Dark circular button with plus sign */}
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-slate-900 rounded-full flex items-center justify-center border-2 border-slate-700">
                          <span className="text-white text-[8px] md:text-xs font-bold">+</span>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-sm md:text-base font-bold uppercase text-white mb-1 md:mb-2">Boost Your Credit Score</h3>
                    <p className="text-xs md:text-sm text-gray-300 leading-relaxed">Keep paying through UPI - build your credit score!</p>
                  </div>
                  </div>
                </div>
              </div>
            </div>
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
