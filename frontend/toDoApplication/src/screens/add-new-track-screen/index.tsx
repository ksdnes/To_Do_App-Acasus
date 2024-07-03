import React from "react";
import { Box, Text } from "@/utils/theme";
import { TextInput, Platform, View } from "react-native";
import SafeAreaWrapper from "@/components/shared/safe-area-wrapper";
import NavigateBack from "@/components/shared/navigate-back";
import { useNavigation } from "@react-navigation/native";
import axiosInstance from "@/services/config";
import { ITrackkRequest2 } from "@/types";
import Button from "@/components/shared/button";
import { useTheme } from "@shopify/restyle";
import useSWRConfig from "swr";
import useSWRMutation from "swr/mutation";
import DateTimePicker from "@react-native-community/datetimepicker";

const AddNewTrackScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { mutate } = useSWRConfig();
  const [chosenDate, setChosenDate] = React.useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = React.useState<boolean>(false);

  const onDateChange = (event: Event, selectedDate?: Date) => {
    const currentDate = selectedDate || chosenDate;
    setShowDatePicker(Platform.OS === "ios");
    setChosenDate(currentDate);
    setNewTrack({ ...newTrack, dateTime: currentDate.toISOString() });
  };

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

  const [newTrack, setNewTrack] = React.useState<ITrackkRequest2>({
    name: "",
    location: "",
    distance: 0,
    estimatedDuration: 0,
    isCompleted: false,
    dateTime: new Date().toISOString(),
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
        <Box flexDirection="row">
          <NavigateBack />
        </Box>
        <Box my="2">
          <Text variant="textXl">Name</Text>
          <TextInput
            placeholder="Name"
            value={newTrack.name}
            onChangeText={(text) => setNewTrack({ ...newTrack, name: text })}
            style={{ borderBottomWidth: 1, paddingVertical: 8 }}
          />
        </Box>
        <Box my="2">
          <Text variant="textXl">Location</Text>
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
          <Text variant="textXl">Distance</Text>
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
          <Text variant="textXl">Estimated Duration</Text>
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
          <Text variant="textXl">Completed</Text>
          <TextInput
            placeholder="isCompleted"
            value={newTrack.isCompleted ? "Completed" : "Not Completed"}
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
          <Text variant="textXl">Date</Text>
          <Box my="2" flexDirection="row" justifyContent="space between">
            <View>
              <DateTimePicker
                value={chosenDate}
                mode="date"
                display="default"
                onChange={onDateChange}
              />
            </View>
            <TextInput
              placeholder="Date Time"
              value={new Date(newTrack.dateTime).toLocaleString()}
              editable={false}
              style={{
                borderBottomWidth: 1,
                paddingVertical: 8,
                marginLeft: 10,
              }}
            />
          </Box>
        </Box>
        <Box mt="10">
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
