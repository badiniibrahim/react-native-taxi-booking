import { View, Text, Image, Alert } from "react-native";
import React from "react";
import CustomButton from "./CustomButton";
import { icons } from "@/constants";
import { googleOAuth } from "@/lib/auth";
import { useOAuth } from "@clerk/clerk-expo";
import { router } from "expo-router";

const OAuth = () => {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const handleGoogleSignIn = async () => {
    const result = await googleOAuth(startOAuthFlow);

    if (result.code === "session_exists") {
      Alert.alert("Success", "Session exists. Redirecting to home screen.");
      router.replace("/(root)/(tabs)/home");
    }

    Alert.alert(result.success ? "Success" : "Error", result.message);
  };

  return (
    <View>
      <View className="flex flex-row justify-center items-center mt-4 gap-x-3">
        <View className="flex-1 h-[1px] bg-general-100" />
        <Text className="text-lg text-[#858585] font-outfit">
          Or continue with
        </Text>
        <View className="flex-1 h-[1px] bg-general-100" />
      </View>

      <View className="flex items-center justify-center">
        <CustomButton
          title="Log In with Google"
          className="w-11/12 mt-10 flex items-center justify-center shadow-none"
          IconLeft={() => (
            <Image
              source={icons.google}
              resizeMode="contain"
              className="w-5 h-5 mx-2"
            />
          )}
          bgVariant="outline"
          textVariant="primary"
          onPress={handleGoogleSignIn}
        />
      </View>
    </View>
  );
};

export default OAuth;