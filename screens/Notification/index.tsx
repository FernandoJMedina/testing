import { StatusBar } from "expo-status-bar";
import {
  Button,
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useEffect, useRef, useState } from "react";
import * as Clipboard from "expo-clipboard";
import Toast from "react-native-toast-message";

export default function Notification() {
  const [expoPushToken, setExpoPushToken] = useState<string | undefined>("");
  const [notification, setNotification] =
    useState<Notifications.Notification>();
  const notificationListener = useRef<Clipboard.Subscription | undefined>();
  const responseListener = useRef<Clipboard.Subscription | undefined>();

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then(token => setExpoPushToken(token))
      .catch(err => console.log(err));

    // This listener is fired whenever a notification is received while the app is foregrounded
    // notificationListener.current =
    Notifications.addNotificationReceivedListener(notification => {
      // custom notification to show.
      Toast.show({
        type: "error",
        text1: notification.request.content.title ?? "",
        text2: notification.request.content.body ?? "",
        onPress: () => {
          console.log("NOTIFICACION", JSON.stringify(notification, null, 2));
          setNotification(notification);
          Toast.hide();
        },
      });
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(response => {
        console.log("RESPUESTA", JSON.stringify(response, null, 2));
        setNotification(response.notification);
      });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  async function copy(data?: string) {
    if (!data) return alert("Could not copy");
    await Clipboard.setStringAsync(data);
    ToastAndroid.show("Copiado!", ToastAndroid.SHORT);
  }

  return (
    <>
      <View style={styles.container}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text>
            Title: {notification && notification.request.content.title}
          </Text>
          <Text>Body: {notification && notification.request.content.body}</Text>
          <Text>
            Data:
            {notification && JSON.stringify(notification.request.content.data)}
          </Text>
        </View>
        <Text>{expoPushToken}</Text>
        <StatusBar style='auto' />
        <Button title='Copiar' onPress={() => copy(expoPushToken)} />
      </View>
      <Toast />
    </>
  );
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
