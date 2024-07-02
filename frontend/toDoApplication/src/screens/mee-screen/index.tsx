import React, { useState, useEffect } from "react";
import { Box, Text } from "@/utils/theme";
import { Pressable } from "react-native";
import SafeAreaWrapper from "@/components/shared/safe-area-wrapper";
import { useNavigation } from "@react-navigation/native";
import { AuthScreenNavigationType } from "@/navigation/types";
import { useApi, AXIOS_METHOD } from "@/services/useApi";
import * as SecureStore from "expo-secure-store";
import axiosInstance from "@/services/config";
import { logoutUser } from "@/services/api";
import useUserGlobalStore from "@/store/useUserGlobalStore";
import { FlatList } from "react-native";
import Track from "@/components/tracks/track";

const MeeScreen = () => {
  const navigation = useNavigation<AuthScreenNavigationType<"Me">>();
  const [triggerLogout, setTriggerLogout] = useState(false);
  const { user, updateUser } = useUserGlobalStore();
  console.log("user here:", user.id);
  const handleLogout = async () => {
    try {
      updateUser(null);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const [data, loading, error] = useApi<any[]>(
    AXIOS_METHOD.GET,
    `/running-tracks/user/${user.id}`
  );
  console.log(data);
  return (
    <SafeAreaWrapper>
      <Box flex={1} mx="4">
        <Box height={26}>
          <Text>Lets check your tracks</Text>
        </Box>
        <Box height={26} />
        <FlatList
          data={data}
          renderItem={({ item }) => <Track task={item} />}
          ItemSeparatorComponent={() => <Box height={14} />}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item._id}
        />
      </Box>
      <Pressable onPress={handleLogout}>
        <Text color="primary" textAlign="right" ml="1">
          Logout
        </Text>
      </Pressable>
    </SafeAreaWrapper>
  );
};

export default MeeScreen;
