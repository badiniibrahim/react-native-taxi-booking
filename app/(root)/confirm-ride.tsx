import { router } from "expo-router";
import { FlatList, View } from "react-native";

import CustomButton from "@/components/CustomButton";
import RideLayout from "@/components/RideLayout";
import { useDriverStore } from "@/store";
import DriverCard from "@/components/DriverCard";

const ConfirmRide = () => {
  const { drivers, selectedDriver, setSelectedDriver } = useDriverStore();

  return (
    <RideLayout title={""} snapPoints={["65%", "85%"]}>
      <FlatList
        data={drivers}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <DriverCard
            item={item}
            selected={selectedDriver!}
            setSelected={() => setSelectedDriver(Number(item.id!))}
          />
        )}
        ListFooterComponent={() => (
          <View className="mx-5 mt-5">
            <CustomButton
              title="Select Ride"
              onPress={() => router.push("/(root)/book-ride")}
            />
          </View>
        )}
      />
    </RideLayout>
  );
};

export default ConfirmRide;
