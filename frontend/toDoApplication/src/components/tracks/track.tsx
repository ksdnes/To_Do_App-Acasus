import { HomeScreenNavigationType } from "@/navigation/types";
import axiosInstance from "@/services/config";
import { ITrack } from "@/types";
import { AnimatedBox, Box, Text } from "@/utils/theme";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  FadeInLeft,
  FadeInRight,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import useSWRMutation from "swr/mutation";
import { useApi, AXIOS_METHOD, setApiToken } from "@/services/useApi";
import { Modal } from "@/components/shared/modal";

type TrackProps = {
  track: ITrack;
  user: String;
  mutateTracks: () => Promise<ITrack[] | undefined>;
};

interface ITrackStatusRequest {
  id: string;
  isCompleted: boolean;
}

const toggleTaskStatusRequest = async (
  url: string,
  { arg }: { arg: ITrackStatusRequest }
) => {
  try {
    await axiosInstance.patch(url + "/" + arg._id, { ...arg });
  } catch (error) {
    console.log("error in toggleTrackStatusRequest", error);
    throw error;
  }
};
const Track = ({ track, user, mutateTracks }: TrackProps) => {
  const [data, loading, error] = useApi<any[]>(AXIOS_METHOD.GET, `/users`);
  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);
  const offset = useSharedValue(1);
  const checkmarkIconSize = useSharedValue(0.8);

  const navigation = useNavigation<HomeScreenNavigationType>();
  const handleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const navigateToEditTrack = () => {
    if (user.id !== track.user) {
      handleModal();
      return;
    }
    navigation.navigate("EditTrack", {
      track,
      mutateTracks,
    });
  };

  const { trigger: triggerUpdate } = useSWRMutation(
    "/running-tracks",
    toggleTaskStatusRequest
  );

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
  const toggleTaskStatus = async () => {
    try {
      const updatedTask = {
        isCompleted: !track.isCompleted,
      };
      await triggerUpdate({
        _id: track._id,
        ...updatedTask,
      });
      mutateTracks();
      if (!updatedTask.isCompleted) {
        offset.value = 1;
        checkmarkIconSize.value = 0;
      } else {
        offset.value = 1.1;
        checkmarkIconSize.value = 1;
      }
    } catch (error) {
      console.log("error in toggleTaskStatus", error);
      throw error;
    }
  };
  return track ? (
    <>
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
                {user.id === track.user && (
                  <Pressable onPress={toggleTaskStatus}>
                    <Box
                      height={26}
                      width={26}
                      bg={track.isCompleted === true ? "gray9" : "gray300"}
                      borderRadius="rounded-xl"
                      alignItems="center"
                      justifyContent="center"
                    >
                      {track.isCompleted === true && (
                        <AnimatedBox style={[checkMarkIconStyles]}>
                          <Ionicons name="checkmark" size={20} color="white" />
                        </AnimatedBox>
                      )}
                    </Box>
                  </Pressable>
                )}
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
              {`Username: ${user.name}`}
            </Text>
          </Box>
        </Pressable>
      </AnimatedBox>
      <Modal
        isVisible={isModalVisible}
        title={`Permission denied`}
        description={`You are not the owner of this track : ${track.name}`}
        onClose={handleModal}
      />
    </>
  ) : (
    <Box>
      <Text>Track not found</Text>
    </Box>
  );
};

export default Track;
