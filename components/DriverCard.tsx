import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { formatTime } from "@/lib/utils";

const DriverCard = ({ item, selected, setSelected }: DriverCardProps) => {
  return (
    <TouchableOpacity
      onPress={setSelected}
      className={`${
        selected === item.id
          ? "bg-general-600 border-2 border-blue-500"
          : "bg-white border border-gray-200"
      } flex flex-row items-center justify-between py-5 px-3 rounded-xl mb-4`}
    >
      <Image
        source={{ uri: item.car_image_url }}
        className="h-14 w-14"
        resizeMode="contain"
      />

      <View className="flex-1 flex flex-col items-start justify-center mx-3">
        <View className="flex flex-row items-center justify-between w-full mb-1">
          <Text className="text-lg font-JakartaRegular flex-1">
            {item.title}
          </Text>
          <Text className="text-lg font-JakartaRegular text-general-800">
            {item.price} €
          </Text>
        </View>

        <View className="flex flex-row items-center justify-start">
          <Text className="text-sm font-JakartaRegular text-general-800">
            {formatTime(item.time!)}
          </Text>

          <Text className="text-sm font-JakartaRegular text-general-800 mx-1">
            |
          </Text>

          <Text className="text-sm font-JakartaRegular text-general-800">
            {item.car_seats} seats
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DriverCard;
