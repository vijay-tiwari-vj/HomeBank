import React, { useContext } from 'react';
import { StyleSheet, Button, TextInput, View, Text } from 'react-native';

import { globalStyles } from '../styles/global';
import { Formik } from 'formik';
import * as yup from 'yup';
import { TransactionContext } from '../contexts/TransactionContext';

export const DebitForm = () => {
  const { balance, debitBalance } = useContext(TransactionContext);

  const debitSchema = yup.object({
    purpose: yup.string()
      .required()
      .min(4),
    amount: yup.number()
      .required()
      .test('greater-than-0', 'Amount must be greater than 0', (val) => {
        return parseFloat(val) > 0
      })
      .test('low-balance', 'Insufficient balance', (val) => {
        return parseFloat(val) <= balance
      })

  });

  return (
    <View style={globalStyles.container}>
      <Formik
        initialValues={{ purpose: '', amount: '' }}
        validationSchema={debitSchema}
        onSubmit={(values, actions) => {
          actions.resetForm();
          debitBalance(values.purpose, values.amount);
        }}
      >
        {(props) => (
          <View>
            <TextInput
              multiline
              style={globalStyles.input}
              placeholder='purpose'
              onChangeText={props.handleChange('purpose')}
              value={props.values.purpose}
              onBlur={props.handleBlur('purpose')}
            />
            <Text style={globalStyles.errorText}>{props.touched.purpose && props.errors.purpose}</Text>

            <TextInput
              style={globalStyles.input}
              placeholder='amount'
              onChangeText={props.handleChange('amount')}
              value={props.values.amount.replace(/\s/g, '')}
              keyboardType='numeric'
              onBlur={props.handleBlur('amount')}
            />
            <Text style={globalStyles.errorText}>{props.touched.amount && props.errors.amount}</Text>

            <Button title='debit' color='#0d47a1' onPress={props.handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  )
}

export default DebitForm;