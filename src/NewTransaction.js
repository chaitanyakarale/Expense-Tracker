import React, { useState } from 'react';


function NewTransaction() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [datetime, setDatetime] = useState("");

  async function addNewTransaction(ev) {
    ev.preventDefault();
    const url = process.env.REACT_APP_API_URL + '/transaction';
    const price = name.split(' ')[0];
    fetch(url, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        name: name.substring(price.length + 1),
        price,
        description,
        datetime
      })
    }).then(response => {
      response.json().then(json => {
        setName("");
        setDatetime('');
        setDescription('');
        console.log('result', json);
      });
    });
  }

  return (
    <div className='new-transaction'>
      <form onSubmit={addNewTransaction}>
        <label>Name</label>
        <input className='reduced-opacity-placeholder' type="text"   placeholder='+Amount Name' value={name} onChange={e => setName(e.target.value)} /><br />
        <label>Description</label>
        <input type="text" value={description} onChange={e => setDescription(e.target.value)} /><br />
        <label>Datetime</label>
        <input type="datetime-local" value={datetime} onChange={e => setDatetime(e.target.value)} /><br />
        <button type="submit">Add Transaction</button>
      </form>
    </div>
  );
}

export default NewTransaction;
