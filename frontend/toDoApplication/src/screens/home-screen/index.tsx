import Loader from "@/components/shared/loader";
import SafeAreaWrapper from "@/components/shared/safe-area-wrapper";
import Track from "@/components/tracks/track";
import { fetcher } from "@/services/config";
import useUserGlobalStore from "@/store/useUserGlobalStore";
import { ICategory, ITask } from "@/types";
import { getGreeting } from "@/utils/helpers";
import { Box, Text } from "@/utils/theme";
import React from "react";
import { FlatList } from "react-native";
import { ZoomInEasyDown } from "react-native-reanimated";

import { useApi, AXIOS_METHOD, setApiToken } from "@/services/useApi";

const HomeScreen = () => {
  const [data, loading, error] = useApi<any[]>(
    AXIOS_METHOD.GET,
    "/running-tracks"
  );
  return (
    <SafeAreaWrapper>
      <Box flex={1} mx="4">
        <Box height={26} />
        <Box height={26} />
        <FlatList
          data={data}
          renderItem={({ item }) => <Track task={item} />}
          ItemSeparatorComponent={() => <Box height={14} />}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item._id}
        />
      </Box>
    </SafeAreaWrapper>
  );
};

export default HomeScreen;
