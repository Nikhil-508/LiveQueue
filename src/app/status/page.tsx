'use client';

import { motion } from 'framer-motion';
import { Users, Clock, Timer } from 'lucide-react';
import { useQueue } from '@/components/queue-provider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

export default function StatusPage() {
  const { tokens, servingToken, waitingCount, estimatedWaitTime, isLoading } = useQueue();
  const waitingTokens = tokens.filter(t => t.status === 'waiting');

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-5xl space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <Skeleton className="h-10 w-64 rounded-xl" />
            <Skeleton className="h-6 w-96 rounded-lg" />
          </div>
          <div className="flex gap-4">
            <Skeleton className="h-24 w-32 rounded-3xl" />
            <Skeleton className="h-24 w-32 rounded-3xl" />
          </div>
        </div>
        <Skeleton className="h-96 w-full rounded-[2.5rem]" />
        <div className="space-y-6">
          <Skeleton className="h-10 w-48 rounded-xl" />
          <div className="grid gap-6 md:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-28 w-full rounded-3xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="flex flex-col gap-12">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black tracking-tight mb-2">Live Queue Status</h1>
            <p className="text-muted-foreground text-lg">Real-time updates on currently serving and waiting tokens.</p>
          </div>
          <div className="flex gap-4">
            <StatCard 
              icon={<Users className="h-5 w-5 text-primary" />} 
              label="Waiting" 
              value={waitingCount.toString()} 
            />
            <StatCard 
              icon={<Timer className="h-5 w-5 text-primary" />} 
              label="Est. Wait" 
              value={`${estimatedWaitTime}m`} 
            />
          </div>
        </div>

        {/* Currently Serving - Centerpiece */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="border-none shadow-2xl bg-primary text-primary-foreground overflow-hidden relative group">
            {/* Decorative background elements */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-black/10 rounded-full blur-2xl" />
            
            <CardHeader className="pb-0 pt-10 text-center">
              <CardTitle className="text-sm font-bold opacity-80 uppercase tracking-[0.3em]">
                Now Serving
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center py-16 px-6 relative z-10">
              {servingToken ? (
                <>
                  <motion.div 
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    className="text-9xl md:text-[12rem] font-black leading-none mb-8 text-glow"
                  >
                    #{servingToken.number.toString().padStart(3, '0')}
                  </motion.div>
                  <div className="space-y-4 text-center">
                    <div className="text-2xl md:text-3xl font-bold tracking-tight">{servingToken.name}</div>
                    <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30 border-none px-6 py-2 text-lg rounded-full backdrop-blur-md">
                      {servingToken.serviceType}
                    </Badge>
                  </div>
                </>
              ) : (
                <div className="py-12 text-center">
                  <div className="text-4xl md:text-5xl font-black opacity-30 mb-4 italic tracking-tighter">Queue Idle</div>
                  <p className="text-xl opacity-60 font-medium">Ready for the next customer</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Waiting List */}
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b pb-4">
            <h2 className="text-3xl font-extrabold tracking-tight">Up Next</h2>
            <Badge variant="outline" className="rounded-full px-4 py-1 font-bold border-2">
              {waitingCount} in line
            </Badge>
          </div>

          {waitingTokens.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {waitingTokens.map((token, index) => (
                <motion.div
                  key={token.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="bg-card/40 border-none shadow-lg hover:shadow-xl transition-all duration-300 card-hover overflow-hidden group">
                    <CardContent className="p-6 flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/5 text-primary font-black text-2xl group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                          {token.number}
                        </div>
                        <div>
                          <div className="font-bold text-xl mb-1">{token.name}</div>
                          <div className="text-muted-foreground font-medium flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-primary/40" />
                            {token.serviceType}
                          </div>
                        </div>
                      </div>
                      <div className="hidden sm:block text-right">
                        <Badge variant="secondary" className="bg-secondary text-secondary-foreground border-none font-bold px-3 py-1">
                          Waiting
                        </Badge>
                        <div className="text-[10px] text-muted-foreground font-bold uppercase mt-2 tracking-widest">In Queue</div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-muted/20 rounded-[2.5rem] border-4 border-dashed border-muted/50">
              <Clock className="h-16 w-16 text-muted-foreground mx-auto mb-6 opacity-20" />
              <h3 className="text-2xl font-bold text-muted-foreground mb-2">Queue Cleared</h3>
              <p className="text-muted-foreground/60 font-medium">No one is currently waiting.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, className }: { icon: React.ReactNode, label: string, value: string, className?: string }) {
  return (
    <Card className={`border-none shadow-lg bg-card/60 backdrop-blur-md p-5 min-w-[120px] ${className}`}>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-primary/10">
            {icon}
          </div>
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{label}</span>
        </div>
        <div className="text-2xl font-black tracking-tight">{value}</div>
      </div>
    </Card>
  );
}
