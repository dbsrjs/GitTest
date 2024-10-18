import { StatusBar } from 'expo-status-bar';
import { UserProvider } from 'react';
import Navigation from './navigations/Navigation';

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <UserProvider>
      <StatusBar style="dark" />
      <Navigation />
    </UserProvider>
  );
};

export default App;
