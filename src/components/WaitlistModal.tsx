import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle2 } from "lucide-react";

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

  const handleSubmit = () => {
    const entry = {
      intent,
      userType,
      phone: `+91${phone}`,
      timestamp: new Date().toISOString(),
    };
    
    // Store in localStorage
    const existing = JSON.parse(localStorage.getItem("credupi_waitlist") || "[]");
    existing.push(entry);
    localStorage.setItem("credupi_waitlist", JSON.stringify(existing));
    
    setStep(4);
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset after close animation
    setTimeout(() => {
      setStep(1);
      setIntent("");
      setUserType("");
      setPhone("");
    }, 300);
  };

  const isPhoneValid = phone.length === 10 && /^\d+$/.test(phone);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md mx-4 rounded-2xl">
        {step === 1 && (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">
                Why do you want to build a credit score?
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
              onClick={() => setStep(2)}
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
                Tell us about yourself
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
              onClick={() => setStep(3)}
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
                Enter your phone number
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
          <div className="text-center py-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">You're on the list! 🎉</h3>
            <p className="text-muted-foreground text-sm">
              We'll text you when CredUPI is ready. Thanks for your interest!
            </p>
            <Button
              onClick={handleClose}
              variant="outline"
              className="mt-6"
            >
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default WaitlistModal;
