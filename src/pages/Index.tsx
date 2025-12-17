import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CreditCard, Smartphone, TrendingUp, GraduationCap, Briefcase, HelpCircle, ArrowRight, CheckCircle2, Users, Award } from "lucide-react";
import CredUPILogo from "@/components/CredUPILogo";
import WaitlistModal from "@/components/WaitlistModal";
import { trackCTA1Click, trackCTA2Click } from "@/lib/analytics";

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

  const handleCTA2Click = () => {
    trackCTA2Click();
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative max-w-lg mx-auto px-6 pt-8 pb-12">
          <CredUPILogo className="mb-8" />
          
          {/* Social Proof */}
          <div className="flex items-center justify-center gap-2 mb-6 px-4 py-2 bg-primary/10 rounded-full w-fit mx-auto">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">{waitlistCount.toLocaleString()}+ already joined</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-6">
            Build credit while you pay with UPI 💳
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8">
            Turn your everyday UPI payments into credit history. No credit card needed.
          </p>

          {/* How It Works - Horizontal Flow */}
          <div className="mb-8 p-6 bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50">
            <h2 className="text-lg font-semibold mb-6 text-center">How it works</h2>
            
            <div className="flex items-start justify-between gap-2 max-w-full overflow-x-auto">
              {/* Step 1 */}
              <div className="flex flex-col items-center flex-1 min-w-0">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mb-3 shadow-md shrink-0">
                  <CreditCard className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="text-center">
                  <p className="text-xs font-semibold mb-1">Get credit line</p>
                  <p className="text-[10px] text-muted-foreground">Sanctioned first</p>
                </div>
              </div>

              {/* Arrow */}
              <ArrowRight className="w-5 h-5 text-muted-foreground shrink-0 mt-6" />

              {/* Step 2 */}
              <div className="flex flex-col items-center flex-1 min-w-0">
                <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center mb-3 shadow-md shrink-0">
                  <Smartphone className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="text-center">
                  <p className="text-xs font-semibold mb-1">Use for UPI</p>
                  <p className="text-[10px] text-muted-foreground">Pay as usual</p>
                </div>
              </div>

              {/* Arrow */}
              <ArrowRight className="w-5 h-5 text-muted-foreground shrink-0 mt-6" />

              {/* Step 3 */}
              <div className="flex flex-col items-center flex-1 min-w-0">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mb-3 shadow-md shrink-0">
                  <Award className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="text-center">
                  <p className="text-xs font-semibold mb-1">Pay on time</p>
                  <p className="text-[10px] text-muted-foreground">Get rewarded</p>
                </div>
              </div>

              {/* Arrow */}
              <ArrowRight className="w-5 h-5 text-muted-foreground shrink-0 mt-6" />

              {/* Step 4 */}
              <div className="flex flex-col items-center flex-1 min-w-0">
                <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center mb-3 shadow-md shrink-0">
                  <TrendingUp className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="text-center">
                  <p className="text-xs font-semibold mb-1">Score up</p>
                  <p className="text-[10px] text-muted-foreground">Build history</p>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="space-y-3 mb-6">
            <div className="flex items-start gap-3 p-4 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1 text-sm">Start small, build smart</h3>
                <p className="text-xs text-muted-foreground">Low-amount credit line perfect for first-timers</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1 text-sm">Use UPI like normal</h3>
                <p className="text-xs text-muted-foreground">On-time repayments boost your credit score automatically</p>
              </div>
            </div>
          </div>

          {/* Trust Signals */}
          <div className="mb-6 space-y-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>No hidden fees</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>Partner NBFCs • Subject to eligibility</span>
            </div>
          </div>

          {/* Primary CTA */}
          <Button
            onClick={handleCTA1Click}
            size="lg"
            className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity rounded-2xl shadow-lg shadow-primary/25"
          >
            Join Waitlist
          </Button>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="max-w-lg mx-auto px-6 py-8">
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

      {/* Repeat CTA */}
      <section className="max-w-lg mx-auto px-6 py-8">
        <div className="text-center p-6 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl border border-border/50">
          <h3 className="text-lg font-semibold mb-3">Ready to start building?</h3>
          <p className="text-sm text-muted-foreground mb-4">Join {waitlistCount.toLocaleString()}+ others on the waitlist</p>
          <Button
            onClick={handleCTA2Click}
            size="lg"
            className="h-12 px-8 font-semibold bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity rounded-xl"
          >
            Join Waitlist
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-lg mx-auto px-6 py-8 border-t border-border/50">
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
    </div>
  );
};

export default Index;
