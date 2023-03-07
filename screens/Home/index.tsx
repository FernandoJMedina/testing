import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

const SCREENS_PATHS = [
  {
    path: "Notification",
  },
  {
    path: "Biometrics",
  },
];

export default function Home({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      {SCREENS_PATHS.map(p => (
        <Pressable key={p.path} onPress={() => navigation.navigate(p.path)}>
          <View style={styles.row}>
            <Text>{p.path}</Text>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    padding: 20,
  },
});
