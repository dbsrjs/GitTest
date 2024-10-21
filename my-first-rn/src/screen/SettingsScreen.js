import { StyleSheet, View } from 'react-native';
import Button, { ButtonTypes } from '../components/Button';

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Button
        title="로그아웃"
        onPress={() => setUser(null)}
        ButtonType={ButtonTypes.DANGER}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});

export default SettingsScreen;
