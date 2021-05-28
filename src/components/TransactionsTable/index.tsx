import { useEffect, useState } from "react";

import { Transaction } from "../../services/miragejs";

import { dateToString, numberToCurrency } from "../../utils/format";

import { api } from "../../services/api";

import { Container } from "./styles";

export function TransactionsTable() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api.get('/transactions').then(response => setTransactions(response.data.transactions));
  }, []);

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map(({ id, title, amount, type, category, createdAt }) => (
            <tr key={id}>
              <td>{title}</td>
              <td className={type}>{numberToCurrency(amount)}</td>
              <td>{category}</td>
              <td>
                {dateToString(createdAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}