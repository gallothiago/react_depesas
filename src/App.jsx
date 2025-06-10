// src/App.jsx
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, database } from "./firebaseConfig";
import { ref, onValue, push, remove } from 'firebase/database'; // Funções do Realtime Database

import Auth from './components/Auth';
import AddExpenseForm from './components/AddExpenseForm'; // Ainda vamos criar
import ExpensesSummary from './components/ExpensesSummary'; // Ainda vamos criar
import TotalsDisplay from './components/TotalsDisplay';     // Ainda vamos criar

import { formatCurrency, formatDate } from './utils/formatters'; // Ainda vamos criar
import { exportToExcel } from './utils/excelExport';             // Ainda vamos criar

import './App.css'; // Importa seu arquivo CSS

function App() {
  const [user, setUser] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [filterUser, setFilterUser] = useState('Todos');
  const [filterCard, setFilterCard] = useState('Todos'); // Novo estado para o filtro de exportação

  // Carrega despesas do Firebase
  useEffect(() => {
    if (user) {
      const expensesRef = ref(database, 'expenses');
      const unsubscribe = onValue(expensesRef, (snapshot) => {
        const loadedExpenses = [];
        snapshot.forEach((childSnapshot) => {
          const expense = childSnapshot.val();
          expense.key = childSnapshot.key;
          loadedExpenses.push(expense);
        });
        setExpenses(loadedExpenses);
      });

      // Função de limpeza para remover o listener quando o componente é desmontado
      return () => unsubscribe();
    } else {
      setExpenses([]); // Limpa as despesas se o usuário deslogar
    }
  }, [user]); // Recarrega as despesas quando o usuário muda

  const handleLoginSuccess = (loggedInUser) => {
    setUser(loggedInUser);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setExpenses([]); // Limpa as despesas ao deslogar
      alert('Você saiu da sua conta.');
    } catch (error) {
      console.error("Erro ao deslogar:", error);
      alert("Erro ao sair. Tente novamente.");
    }
  };

  const addExpense = async (newExpense) => {
    try {
      const expensesRef = ref(database, 'expenses');
      await push(expensesRef, newExpense);
      alert('Despesa adicionada com sucesso!');
    } catch (error) {
      alert(`Erro ao adicionar despesa: ${error.message}`);
    }
  };

  const removeExpense = async (key) => {
    if (confirm('Tem certeza que deseja excluir essa despesa?')) {
      try {
        const expenseRef = ref(database, `expenses/${key}`);
        await remove(expenseRef);
        alert('Despesa excluída com sucesso!');
      } catch (error) {
        alert(`Erro ao excluir despesa: ${error.message}`);
      }
    }
  };

  const filteredExpenses = filterUser === 'Todos'
    ? expenses
    : expenses.filter(exp => exp.user === filterUser);

  // Renderização condicional: mostra login ou a aplicação principal
  return (
    <div className="container">
      <h1>Controle Financeiro</h1>

      {!user ? (
        <Auth onLoginSuccess={handleLoginSuccess} />
      ) : (
        <div id="app-section">
          <header className="app-header">
            <h2>Minhas Despesas</h2>
            <button id="btn-logout" className="btn btn-danger" onClick={handleLogout}>Sair</button>
          </header>

          <AddExpenseForm addExpense={addExpense} />
          <ExpensesSummary
            expenses={filteredExpenses}
            filterUser={filterUser}
            setFilterUser={setFilterUser}
            removeExpense={removeExpense}
            filterCard={filterCard} // Passa o filtro de cartão
            setFilterCard={setFilterCard} // Passa a função para atualizar o filtro de cartão
            onExportExcel={() => exportToExcel(expenses, filterCard)} // Passa a função de exportação com o filtro
          />
          <TotalsDisplay expenses={expenses} />
        </div>
      )}
    </div>
  );
}

export default App;