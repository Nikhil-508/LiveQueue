'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { UserPlus, Users, ArrowRight, CheckCircle2, Clock, ShieldCheck } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center overflow-x-hidden">
      {/* Hero Section */}
      <section className="w-full py-20 md:py-32 lg:py-48 relative">
        {/* Background blobs for premium feel */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-secondary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
        
        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <div className="flex flex-col items-center space-y-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-4"
            >
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Queue Management <br />
                <span className="text-primary text-glow">Evolved</span>
              </h1>
              <p className="mx-auto max-w-[800px] text-muted-foreground text-lg md:text-2xl font-medium leading-relaxed">
                Streamline your customer flow with a beautiful, lightweight token system designed for modern businesses.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Link 
                href="/join" 
                className={cn(buttonVariants({ size: "lg" }), "rounded-full px-10 h-14 text-lg font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all")}
              >
                Join the Queue <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link 
                href="/status" 
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full px-10 h-14 text-lg font-bold glass hover:bg-muted/50 transition-all")}
              >
                View Live Status
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="w-full py-20 bg-muted/30">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why choose LiveQueue?</h2>
            <p className="text-muted-foreground text-lg">Everything you need to manage your customer flow.</p>
          </div>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<Clock className="h-8 w-8 text-primary" />}
              title="Real-time Updates"
              description="Live tracking of tokens and estimated waiting times for all participants."
            />
            <FeatureCard
              icon={<UserPlus className="h-8 w-8 text-primary" />}
              title="Easy Booking"
              description="Simple mobile-first interface to generate tokens in seconds."
            />
            <FeatureCard
              icon={<ShieldCheck className="h-8 w-8 text-primary" />}
              title="Admin Control"
              description="Powerful dashboard for staff to manage and serve customers efficiently."
            />
          </div>
        </div>
      </section>

      {/* Quick Action Cards */}
      <section className="w-full py-24">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-8 md:grid-cols-2 lg:max-w-5xl mx-auto">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link href="/join">
                <Card className="group border-none shadow-xl card-hover bg-card/50 backdrop-blur-sm p-8 h-full">
                  <div className="flex flex-col h-full">
                    <div className="p-4 w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      <UserPlus className="h-8 w-8" />
                    </div>
                    <h3 className="text-3xl font-bold mb-4">Join as Customer</h3>
                    <p className="text-muted-foreground text-lg mb-8 flex-1">
                      Instantly get your token and track your status from anywhere. No physical waiting required.
                    </p>
                    <div className="flex items-center text-primary font-bold text-lg">
                      Start Now <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link href="/admin">
                <Card className="group border-none shadow-xl card-hover bg-card/50 backdrop-blur-sm p-8 h-full">
                  <div className="flex flex-col h-full">
                    <div className="p-4 w-16 h-16 rounded-2xl bg-secondary/50 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      <Users className="h-8 w-8" />
                    </div>
                    <h3 className="text-3xl font-bold mb-4">Staff Dashboard</h3>
                    <p className="text-muted-foreground text-lg mb-8 flex-1">
                      Manage the queue efficiently, call next patients, and keep track of your performance.
                    </p>
                    <div className="flex items-center text-primary font-bold text-lg">
                      Go to Admin <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 border-t glass">
        <div className="container px-4 md:px-6 mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-black text-xl shadow-lg shadow-primary/20">Q</div>
            <span className="text-2xl font-bold">LiveQueue</span>
          </div>
          <p className="text-muted-foreground font-medium">
            © 2026 LiveQueue. All rights reserved.
          </p>
          <div className="flex gap-8 text-muted-foreground font-medium">
            <Link href="#" className="hover:text-primary transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card className="border-none shadow-none bg-transparent hover:bg-card/50 p-6 rounded-3xl transition-all duration-300">
      <CardContent className="flex flex-col items-center text-center p-0 space-y-6">
        <div className="p-5 rounded-2xl bg-background shadow-xl shadow-primary/5">
          {icon}
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold">{title}</h3>
          <p className="text-muted-foreground text-lg leading-relaxed">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
