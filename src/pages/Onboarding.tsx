import { useState } from "react";
import { CloudProviderCard } from "@/components/CloudProviderCard";
import { SignUpForm } from "@/components/SignUpForm";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import {
  Cloud,
  Shield,
  Zap,
  CheckCircle,
  ArrowRight,
  Database,
  BarChart3,
  Users,
  Lock,
} from "lucide-react";

const cloudProviders = [
  {
    name: "Amazon Web Services",
    description: "Connect your AWS accounts for comprehensive cloud management and cost optimization.",
    variant: "aws" as const,
    icon: <Cloud className="h-6 w-6 text-aws" />,
  },
  {
    name: "Microsoft Azure",
    description: "Integrate Azure subscriptions for unified cloud governance and security monitoring.",
    variant: "azure" as const,
    icon: <Database className="h-6 w-6 text-azure" />,
  },
  {
    name: "Google Cloud Platform",
    description: "Connect GCP projects for automated compliance and resource optimization.",
    variant: "gcp" as const,
    icon: <BarChart3 className="h-6 w-6 text-gcp" />,
  },
  {
    name: "Oracle Cloud",
    description: "Integrate OCI tenancies for enterprise-grade cloud management and analytics.",
    variant: "oracle" as const,
    icon: <Shield className="h-6 w-6 text-oracle" />,
  },
];

export default function Onboarding() {
  const [step, setStep] = useState<"signup" | "providers" | "complete">("signup");
  const [connectedProviders, setConnectedProviders] = useState<string[]>([]);
  const [userInfo, setUserInfo] = useState<any>(null);
  const { toast } = useToast();

  const handleSignUp = (data: any) => {
    setUserInfo(data);
    setStep("providers");
  };

  const handleProviderConnect = (providerName: string) => {
    setConnectedProviders(prev => [...prev, providerName]);
    toast({
      title: `${providerName} Connected!`,
      description: "Successfully connected your cloud account.",
    });
  };

  const handleComplete = () => {
    setStep("complete");
    toast({
      title: "Setup Complete!",
      description: "Your AlterPilot platform is ready to use.",
    });
  };

  const getProgress = () => {
    if (step === "signup") return 0;
    if (step === "providers") return 50 + (connectedProviders.length / cloudProviders.length) * 40;
    return 100;
  };

  if (step === "signup") {
    return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-40"></div>
      <div className="absolute inset-0 bg-gradient-cloud"></div>
      
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8">
          {/* Progress Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Step 1 of 3</span>
              <span className="text-sm text-muted-foreground">Account Setup</span>
            </div>
            <Progress value={getProgress()} className="h-2" />
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-3 rounded-full bg-gradient-primary mb-6">
              <Cloud className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
              Welcome to AtlerPilot
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your unified cloud management platform for AWS, Azure, GCP, and Oracle Cloud.
              Get started with enterprise-grade security, compliance, and cost optimization.
            </p>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center p-3 rounded-full bg-gradient-card shadow-soft mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Enterprise Security</h3>
              <p className="text-sm text-muted-foreground">
                Advanced security monitoring and compliance across all your cloud accounts
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center p-3 rounded-full bg-gradient-card shadow-soft mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Cost Optimization</h3>
              <p className="text-sm text-muted-foreground">
                Intelligent recommendations to reduce cloud costs by up to 30%
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center p-3 rounded-full bg-gradient-card shadow-soft mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Team Collaboration</h3>
              <p className="text-sm text-muted-foreground">
                Centralized dashboard for teams to manage cloud resources together
              </p>
            </div>
          </div>

          {/* Sign Up Form */}
          <div className="flex justify-center">
            <SignUpForm onSignUp={handleSignUp} />
          </div>

          {/* Trust Indicators */}
          <div className="text-center mt-12">
            <p className="text-sm text-muted-foreground mb-4">Trusted by 500+ enterprises worldwide</p>
            <div className="flex items-center justify-center space-x-6">
              <Badge variant="secondary" className="bg-gradient-card">
                <Lock className="h-3 w-3 mr-1" />
                SOC 2 Compliant
              </Badge>
              <Badge variant="secondary" className="bg-gradient-card">
                <Shield className="h-3 w-3 mr-1" />
                GDPR Ready
              </Badge>
              <Badge variant="secondary" className="bg-gradient-card">
                <CheckCircle className="h-3 w-3 mr-1" />
                99.9% Uptime
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }

  if (step === "providers") {
    return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-40"></div>
      <div className="absolute inset-0 bg-gradient-cloud"></div>
      
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8">
          {/* Progress Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Step 2 of 3</span>
              <span className="text-sm text-muted-foreground">Connect Providers</span>
            </div>
            <Progress value={getProgress()} className="h-2" />
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">
              Welcome, {userInfo?.firstName}! 👋
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect your cloud providers to start managing your infrastructure.
              You can always add more providers later.
            </p>
          </div>

          {/* Provider Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
            {cloudProviders.map((provider) => (
              <CloudProviderCard
                key={provider.name}
                {...provider}
                isConnected={connectedProviders.includes(provider.name)}
                onConnect={() => handleProviderConnect(provider.name)}
                onConfigure={() => toast({ title: `Configure ${provider.name}`, description: "Configuration panel would open here." })}
              />
            ))}
          </div>

          {/* Continue Button */}
          <div className="text-center">
            <Button
              variant="hero"
              size="xl"
              onClick={handleComplete}
              disabled={connectedProviders.length === 0}
            >
              {connectedProviders.length === 0 ? "Connect at least one provider" : "Continue to Dashboard"}
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Connected: {connectedProviders.length} / {cloudProviders.length} providers
            </p>
          </div>
        </div>
      </div>
    </div>
    );
  }

  // Completion step
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-40"></div>
      <div className="absolute inset-0 bg-gradient-cloud"></div>
      
      <div className="relative z-10 text-center max-w-2xl mx-auto px-4">
        <div className="inline-flex items-center justify-center p-6 rounded-full bg-gradient-primary mb-8">
          <CheckCircle className="h-12 w-12 text-white" />
        </div>
        
        <h1 className="text-4xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
          You're All Set! 🎉
        </h1>
        
        <p className="text-xl text-muted-foreground mb-8">
          Your AtlerPilot platform is configured and ready to use.
          Start exploring your unified cloud dashboard.
        </p>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="p-4 rounded-lg bg-gradient-card shadow-soft">
            <h3 className="font-semibold mb-2">Connected Providers</h3>
            <p className="text-2xl font-bold text-primary">{connectedProviders.length}</p>
          </div>
          <div className="p-4 rounded-lg bg-gradient-card shadow-soft">
            <h3 className="font-semibold mb-2">Security Score</h3>
            <p className="text-2xl font-bold text-primary">A+</p>
          </div>
          <div className="p-4 rounded-lg bg-gradient-card shadow-soft">
            <h3 className="font-semibold mb-2">Cost Savings</h3>
            <p className="text-2xl font-bold text-primary">30%</p>
          </div>
        </div>

        <Button variant="hero" size="xl" onClick={() => window.location.href = '/dashboard'}>
          Open Dashboard
          <ArrowRight className="h-5 w-5 ml-2" />
        </Button>
      </div>
    </div>
  );
}