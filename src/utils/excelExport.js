// src/utils/excelExport.js

// Importa a função de formatação de moeda para usar na exportação
import { formatCurrency } from './formatters';

export function exportToExcel(expenses, selectedCardFilter) {
  // Filtra as despesas com base no cartão selecionado
  let filteredExpensesForExport = expenses;
  if (selectedCardFilter !== 'Todos') {
    filteredExpensesForExport = expenses.filter(exp => exp.card === selectedCardFilter);
  }

  if (filteredExpensesForExport.length === 0) {
    alert("Não há despesas para exportar com os filtros selecionados.");
    return;
  }

  // Define os cabeçalhos do CSV
  const headers = ["Data", "Cartão", "Valor", "Descrição", "Quem"];

  // Calcula o total geral das despesas FILTRADAS
  let grandTotal = 0;

  // Mapeia os dados das despesas filtradas para linhas CSV
  const csvRows = filteredExpensesForExport.map(exp => {
    const date = exp.date;
    const numericValue = parseFloat(exp.value || 0);
    grandTotal += numericValue;

    // Formata o valor para o padrão brasileiro (vírgula como separador decimal)
    const value = String(numericValue.toFixed(2)).replace('.', ',');
    // Envolve a descrição, cartão e usuário em aspas para lidar com vírgulas internas
    const description = `"${exp.description.replace(/"/g, '""')}"`;
    const card = `"${exp.card.replace(/"/g, '""')}"`;
    const user = `"${exp.user.replace(/"/g, '""')}"`;

    return [date, card, value, description, user].join(';');
  });

  // Adiciona a linha do total geral no final
  const totalRow = ["", "", String(grandTotal.toFixed(2)).replace('.', ','), "TOTAL GERAL", ""];
  csvRows.push(totalRow.join(';'));

  // Combina cabeçalhos e linhas
  const csvContent = "\ufeff" + [ // \ufeff é o BOM para garantir que o Excel abra corretamente
    headers.join(';'),
    ...csvRows
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

  const link = document.createElement("a");
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    const fileNameSuffix = selectedCardFilter === 'Todos' ? 'todos_cartoes' : selectedCardFilter.replace(/ /g, '_').toLowerCase();
    link.setAttribute("download", `despesas_financeiras_${fileNameSuffix}.csv`);

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    alert("Seu navegador não suporta download automático de arquivos.");
  }
}