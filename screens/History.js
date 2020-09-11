import React, { useContext } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';

import { globalStyles } from '../styles/global';
import { TransactionContext } from '../contexts/TransactionContext';

export const History = () => {
  const { transaction } = useContext(TransactionContext);

  return (
    <View style={globalStyles.container}>
      <FlatList
        data={transaction}
        renderItem={({ item }) => {
          if (item.debit) {
            return (
              <View style={styles.card}>
                <Text>{item.purpose}</Text>
                <View style={styles.info}>
                  <Text>{item.date}</Text>
                  <Text style={styles.debit}>-{item.amount}</Text>
                </View>
              </View>
            )
          } else {
            console.log(transaction);
            return (
              <View style={styles.card}>
                <View style={styles.info}>
                  <Text>{item.date}</Text>
                  <Text style={styles.credit}>+{item.amount}</Text>
                </View>
              </View>
            )
          }
        }}
        keyExtractor={item => item.key}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#fff'
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  debit: {
    color: 'crimson',
  },
  credit: {
    color: 'green',
    // justifyContent: 'space-between'
  }
});

export default History;