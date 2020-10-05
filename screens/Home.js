import React, { useContext } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';

import { TransactionContext } from '../contexts/TransactionContext';
import DebitForm from './debitForm';
import CreditForm from './creditForm';

export const Home = () => {
  const { balance } = useContext(TransactionContext);

  return (
    <KeyboardAvoidingView
      behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Text style={styles.text}>Debit Balance</Text>
          <DebitForm />

          <Text style={styles.text}>Credit Balance</Text>
          <CreditForm />
        </View>

        <View style={styles.balWrapper}>
          <View style={styles.balance}>
            <MaterialIcons
              name="account-balance-wallet" size={30}
              color="#fafafa"
              style={styles.balIcon}
            />
            <Text style={styles.balanceText}>
              Available Balance: <Text style={styles.balBold}>&#8377;{balance}</Text>
            </Text>
          </View>
        </View>

      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  inner: {
    height: '90%'
  },
  balWrapper: {
    height: '10%'
  },
  text: {
    fontFamily: 'montserrat-regular',
    fontSize: 18,
    paddingHorizontal: 20,
    paddingTop: 20
  },
  balance: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: -1,
    width: '100%',
    height: 55,
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#0d47a1'
  },
  balIcon: {
    marginRight: 5
  },
  balanceText: {
    fontFamily: 'montserrat-regular',
    fontSize: 18,
    color: '#fafafa',
  },
  balBold: {
    fontFamily: 'Roboto',
    fontWeight: 'bold'
  }
});

export default Home;