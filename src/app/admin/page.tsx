'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  UserCheck, 
  UserMinus, 
  RefreshCcw, 
  ChevronRight,
  MoreVertical,
  CheckCircle2,
  XCircle,
  Clock,
  Users
} from 'lucide-react';
import { useQueue } from '@/components/queue-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function AdminDashboard() {
  const { 
    tokens, 
    servingToken, 
    nextPatient, 
    resetQueue, 
    updateTokenStatus,
    waitingCount,
    isLoading
  } = useQueue();

  const [isResetDialogOpen, setIsResetDialogOpen] = React.useState(false);

  const handleReset = () => {
    resetQueue();
    setIsResetDialogOpen(false);
  };

  const waitingTokens = tokens.filter(t => t.status === 'waiting');
  const completedTokens = tokens.filter(t => t.status === 'completed');
  const cancelledTokens = tokens.filter(t => t.status === 'cancelled');

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div className="space-y-4 w-full md:w-auto">
            <Skeleton className="h-10 md:h-12 w-48 md:w-64 rounded-xl" />
            <Skeleton className="h-5 md:h-6 w-full md:w-96 rounded-lg" />
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <Skeleton className="h-12 flex-1 md:w-32 rounded-2xl" />
            <Skeleton className="h-12 flex-1 md:w-48 rounded-2xl" />
          </div>
        </div>
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4 space-y-8">
            <Skeleton className="h-[300px] md:h-[340px] w-full rounded-[2rem]" />
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-24 md:h-28 w-full rounded-[2rem]" />
              <Skeleton className="h-24 md:h-28 w-full rounded-[2rem]" />
              <Skeleton className="h-24 md:h-28 w-full rounded-[2rem]" />
              <Skeleton className="h-24 md:h-28 w-full rounded-[2rem]" />
            </div>
          </div>
          <div className="lg:col-span-8">
            <Skeleton className="h-[500px] md:h-[600px] w-full rounded-[2rem]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12">
        <div className="w-full md:w-auto">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-2">Queue Dashboard</h1>
          <p className="text-muted-foreground text-base md:text-lg font-medium italic">Empower your staff, delight your customers.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <AlertDialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button 
                variant="outline" 
                className="rounded-2xl h-14 px-6 border-destructive/20 text-destructive hover:bg-destructive/10 font-bold w-full sm:w-auto"
              >
                <RefreshCcw className="mr-2 h-4 w-4" /> Reset Queue
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="rounded-[2rem] border-none shadow-2xl p-8">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-2xl font-black tracking-tight">Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription className="text-lg">
                  This will permanently clear all active tokens and reset the counter to zero. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="mt-6">
                <AlertDialogCancel className="rounded-xl h-12 px-6 font-bold">Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={handleReset} 
                  className="rounded-xl h-12 px-6 font-bold bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Yes, Reset Everything
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          
          <Button 
            onClick={nextPatient} 
            disabled={waitingCount === 0 && !servingToken} 
            className="rounded-2xl h-14 px-10 text-lg font-bold shadow-xl shadow-primary/30 active:scale-95 transition-all w-full sm:w-auto"
          >
            <UserCheck className="mr-2 h-5 w-5" /> Call Next
          </Button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Main Section: Now Serving & Stats */}
        <div className="lg:col-span-12 xl:col-span-4 space-y-6 order-1">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="border-none shadow-2xl bg-primary text-primary-foreground overflow-hidden relative min-h-[320px] flex flex-col">
              <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12">
                <Users className="h-32 w-32 md:h-40 md:w-40" />
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-black uppercase tracking-[0.2em] opacity-80">Live Session</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col items-center justify-center py-8 relative z-10">
                {servingToken ? (
                  <>
                    <div className="text-7xl md:text-8xl font-black mb-4 text-glow">#{servingToken.number}</div>
                    <div className="text-xl md:text-2xl font-bold mb-1">{servingToken.name}</div>
                    <div className="text-sm font-medium opacity-70 mb-8">{servingToken.serviceType}</div>
                    <div className="flex gap-3 w-full max-w-sm">
                      <Button 
                        variant="secondary" 
                        className="flex-1 h-12 rounded-xl bg-white/20 hover:bg-white/30 text-white border-none font-bold shadow-lg"
                        onClick={() => updateTokenStatus(servingToken.id, 'completed')}
                      >
                        Complete
                      </Button>
                      <Button 
                        variant="secondary" 
                        className="flex-1 h-12 rounded-xl bg-black/10 hover:bg-black/20 text-white border-none font-bold"
                        onClick={() => updateTokenStatus(servingToken.id, 'cancelled')}
                      >
                        Cancel
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-10 opacity-60">
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <UserMinus className="h-8 w-8" />
                    </div>
                    <p className="text-lg font-bold">No active patient</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            <QuickStat label="Total Today" value={tokens.length.toString()} icon={<Users className="h-4 w-4" />} />
            <QuickStat label="Waiting" value={waitingCount.toString()} icon={<Clock className="h-4 w-4" />} />
            <QuickStat label="Completed" value={completedTokens.length.toString()} icon={<CheckCircle2 className="h-4 w-4" />} />
            <QuickStat label="Cancelled" value={cancelledTokens.length.toString()} icon={<XCircle className="h-4 w-4" />} />
          </div>
        </div>

        {/* Right Section: Detailed Queue History */}
        <div className="lg:col-span-12 xl:col-span-8 order-2">
          <Card className="border-none shadow-2xl bg-card/60 backdrop-blur-xl overflow-hidden min-h-[600px] flex flex-col">
            <Tabs defaultValue="waiting" className="w-full flex-1 flex flex-col">
              <div className="px-6 md:px-8 pt-8 pb-4 flex flex-col sm:flex-row items-center justify-between gap-6">
                <h3 className="text-2xl font-black tracking-tight">Queue Activity</h3>
                <TabsList className="bg-muted/50 rounded-2xl p-1 h-12 w-full sm:w-auto">
                  <TabsTrigger value="waiting" className="flex-1 sm:flex-none rounded-xl px-8 font-bold h-10 transition-all">
                    Waiting ({waitingTokens.length})
                  </TabsTrigger>
                  <TabsTrigger value="completed" className="flex-1 sm:flex-none rounded-xl px-8 font-bold h-10 transition-all">
                    History
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <Separator className="opacity-50" />

              <div className="px-4 md:px-8 pb-8 pt-6 flex-1">
                <TabsContent value="waiting" className="mt-0 focus-visible:ring-0 outline-none">
                  <TokenList tokens={waitingTokens} onAction={updateTokenStatus} />
                </TabsContent>
                <TabsContent value="completed" className="mt-0 focus-visible:ring-0 outline-none">
                  <TokenList tokens={[...completedTokens, ...cancelledTokens].sort((a, b) => b.createdAt - a.createdAt)} hideActions />
                </TabsContent>
              </div>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
}

function TokenList({ tokens, onAction, hideActions }: { 
  tokens: any[], 
  onAction?: (id: string, status: any) => void,
  hideActions?: boolean
}) {
  if (tokens.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-32 text-muted-foreground"
      >
        <div className="w-20 h-20 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Clock className="h-10 w-10 opacity-20" />
        </div>
        <p className="text-xl font-bold opacity-40 italic tracking-tight">No records to display</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      {tokens.map((token, index) => (
        <motion.div 
          key={token.id} 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="p-4 md:p-6 flex items-center justify-between group bg-background/50 hover:bg-background border border-transparent hover:border-primary/20 rounded-[1.5rem] transition-all duration-300 shadow-sm hover:shadow-xl"
        >
          <div className="flex items-center gap-4 md:gap-6">
            <div className="flex h-12 w-12 md:h-14 md:w-14 shrink-0 items-center justify-center rounded-2xl bg-muted font-black text-lg md:text-xl group-hover:bg-primary group-hover:text-primary-foreground transition-all">
              {token.number}
            </div>
            <div className="min-w-0">
              <div className="font-bold text-base md:text-lg mb-0.5 truncate">{token.name}</div>
              <div className="text-xs md:text-sm text-muted-foreground font-medium flex items-center gap-2">
                <span className="truncate">{token.serviceType}</span>
                <span className="opacity-30 shrink-0">•</span>
                <span className="shrink-0">{new Date(token.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge 
              variant={
                token.status === 'serving' ? 'default' : 
                token.status === 'completed' ? 'secondary' : 
                token.status === 'cancelled' ? 'destructive' : 'outline'
              }
              className="capitalize rounded-full px-4 py-1 font-bold border-none"
            >
              {token.status}
            </Badge>

            {!hideActions && onAction && token.status !== 'completed' && token.status !== 'cancelled' && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-2xl h-10 w-10 hover:bg-primary/10 transition-all">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="rounded-2xl border-muted p-2 shadow-2xl">
                  {token.status === 'waiting' && (
                    <DropdownMenuItem className="rounded-xl h-10 font-medium" onClick={() => onAction(token.id, 'serving')}>
                      <UserCheck className="mr-2 h-4 w-4" /> Serve Now
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem className="rounded-xl h-10 font-medium" onClick={() => onAction(token.id, 'completed')}>
                    <CheckCircle2 className="mr-2 h-4 w-4" /> Mark Completed
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-xl h-10 font-medium text-destructive focus:text-destructive" onClick={() => onAction(token.id, 'cancelled')}>
                    <XCircle className="mr-2 h-4 w-4" /> Cancel Token
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function QuickStat({ label, value, icon }: { label: string, value: string, icon: React.ReactNode }) {
  return (
    <Card className="border-none shadow-lg bg-card/40 backdrop-blur-md p-5 rounded-[2rem]">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-muted-foreground">
          {icon}
          <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
        </div>
        <div className="text-3xl font-black tracking-tighter">{value}</div>
      </div>
    </Card>
  );
}
