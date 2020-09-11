import React, { useContext } from 'react';
import { StyleSheet, Button, TextInput, View, Text } from 'react-native';

import { globalStyles } from '../styles/global';
import { Formik } from 'formik';
import { TransactionContext } from '../contexts/TransactionContext';

export const CreditForm = () => {
  const { creditBalance } = useContext(TransactionContext);

  return (
    <View style={globalStyles.container}>
      <Formik
        initialValues={{ amount: '' }}
        onSubmit={(values) => {
          console.log(values);
          creditBalance(values.amount);
        }}
      >
        {(props) => (
          <View>
            <TextInput
              style={globalStyles.input}
              placeholder='amount'
              onChangeText={props.handleChange('amount')}
              value={props.values.amount}
              keyboardType='numeric'
            />

            <Button title='credit' color='#00bb33' onPress={props.handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  )
}

export default CreditForm;