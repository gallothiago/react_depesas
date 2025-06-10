// src/components/AddExpenseForm.jsx
import React, { useState } from 'react';

function AddExpenseForm({ addExpense }) {
  // Estados para cada campo do formulário
  const [card, setCard] = useState('Cartão BB');
  const [date, setDate] = useState('');
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const [user, setUser] = useState('Thiago');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validação básica
    if (!card || !date || !value || !description || !user) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const newExpense = {
      card: card,
      date: date,
      value: parseFloat(value), // Garante que o valor seja um número
      description: description.trim(),
      user: user,
    };

    // Chama a função addExpense passada via props pelo componente pai (App.jsx)
    addExpense(newExpense);

    // Limpa o formulário após a submissão
    handleClearForm();
  };

  const handleClearForm = () => {
    setCard('Cartão BB');
    setDate('');
    setValue('');
    setDescription('');
    setUser('Thiago');
  };

  return (
    <div className="card">
      <h3>Adicionar Nova Despesa</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="card-select">Cartão:</label>
        <select
          id="card-select"
          name="card"
          required
          value={card}
          onChange={(e) => setCard(e.target.value)}
        >
          <option value="Cartão BB">Cartão BB</option>
          <option value="Cartão Nu">Cartão Nu</option>
        </select>

        <label htmlFor="expense-date">Data da Despesa:</label>
        <input
          type="date"
          id="expense-date"
          name="date"
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <label htmlFor="expense-value">Valor (R$):</label>
        <input
          type="number"
          id="expense-value"
          name="value"
          step="0.01"
          min="0"
          required
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <label htmlFor="expense-description">Descrição:</label>
        <input
          type="text"
          id="expense-description"
          name="description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label htmlFor="expense-user">Quem usou?</label>
        <select
          id="expense-user"
          name="user"
          required
          value={user}
          onChange={(e) => setUser(e.target.value)}
        >
          <option value="Thiago">Thiago</option>
          <option value="Thaynnara">Thaynnara</option>
          <option value="Yolanda">Yolanda</option>
          <option value="Teca">Teca</option>
          <option value="Ambos">Ambos</option>
        </select>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">Adicionar Despesa</button>
          <button type="button" className="btn btn-secondary" onClick={handleClearForm}>Limpar</button>
        </div>
      </form>
    </div>
  );
}

export default AddExpenseForm;