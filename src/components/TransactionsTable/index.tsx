import { useTransactions } from "../../hooks/useTransactions";

import { formatDateToString, formatNumberToCurrency } from "../../utils/format";

import { Container } from "./styles";

export function TransactionsTable() {
  const { transactions } = useTransactions();

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
              <td className={type}>{formatNumberToCurrency(amount)}</td>
              <td>{category}</td>
              <td>
                {formatDateToString(createdAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}