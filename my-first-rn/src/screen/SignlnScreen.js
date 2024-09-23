import { StyleSheet, Text, View } from 'react-native';

const SignInScreen = () => {
  return (
    <View style={StyleSheet.container}>
      <Image source={require('../../assets/test.png')} style={styles.image} />
      <Text>SignIn Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default SignInScreen;
