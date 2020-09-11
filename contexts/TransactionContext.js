import React, { createContext, useState } from 'react';

import moment from 'moment';
import { v1 as uuid } from 'uuid';

export const TransactionContext = createContext();

export const TransactionContextProvider = (props) => {
  const [balance, setBalance] = useState(0);
  const [transaction, setTransaction] = useState([
    { purpose: 'buy snacks', amount: 100, date: '09/09/2020 19:43', debit: true, key: '1' },
    { amount: 200, date: '09/09/2020 19:43', debit: false, key: '2' }
  ]); // if (transaction.debit) { return (debit transaction card) else return (credit transaction card)}
  // add objects that look similar to this based on function call (debit/credit)

  const creditBalance = (amount) => {
    let updatedBalance = balance + parseFloat(amount);
    let date = moment()
      .utcOffset('+05:30')
      .format('DD-MM-YY hh:mm a')
    setBalance(updatedBalance);
    setTransaction([{
      amount, date, debit: false, key: uuid()
    }, ...transaction])
  };

  const debitBalance = (purpose, amount) => {
    let updatedBalance = balance - parseFloat(amount);
    let date = moment()
      .utcOffset('+05:30')
      .format('DD-MM-YY hh:mm a')
    setBalance(updatedBalance);
    setTransaction([{
      purpose, amount, date, debit: true, key: uuid()
    }, ...transaction]);
  };

  return (
    <TransactionContext.Provider value={{ balance, transaction, creditBalance, debitBalance }}>
      {props.children}
    </TransactionContext.Provider>
  );
};

export default TransactionContextProvider;