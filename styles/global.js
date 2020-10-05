import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    padding: 20
  },
  headerText: {
    fontFamily: 'montserrat-bold',
    fontSize: 24,
    color: '#0d47a1'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 6
  },
  errorText: {
    color: '#ef5350',
    fontFamily: 'montserrat-regular',
    marginBottom: 10,
    marginTop: 6,
    paddingLeft: 10
  }
});