import Loader from "@/components/shared/loader";
import SafeAreaWrapper from "@/components/shared/safe-area-wrapper";
import Track from "@/components/tracks/track";
import { fetcher } from "@/services/config";
import useUserGlobalStore from "@/store/useUserGlobalStore";
import { ITrack } from "@/types";
import { Box, Text, AnimatedText } from "@/utils/theme";
import React from "react";
import { FlatList } from "react-native";
import { ZoomInEasyDown } from "react-native-reanimated";
import useSWR from "swr";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Button from "@/components/shared/button";
import { useTheme } from "@shopify/restyle";

const MeeScreen = () => {
  const theme = useTheme();
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
        <Box mt="4">
          <Button
            onPress={handleLogout}
            title="Logout"
            backgroundColor="orange400"
            iconBeforeText={{
              name: "logout",
              size: 24,
              color: theme.colors.white,
            }}
          />
        </Box>

        <Box flex={1} mx="4">
          <Box my="4">
            <AnimatedText
              variant="textXl"
              fontWeight="500"
              entering={ZoomInEasyDown.delay(300).duration(500)}
            >
              Hello {user.name}
            </AnimatedText>
            <Text variant="textXl">Let's check all of your tracks</Text>
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

export default MeeScreen;
