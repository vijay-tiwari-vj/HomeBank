import React, { createContext, useState, useEffect } from 'react';
import { AsyncStorage, ToastAndroid } from 'react-native';

import moment from 'moment';
// import { v1 as uuid } from 'uuid';

export const TransactionContext = createContext();

export const TransactionContextProvider = (props) => {
  const [balance, setBalance] = useState(0);
  const [transaction, setTransaction] = useState([]);

  const storeData = async () => {
    try {
      await AsyncStorage.setItem('balance', JSON.stringify(balance));
      await AsyncStorage.setItem('transaction', JSON.stringify(transaction));
      // console.log('stored!');
    } catch (err) {
      console.log(err);
    }
  }

  const getData = async () => {
    try {
      let balance = await AsyncStorage.getItem('balance');
      let transaction = await AsyncStorage.getItem('transaction');

      balance = JSON.parse(balance);
      transaction = JSON.parse(transaction);

      if (balance !== null &&
        transaction !== null) {
        console.log(balance);
        console.log(transaction);
        setBalance(balance);
        setTransaction(transaction);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    storeData();
  }, [balance, transaction]);

  const totalCredit = transaction.reduce((s, t) => {
    let credit = !(t.debit);
    if (credit) {
      s += parseFloat(t.amount);
    }
    return s;
  }, 0);

  const totalDebit = transaction.reduce((s, t) => {
    let debit = t.debit;
    if (debit) {
      s += parseFloat(t.amount);
    }
    return s;
  }, 0);

  // console.log(totalCredit);
  // console.log(totalDebit);
  console.log(transaction.length);

  // Remove a Transaction from History
  const deleteTransactionToast = () => {
    ToastAndroid.showWithGravityAndOffset(
      "Transaction deleted!",
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      0,
      110
    );
  };

  const deleteNotPossibleToast = () => {
    ToastAndroid.showWithGravityAndOffset(
      "Can't remove this transaction!",
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      0,
      110
    );
  };

  const removeTransaction = async (item) => {
    try {
      // console.log(item.debit);
      let updatedTransaction;
      if (item.debit) {

        const updatedBalance = (Math.round((parseFloat(balance) + parseFloat(item.amount)) * 100) / 100).toFixed(2);
        setBalance(updatedBalance);

        updatedTransaction = transaction.filter(t => {
          return t.key !== item.key;
        });
        setTransaction(updatedTransaction);
        console.log(`${item.key} deleted!`);
        deleteTransactionToast();

      } else if (!item.debit && parseFloat(item.amount) <= balance) {

        const updatedBalance = (Math.round((parseFloat(balance) - parseFloat(item.amount)) * 100) / 100).toFixed(2);
        setBalance(updatedBalance);

        updatedTransaction = transaction.filter(t => {
          return t.key !== item.key;
        });
        setTransaction(updatedTransaction);
        console.log(`${item.key} deleted!`);
        deleteTransactionToast();

      } else {
        console.log('Delete not possible!');
        deleteNotPossibleToast();
      }
    } catch (err) {
      console.log(err);
    }
  }

  // App Reset
  const resetToast = () => {
    ToastAndroid.showWithGravityAndOffset(
      "Reset done!",
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      0,
      110
    );
  };

  const clearAppData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      await AsyncStorage.multiRemove(keys);
      console.log('App data cleared!');
      setBalance(0);
      setTransaction([]);
      resetToast();
    } catch (err) {
      console.log(err);
    }
  }

  // Credit
  const creditToast = () => {
    ToastAndroid.showWithGravityAndOffset(
      "Amount added!",
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      0,
      110
    );
  };

  const creditBalance = (amount) => {
    let updatedBalance = (Math.round((parseFloat(balance) + parseFloat(amount)) * 100) / 100).toFixed(2);
    let date = moment()
      .utcOffset('+05:30')
      .format('DD-MMM-YYYY hh:mm:ss a')
      .replace(/-/g, ' ')
    setBalance(updatedBalance);
    setTransaction([{
      amount: (Math.round(parseFloat(amount) * 100) / 100).toFixed(2), date, debit: false, key: date
    }, ...transaction]);
    creditToast();
  };

  // Debit
  const debitToast = () => {
    ToastAndroid.showWithGravityAndOffset(
      "Amount debited!",
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      0,
      110
    );
  };

  const debitBalance = (purpose, amount) => {
    let updatedBalance = (Math.round((parseFloat(balance) - parseFloat(amount)) * 100) / 100).toFixed(2);
    let date = moment()
      .utcOffset('+05:30')
      .format('DD-MMM-YYYY hh:mm:ss a')
      .replace(/-/g, ' ')
    setBalance(updatedBalance);
    setTransaction([{
      purpose, amount: (Math.round(parseFloat(amount) * 100) / 100).toFixed(2), date, debit: true, key: date
    }, ...transaction]);
    debitToast();
  };

  return (
    <TransactionContext.Provider value={{ balance, transaction, creditBalance, debitBalance, removeTransaction, clearAppData }}>
      {props.children}
    </TransactionContext.Provider>
  );
};

export default TransactionContextProvider;