import React, { useState } from 'react';


function TransactionComponent() {
  const [transactions, setTransactions] = useState([]);

  async function getTransactions() {
    const url = process.env.REACT_APP_API_URL + '/transactions';
    const response = await fetch(url);
    return await response.json();
  }
  async function handleDelete(transactionId) {
    const url = process.env.REACT_APP_API_URL + '/transaction/' + transactionId;
    try {
      const response = await fetch(url, {
        method: 'DELETE'
      });
      if (response.ok) {
        setTransactions(transactions.filter(transaction => transaction._id !== transactionId));
      } else {
        console.error('Failed to delete transaction');
      }
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  }

  const handleShowTransactions = async () => {
    const fetchedTransactions = await getTransactions();
    setTransactions(fetchedTransactions);
  };
  let balance=0;
  for(const transaction of transactions){
    balance=balance+transaction.price
  }

  return (
    <div>
      <button className='button' onClick={handleShowTransactions}>Show Transactions</button>
      <div className="transactions">
     { transactions.length>0 && transactions.map(transaction=>(
      <div className="transaction" key={transaction._id}>
          <div className="left">
          <div className='name'>{transaction.name}</div>
          <div className="Description">{transaction.description}</div>
          </div>
          <div className="right">
          <div className={"price " + (transaction.price < 0 ? 'red' : 'green')}>
           {transaction.price}
          </div>
          <div className="datetime">{transaction.datetime}</div>
          </div>
          <div className='delete'>
          <button onClick={() => handleDelete(transaction._id)}>delete</button>
          </div>
        </div>
     ))}
        
        
      

      </div>
    
    </div>
  );
}

export default TransactionComponent ;
