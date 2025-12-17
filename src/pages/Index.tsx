import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { GraduationCap, Briefcase, HelpCircle, Users } from "lucide-react";
import CredUPILogo from "@/components/CredUPILogo";
import WaitlistModal from "@/components/WaitlistModal";
import { trackCTA1Click } from "@/lib/analytics";

const Index = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [disclaimerOpen, setDisclaimerOpen] = useState(false);
  const [waitlistCount, setWaitlistCount] = useState(2847);

  // Simulate waitlist count (in real app, fetch from API)
  useEffect(() => {
    const stored = localStorage.getItem("credupi_waitlist");
    if (stored) {
      const entries = JSON.parse(stored);
      setWaitlistCount(2847 + entries.length);
    }
  }, [modalOpen]);

  const handleCTA1Click = () => {
    trackCTA1Click();
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative max-w-lg mx-auto px-6 pt-8 pb-6">
          {/* Header with Logo */}
          <div className="flex items-center justify-center mb-8">
            <CredUPILogo />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-6">
            Build your credit score while paying with UPI
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8">
            Turn your everyday UPI payments into credit history. No credit card needed.
          </p>

          {/* How It Works - Compact Card Layout */}
          <div className="mb-0 p-6 bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50">
            <h2 className="text-lg font-semibold mb-4 text-center">How it works</h2>
            
            <div className="flex flex-col gap-3">
              {/* Step 1 */}
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl border border-primary/30 shadow-sm">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                  1
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">Get credit line</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Sanctioned instantly, no credit history needed</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-accent/20 to-primary/20 rounded-xl border border-accent/30 shadow-sm">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                  2
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">Use for UPI</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Pay with UPI anywhere, just like your regular payments</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl border border-primary/30 shadow-sm">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                  3
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">Score up</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Build your credit history and improve your score automatically</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="max-w-lg mx-auto px-6 pt-4 pb-8">
        <h2 className="text-xl font-bold mb-4">Perfect for you if you're:</h2>
        
        <div className="space-y-2 mb-4">
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
