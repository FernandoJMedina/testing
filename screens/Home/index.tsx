import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { RootStack } from "../../App";

type ScreenPaths = {
  path: keyof RootStack;
};

const SCREENS_PATHS: ScreenPaths[] = [
  {
    path: "Notification",
  },
  {
    path: "Biometrics",
  },
];

type HomeProps = NativeStackScreenProps<RootStack, "Home">;

export default function Home({ navigation }: HomeProps) {
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
