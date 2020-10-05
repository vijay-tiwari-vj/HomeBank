import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import { globalStyles } from '../styles/global';

export const Header = () => {
  return (
    <View style={[globalStyles.container, styles.header]}>
      <FontAwesome5
        name="piggy-bank"
        size={24}
        color="#0d47a1"
        style={styles.piggy}
      />
      <Text style={globalStyles.headerText}>HomeBank</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    height: 90,
    alignItems: 'flex-end',
    backgroundColor: '#fafafa',
  },
  piggy: {
    marginRight: 5,
    marginBottom: 5
  }
})

export default Header;