
// src/components/ExpensesSummary.jsx
import React from 'react';
import { formatCurrency, formatDate } from '../utils/formatters'; // Importa as funções de formatação

function ExpensesSummary({ expenses, filterUser, setFilterUser, removeExpense, filterCard, setFilterCard, onExportExcel }) {
  // Obtém uma lista única de usuários para o filtro
  const uniqueUsers = ['Todos', ...new Set(expenses.map(exp => exp.user))];
  // Obtém uma lista única de cartões para o filtro
  const uniqueCards = ['Todos', ...new Set(expenses.map(exp => exp.card))];

  return (
    <div className="card">
      <h3>Resumo das Despesas</h3>

      <div className="filters-section" style={{ marginBottom: '15px' }}>
        <label htmlFor="filter-user" style={{ marginRight: '10px' }}>Filtrar por Usuário:</label>
        <select
          id="filter-user"
          value={filterUser}
          onChange={(e) => setFilterUser(e.target.value)}
          style={{ padding: '8px', borderRadius: '5px', border: '1px solid #555', backgroundColor: '#4a4a4a', color: '#fff' }}
        >
          {uniqueUsers.map(user => (
            <option key={user} value={user}>{user}</option>
          ))}
        </select>

        <label htmlFor="filter-card" style={{ marginLeft: '20px', marginRight: '10px' }}>Filtrar por Cartão:</label>
        <select
          id="filter-card"
          value={filterCard}
          onChange={(e) => setFilterCard(e.target.value)}
          style={{ padding: '8px', borderRadius: '5px', border: '1px solid #555', backgroundColor: '#4a4a4a', color: '#fff' }}
        >
          {uniqueCards.map(card => (
            <option key={card} value={card}>{card}</option>
          ))}
        </select>

        <button
          className="btn btn-secondary"
          onClick={onExportExcel}
          style={{ marginLeft: '20px', padding: '8px 15px' }}
        >
          Exportar para Excel
        </button>
      </div>

      <div id="expenses-list">
        {expenses.length === 0 ? (
          <p>Nenhuma despesa encontrada.</p>
        ) : (
          expenses.map(expense => (
            <div key={expense.key} className="expense-item">
              <div className="expense-details">
                <p><strong>Data:</strong> {formatDate(expense.date)}</p>
                <p><strong>Cartão:</strong> {expense.card}</p>
                <p><strong>Valor:</strong> {formatCurrency(expense.value)}</p>
                <p><strong>Descrição:</strong> {expense.description}</p>
                <p><strong>Quem:</strong> {expense.user}</p>
              </div>
              <button
                className="btn btn-danger"
                onClick={() => removeExpense(expense.key)}
              >
                Excluir
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ExpensesSummary;