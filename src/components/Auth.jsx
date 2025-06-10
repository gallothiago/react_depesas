
// src/components/Auth.jsx
import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig'; // Importa a instância de autenticação

function Auth({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null); // Estado para armazenar o usuário logado

  // Lista de e-mails permitidos para login
  const allowedEmails = [
    "gallothiago2013@gmail.com",
    "thaynnaraglla@gmail.com"
  ];

  useEffect(() => {
    // Monitora o estado de autenticação do Firebase
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // Se houver um usuário logado
        if (allowedEmails.includes(currentUser.email)) {
          setUser(currentUser);
          onLoginSuccess(currentUser); // Chama a função de sucesso no login no componente pai
        } else {
          // Se o e-mail não for permitido, desloga o usuário
          signOut(auth)
            .then(() => {
              alert("Acesso não autorizado. Por favor, use uma conta permitida.");
              setUser(null);
              onLoginSuccess(null);
            })
            .catch(error => {
              console.error("Erro ao deslogar usuário não autorizado:", error);
              alert("Erro de autenticação. Tente novamente.");
            });
        }
      } else {
        // Se não houver usuário logado
        setUser(null);
        onLoginSuccess(null);
      }
    });

    // Função de limpeza: descadastra o listener quando o componente é desmontado
    return () => unsubscribe();
  }, [onLoginSuccess]); // onLoginSuccess é uma dependência do useEffect

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // O onAuthStateChanged lidará com o sucesso do login e redirecionamento
    } catch (error) {
      alert(`Erro ao fazer login: ${error.message}`);
    }
  };

  const handleSignUp = async () => {
    const newEmail = prompt("Digite o email para cadastro:");
    const newPassword = prompt("Digite a senha:");

    if (newEmail && newPassword) {
      try {
        await createUserWithEmailAndPassword(auth, newEmail, newPassword);
        alert('Usuário criado com sucesso! Faça login.');
      } catch (error) {
        alert(`Erro ao criar conta: ${error.message}`);
      }
    }
  };

  if (user) {
    // Se o usuário estiver logado e autorizado, não renderiza o formulário de login aqui
    // A renderização da aplicação principal será feita no App.jsx
    return null;
  }

  return (
    <div id="auth-section" className="card">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          id="login-email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          id="login-senha"
          placeholder="Senha"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">Entrar</button>
      </form>
      <button id="btn-signup" className="btn btn-secondary" onClick={handleSignUp}>Criar Conta</button>
    </div>
  );
}

export default Auth;