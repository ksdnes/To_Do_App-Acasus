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
      <Box flex={1} mx="4">
        <Box height={26} />
        <Box height={26} />
        <FlatList
          data={data}
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

export default HomeScreen;
