import Loader from "@/components/shared/loader";
import SafeAreaWrapper from "@/components/shared/safe-area-wrapper";
import Track from "@/components/tracks/track";
import { fetcher } from "@/services/config";
import useUserGlobalStore from "@/store/useUserGlobalStore";
import { ITrack } from "@/types";
import { Box, Text } from "@/utils/theme";
import React from "react";
import { FlatList } from "react-native";
import { ZoomInEasyDown } from "react-native-reanimated";
import useSWR from "swr";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const CompletedScreen = () => {
  const navigation = useNavigation<AuthScreenNavigationType<"Me">>();

  const { user, updateUser } = useUserGlobalStore();

  const {
    data: tracks,
    isLoading,
    mutate: mutateTracks,
  } = useSWR<ITrack[]>(`/running-tracks/user/${user.id}/completed`, fetcher, {
    refreshInterval: 2000,
  });

  if (isLoading || !tracks) {
    return <Loader />;
  }

  return (
    <SafeAreaWrapper>
      <LinearGradient
        colors={[
          "#ffcc66",
          "#ffe6b3",
          "#fff7e6",
          "#fff7e6",
          "#ffe6b3",
          "#ffcc66",
        ]}
        style={{ flex: 1 }}
      >
        <Box flex={1} mx="4">
          <Box my="4">
            <Text variant="textXl">Let's check all the completed tracks</Text>
          </Box>
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
      </LinearGradient>
    </SafeAreaWrapper>
  );
};

export default CompletedScreen;
