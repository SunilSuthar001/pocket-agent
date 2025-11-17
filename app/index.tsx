

import { fireStoreDB } from "@/config/FirebaseConfig";
import Colors from "@/shared/Colors";
import { useAuth, useSSO, useUser } from "@clerk/clerk-expo";
import * as AuthSession from "expo-auth-session";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { doc, setDoc } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

// Warm up browser for SSO performance
export const useWarmUpBrowser = () => {
  useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

// Required for Clerk + Expo WebBrowser Auth
WebBrowser.maybeCompleteAuthSession();

export default function Index() {
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const { startSSOFlow } = useSSO();
  const {user }=useUser();
  console.log("Current User:",user);
   console.log("User email:------", user?.primaryEmailAddress?.emailAddress);
  const [loading , setLoading]=useState(true);
  useWarmUpBrowser();

  useEffect(() => {
    if (isSignedIn) {
      //router.push("/"); // Redirect to home or main screen when signed in
      // router.replace({ pathname: "/(tabs)/Home" } as any);
      router.replace("/(tabs)/Home");
    }

    if(isSignedIn!==undefined   ){
      setLoading(false);
    }
  }, [isSignedIn]);

  const onLoginPress = useCallback(async () => {
    try {
      const { createdSessionId, setActive, signIn, signUp } = await startSSOFlow({
        strategy: "oauth_google",
        redirectUrl: AuthSession.makeRedirectUri({
          path: "sso-callback", // optional: match your app's redirect path
        }),
      });

      if(signUp){
await setDoc(doc(fireStoreDB ,'users',signUp?.emailAddress??""),{
  email:signUp.emailAddress,
  name:signUp.firstName+' '+signUp.lastName,
  joinDate:Date.now(),
  credits:20
})
      }

      if (createdSessionId) {
         setActive!({ session: createdSessionId });
        router.push("/");
      } else {
        // Handle fallback if session not created
        console.warn("No session created during SSO flow.");
      }
    } catch (err) {
      console.error("Error during SSO flow:", err);
      console.error(JSON.stringify(err, null, 2));
    }
  }, [startSSOFlow]);

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.background,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: "#0066cc",
          marginBottom: 10,
          textAlign: "center",
        }}
      >
        Welcome to AI Pocket Agent
      </Text>

      <Text
        style={{
          fontSize: 14,
          color: "#333333",
          textAlign: "center",
          marginBottom: 30,
        }}
      >
        Your Ultimate AI Personal Agent to make life easier.{"\n"}
        Try it Today, Completely Free!
      </Text>
      {
        !loading &&(

      <TouchableOpacity
        onPress={onLoginPress}
        style={{
          backgroundColor: "#4285F4",
          paddingVertical: 12,
          paddingHorizontal: 40,
          borderRadius: 8,
        }}
      >
        <Text
          style={{
            color: "#ffffff",
            fontSize: 16,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          GET STARTED
        </Text>
      </TouchableOpacity>
        )
      }
      {
        loading ==undefined &&(
          <View style={{alignContent:'center'}}>
          <ActivityIndicator size={'large'}/>
          </View>
        )
      }

    </View>
  );
}
