import { useUser } from "@clerk/clerk-expo";
import * as Location from "expo-location";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import GoogleTextInput from "@/components/GoogleTextInput";
import Map from "@/components/Map";
import { icons } from "@/constants";
import { useLocationStore } from "@/store";

const Home = () => {
  const { user } = useUser();

  const { setUserLocation, setDestinationLocation } = useLocationStore();

  const [hasPermission, setHasPermission] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setHasPermission(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords?.latitude!,
        longitude: location.coords?.longitude!,
      });

      setUserLocation({
        latitude: location.coords?.latitude,
        longitude: location.coords?.longitude,
        address: `${address[0].name}, ${address[0].region}`,
      });
    })();
  }, [setUserLocation]);

  const handleDestinationPress = (location: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    setDestinationLocation(location);
    router.push("/(root)/find-ride");
  };

  return (
    <SafeAreaView className="bg-white flex-1">
      <View className="flex-1">
        <View className="flex flex-row items-center justify-between my-5 px-5">
          <Text className="text-2xl font-JakartaExtraBold">
            Welcome {user?.firstName}
          </Text>
        </View>

        <GoogleTextInput
          icon={icons.search}
          containerStyle="bg-white shadow-md shadow-neutral-300 mx-5"
          handlePress={handleDestinationPress}
        />

        <View className="flex-1">
          <Map />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
