import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  Cloud,
  Shield,
  Zap,
  BarChart3,
  Users,
  CheckCircle,
  ArrowRight,
  Lock,
  Globe,
  TrendingUp,
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-30"></div>
      <div className="absolute inset-0 bg-gradient-cloud"></div>
      
      {/* Header */}
      <header className="relative z-10 container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-lg bg-gradient-primary">
              <Cloud className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              CloudSync CMP
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="bg-gradient-card">
              <Lock className="h-3 w-3 mr-1" />
              Enterprise Ready
            </Badge>
            <Button variant="outline" size="sm">
              Sign In
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-6 bg-gradient-card border-primary/20" variant="outline">
            <Zap className="h-3 w-3 mr-1" />
            Multi-Cloud Management Platform
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent leading-tight">
            Unified Cloud Management
            <br />
            <span className="text-foreground">Across All Providers</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Connect AWS, Azure, GCP, and Oracle Cloud in one powerful platform. 
            Get enterprise-grade security, cost optimization, and compliance monitoring.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link to="/onboarding">
              <Button variant="hero" size="xl" className="group">
                Get Started Free
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button variant="outline" size="xl">
              <Globe className="h-5 w-5 mr-2" />
              View Demo
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2 text-primary" />
              Free 14-day trial
            </div>
            <div className="flex items-center">
              <Shield className="h-4 w-4 mr-2 text-primary" />
              SOC 2 Compliant
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2 text-primary" />
              500+ Enterprises
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything you need to manage
            <span className="bg-gradient-hero bg-clip-text text-transparent"> multi-cloud infrastructure</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive tools for security, compliance, cost optimization, and team collaboration
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Feature 1 */}
          <div className="p-6 rounded-xl bg-gradient-card shadow-soft border border-border/50 hover:shadow-medium transition-all duration-300 group">
            <div className="inline-flex items-center justify-center p-3 rounded-lg bg-gradient-primary mb-4 group-hover:scale-110 transition-transform">
              <Cloud className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Multi-Cloud Discovery</h3>
            <p className="text-muted-foreground">
              Automatically discover and inventory resources across AWS, Azure, GCP, and Oracle Cloud with real-time synchronization.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 rounded-xl bg-gradient-card shadow-soft border border-border/50 hover:shadow-medium transition-all duration-300 group">
            <div className="inline-flex items-center justify-center p-3 rounded-lg bg-gradient-primary mb-4 group-hover:scale-110 transition-transform">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Security & Compliance</h3>
            <p className="text-muted-foreground">
              Continuous security monitoring, compliance benchmarks, and automated remediation for SOC 2, GDPR, and HIPAA.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 rounded-xl bg-gradient-card shadow-soft border border-border/50 hover:shadow-medium transition-all duration-300 group">
            <div className="inline-flex items-center justify-center p-3 rounded-lg bg-gradient-primary mb-4 group-hover:scale-110 transition-transform">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Cost Optimization</h3>
            <p className="text-muted-foreground">
              AI-powered recommendations to reduce cloud spend by up to 30% with detailed cost analytics and forecasting.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="p-6 rounded-xl bg-gradient-card shadow-soft border border-border/50 hover:shadow-medium transition-all duration-300 group">
            <div className="inline-flex items-center justify-center p-3 rounded-lg bg-gradient-primary mb-4 group-hover:scale-110 transition-transform">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Advanced Analytics</h3>
            <p className="text-muted-foreground">
              Comprehensive dashboards and reports with custom queries, alerts, and integration with popular BI tools.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="p-6 rounded-xl bg-gradient-card shadow-soft border border-border/50 hover:shadow-medium transition-all duration-300 group">
            <div className="inline-flex items-center justify-center p-3 rounded-lg bg-gradient-primary mb-4 group-hover:scale-110 transition-transform">
              <Users className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Team Collaboration</h3>
            <p className="text-muted-foreground">
              Role-based access control, shared dashboards, and team workspaces for seamless collaboration across teams.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="p-6 rounded-xl bg-gradient-card shadow-soft border border-border/50 hover:shadow-medium transition-all duration-300 group">
            <div className="inline-flex items-center justify-center p-3 rounded-lg bg-gradient-primary mb-4 group-hover:scale-110 transition-transform">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Automation & APIs</h3>
            <p className="text-muted-foreground">
              Powerful automation engine with REST APIs, webhooks, and integrations with popular DevOps tools and workflows.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center bg-gradient-card rounded-2xl p-12 shadow-large border border-border/50">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to unify your
            <span className="bg-gradient-hero bg-clip-text text-transparent"> cloud infrastructure?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join 500+ enterprises already using CloudSync CMP to reduce costs, 
            improve security, and accelerate cloud operations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/onboarding">
              <Button variant="hero" size="xl">
                Start Free Trial
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            <Button variant="outline" size="xl">
              Schedule Demo
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mt-6">
            No credit card required • Setup in under 5 minutes • 24/7 support
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="p-1 rounded bg-gradient-primary">
                <Cloud className="h-4 w-4 text-white" />
              </div>
              <span className="font-semibold">CloudSync CMP</span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Privacy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms</a>
              <a href="#" className="hover:text-primary transition-colors">Support</a>
              <a href="#" className="hover:text-primary transition-colors">Documentation</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
