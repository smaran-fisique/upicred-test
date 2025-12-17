const CredUPILogo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src="/logo-transparent.png?v=4" 
        alt="CredUPI" 
        className="h-8 w-auto"
        style={{ maxWidth: '100%' }}
        onError={(e) => {
          console.error('Logo failed to load:', e);
        }}
      />
    </div>
  );
};

export default CredUPILogo;
