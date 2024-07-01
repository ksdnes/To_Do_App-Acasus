import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CategoriesStackParamList } from "./types";
import CategoriesScreen from "@/screens/categories-screen";
import CategoryScreen from "@/screens/category-screen";
CategoryScreen;
const Stack = createNativeStackNavigator<CategoriesStackParamList>();
const CategoryStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Category"
        component={CategoryScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default CategoryStackNavigator;
