import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import { Alert, PermissionStatus, PermissionsAndroid, Platform } from 'react-native';
import { useEffect } from 'react';

export async function requestNotificationsPermission(): Promise<
  FirebaseMessagingTypes.AuthorizationStatus | PermissionStatus
> {
  if (Platform.OS === 'ios') {
    return messaging().requestPermission();
  }

  // Required for Android on API Level 33+
  return PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
  );
}

export default function useNotifications() {
  requestNotificationsPermission()
    .then((status) => {
      console.log('Authorization status:', status);
    })
    .catch((error) => {
      console.log('Authorization status error:', error);
    });

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);
}
