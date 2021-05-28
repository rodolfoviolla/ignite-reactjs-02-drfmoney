import { createServer, Model } from 'miragejs';

export interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

const transactions: Transaction[] = [
  {
    id: 1,
    title: 'Desenvolvimento de website',
    amount: 10000,
    type: 'deposit',
    category: 'Trampo',
    createdAt: new Date().toDateString()
  },
  {
    id: 2,
    title: 'Aluguel',
    amount: 1700,
    type: 'withdraw',
    category: 'Casa',
    createdAt: new Date().toDateString()
  },
];

createServer({
  models: {
    transactions: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions,
    });
  },

  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => this.schema.all('transactions'));
    this.post('/transactions', (schema, request) => schema.create('transactions', JSON.parse(request.requestBody)));

    this.get('/summary', () => transactions.reduce((prev, curr) => ({
      income: curr.type === 'deposit' ? prev.income + curr.amount : prev.income,
      outcome: curr.type === 'withdraw' ? prev.outcome + curr.amount : prev.outcome,
      total: curr.type === 'deposit' ? prev.total + curr.amount : prev.total - curr.amount,
    }), { income: 0, outcome: 0, total: 0 }));
  }
});