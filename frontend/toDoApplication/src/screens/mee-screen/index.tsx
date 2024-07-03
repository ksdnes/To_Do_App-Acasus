import Loader from "@/components/shared/loader";
import SafeAreaWrapper from "@/components/shared/safe-area-wrapper";
import Track from "@/components/tracks/track";
import { fetcher } from "@/services/config";
import useUserGlobalStore from "@/store/useUserGlobalStore";
import { ITrack } from "@/types";
import { getGreeting } from "@/utils/helpers";
import { Box, Text } from "@/utils/theme";
import React from "react";
import { FlatList } from "react-native";
import { ZoomInEasyDown } from "react-native-reanimated";
import useSWR from "swr";
import { useNavigation } from "@react-navigation/native";
import { Pressable } from "react-native";
const MeeScreen = () => {
  const navigation = useNavigation<AuthScreenNavigationType<"Me">>();
  const [triggerLogout, setTriggerLogout] = React.useState(false);

  const { user, updateUser } = useUserGlobalStore();
  const handleLogout = async () => {
    try {
      updateUser(null);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
  const {
    data: tracks,
    isLoading,
    mutate: mutateTracks,
  } = useSWR<ITrack[]>(`/running-tracks/user/${user.id}`, fetcher);

  if (isLoading || !tracks) {
    return <Loader />;
  }

  return (
    <SafeAreaWrapper>
      <Pressable onPress={handleLogout}>
        <Text color="primary" textAlign="right" ml="1">
          Logout
        </Text>
      </Pressable>
      <Box flex={1} mx="4">
        <Box height={26} />
        <Box height={26} />
        <FlatList
          data={tracks}
          renderItem={({ item }) => (
            <Track mutateTracks={mutateTracks} track={item} user={user} />
          )}
          ItemSeparatorComponent={() => <Box height={14} />}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item._id}
        />
      </Box>
    </SafeAreaWrapper>
  );
};

export default MeeScreen;
