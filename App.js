// import 'react-native-get-random-values'; (expo sdk 39+)
import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as Font from 'expo-font';

import Tabs from './routes/Tabs';
import Header from './shared/header';
import { AppLoading } from 'expo';
import TransactionContextProvider from './contexts/TransactionContext';

const getFonts = () => Font.loadAsync({
  'montserrat-regular': require('./assets/fonts/Montserrat-Regular.ttf'),
  'montserrat-bold': require('./assets/fonts/Montserrat-Bold.ttf')
});

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (fontsLoaded) {
    return (
      <NavigationContainer>
        <StatusBar style="auto" />
        <Header />
        <TransactionContextProvider>
          <Tabs />
        </TransactionContextProvider>
      </NavigationContainer>
    );
  } else {
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={() => setFontsLoaded(true)}
      />
    )
  }
}