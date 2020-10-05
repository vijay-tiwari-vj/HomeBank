import React, { useContext, useMemo } from 'react';
import { StyleSheet, View, Text, FlatList, Button, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { TransactionContext } from '../contexts/TransactionContext';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const History = () => {
  const { transaction, removeTransaction, clearAppData } = useContext(TransactionContext);

  const handleDelete = (item) => (
    Alert.alert(
      'Warning!',
      'Deleting this transaction will also update balance.',
      [
        {
          text: 'cancel',
          onPress: () => console.log('Delete Cancelled!')
        },
        {
          text: 'delete',
          onPress: () => removeTransaction(item)
        }
      ]
    )
  );

  const handleReset = () => (
    Alert.alert(
      'Warning!',
      'This action will delete all your app data including balance and transaction details.',
      [
        {
          text: 'cancel',
          onPress: () => console.log('Reset Cancelled!')
        },
        {
          text: 'delete',
          onPress: () => clearAppData()
        }
      ]
    )
  );

  let renderItem = ({ item }) => {
    if (item.debit) {
      return (
        <View style={styles.card}>
          <View style={styles.info}>
            <Text style={styles.purpose}>{item.purpose}</Text>
            <TouchableOpacity
              style={styles.deleteIcon}
              onPress={() => handleDelete(item)}
            >
              <MaterialIcons
                name="delete"
                size={24}
                color="#0d47a1"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.info}>
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.debit}>-{item.amount}</Text>
          </View>
        </View>
      )
    } else {
      return (
        <View style={styles.card}>
          <View style={styles.info}>
            <Text style={styles.delete}>Credit</Text>
            <TouchableOpacity
              style={styles.deleteIcon}
              onPress={() => handleDelete(item)}
            >
              <MaterialIcons
                name="delete"
                size={24}
                color="#0d47a1"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.info}>
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.credit}>+{item.amount}</Text>
          </View>
        </View>
      )
    }
  };

  let cards = useMemo(() => {
    return (
      <FlatList
        style={styles.list}
        showsVerticalScrollIndicator={false}
        data={transaction}
        renderItem={renderItem}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={200}
        keyExtractor={item => item.key}
      />
    );
  }, [transaction]);

  let showTransaction;
  if (transaction.length > 0) {
    showTransaction = (cards);
  } else {
    showTransaction = (
      <View
        style={[styles.list, { alignItems: 'center', justifyContent: 'center' }]}
      >
        <Text>No transactions! Start by adding balance to your account..
        </Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {showTransaction}

      <Button color='#ef5350' title='reset app' onPress={handleReset} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  list: {
    height: '90%',
    marginBottom: 25
  },
  card: {
    borderRadius: 6,
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#fff'
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  purpose: {
    width: '75%',
    fontSize: 16,
    paddingBottom: 20
  },
  delete: {
    fontSize: 16,
    paddingBottom: 20
  },
  deleteIcon: {
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2
  },
  date: {
    fontSize: 14
  },
  debit: {
    fontWeight: 'bold',
    color: '#ef5350',
  },
  credit: {
    fontWeight: 'bold',
    color: '#009624',
  }
});

export default History;