import { createServer, Model } from 'miragejs';

export interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: Date;
}

const transactionsSeed: Transaction[] = [
  {
    id: 1,
    title: 'Desenvolvimento de website',
    amount: 10000,
    type: 'deposit',
    category: 'Trampo',
    createdAt: new Date()
  },
  {
    id: 2,
    title: 'Aluguel',
    amount: 1700,
    type: 'withdraw',
    category: 'Casa',
    createdAt: new Date()
  },
];

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: transactionsSeed,
    });
  },

  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => this.schema.all('transaction'));
    this.post('/transactions', (schema, request) => schema.create('transaction', JSON.parse(request.requestBody)));
  }
});