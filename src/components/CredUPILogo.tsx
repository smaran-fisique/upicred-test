import { CreditCard } from "lucide-react";

const CredUPILogo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
        <CreditCard className="w-5 h-5 text-primary-foreground" />
        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-accent rounded-full border-2 border-background" />
      </div>
      <span className="font-bold text-xl tracking-tight">CredUPI</span>
    </div>
  );
};

export default CredUPILogo;
