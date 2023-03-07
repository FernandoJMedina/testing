import { useEffect, useState, useCallback } from "react";
import { Alert } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import {
  isEnabledSelector,
  toggleEnableHandler,
  useBiometricsStore,
} from "../zustand/security";

// Check docs
// https://docs.expo.dev/versions/latest/sdk/local-authentication/

export function useBiometrics() {
  const toggleEnable = useBiometricsStore(toggleEnableHandler);
  const isEnabled = useBiometricsStore(isEnabledSelector);
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [securityLevel, setSecurityLevel] =
    useState<LocalAuthentication.SecurityLevel>();

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const level = await LocalAuthentication.getEnrolledLevelAsync();
      setSecurityLevel(level);

      /**
       * Indicates no enrolled authentication.
       */
      //NONE = 0,
      /**
       * Indicates non-biometric authentication (e.g. PIN, Pattern).
       */
      //SECRET = 1,
      /**
       * Indicates biometric authentication.
       */
      //BIOMETRIC = 2,
    })();
  }, []);

  async function onAuthenticate() {
    try {
      // CUSTOMIZE WORDING
      const auth = await LocalAuthentication.authenticateAsync();

      setIsAuthenticated(auth.success);

      // ********************
      // console.log(auth);

      // IF BIOMETRICS IS NOT ENROLLED (NOT SETTED) ON DEVICE  THIS METHOD WILL RETURN
      // {"error": "not_enrolled", "success": false, "warning": "KeyguardManager#isDeviceSecure() returned false"}

      // THERE IS ANOTHER METHOD WHICH TELLS YOU WHAT KING OF SECURITY HAS THE DEVICE ENROLLED (getErrolledLevelAsync())

      // SO YOU SHOULD CALL THIS METHOD ONLY IF THE SECURITY LVL IS !== 0

      // ********************
    } catch (error) {
      // BIOMETRIC FATAL ERROR
      console.log({ error });
    }
  }

  const onAlertPrompt = useCallback(() => {
    if (securityLevel === 0 || isEnabled) return;

    Alert.alert("Usar seguridad del dispositivo", "Para iniciar sesión", [
      {
        text: "Cancelar",
        onPress: () => {
          // handle anything you want, if not, delete property (global state initialize false)
          console.log("Seguir usando pin");
          toggleEnable(false);
        },
      },
      {
        text: "Sí, aumentar mi seguridad",
        onPress: () => {
          // handle global state for profile switch indicator
          console.log("Aumentar mi seguridad");
          toggleEnable(true); // toggle global state
          onAuthenticate(); // execute interface
        },
        style: "cancel", // bold on ios
      },
    ]);
  }, [securityLevel, isEnabled]);

  return {
    isBiometricSupported, // need it to check if device supports biometrics
    securityLevel, // need it to check what kind of authentication is enrolled on the device.
    onAuthenticate, // need it to open biometrics interface
    isAuthenticated, // need it to check if has authenticated with biometrics
    setIsAuthenticated, // just in case you need to log out,
    onAlertPrompt, // alert prompt
  };
}
