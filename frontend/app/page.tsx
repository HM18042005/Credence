import Link from 'next/link';
import { TrendingUp, Shield, Users, BarChart3 } from 'lucide-react';
import ThemeToggle from '@/components/shared/ThemeToggle';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/" className="text-2xl font-bold text-primary">Credence</Link>
          <nav className="flex flex-wrap gap-4 items-center justify-center">
            <Link
              href="/borrower/dashboard"
              className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-hover transition-colors text-sm md:text-base"
            >
              Borrower Portal
            </Link>
            <Link
              href="/lender/dashboard"
              className="px-4 py-2 rounded-lg border border-border hover:bg-surface transition-colors text-text-primary text-sm md:text-base"
            >
              Lender Portal
            </Link>
            <div className="pl-2 border-l border-border flex items-center">
              <ThemeToggle />
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-12 md:py-20 text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-text-primary mb-6 leading-tight">
          Consent-Driven Credit Intelligence
        </h1>
        <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto mb-8 md:mb-12">
          Empowering lenders with data-driven credit decisions and borrowers with
          transparent, explainable credit assessments using consented financial data.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link
            href="/borrower/dashboard"
            className="px-8 py-4 rounded-lg bg-primary text-white hover:bg-primary-hover transition-colors text-lg font-semibold w-full md:w-auto"
          >
            Get Your Credit Score
          </Link>
          <Link
            href="/lender/dashboard"
            className="px-8 py-4 rounded-lg border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors text-lg font-semibold w-full md:w-auto"
          >
            Lender Dashboard
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <div className="bg-surface border border-border rounded-xl p-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Shield className="text-primary" size={32} />
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              Consent-Driven
            </h3>
            <p className="text-text-secondary text-sm">
              Full transparency and control over your financial data usage
            </p>
          </div>

          <div className="bg-surface border border-border rounded-xl p-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-positive/10 mb-4">
              <TrendingUp className="text-positive" size={32} />
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              ML-Powered Scoring
            </h3>
            <p className="text-text-secondary text-sm">
              Advanced risk analytics using Logistic Regression models
            </p>
          </div>

          <div className="bg-surface border border-border rounded-xl p-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-warning/10 mb-4">
              <BarChart3 className="text-warning" size={32} />
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              Explainable AI
            </h3>
            <p className="text-text-secondary text-sm">
              Understand every factor behind your credit decision
            </p>
          </div>

          <div className="bg-surface border border-border rounded-xl p-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-danger/10 mb-4">
              <Users className="text-danger" size={32} />
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              Two-Sided Platform
            </h3>
            <p className="text-text-secondary text-sm">
              Serving both MSMEs and lenders with dedicated portals
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-text-primary text-center mb-12">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white font-bold text-xl mb-4">
              1
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              Upload Data
            </h3>
            <p className="text-text-secondary text-sm">
              Securely share your bank statements and GST data with consent
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white font-bold text-xl mb-4">
              2
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              AI Analysis
            </h3>
            <p className="text-text-secondary text-sm">
              Our ML models analyze your financial patterns and compute risk
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white font-bold text-xl mb-4">
              3
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              Get Results
            </h3>
            <p className="text-text-secondary text-sm">
              Receive instant credit decision with clear explanations
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-6 py-8 text-center text-text-secondary text-sm">
          <p>© 2024 Credence - Consent-Driven Credit Intelligence Platform</p>
          <p className="mt-2">Built with FastAPI, Next.js, and Machine Learning</p>
        </div>
      </footer>
    </div>
  );
}
