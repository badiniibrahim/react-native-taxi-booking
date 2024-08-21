import { Image, Text, TouchableOpacity, View } from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Swiper from "react-native-swiper";
import { onboarding } from "@/constants";
import CustomButton from "@/components/CustomButton";

const Onboarding = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const isLastSlide = activeIndex === onboarding.length - 1;

  return (
    <SafeAreaView className="flex items-center h-full justify-between bg-white">
      <TouchableOpacity
        className="flex w-full justify-end items-end p-5"
        onPress={() => router.replace("/(auth)/sign-up")}
      >
        <Text className="text-black text-md font-outfitBold">Skip</Text>
      </TouchableOpacity>
      <Swiper
        ref={swiperRef}
        loop={false}
        activeDot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#0286FF] rounded-full" />
        }
        dot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-full" />
        }
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item) => (
          <View key={item.id} className="flex items-center justify-center p-5">
            <Image
              source={item.image}
              className="w-full h-[300px]"
              resizeMode="contain"
            />
            <View className="flex flex-col items-center justify-center mt-10 font-outfit">
              <Text className="text-black text-3xl mx-10 text-center">
                {item.title}
              </Text>
              <Text className="mx-10 text-center mt-10 text-lg text-[#858585]">
                {item.description}
              </Text>
            </View>
          </View>
        ))}
      </Swiper>
      <CustomButton
        title={isLastSlide ? "Get Started" : "Next"}
        onPress={() =>
          isLastSlide
            ? router.replace("/(auth)/sign-up")
            : swiperRef.current?.scrollBy(1)
        }
        className="w-11/12 mt-10"
      />
    </SafeAreaView>
  );
};

export default Onboarding;
