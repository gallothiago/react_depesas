// src/components/TotalsDisplay.jsx
import React from 'react';
import { formatCurrency } from '../utils/formatters'; // Importa a função de formatação de moeda

function TotalsDisplay({ expenses }) {
  // Calcula o total geral
  const totalAmount = expenses.reduce((sum, exp) => sum + (parseFloat(exp.value) || 0), 0);

  // Calcula os totais por usuário
  const totalsByUser = expenses.reduce((acc, exp) => {
    const user = exp.user;
    const value = parseFloat(exp.value) || 0;
    if (!acc[user]) {
      acc[user] = { total: 0, cards: {} };
    }
    acc[user].total += value;

    // Calcula os totais por cartão para cada usuário
    const card = exp.card;
    if (!acc[user].cards[card]) {
      acc[user].cards[card] = 0;
    }
    acc[user].cards[card] += value;

    return acc;
  }, {});

  // Calcula os totais por cartão (geral)
  const totalsByCard = expenses.reduce((acc, exp) => {
    const card = exp.card;
    const value = parseFloat(exp.value) || 0;
    if (!acc[card]) {
      acc[card] = 0;
    }
    acc[card] += value;
    return acc;
  }, {});


  return (
    <div className="card totals-section">
      <h3>Resumo dos Totais</h3>

      <p><strong>Total Geral de Despesas:</strong> {formatCurrency(totalAmount)}</p>

      <h4>Totais por Usuário:</h4>
      {Object.keys(totalsByUser).length === 0 ? (
        <p>Nenhum total por usuário para exibir.</p>
      ) : (
        Object.keys(totalsByUser).map(user => (
          <div key={user} className="user-total-block">
            <p><strong>{user}:</strong> {formatCurrency(totalsByUser[user].total)}</p>
            {Object.keys(totalsByUser[user].cards).length > 0 && (
              <div style={{ marginLeft: '15px' }}>
                {Object.keys(totalsByUser[user].cards).map(card => (
                  <p key={`${user}-${card}`} className="card-total">
                    - {card}: {formatCurrency(totalsByUser[user].cards[card])}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))
      )}

      <h4>Totais por Cartão (Geral):</h4>
      {Object.keys(totalsByCard).length === 0 ? (
        <p>Nenhum total por cartão para exibir.</p>
      ) : (
        Object.keys(totalsByCard).map(card => (
          <p key={card}>
            <strong>{card}:</strong> {formatCurrency(totalsByCard[card])}
          </p>
        ))
      )}
    </div>
  );
}

export default TotalsDisplay;