import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle2 } from "lucide-react";
import { trackFormStep1, trackFormStep2, trackFormStep3, trackFormCompletion } from "@/lib/analytics";
import { submitToGoogleSheets } from "@/lib/googleSheets";

interface WaitlistModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const intentOptions = [
  "I want to get a credit card someday",
  "I want to take a loan in the future",
  "I just want to build my credit score",
  "I'm curious what this is about",
];

const userTypeOptions = [
  "Student",
  "Working professional",
  "Freelancer / Self-employed",
  "Other",
];

const WaitlistModal = ({ open, onOpenChange }: WaitlistModalProps) => {
  const [step, setStep] = useState(1);
  const [intent, setIntent] = useState("");
  const [userType, setUserType] = useState("");
  const [phone, setPhone] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);

  // Reset confetti when modal closes
  useEffect(() => {
    if (!open) {
      setShowConfetti(false);
    }
  }, [open]);

  // Track if we've already saved to prevent duplicates
  const hasBeenSavedRef = useRef(false);

  // Reset saved flag when modal opens
  useEffect(() => {
    if (open) {
      hasBeenSavedRef.current = false;
    }
  }, [open]);

  const handleStep1Next = () => {
    trackFormStep1(intent);
    // Just move to next step - data is cached, will save on modal close
    setStep(2);
  };

  const handleStep2Next = () => {
    trackFormStep2(userType);
    // Just move to next step - data is cached, will save on modal close
    setStep(3);
  };

  const handleSubmit = async () => {
    trackFormStep3(phone);
    trackFormCompletion({ intent, userType, phone });
    
    const entry = {
      intent,
      userType,
      phone: `+91${phone}`,
      timestamp: new Date().toISOString(),
    };
    
    // Mark as saved so it doesn't save again on modal close
    hasBeenSavedRef.current = true;
    
    // Submit to Google Sheets
    console.log('💾 Saving completed entry:', entry);
    await submitToGoogleSheets(entry);
    
    // Also store in localStorage as backup
    const existing = JSON.parse(localStorage.getItem("credupi_waitlist") || "[]");
    existing.push(entry);
    localStorage.setItem("credupi_waitlist", JSON.stringify(existing));
    
    setStep(4);
    setShowConfetti(true);
    // Hide confetti after animation
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const handleClose = (newOpenState: boolean) => {
    // Only save if modal is being closed (newOpenState is false and currently open)
    if (!newOpenState && open) {
      // Save partial entry if form wasn't completed and we haven't saved yet
      if (step !== 4 && !hasBeenSavedRef.current) {
        const currentIntent = intent || '';
        const currentUserType = userType || '';
        const currentPhone = phone ? `+91${phone}` : '';
        
        // Only save if there's meaningful data
        if (currentIntent || currentUserType || currentPhone) {
          hasBeenSavedRef.current = true; // Mark as saved to prevent duplicates
          
          const entry = {
            intent: currentIntent,
            userType: currentUserType,
            phone: currentPhone,
            timestamp: new Date().toISOString(),
          };
          
          console.log('💾 Saving partial entry on modal close:', entry);
          
          // Submit to Google Sheets (don't await - fire and forget)
          submitToGoogleSheets(entry).then(() => {
            // Also store in localStorage as backup
            const existing = JSON.parse(localStorage.getItem("credupi_waitlist") || "[]");
            existing.push(entry);
            localStorage.setItem("credupi_waitlist", JSON.stringify(existing));
          });
        }
      }
    }
    
    onOpenChange(newOpenState);
    // Reset after close animation
    if (!newOpenState) {
      setTimeout(() => {
        setStep(1);
        setIntent("");
        setUserType("");
        setPhone("");
      }, 300);
    }
  };

  const isPhoneValid = phone.length === 10 && /^\d+$/.test(phone);

  // Progress indicator component
  const ProgressIndicator = () => (
    <div className="flex items-center justify-center gap-2 mb-6">
      {[1, 2, 3].map((s) => (
        <div key={s} className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
              step > s
                ? "bg-primary text-primary-foreground"
                : step === s
                ? "bg-primary text-primary-foreground scale-110"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {step > s ? "✓" : s}
          </div>
          {s < 3 && (
            <div
              className={`w-8 h-0.5 transition-all ${
                step > s ? "bg-primary" : "bg-muted"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md relative overflow-hidden">
        {/* Confetti Animation */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none z-50">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: "-10px",
                  animationDelay: `${Math.random() * 0.5}s`,
                  animationDuration: `${2 + Math.random()}s`,
                }}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    i % 3 === 0
                      ? "bg-primary"
                      : i % 3 === 1
                      ? "bg-accent"
                      : "bg-primary/60"
                  }`}
                />
              </div>
            ))}
          </div>
        )}

        <ProgressIndicator />

        {step === 1 && (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">
                Why do you want to build credit? 🎯
              </DialogTitle>
            </DialogHeader>
            <RadioGroup value={intent} onValueChange={setIntent} className="space-y-3 mt-4">
              {intentOptions.map((option) => (
                <div key={option} className="flex items-center space-x-3 p-3 rounded-xl border border-border hover:bg-muted/50 transition-colors cursor-pointer">
                  <RadioGroupItem value={option} id={option} />
                  <Label htmlFor={option} className="flex-1 cursor-pointer text-sm">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            <Button
              onClick={handleStep1Next}
              disabled={!intent}
              className="w-full mt-6 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
            >
              Next
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">
                Tell us about yourself 👤
              </DialogTitle>
            </DialogHeader>
            <RadioGroup value={userType} onValueChange={setUserType} className="space-y-3 mt-4">
              {userTypeOptions.map((option) => (
                <div key={option} className="flex items-center space-x-3 p-3 rounded-xl border border-border hover:bg-muted/50 transition-colors cursor-pointer">
                  <RadioGroupItem value={option} id={option} />
                  <Label htmlFor={option} className="flex-1 cursor-pointer text-sm">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            <Button
              onClick={handleStep2Next}
              disabled={!userType}
              className="w-full mt-6 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
            >
              Next
            </Button>
          </>
        )}

        {step === 3 && (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">
                Almost there! 📱
              </DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center px-4 py-2 bg-muted rounded-xl text-sm font-medium">
                  +91
                </div>
                <Input
                  type="tel"
                  placeholder="10-digit mobile number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  className="flex-1 rounded-xl"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                We'll only use this to notify you when we launch.
              </p>
            </div>
            <Button
              onClick={handleSubmit}
              disabled={!isPhoneValid}
              className="w-full mt-6 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
            >
              Add to Waitlist
            </Button>
          </>
        )}

        {step === 4 && (
          <div className="text-center py-6 animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center animate-in zoom-in duration-500">
              <CheckCircle2 className="w-12 h-12 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              You're in! 🎉
            </h3>
            <p className="text-muted-foreground text-sm mb-1">
              We'll text you when we launch
            </p>
            <p className="text-xs text-muted-foreground mb-6">
              Get ready to build credit the smart way
            </p>
            <Button
              onClick={handleClose}
              className="mt-2 bg-gradient-to-r from-primary to-accent hover:opacity-90"
            >
              Awesome!
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default WaitlistModal;
