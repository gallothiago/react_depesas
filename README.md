# Controle de Despesas com React


Uma aplicação web simples e intuitiva para gerenciar suas despesas diárias, desenvolvida com React. Adicione, visualize e filtre seus gastos de forma organizada para ter um melhor controle financeiro.

## Funcionalidades Principais

* **Adicionar novas despesas:** Registre o valor, a data e a descrição de cada gasto.
* **Visualizar lista de despesas:** Todas as despesas registradas são exibidas em uma lista clara.
* **Filtrar por ano:** Filtre as despesas para visualizar os gastos de um ano específico.
* **Gráfico de despesas:** Um gráfico visualiza a distribuição dos gastos por mês.

## Tecnologias Utilizadas

O projeto foi construído utilizando as seguintes tecnologias:

* **React.js:** Biblioteca JavaScript para construir interfaces de usuário.
* **JavaScript (ES6+):** Linguagem de programação.
* **CSS:** Estilização da aplicação.

## Como Executar o Projeto

Siga os passos abaixo para ter uma cópia local do projeto em sua máquina.

### Pré-requisitos

Certifique-se de ter o **Node.js** e o **npm** (gerenciador de pacotes do Node) instalados em seu sistema.

### Instalação

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/gallothiago/react_depesas.git](https://github.com/gallothiago/react_depesas.git)
    ```

2.  **Entre no diretório do projeto:**
    ```bash
    cd react_depesas
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

### Executando a Aplicação

Para iniciar o servidor de desenvolvimento, execute o seguinte comando:

```bash
npm start

Estrutura do Projeto
A estrutura de pastas do projeto é a seguinte:

src/
├── components/
│   ├── Chart/
│   │   ├── Chart.css
│   │   ├── Chart.js
│   │   ├── ChartBar.css
│   │   └── ChartBar.js
│   ├── Expenses/
│   │   ├── ExpenseDate.css
│   │   ├── ExpenseDate.js
│   │   ├── ExpenseFilter.css
│   │   ├── ExpenseFilter.js
│   │   ├── ExpenseItem.css
│   │   ├── ExpenseItem.js
│   │   ├── Expenses.css
│   │   ├── Expenses.js
│   │   ├── ExpensesChart.js
│   │   └── ExpensesList.js
│   └── NewExpense/
│       ├── ExpenseForm.css
│       ├── ExpenseForm.js
│       ├── NewExpense.css
│       └── NewExpense.js
├── App.css
├── App.js
├── index.css
└── index.js
Como Contribuir
Se você quiser contribuir com o projeto, siga os passos abaixo:

Faça um fork deste repositório.

Crie uma nova branch com a sua feature:

Bash

git checkout -b minha-nova-feature
Faça suas alterações e commit suas mudanças:

Bash

git commit -m 'feat: Adicionando uma nova feature'
Faça o push da sua branch para o repositório original:

Bash

git push origin minha-nova-feature
Abra um Pull Request.

Licença
Este projeto está sob a licença MIT. Veja o arquivo LICENSE.md para mais detalhes.
