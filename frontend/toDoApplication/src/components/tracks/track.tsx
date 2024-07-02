import { HomeScreenNavigationType } from "@/navigation/types";
import axiosInstance from "@/services/config";
import { ITrack } from "@/types";
import { AnimatedBox, Box, Text } from "@/utils/theme";
import { Ionicon } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable } from "react-native";
import {
  FadeInLeft,
  FadeInRight,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import useSWRMutation from "swr/mutation";
import { useApi, AXIOS_METHOD, setApiToken } from "@/services/useApi";

type TrackProps = {
  track: ITrack;
  user: String;
  mutateTracks: () => Promise<ITask[] | undefined>;
};

interface ITrackStatusRequest {
  id: string;
  isCompleted: boolean;
}

const Track = ({ track, user, mutateTracks }: TaskProps) => {
  const [data, loading, error] = useApi<any[]>(AXIOS_METHOD.GET, `/users`);

  const offset = useSharedValue(1);
  const checkmarkIconSize = useSharedValue(0.8);

  const navigation = useNavigation<HomeScreenNavigationType>();
  console.log("track :", track);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(offset.value) }],
    };
  });

  const checkMarkIconStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(checkmarkIconSize.value) }],
      opacity: track?.isCompleted === true ? offset.value : 0,
    };
  });
  const navigateToEditTrack = () => {
    navigation.navigate("EditTrack", {
      track,
    });
  };

  return track ? (
    <AnimatedBox entering={FadeInRight} exiting={FadeInLeft}>
      <Pressable onLongPress={navigateToEditTrack}>
        <Box
          p="4"
          bg="lightGray"
          borderRadius="rounded-5xl"
          flexDirection="column"
        >
          <Box flexDirection="row" alignItems="center">
            <AnimatedBox
              style={[animatedStyles]}
              flexDirection="row"
              alignItems="center"
            >
              <Box
                height={26}
                width={26}
                bg={track.isCompleted === true ? "gray9" : "gray300"}
                borderRadius="rounded-xl"
                alignItems="center"
                justifyContent="center"
              >
                {track.isCompleted === true && (
                  <AnimatedBox style={[checkMarkIconStyles]}></AnimatedBox>
                )}
              </Box>
            </AnimatedBox>
            <Text ml="3" variant="textXl">
              {track.name}
            </Text>
          </Box>
          <Box></Box>
          <Text ml="3" variant="textXl">
            {`Location: ${track.location}`}
          </Text>
          <Text ml="3" variant="textXl">
            {`Distance: ${track.distance} km`}
          </Text>
          <Text ml="3" variant="textXl">
            {`Estimated Duration: ${track.estimatedDuration}`}
          </Text>
          <Text ml="3" variant="textXl">
            {`Username: ${user}`}
          </Text>
        </Box>
      </Pressable>
    </AnimatedBox>
  ) : (
    <Box>
      <Text>Track not found</Text>
    </Box>
  );
};

export default Track;
