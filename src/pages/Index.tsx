import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CreditCard, Smartphone, TrendingUp, GraduationCap, Briefcase, HelpCircle } from "lucide-react";
import CredUPILogo from "@/components/CredUPILogo";
import WaitlistModal from "@/components/WaitlistModal";

const Index = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative max-w-lg mx-auto px-6 pt-8 pb-12">
          <CredUPILogo className="mb-12" />
          
          <h1 className="text-2xl md:text-3xl font-bold leading-tight mb-8 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
            Improve your credit score through everyday UPI payments
          </h1>

          {/* Feature Cards */}
          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-4 p-4 bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shrink-0">
                <CreditCard className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Start with a small starter credit</h3>
                <p className="text-sm text-muted-foreground">Get access to a low-amount credit line designed for first-time credit users.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50">
              <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-xl flex items-center justify-center shrink-0">
                <Smartphone className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Build credit score through UPI payments</h3>
                <p className="text-sm text-muted-foreground">Use UPI as usual. On-time re-payments help improving your credit score every time</p>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-muted-foreground mb-8 leading-relaxed">
            CredUPI is a credit-building platform. We do not provide loans directly. Credit products are offered by our partner NBFCs. Subject to eligibility and approval.
          </p>

          {/* Primary CTA */}
          <Button
            onClick={() => setModalOpen(true)}
            size="lg"
            className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity rounded-2xl shadow-lg shadow-primary/25"
          >
            Join Waitlist
          </Button>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="max-w-lg mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-6">Who this is for</h2>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
            <GraduationCap className="w-5 h-5 text-primary" />
            <span className="text-sm">College students ready to start their credit journey</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
            <HelpCircle className="w-5 h-5 text-primary" />
            <span className="text-sm">People with no credit history or score</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
            <Briefcase className="w-5 h-5 text-primary" />
            <span className="text-sm">Young professionals planning their first loan or credit card</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span className="text-sm">Anyone who wants to build credit the smart way</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground italic">
          Not for you if you already have a credit card or active loan.
        </p>
      </section>

      {/* Repeat CTA */}
      <section className="max-w-lg mx-auto px-6 py-12">
        <div className="text-center p-8 bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl border border-border/50">
          <h3 className="text-xl font-semibold mb-4">Ready to build your credit?</h3>
          <Button
            onClick={() => setModalOpen(true)}
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
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} CredUPI • Made in India 🇮🇳
          </p>
        </div>
      </footer>

      {/* Waitlist Modal */}
      <WaitlistModal open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  );
};

export default Index;
