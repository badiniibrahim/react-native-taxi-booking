import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "@/constants";
import { formatDate, formatTime } from "@/lib/utils";

const RideCard = ({ ride }: { ride: Ride }) => {
  return (
    <View className="flex flex-row p-7 bg-white rounded-2xl shadow-sm shadow-neutral-300 mb-3 m-3">
      {/*<Text className="text-3xl font-outfit">{ride.driver.first_name}</Text>
      <View className="flex flex-row items-center justify-between p-3">
        <View className="flex flex-row items-center justify-between">
          <Image
            source={{
              uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${ride.destination_longitude},${ride.destination_latitude}&zoom=14&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`,
            }}
            className="w-[80px] h-[90px] rounded-lg"
          />
        </View>
      </View>*/}
      <View className="flex flex-col">
        <Text className="font-outfitBold text-lg mb-5" numberOfLines={1}>
          {formatDate(ride.created_at)}, {formatTime(ride.ride_time)}
        </Text>

        <View className="flex flex-row gap-3">
          <Image source={images.driver} className="w-5 h-5" />
          <Text className="font-outfitBold text-lg">Your driver</Text>
        </View>

        <View className="flex flex-row justify-between w-full">
          <Text className="ml-8 text-md font-outfitMedium">
            {ride.driver.first_name}
          </Text>
          <View className="flex flex-row items-center justify-between gap-2">
            <Image source={images.telephone} />
            <Image source={images.email} />
          </View>
        </View>

        <View className="flex items-start">
          <View className="flex flex-row items-center gap-x-2">
            <Image source={images.to} className="w-5 h-5" />
            <Text className="text-md font-outfitMedium" numberOfLines={1}>
              {ride.origin_address}
            </Text>
          </View>

          <View className="w-[1px] h-[15px] " />

          <View className="flex flex-row items-center gap-x-2">
            <Image source={images.point} className="w-5 h-5" />
            <Text className="text-md font-outfitMedium" numberOfLines={1}>
              {ride.destination_address}
            </Text>
          </View>
        </View>

        {/*<View className="flex flex-col mx-5 gap-y-5 flex-1 mt-4">
          <View className="flex flex-row items-center gap-x-2">
            <Image source={images.depart} className="w-5 h-5" />
            <Text className="text-md font-JakartaMedium" numberOfLines={1}>
              {ride.origin_address}
            </Text>
          </View>

          <View className="flex flex-row items-center gap-x-2">
            <Image source={images.arrival} className="w-5 h-5" />
            <Text className="text-md font-JakartaMedium" numberOfLines={1}>
              {ride.destination_address}
            </Text>
          </View>
        </View>*/}
      </View>
    </View>
  );
};

export default RideCard;
