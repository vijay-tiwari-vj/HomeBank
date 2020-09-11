import React, { useContext } from 'react';
import { StyleSheet, Button, TextInput, View, Text } from 'react-native';
import { globalStyles } from '../styles/global';
import { Formik } from 'formik';
import { TransactionContext } from '../contexts/TransactionContext';

export const DebitForm = () => {
  const { debitBalance } = useContext(TransactionContext);

  return (
    <View style={globalStyles.container}>
      <Formik
        initialValues={{ purpose: '', amount: '' }}
        onSubmit={(values) => {
          console.log(values);
          debitBalance(values.purpose, values.amount);
        }}
      >
        {(props) => (
          <View>
            <TextInput
              style={globalStyles.input}
              placeholder='purpose'
              onChangeText={props.handleChange('purpose')}
              value={props.values.purpose}
            />
            <TextInput
              style={globalStyles.input}
              placeholder='amount'
              onChangeText={props.handleChange('amount')}
              value={props.values.amount}
              keyboardType='numeric'
            />

            <Button title='debit' color='crimson' onPress={props.handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  )
}

export default DebitForm;