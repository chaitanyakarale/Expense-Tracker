import { useEffect, useState } from 'react';
import './App.css';
import TransactionComponent from './TransactionComponent';
import NewTransaction from './NewTransaction';

function App() {

  const [transactions, setTransactions] = useState([]);  // Hooks must be called unconditionally
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showNewTransaction, setShowNewTransaction] = useState(false);
  const [buttonText, setButtonText] = useState('New Transaction');

  useEffect(() => {
    getTransaction()
      .then(setTransactions)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  async function getTransaction() {
    try {
      const url = process.env.REACT_APP_API_URL + '/transactions';
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch transactions');
      }
      return await response.json();
    } catch (error) {
      setError(error.message);
      return [];
    }
  }

  // No conditional returns before hooks
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Calculate balance, income, and expense
  let balance = 0;
  let income = 0;
  let expense = 0;

  for (const transaction of transactions) {
    balance += transaction.price;
    if (transaction.price > 0) {
      income += transaction.price;
    } else {
      expense += transaction.price;
    }
  }

  const toggleNewTransaction = () => {
    setShowNewTransaction(!showNewTransaction);
    setButtonText(showNewTransaction ? 'New Transaction' : 'Close');
  };

  return (
    <main>
      <h1>Transaction Tracker</h1>
      <h3>Your Balance</h3>
      <h2 className={"price " + (balance < 0 ? 'red' : 'green')}>Rs.{balance}</h2>

      <div className='details'>
        <div className='income'>
          <h3 className={"price " + (income < 0 ? 'red' : 'green')}>Income<br />Rs.{income}</h3>
        </div>
        <div className='expense'>
          <h3 className={"price " + (expense < 0 ? 'red' : 'green')}>Expense<br />Rs.{Math.abs(expense)}</h3>
        </div>
      </div>

      <div className='two'>
        <div>
          <button
            className={"button new-transaction-button " + (buttonText === 'Close' ? 'btred' : 'btgreen')}
            onClick={toggleNewTransaction}
          >
            {buttonText}
          </button>
          {showNewTransaction && <NewTransaction />}
        </div>

        <div>
          <TransactionComponent transactions={transactions} />
        </div>
      </div>
    </main>
  );
}

export default App;
