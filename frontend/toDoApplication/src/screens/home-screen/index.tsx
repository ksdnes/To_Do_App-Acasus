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
import { LinearGradient } from "expo-linear-gradient";

const HomeScreen = () => {
  //get the user information
  const { user } = useUserGlobalStore();
  //get all the tracks
  const {
    data,
    isLoading,
    mutate: mutateTracks,
  } = useSWR<ITrack[]>("running-tracks/", fetcher);
  console.log("data", data);
  if (isLoading || !data) {
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
          <Box height={26} />
          <Box height={26} />
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <Track mutateTracks={mutateTracks} track={item} user={user} />
            )}
            ItemSeparatorComponent={() => <Box height={10} />}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item._id}
          />
        </Box>
      </LinearGradient>
    </SafeAreaWrapper>
  );
};

export default HomeScreen;
