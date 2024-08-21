/* eslint-disable prettier/prettier */
import { useUser } from "@clerk/clerk-expo";
import { StripeProvider } from "@stripe/stripe-react-native";
import { Image, Text, View, ScrollView, Animated, Easing } from "react-native";
import Payment from "@/components/Payment";
import RideLayout from "@/components/RideLayout";
import { icons, images } from "@/constants";
import { formatTime } from "@/lib/utils";
import { useDriverStore, useLocationStore } from "@/store";
import { useEffect, useRef } from "react";
import { useSpring, animated } from "@react-spring/native";

const BookRide = () => {
  const { user } = useUser();
  const { userAddress, destinationAddress } = useLocationStore();
  const { drivers, selectedDriver } = useDriverStore();

  const driverDetails = drivers?.filter(
    (driver) => +driver.id === selectedDriver
  )[0];

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-50)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();

    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
  }, [fadeAnim, slideAnim]);

  return (
    <StripeProvider
      publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY!}
      merchantIdentifier="merchant.com.uber"
      urlScheme="myapp"
    >
      <RideLayout title="Book Ride">
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 20,
            backgroundColor: "#f7f7f7",
          }}
        >
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
            className="flex-1 p-5"
          >
            {/* Header */}
            <Text className="text-3xl font-bold text-gray-800 mb-6">
              Ride Information
            </Text>

            {/* Driver and Map Information */}
            <View className="bg-white p-5 rounded-xl shadow-lg mb-6">
              <View className="flex flex-row justify-between items-center">
                {/* Driver Information */}
                <View className="flex flex-col items-center">
                  <Image
                    source={{ uri: driverDetails?.profile_image_url }}
                    className="w-32 h-32 rounded-full border-4 border-blue-500"
                  />
                  <Text className="text-lg font-semibold text-gray-900 mt-2 flex items-center justify-center">
                    {driverDetails?.title}
                  </Text>
                </View>

                {/* Map Image */}
                <View className="flex flex-row items-center justify-center">
                  <Image
                    source={{ uri: driverDetails?.car_image_url }}
                    className="w-32 h-32 rounded-full border-4 border-blue-500"
                  />
                </View>
              </View>
            </View>

            {/* Ride Details */}
            <View className="bg-white p-5 rounded-xl shadow-lg mb-6">
              <View className="flex flex-row justify-between border-b border-gray-200 pb-3 mb-3">
                <Text className="text-lg font-medium text-gray-800">
                  Ride Price
                </Text>
                <Text className="text-lg font-bold text-green-600">
                  {driverDetails?.price}€
                </Text>
              </View>

              <View className="flex flex-row justify-between border-b border-gray-200 pb-3 mb-3">
                <Text className="text-lg font-medium text-gray-800">
                  Pickup Time
                </Text>
                <Text className="text-lg font-bold text-gray-700">
                  {formatTime(driverDetails?.time!)}
                </Text>
              </View>

              <View className="flex flex-row justify-between py-3">
                <Text className="text-lg font-medium text-gray-800">
                  Car Seats
                </Text>
                <Text className="text-lg font-bold text-gray-700">
                  {driverDetails?.car_seats}
                </Text>
              </View>
            </View>

            {/* Address Information */}
            <View className="bg-white p-5 rounded-xl shadow-lg mb-6">
              <View className="flex flex-row items-center border-t border-b border-gray-200 py-3 mb-3">
                <Image source={images.to} className="w-6 h-6" />
                <Text className="text-lg font-medium text-gray-700 ml-3">
                  {userAddress}
                </Text>
              </View>

              <View className="flex flex-row items-center border-b border-gray-200 py-3">
                <Image source={images.point} className="w-6 h-6" />
                <Text className="text-lg font-medium text-gray-700 ml-3">
                  {destinationAddress}
                </Text>
              </View>
            </View>

            {/* Payment Component */}
            <View className="mt-8">
              <Payment
                fullName={user?.fullName!}
                email={user?.emailAddresses[0].emailAddress!}
                amount={driverDetails?.price!}
                driverId={driverDetails?.id}
                rideTime={driverDetails?.time!}
              />
            </View>
          </Animated.View>
        </ScrollView>
      </RideLayout>
    </StripeProvider>
  );
};

export default BookRide;
