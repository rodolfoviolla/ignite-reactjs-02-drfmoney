import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { Transaction } from '../services/miragejs';

import { api } from '../services/api';

interface TransactionProviderProps {
  children: ReactNode;
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

interface Summary {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionContextData {
  transactions: Transaction[];
  createTransaction: (transactionInput: TransactionInput) => Promise<void>;
  summary: Summary;
}

const TransactionContext = createContext<TransactionContextData>({} as TransactionContextData);

export function TransactionProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [summary, setSummary] = useState({ income: 0, outcome: 0, total: 0 });

  useEffect(() => {
    api.get('/transactions').then(response => setTransactions(response.data.transactions));
  }, []);

  useEffect(() => {
    setSummary(transactions.reduce((accumulator, transaction) => ({
      income: transaction.type === 'deposit' ? accumulator.income + transaction.amount : accumulator.income,
      outcome: transaction.type === 'withdraw' ? accumulator.outcome + transaction.amount : accumulator.outcome,
      total: transaction.type === 'deposit' ? accumulator.total + transaction.amount : accumulator.total - transaction.amount,
    }), { income: 0, outcome: 0, total: 0 }));
  }, [transactions]);

  async function createTransaction(transactionInput: TransactionInput) {
    const response = await api.post('/transactions', { ...transactionInput, createdAt: new Date() });
    const { transaction } = response.data;
    
    setTransactions([...transactions, transaction]);
  }

  return (
    <TransactionContext.Provider value={{ transactions, createTransaction, summary }}>
      {children}
    </TransactionContext.Provider>
  );
}

export const useTransactions = () => useContext(TransactionContext);