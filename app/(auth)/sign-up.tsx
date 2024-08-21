import { ScrollView, Text, View, Image, Alert } from "react-native";
import React, { useState } from "react";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import { Link, useRouter } from "expo-router";
import OAuth from "@/components/OAuth";
import { useSignUp } from "@clerk/clerk-expo";
import ReactNativeModal from "react-native-modal";
import { images } from "@/constants";
import { fetchAPI } from "@/lib/fetch";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }
    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setVerification({ ...verification, state: "pending" });
    } catch (err: any) {
      Alert.alert("Error", err.errors[0].longMessage);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      if (completeSignUp.status === "complete") {
        if (completeSignUp.status === "complete") {
          await fetchAPI("/(api)/user", {
            method: "POST",
            body: JSON.stringify({
              name: form.name,
              email: form.email,
              clerkId: completeSignUp.createdUserId,
            }),
          });
        }
        await setActive({ session: completeSignUp.createdSessionId });
        setVerification({ ...verification, state: "success" });
      } else {
        setVerification({
          ...verification,
          state: "failed",
          error: "Verification failed",
        });
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      setVerification({
        ...verification,
        state: "failed",
        error: err[0].longMessage,
      });
      console.error(JSON.stringify(err, null, 2));
    }
  };
  const handleNavigation = () => {
    router.push("/(root)/(tabs)/home");
    setShowSuccessModal(false);
  };

  return (
    <ScrollView className="bg-white ">
      <View className="mt-20 ">
        <Text className="flex items-center text-center text-[#0286FF] font-outfitBold text-[30px]">
          Create Account
        </Text>
        <Text className="mx-10 text-center mt-10 text-lg text-[#858585]">
          Create an account so you can explore all the existing trips.
        </Text>

        <InputField
          label=""
          placeholder="Enter your name"
          value={form.name}
          onChangeText={(value: string) => setForm({ ...form, name: value })}
        />
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

        <View className="flex items-center justify-center">
          <CustomButton
            title={"Sign up"}
            onPress={onSignUpPress}
            className="w-11/12 mt-10 flex items-center justify-center"
          />

          <Link
            href={"/sign-in"}
            className="text-lg text-center text-general-200 mt-10 font-outfit"
          >
            <Text>Already have an account ? </Text>
            <Text className="text-primary-500"> Log in</Text>
          </Link>
        </View>

        <OAuth />
      </View>

      <ReactNativeModal
        isVisible={verification.state === "pending"}
        onModalHide={() => {
          if (verification.state === "success") setShowSuccessModal(true);
        }}
      >
        <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px] justify-center items-center">
          <Text className="font-outfitBold text-2xl mb-2">
            Verification code
          </Text>

          <View className="w-full">
            <InputField
              label={""}
              placeholder={"12345"}
              value={verification.code}
              keyboardType="numeric"
              onChangeText={(code) =>
                setVerification({ ...verification, code })
              }
            />
          </View>
          {verification.error && (
            <Text className="text-red-500 text-sm mt-1 font-outfit">
              {verification.error}
            </Text>
          )}
          <CustomButton
            title="Verify Email"
            onPress={onPressVerify}
            className="mt-5 bg-success-500"
          />
        </View>
      </ReactNativeModal>

      <ReactNativeModal isVisible={showSuccessModal}>
        <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px] justify-center items-center">
          <Image
            source={images.verification}
            className="w-[210px] h-[210px] mx-auto my-5"
          />
          <Text className="text-lg text-[#858585] text-center">
            You have successfully verified your account.
          </Text>
          <CustomButton
            title={"Close"}
            onPress={() => handleNavigation()}
            className="w-11/12 mt-10 flex items-center justify-center"
          />
        </View>
      </ReactNativeModal>
    </ScrollView>
  );
};

export default SignUp;
