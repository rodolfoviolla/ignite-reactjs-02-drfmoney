export function formatNumberToCurrency(number: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(number);
}

export function formatDateToString(date: Date | string) {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  return new Intl.DateTimeFormat('pt-BR').format(date);
}