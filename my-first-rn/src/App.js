import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import SignInScreen from './screen/SignInScreen';
import { WHITE } from './colors';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './navigations/AuthStack';

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <AuthStack />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
