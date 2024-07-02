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

const MeeScreen = () => {
  const navigation = useNavigation<AuthScreenNavigationType<"Me">>();
  const [triggerLogout, setTriggerLogout] = useState(false);
  const { user, updateUser } = useUserGlobalStore();

  const handleLogout = async () => {
    try {
      updateUser(null);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <SafeAreaWrapper>
      <Pressable onPress={handleLogout}>
        <Text color="primary" textAlign="right" ml="1">
          Logout
        </Text>
      </Pressable>
    </SafeAreaWrapper>
  );
};

export default MeeScreen;
