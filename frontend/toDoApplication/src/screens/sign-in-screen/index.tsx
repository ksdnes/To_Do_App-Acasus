import Button from "@/components/shared/button";
import Input from "@/components/shared/input";
import SafeAreaWrapper from "@/components/shared/safe-area-wrapper";
import { AuthScreenNavigationType } from "@/navigation/types";
import { loginUser } from "@/services/api";
import useUserGlobalStore from "@/store/useUserGlobalStore";
import { Box, Text } from "@/utils/theme";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable } from "react-native";

const SignInScreen = () => {
  const navigation = useNavigation<AuthScreenNavigationType<"SignIn">>();
  const navigateToSignInScreen = () => {
    navigation.navigate("SignUp");
  };

  const { updateUser } = useUserGlobalStore();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<IUser, "name">>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: Omit<IUser, "username">) => {
    try {
      const { email, password } = data;
      const _user = await loginUser({
        email: email,
        password: password,
      });
      updateUser({
        email: _user.email,
        name: _user.username,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaWrapper>
      <Box flex={1} px="5.5" justifyContent="center">
        <Text variant="textXl" fontWeight="700">
          Welcome Back
        </Text>
        <Box mb="6" />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Email"
              error={errors.email}
            />
          )}
          name="email"
        />
        <Box mb="6" />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Password"
              error={errors.password}
              secureTextEntry
            />
          )}
          name="password"
        />
        <Box mt="5.5" />
        <Box flexDirection="row" alignItems="right" justifyContent="flex-end">
          <Text color="primary" textAlign="right">
            Do not have an account yet?
          </Text>
          <Pressable onPress={navigateToSignInScreen}>
            <Text color="primary" textAlign="right" ml="1">
              Sign up!
            </Text>
          </Pressable>
        </Box>
        <Box mb="5.5" />

        <Button
          title="Login"
          onPress={handleSubmit(onSubmit)}
          uppercase
          backgroundColor="orange400"
        />
      </Box>
    </SafeAreaWrapper>
  );
};

export default SignInScreen;
