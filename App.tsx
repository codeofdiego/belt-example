import { NavigationContainer } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import RootNavigator from 'src/navigators/RootNavigator';
import Providers, { Provider } from 'src/components/Providers';

// Register background handler
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('Message handled in the background!', remoteMessage);
});

// Add providers to this array
const providers: Provider[] = [
  (children) => <NavigationContainer>{children}</NavigationContainer>,
  // CODEGEN:BELT:PROVIDERS - do not remove
];

export default function App() {
  return (
    <Providers providers={providers}>
      <RootNavigator />
    </Providers>
  );
}
