import * as React from "react";
import { Button, View, Text, Switch } from "react-native";
import {
  isEnabledSelector,
  toggleEnableHandler,
  useBiometricsStore,
} from "../../zustand/security/index";
import { useBiometrics } from "../../hooks/useBiometrics";

export default function App() {
  const isEnabled = useBiometricsStore(isEnabledSelector);
  const toggleEnable = useBiometricsStore(toggleEnableHandler);
  const {
    isAuthenticated,
    securityLevel,
    isBiometricSupported,
    onAuthenticate,
    setIsAuthenticated,
    onAlertPrompt,
  } = useBiometrics();

  console.log(isBiometricSupported, isAuthenticated, securityLevel);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {securityLevel !== 0 && isEnabled && (
        <Button title='Open biometrics' onPress={onAuthenticate} />
      )}

      {!isEnabled && <Button title='Alert' onPress={onAlertPrompt} />}

      {isAuthenticated && isEnabled && (
        <Text style={{ marginTop: 100 }}>Hola tarola, estoy autenticao..</Text>
      )}

      <Text style={{ marginTop: 100, marginBottom: 20 }}>
        Quiero aumentar medida de seguridad: {`${isEnabled}`}
      </Text>

      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor='#3e3e3e'
        onValueChange={() => toggleEnable(!isEnabled)}
        value={isEnabled}
      />
    </View>
  );
}
