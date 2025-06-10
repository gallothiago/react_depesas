// src/utils/formatters.js

// Formata número para moeda BR
export function formatCurrency(value) {
  if (typeof value !== 'number') {
    value = parseFloat(value);
  }
  if (isNaN(value)) {
    return 'R$ 0,00';
  }
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Formata data (ISO para dd/mm/yyyy)
export function formatDate(isoDate) {
  if (!isoDate) return '';
  // Se a data já for um objeto Date, usa diretamente. Caso contrário, tenta criar.
  const d = new Date(isoDate.includes('T') ? isoDate : isoDate + 'T00:00:00');
  // Verifica se a data é válida antes de formatar
  if (isNaN(d.getTime())) {
    return 'Data Inválida';
  }
  return d.toLocaleDateString('pt-BR');
}