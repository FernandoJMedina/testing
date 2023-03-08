import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { RootStack } from "../../App";
import { BlurView } from "@react-native-community/blur";

type BlurProps = NativeStackScreenProps<RootStack, "Blur">;

export default function Blur({ navigation }: BlurProps) {
  return (
    <View style={styles.container}>
      <Image
        key={"blurryImage"}
        source={{
          uri: "https://images.pexels.com/photos/7135121/pexels-photo-7135121.jpeg",
        }}
        style={styles.absolute}
      />
      <Text style={{ fontSize: 40 }}>PUTO EL QUE LEE</Text>
      {/* in terms of positioning and zIndex-ing everything before the BlurView will be blurred */}
      <BlurView
        style={styles.absolute}
        blurType='light'
        blurAmount={7}
        reducedTransparencyFallbackColor='white'
      />
      <Text>
        I'm the non blurred text because I got rendered on top of the BlurView
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
