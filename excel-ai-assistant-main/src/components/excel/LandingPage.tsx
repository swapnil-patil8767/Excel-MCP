import { FileSpreadsheet, LayoutDashboard, Sparkles, Zap, ArrowRight, Upload, Settings, Download, Users, Building2, TrendingUp, GraduationCap, Mail, Phone, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LandingPageProps {
  onGetStarted: () => void;
}

const features = [
  {
    icon: LayoutDashboard,
    title: 'Smart Dashboards',
    description: 'AI-powered chart recommendations and automatic dashboard creation from your data.',
  },
  {
    icon: Sparkles,
    title: 'Data Cleaning',
    description: 'Automatically clean, deduplicate, and organize messy Excel data in seconds.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Process large files quickly with our advanced MCP-powered algorithms.',
  },
];

const howItWorks = [
  {
    step: 1,
    title: 'Upload Your File',
    description: 'Simply drag and drop your Excel file or click to browse',
    icon: Upload,
  },
  {
    step: 2,
    title: 'Choose Action',
    description: 'Select from dashboard creation, data cleaning, or report generation',
    icon: Settings,
  },
  {
    step: 3,
    title: 'AI Processing',
    description: 'Our AI analyzes your data and performs the requested operations',
    icon: Sparkles,
  },
  {
    step: 4,
    title: 'Download Result',
    description: 'Get your processed Excel file ready for immediate use',
    icon: Download,
  },
];

const useCases = [
  {
    icon: Building2,
    title: 'Business Analysts',
    description: 'Create insightful dashboards from sales data, financial reports, and operational metrics in minutes.',
  },
  {
    icon: TrendingUp,
    title: 'Data Managers',
    description: 'Clean and standardize large datasets, remove duplicates, and ensure data quality across your organization.',
  },
  {
    icon: Users,
    title: 'Team Leaders',
    description: 'Generate comprehensive reports for stakeholders without spending hours on manual formatting.',
  },
  {
    icon: GraduationCap,
    title: 'Students & Researchers',
    description: 'Quickly visualize research data and create professional charts for presentations and papers.',
  },
];

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/10 to-background" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        <div className="container mx-auto px-4 pt-20 pb-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8 animate-fade-in border border-primary/20">
              <FileSpreadsheet className="w-4 h-4" />
              AI-Powered Excel Processing
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Transform Your Excel Data
              <span className="block text-primary mt-2">With AI Intelligence</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Create stunning dashboards, clean messy data, and generate comprehensive reports 
              automatically with our AI-powered Excel assistant.
            </p>
            
            <Button 
              size="lg" 
              onClick={onGetStarted}
              className="gap-2 text-lg px-8 py-6 animate-fade-in shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: '0.3s' }}
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 pb-24">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="bg-card rounded-2xl p-8 shadow-card border border-border animate-fade-in hover:shadow-lg hover:-translate-y-2 transition-all duration-300"
                style={{ animationDelay: `${0.4 + idx * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-muted/30 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Get from raw Excel data to polished results in four simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {howItWorks.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.step}
                  className="relative group"
                >
                  {idx < howItWorks.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/50 to-primary/10" />
                  )}
                  <div className="bg-card rounded-2xl p-6 text-center border border-border shadow-soft hover:shadow-lg transition-all duration-300 hover:-translate-y-2 relative z-10">
                    <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {step.step}
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-bold text-foreground mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Use Cases Section */}
      <div className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Who It's For
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Xl.ai is designed for anyone who works with spreadsheet data
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {useCases.map((useCase, idx) => {
              const Icon = useCase.icon;
              return (
                <div
                  key={useCase.title}
                  className="bg-card rounded-2xl p-6 border border-border shadow-soft hover:shadow-lg hover:border-primary/30 transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{useCase.title}</h3>
                  <p className="text-sm text-muted-foreground">{useCase.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Creator Section */}
      <div className="py-24 bg-gradient-to-br from-primary/5 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
            {/* Circle Photo */}
            <div className="relative">
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-primary to-primary/60 p-1 shadow-xl">
                <div className="w-full h-full rounded-full bg-card flex items-center justify-center overflow-hidden">
                  <div className="w-44 h-44 rounded-full bg-gradient-to-br from-primary/20 to-accent flex items-center justify-center">
                    <FileSpreadsheet className="w-20 h-20 text-primary" />
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg">
                <Heart className="w-6 h-6 text-primary-foreground fill-primary-foreground" />
              </div>
            </div>

            {/* Info */}
            <div className="text-center md:text-left">
              <p className="text-muted-foreground mb-2 flex items-center justify-center md:justify-start gap-2">
                <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                Created with passion by
              </p>
              <h3 className="text-3xl font-bold text-foreground mb-2">Swapnil Patil</h3>
              <p className="text-primary font-medium text-lg">Developer of Xl.ai</p>
              <p className="text-muted-foreground mt-4 max-w-md">
                Building tools that make data processing simpler and more accessible for everyone.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              {/* Logo & Name */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                  <FileSpreadsheet className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="font-bold text-xl text-foreground">Xl.ai</span>
              </div>

              {/* Contact Info */}
              <div className="flex flex-col md:flex-row items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  <span>Swapnil Bharamu Patil</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary" />
                  <a href="tel:8767575090" className="hover:text-primary transition-colors">8767575090</a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary" />
                  <a href="mailto:patilswapnil1606@gmail.com" className="hover:text-primary transition-colors">patilswapnil1606@gmail.com</a>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
              <p>© {new Date().getFullYear()} Xl.ai. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
