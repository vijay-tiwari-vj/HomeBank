import React, { useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { TransactionContext } from '../contexts/TransactionContext';
import DebitForm from './debitForm';
import CreditForm from './creditForm';

export const Home = () => {
  const { balance } = useContext(TransactionContext);

  return (
    <View style={styles.home}>
      <Text style={styles.text}>Debit Balance</Text>
      <DebitForm />

      <Text style={styles.text}>Credit Balance</Text>
      <CreditForm />

      <View style={styles.balance}>
        <Text>{balance}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  home: {
    flex: 1
  },
  text: {
    fontFamily: 'montserrat-regular',
    fontSize: 18,
    paddingHorizontal: 20,
    paddingTop: 20
  },
  balance: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 60,
    padding: 20,
    backgroundColor: 'green'
  }
});

export default Home;