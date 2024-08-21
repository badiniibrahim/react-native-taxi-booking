import { TouchableOpacity, View, Image, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { icons } from "@/constants";

const Profile = () => {
  const { signOut } = useAuth();
  const { user } = useUser();

  const handleSignOut = () => {
    signOut();
    router.replace("/(auth)/sign-in");
  };

  return (
    <SafeAreaView className="bg-gray-100 flex-1">
      <View className="flex-1 justify-center items-center px-5">
        <View className="items-center mb-10">
          <View className="bg-blue-500 w-28 h-28 rounded-full justify-center items-center mb-4">
            <Image
              source={{ uri: "https://via.placeholder.com/100" }}
              className="w-24 h-24 rounded-full"
            />
          </View>
          <Text className="text-gray-800 text-2xl font-semibold mb-1">
            Nom de l'utilisateur
          </Text>
          <Text className="text-gray-600 text-sm">
            {user?.emailAddresses[0].emailAddress}
          </Text>
        </View>

        <View className="w-full space-y-3">
          <TouchableOpacity className="bg-white p-4 rounded-xl flex-row items-center shadow-sm">
            <Text className="text-gray-800 text-lg">Paramètres</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-white p-4 rounded-xl flex-row items-center shadow-sm">
            <Text className="text-gray-800 text-lg">Aide</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={handleSignOut}
          className="bg-red-500 p-4 rounded-xl flex-row items-center justify-center mt-10 w-full shadow-lg"
        >
          <Image source={icons.out} className="w-6 h-6 mr-3 tint-white" />
          <Text className="text-white text-lg font-semibold">Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
