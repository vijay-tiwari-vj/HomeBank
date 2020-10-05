import React, { useContext } from 'react';
import { StyleSheet, Button, TextInput, View, Text, Keyboard } from 'react-native';

import { globalStyles } from '../styles/global';
import { Formik } from 'formik';
import * as yup from 'yup';
import { TransactionContext } from '../contexts/TransactionContext';

export const CreditForm = () => {
  const { creditBalance } = useContext(TransactionContext);

  const creditSchema = yup.object({
    amount: yup.number()
      .required()
      .test('greater-than-0', 'Amount must be greater than 0', (val) => {
        return parseFloat(val) > 0
      })
  });

  return (
    <View style={globalStyles.container}>
      <Formik
        initialValues={{ amount: '' }}
        validationSchema={creditSchema}
        onSubmit={(values, actions) => {
          actions.resetForm();
          creditBalance(values.amount);
        }}
      >
        {(props) => (
          <View>
            <TextInput
              style={globalStyles.input}
              placeholder='amount'
              onChangeText={props.handleChange('amount')}
              value={props.values.amount.replace(/\s/g, '')}
              keyboardType='numeric'
              onBlur={props.handleBlur('amount')}
            />
            <Text style={globalStyles.errorText}>{props.touched.amount && props.errors.amount}</Text>

            <Button title='credit' color='#0d47a1' onPress={props.handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  )
}

export default CreditForm;