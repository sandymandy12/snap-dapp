import {
  GOOGLE_WEB_CLIENT_ID,
  GOOGLE_IOS_CLIENT_ID,
  GOOGLE_WEB_CLIENT_SECRET,
} from "@env";
import * as Google from "expo-auth-session/providers/google";
import { useEffect } from "react";
import { useStore } from "../stores/store";

const useSignInGoogle = () => {
  const { signInGoogle } = useStore().userStore;

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: GOOGLE_WEB_CLIENT_ID,
    iosClientId: GOOGLE_IOS_CLIENT_ID,
  });

  useEffect(() => {
    if (response) {
      void signInGoogle(response);
    }
  }, [response]);

  const singIn = () => {
    try {
      void promptAsync();
    } catch (err) {
      //
    }
  };

  return [singIn, !request] as const;
};

export default useSignInGoogle;
