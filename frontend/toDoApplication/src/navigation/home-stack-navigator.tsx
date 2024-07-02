// Update HomeStackNavigator in your navigation file
import EditTrackScreen from "@/screens/edit-task-screen";
import HomeScreen from "@/screens/home-screen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { HomeStackParamList } from "./types";

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStackNavigator = () => {
  const [refreshKey, setRefreshKey] = React.useState(0); // State to force re-render

  const updateTracks = () => {
    // Incrementing the refreshKey will force the HomeScreen to re-fetch data
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        initialParams={{ refreshKey }} // Pass refreshKey as a prop
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditTrack"
        component={EditTrackScreen}
        initialParams={{ updateTracks }} // Pass updateTracks function as a prop
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
