import React, { useState } from "react";
import { Box, Text } from "@/utils/theme";
import { TextInput } from "react-native";
import SafeAreaWrapper from "@/components/shared/safe-area-wrapper";
import NavigateBack from "@/components/shared/navigate-back";
import { useNavigation } from "@react-navigation/native";
import axiosInstance from "@/services/config";
import { ITrackkRequest2 } from "@/types";
import Button from "@/components/shared/button";
import { useTheme } from "@shopify/restyle";
import useSWR, { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";

const AddNewTrackScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { mutate } = useSWRConfig();

  const createTaskRequest = async (
    url: string,
    { arg }: { arg: ITrackkRequest2 }
  ) => {
    try {
      const response = await axiosInstance.post(url, {
        ...arg,
      });
    } catch (error) {
      console.error("Error creating track:", error);
      throw error;
    }
  };

  const { trigger: triggerCreate } = useSWRMutation(
    "/running-tracks",
    createTaskRequest
  );

  const [newTrack, setNewTrack] = useState<ITrackkRequest>({
    name: "",
    location: "",
    distance: 0,
    estimatedDuration: 0,
    isCompleted: false,
    dateTime: "",
  });

  const addTrack = async () => {
    try {
      await triggerCreate(newTrack);
      mutate("/running-tracks");
      navigation.navigate("Home");
    } catch (error) {
      console.error("Error adding track:", error);
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
        <NavigateBack />
        <Box my="2">
          <TextInput
            placeholder="Name"
            value={newTrack.name}
            onChangeText={(text) => setNewTrack({ ...newTrack, name: text })}
            style={{ borderBottomWidth: 1, paddingVertical: 8 }}
          />
        </Box>
        <Box my="2">
          <TextInput
            placeholder="Location"
            value={newTrack.location}
            onChangeText={(text) =>
              setNewTrack({ ...newTrack, location: text })
            }
            style={{ borderBottomWidth: 1, paddingVertical: 8 }}
          />
        </Box>
        <Box my="2">
          <TextInput
            placeholder="Distance"
            value={newTrack.distance.toString()}
            onChangeText={(text) =>
              setNewTrack({
                ...newTrack,
                distance: parseFloat(text) || 0,
              })
            }
            keyboardType="numeric"
            style={{ borderBottomWidth: 1, paddingVertical: 8 }}
          />
        </Box>
        <Box my="2">
          <TextInput
            placeholder="Estimated Duration"
            value={newTrack.estimatedDuration.toString()}
            onChangeText={(text) =>
              setNewTrack({
                ...newTrack,
                estimatedDuration: parseFloat(text) || 0,
              })
            }
            keyboardType="numeric"
            style={{ borderBottomWidth: 1, paddingVertical: 8 }}
          />
        </Box>
        <Box my="2">
          <TextInput
            placeholder="isCompleted"
            value={newTrack.isCompleted ? "completed" : "pending"}
            onChangeText={(text) =>
              setNewTrack({
                ...newTrack,
                isCompleted: text.toLowerCase() === "completed",
              })
            }
            style={{ borderBottomWidth: 1, paddingVertical: 8 }}
          />
        </Box>
        <Box my="2">
          <TextInput
            placeholder="Date Time"
            value={newTrack.dateTime.toString()}
            onChangeText={(text) =>
              setNewTrack({ ...newTrack, dateTime: new Date(text) })
            }
            style={{ borderBottomWidth: 1, paddingVertical: 8 }}
          />
        </Box>
        <Box flexDirection="row" justifyContent="space-between">
          <Button
            onPress={addTrack}
            title="Add Track"
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

export default AddNewTrackScreen;
