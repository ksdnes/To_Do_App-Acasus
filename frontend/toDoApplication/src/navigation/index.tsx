import { NavigationContainer } from "@react-navigation/native";
import AuthStackNavigator from "./auth-stack-navigator";
import AppStackNavigator from "./app-stack-navigator";
import useUserGlobalStore from "@/store/useUserGlobalStore";
import React from "react";
const Navigation = () => {
  const { user, updateUser } = useUserGlobalStore();
  React.useEffect(() => {
    console.log("user" + user);
  }, [user]);
  return (
    <NavigationContainer>
      {!user ? <AuthStackNavigator /> : <AppStackNavigator />}
    </NavigationContainer>
  );
};

export default Navigation;
