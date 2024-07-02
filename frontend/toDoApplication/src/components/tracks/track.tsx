import { HomeScreenNavigationType } from "@/navigation/types";
import axiosInstance from "@/services/config";
import { ITask } from "@/types";
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

type TaskProps = {
  task: ITask;
};

interface ITaskStatusRequest {
  id: string;
  isCompleted: boolean;
}

/*const toggleTaskStatusRequest = async (
  url: string,
  { arg }: { arg: ITaskStatusRequest }
) => {
  try {
    await axiosInstance.put(url + "/" + arg.id, {
      ...arg,
    });
  } catch (error) {
    console.log("error in toggleTaskStatusRequest", error);
    throw error;
  }
};*/

const Track = ({ task, mutateTasks }: TaskProps) => {
  const [data, loading, error] = useApi<any[]>(
    AXIOS_METHOD.GET,
    `/users/${task.user}`
  );
  const offset = useSharedValue(1);
  const checkmarkIconSize = useSharedValue(0.8);

  const navigation = useNavigation<HomeScreenNavigationType>();

  /*const toggleTaskStatus = async () => {
    try {
      const _updatedTask = {
        id: task._id,
        isCompleted: !task.isCompleted,
      };
      await trigger(_updatedTask);
      await mutateTasks();
      if (!_updatedTask.isCompleted) {
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
*/
  const navigateToEditTask = () => {
    navigation.navigate("EditTask", {
      task,
    });
  };

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(offset.value) }],
    };
  });

  const checkMarkIconStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(checkmarkIconSize.value) }],
      opacity: data?.isCompleted === true ? offset.value : 0,
    };
  });

  return (
    <AnimatedBox entering={FadeInRight} exiting={FadeInLeft}>
      <Pressable>
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
                bg={task.isCompleted === true ? "gray9" : "gray300"}
                borderRadius="rounded-xl"
                alignItems="center"
                justifyContent="center"
              >
                {task.isCompleted === true && (
                  <AnimatedBox style={[checkMarkIconStyles]}></AnimatedBox>
                )}
              </Box>
            </AnimatedBox>
            <Text ml="3" variant="textXl">
              {task.name}
            </Text>
          </Box>
          <Box></Box>
          <Text ml="3" variant="textXl">
            {`Location: ${task.location}`}
          </Text>
          <Text ml="3" variant="textXl">
            {`Distance: ${task.distance} km`}
          </Text>
          <Text ml="3" variant="textXl">
            {`Estimated Duration: ${task.estimatedDuration}`}
          </Text>
          <Text ml="3" variant="textXl">
            {`Username: ${data?.username}`}
          </Text>
        </Box>
      </Pressable>
    </AnimatedBox>
  );
};

export default Track;
