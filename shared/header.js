import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { globalStyles } from '../styles/global';

export const Header = () => {
  return (
    <View style={[globalStyles.container, styles.header]}>
      <Text style={globalStyles.headerText}>HomeBank</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    height: 80,
    paddingVertical: 35,
    backgroundColor: '#fafafa'
  }
})

export default Header;