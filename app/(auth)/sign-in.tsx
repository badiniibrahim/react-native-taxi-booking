import { Alert, ScrollView, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import { Link, useRouter } from "expo-router";
import OAuth from "@/components/OAuth";
import { useSignIn } from "@clerk/clerk-expo";

const SignUp = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(root)/(tabs)/home");
      } else {
        console.log(JSON.stringify(signInAttempt, null, 2));
        Alert.alert("Error", "Log in failed. Please try again.");
      }
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors[0].longMessage);
    }
  }, [isLoaded, signIn, form.email, form.password, setActive, router]);

  return (
    <ScrollView className="bg-white ">
      <View className="mt-20 ">
        <Text className="flex items-center text-center text-[#0286FF] font-outfitBold text-[30px]">
          Login here
        </Text>
        <Text className="mx-10 text-center mt-10 text-lg text-[#858585]">
          Welcome back you’ve been missed!
        </Text>

        <InputField
          label=""
          placeholder="Enter your email"
          value={form.email}
          onChangeText={(value: string) => setForm({ ...form, email: value })}
        />
        <InputField
          label=""
          placeholder="Enter your password"
          secureTextEntry={true}
          value={form.password}
          onChangeText={(value: string) =>
            setForm({ ...form, password: value })
          }
        />

        <View className="flex items-center justify-center mb-6">
          <CustomButton
            title={"Sign in"}
            onPress={onSignInPress}
            className="w-11/12 mt-10 flex items-center justify-center"
          />
        </View>

        <OAuth />

        <View className="flex items-center justify-center">
          <Link
            href={"/sign-up"}
            className="text-lg text-center text-general-200 mt-10 font-outfit"
          >
            <Text>Don't have an account ? </Text>
            <Text className="text-primary-500"> Sign Up</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;
