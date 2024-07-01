import { NavigationContainer } from "@react-navigation/native";
import AuthStackNavigator from "./auth-stack-navigator";
import AppStackNavigator from "./app-stack-navigator";
import useUserGlobalSzore from "@/store/useUserGlobalStore";
import React from "react";
const Navigation = () => {
  const { user, updateUser } = useUserGlobalSzore();

  return (
    <NavigationContainer>
      {user ? <AppStackNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};

export default Navigation;
