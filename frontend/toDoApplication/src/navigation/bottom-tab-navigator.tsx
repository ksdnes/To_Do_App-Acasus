import Icons from "@/components/shared/icons";
import CompletedScreen from "@/screens/completed-screen";
import MeeSreen from "@/screens/mee-screen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "@shopify/restyle";
import AddNewTrackScreen from "@/screens/add-new-track-screen";
import HomeStackNavigator from "./home-stack-navigator";
import { RootBottomTabParamList } from "./types";

const Tab = createBottomTabNavigator<RootBottomTabParamList>();

const BottomTabNavigator = () => {
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "orange",
        tabBarStyle: {
          height: 90,
          paddingHorizontal: 5,
          paddingTop: 0,
          backgroundColor: "rgba(34,36,40,1)",
          position: "absolute",
          borderTopWidth: 0,
        },
        tabBarInactiveTintColor: theme.colors.orange200,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStackNavigator}
        options={() => ({
          title: "Feed",
          tabBarIcon: ({ color }) => <Icons name="home" color={color} />,
          headerShown: false,
        })}
      />
      <Tab.Screen
        name="Completed"
        component={CompletedScreen}
        options={() => ({
          title: "Completed",
          tabBarIcon: ({ color }) => <Icons name="completed" color={color} />,
          headerShown: false,
        })}
      />

      <Tab.Screen
        name="AddNewTrack"
        component={AddNewTrackScreen}
        options={() => ({
          title: "Add",
          tabBarIcon: ({ color }) => <Icons name="add" color={color} />,
          headerShown: false,
        })}
      />
      <Tab.Screen
        name="Me"
        component={MeeSreen}
        options={() => ({
          title: "Me",
          tabBarIcon: ({ color }) => <Icons name="me" color={color} />,
          headerShown: false,
        })}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
