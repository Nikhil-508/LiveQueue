'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Token, TokenStatus } from '@/lib/types';

interface QueueContextType {
  tokens: Token[];
  addToken: (name: string, serviceType: string) => Token;
  updateTokenStatus: (id: string, status: TokenStatus) => void;
  nextPatient: () => void;
  resetQueue: () => void;
  servingToken: Token | null;
  waitingCount: number;
  estimatedWaitTime: number;
  isLoading: boolean;
}

const QueueContext = createContext<QueueContextType | undefined>(undefined);

export function QueueProvider({ children }: { children: React.ReactNode }) {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [lastNumber, setLastNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Load from localStorage
  useEffect(() => {
    const loadData = () => {
      try {
        const savedTokens = localStorage.getItem('queue_tokens');
        const savedNumber = localStorage.getItem('queue_last_number');
        if (savedTokens) {
          setTokens(JSON.parse(savedTokens).map((t: any) => ({
            ...t,
            createdAt: new Date(t.createdAt),
            servedAt: t.servedAt ? new Date(t.servedAt) : undefined,
            completedAt: t.completedAt ? new Date(t.completedAt) : undefined,
          })));
        }
        if (savedNumber) setLastNumber(parseInt(savedNumber, 10));
      } catch (error) {
        console.error('Failed to load queue data:', error);
        localStorage.removeItem('queue_tokens');
        localStorage.removeItem('queue_last_number');
      }
      
      // Simulate network delay
      setTimeout(() => setIsLoading(false), 800);
    };

    loadData();
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('queue_tokens', JSON.stringify(tokens));
      localStorage.setItem('queue_last_number', lastNumber.toString());
    }
  }, [tokens, lastNumber, isLoading]);

  const addToken = (name: string, serviceType: string) => {
    const nextNum = lastNumber + 1;
    const newToken: Token = {
      id: Math.random().toString(36).substring(2, 9),
      number: nextNum,
      name,
      serviceType,
      status: 'waiting',
      createdAt: new Date(),
    };
    setTokens((prev) => [...prev, newToken]);
    setLastNumber(nextNum);
    return newToken;
  };

  const updateTokenStatus = (id: string, status: TokenStatus) => {
    setTokens((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const updated = { ...t, status };
        if (status === 'serving') updated.servedAt = new Date();
        if (status === 'completed') updated.completedAt = new Date();
        return updated;
      })
    );
  };

  const nextPatient = () => {
    const currentServing = tokens.find((t) => t.status === 'serving');
    if (currentServing) {
      updateTokenStatus(currentServing.id, 'completed');
    }

    const nextInLine = tokens.find((t) => t.status === 'waiting');
    if (nextInLine) {
      updateTokenStatus(nextInLine.id, 'serving');
    }
  };

  const resetQueue = () => {
    setTokens([]);
    setLastNumber(0);
  };

  const servingToken = tokens.find((t) => t.status === 'serving') || null;
  const waitingCount = tokens.filter((t) => t.status === 'waiting').length;
  const estimatedWaitTime = waitingCount * 10; // Assume 10 mins per person

  return (
    <QueueContext.Provider
      value={{
        tokens,
        addToken,
        updateTokenStatus,
        nextPatient,
        resetQueue,
        servingToken,
        waitingCount,
        estimatedWaitTime,
        isLoading,
      }}
    >
      {children}
    </QueueContext.Provider>
  );
}

export function useQueue() {
  const context = useContext(QueueContext);
  if (context === undefined) {
    throw new Error('useQueue must be used within a QueueProvider');
  }
  return context;
}
