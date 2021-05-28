import { useEffect, useState } from 'react';

import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import totalImg from '../../assets/total.svg';

import { numberToCurrency } from '../../utils/format';

import { api } from '../../services/api';

import { Container } from "./styles";

export function Summary() {
  const [summary, setSummary] = useState({ income: 0, outcome: 0, total: 0 });

  useEffect(() => {
    api.get('/summary').then(response => setSummary(response.data));
  }, []);

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="Entradas" />
        </header>
        <strong>{numberToCurrency(summary.income)}</strong>
      </div>

      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeImg} alt="Saídas" />
        </header>
        <strong>{numberToCurrency(summary.outcome)}</strong>
      </div>

      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Total" />
        </header>
        <strong>{numberToCurrency(summary.total)}</strong>
      </div>
    </Container>
  );
}