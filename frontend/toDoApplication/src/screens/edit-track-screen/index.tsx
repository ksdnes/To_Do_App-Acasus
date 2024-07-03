import React from "react";
import { Box, Text } from "@/utils/theme";
import { TextInput } from "react-native";
import SafeAreaWrapper from "@/components/shared/safe-area-wrapper";
import NavigateBack from "@/components/shared/navigate-back";
import { useNavigation, useRoute } from "@react-navigation/native";
import axiosInstance from "@/services/config";
import { IRunningTrack, ITrackkRequest } from "@/types";
import Button from "@/components/shared/button";
import { useTheme } from "@shopify/restyle";
import useSWR, { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";
import useUserGlobalStore from "@/store/useUserGlobalStore";

type EditTrackRouteType = {
  params: {
    track: IRunningTrack;
    mutateTracks: () => Promise<ITask[] | undefined>;
  };
};

const EditTrackScreen = () => {
  const { user } = useUserGlobalStore();

  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute<EditTrackRouteType>();
  const { track, mutateTracks } = route.params;

  const { mutate } = useSWRConfig();

  const updateTaskRequest = async (
    url: string,
    { arg }: { arg: IRunningTrack }
  ) => {
    try {
      await axiosInstance.patch(url + "/" + arg._id, {
        ...arg,
      });
    } catch (error) {
      console.error("Error updating track:", error);
      throw error;
    }
  };

  const deleteTaskRequest = async (
    url: string,
    { arg }: { arg: { id: string } }
  ) => {
    try {
      await axiosInstance.delete(url + "/" + arg.id);
    } catch (error) {
      console.error("Error deleting track:", error);
      throw error;
    }
  };

  const { trigger: triggerUpdate } = useSWRMutation(
    "/running-tracks",
    updateTaskRequest
  );

  const { trigger: triggerDelete } = useSWRMutation(
    "/running-tracks",
    deleteTaskRequest
  );

  const [updatedTrack, setUpdatedTrack] = React.useState<ITrackkRequest>({
    name: track.name,
    location: track.location,
    distance: track.distance,
    estimatedDuration: track.estimatedDuration,
    isCompleted: track.isCompleted,
    dateTime: track.dateTime,
  });

  const getUpdatedFields = (
    initialState: IRunningTrack,
    updatedState: ITrackkRequest
  ) => {
    return Object.keys(updatedState).reduce((acc, key) => {
      if (
        updatedState[key as keyof ITrackkRequest] !==
        initialState[key as keyof IRunningTrack]
      ) {
        acc[key] = updatedState[key as keyof ITrackkRequest];
      }
      return acc;
    }, {} as Partial<ITrackkRequest>);
  };

  const deleteTrack = async () => {
    try {
      await triggerDelete({
        id: track._id,
      });
      mutateTracks();
      navigation.goBack();
    } catch (error) {
      console.error("Error deleting track:", error);
      throw error;
    }
  };

  const updateTrack = async () => {
    try {
      const fieldsToUpdate = getUpdatedFields(track, updatedTrack);
      await triggerUpdate({
        _id: track._id,
        ...fieldsToUpdate,
      });
      await mutate(`/running-tracks/users/${user.id}`);
      mutateTracks();
      navigation.goBack();
    } catch (error) {
      console.error("Error updating track:", error);
      throw error;
    }
  };

  return (
    <SafeAreaWrapper>
      <Box
        bg="lightGray"
        px="4"
        py="3.5"
        borderRadius="rounded-5xl"
        position="relative"
      >
        <Box flexDirection="row">
          <NavigateBack />
        </Box>
        <Box my="2">
          <Text variant="textXl">Name</Text>
          <TextInput
            placeholder="Name"
            value={updatedTrack.name}
            onChangeText={(text) =>
              setUpdatedTrack({ ...updatedTrack, name: text })
            }
            style={{ borderBottomWidth: 1, paddingVertical: 8 }}
          />
        </Box>
        <Box my="2">
          <Text variant="textXl">Location</Text>
          <TextInput
            placeholder="Location"
            value={updatedTrack.location}
            onChangeText={(text) =>
              setUpdatedTrack({ ...updatedTrack, location: text })
            }
            style={{ borderBottomWidth: 1, paddingVertical: 8 }}
          />
        </Box>
        <Box my="2">
          <Text variant="textXl">Distance</Text>
          <TextInput
            placeholder="Distance"
            value={updatedTrack.distance.toString()}
            onChangeText={(text) =>
              setUpdatedTrack({
                ...updatedTrack,
                distance: parseFloat(text) || 0,
              })
            }
            keyboardType="numeric"
            style={{ borderBottomWidth: 1, paddingVertical: 8 }}
          />
        </Box>
        <Box my="2">
          <Text variant="textXl">Estimated Duration</Text>
          <TextInput
            placeholder="Estimated Duration"
            value={updatedTrack.estimatedDuration.toString()}
            onChangeText={(text) =>
              setUpdatedTrack({
                ...updatedTrack,
                estimatedDuration: parseFloat(text) || 0,
              })
            }
            keyboardType="numeric"
            style={{ borderBottomWidth: 1, paddingVertical: 8 }}
          />
        </Box>
        <Box my="2">
          <Text variant="textXl">Status</Text>
          <TextInput
            placeholder="isCompleted"
            value={updatedTrack.isCompleted ? "completed" : "pending"}
            onChangeText={(text) =>
              setUpdatedTrack({
                ...updatedTrack,
                isCompleted: text.toLowerCase() === "completed",
              })
            }
            style={{ borderBottomWidth: 1, paddingVertical: 8 }}
          />
        </Box>
        <Box my="4">
          <Text variant="textXl">Date Time</Text>
          <Text variant="textSm">
            {new Date(updatedTrack.dateTime).toLocaleString()}
          </Text>
        </Box>
        <Box flexDirection="row" justifyContent="space-between">
          <Button
            onPress={deleteTrack}
            title="Delete Track"
            backgroundColor="red600"
            iconBeforeText={{
              name: "delete",
              size: 24,
              color: theme.colors.white,
            }}
          />
          <Button
            onPress={updateTrack}
            title="Save Changes"
            backgroundColor="green600"
            iconBeforeText={{
              name: "content-save",
              size: 24,
              color: theme.colors.white,
            }}
          />
        </Box>
      </Box>
    </SafeAreaWrapper>
  );
};

export default EditTrackScreen;
