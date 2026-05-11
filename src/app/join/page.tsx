'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, CheckCircle2, ArrowLeft, Loader2, Clock } from 'lucide-react';
import { useQueue } from '@/components/queue-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function JoinQueuePage() {
  const router = useRouter();
  const { addToken } = useQueue();
  const [name, setName] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tokenReceived, setTokenReceived] = useState<any>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !serviceType) return;

    setIsSubmitting(true);
    
    // Simulate API delay
    setTimeout(() => {
      const newToken = addToken(name, serviceType);
      setTokenReceived(newToken);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="container max-w-lg mx-auto px-4 py-12 md:py-24">
      <Button 
        variant="ghost" 
        onClick={() => router.back()} 
        className="mb-8 -ml-2 text-muted-foreground hover:text-primary transition-colors rounded-full"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <AnimatePresence mode="wait">
        {!tokenReceived ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="border-none shadow-2xl bg-card/60 backdrop-blur-xl card-shadow overflow-hidden">
              <div className="h-2 w-full bg-primary/20" />
              <CardHeader className="text-center pb-8 pt-10">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 rotate-3">
                  <UserPlus className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold tracking-tight">Join the Queue</CardTitle>
                <CardDescription className="text-lg">Enter your details to get your digital token</CardDescription>
              </CardHeader>
              <CardContent className="px-6 md:px-10 pb-10">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-3">
                    <Label htmlFor="name" className="text-base font-semibold">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="e.g. John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="rounded-2xl h-14 px-6 border-muted bg-background/50 focus:ring-4 focus:ring-primary/10 transition-all text-lg"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="service" className="text-base font-semibold">Service Type</Label>
                    <Select onValueChange={setServiceType} required>
                      <SelectTrigger className="rounded-2xl h-14 px-6 border-muted bg-background/50 focus:ring-4 focus:ring-primary/10 transition-all text-lg">
                        <SelectValue placeholder="What can we help you with?" />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl border-muted shadow-2xl">
                        <SelectItem value="Consultation">Consultation</SelectItem>
                        <SelectItem value="Checkup">General Checkup</SelectItem>
                        <SelectItem value="Follow-up">Follow-up</SelectItem>
                        <SelectItem value="Emergency">Urgent Care</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full h-14 rounded-2xl text-xl font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 active:scale-[0.98] transition-all" 
                    disabled={isSubmitting || !name || !serviceType}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                        Generating Token...
                      </>
                    ) : (
                      "Get My Token"
                    )}
                  </Button>
                </form>
              </CardContent>
              <div className="bg-muted/30 py-6 px-10 border-t flex items-center justify-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <p className="text-sm font-medium text-muted-foreground">
                  Secure & Digital Queueing
                </p>
              </div>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", damping: 20 }}
          >
            <Card className="border-none shadow-2xl overflow-hidden bg-gradient-to-br from-primary/10 via-card to-secondary/10">
              <div className="p-10 flex flex-col items-center">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-8 shadow-xl shadow-green-500/20"
                >
                  <CheckCircle2 className="h-10 w-10 text-white" />
                </motion.div>
                <h2 className="text-3xl font-black mb-2">You're in line!</h2>
                <p className="text-muted-foreground text-lg mb-10">Keep this screen open to track your turn</p>
                
                <div className="w-full bg-card rounded-3xl p-10 border shadow-inner flex flex-col items-center mb-10">
                  <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4">Your Token Number</div>
                  <div className="text-8xl font-black text-primary leading-none mb-6">
                    #{tokenReceived.number.toString().padStart(3, '0')}
                  </div>
                  <div className="flex gap-2 items-center bg-primary/10 px-4 py-2 rounded-full text-primary font-bold">
                    <Clock className="h-4 w-4" /> ~15 mins wait
                  </div>
                </div>

                <div className="w-full space-y-4">
                  <Button asChild className="w-full h-14 rounded-2xl text-lg font-bold shadow-lg shadow-primary/25">
                    <Link href="/status">Track Live Status</Link>
                  </Button>
                  <Button variant="ghost" className="w-full h-12 text-muted-foreground font-semibold hover:text-primary" onClick={() => setTokenReceived(null)}>
                    Book another token
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Minimal Link import for the success state
import Link from 'next/link';
