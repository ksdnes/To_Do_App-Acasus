import Button from "@/components/shared/button";
import Input from "@/components/shared/input";
import SafeAreaWrapper from "@/components/shared/safe-area-wrapper";
import { AuthScreenNavigationType } from "@/navigation/types";
import { registerUser } from "@/services/api";
import { Box, Text } from "@/utils/theme";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const SignUpScreen = () => {
  const navigation = useNavigation<AuthScreenNavigationType<"SignUp">>();
  const navigateToSignInScreen = () => {
    navigation.navigate("SignIn");
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: IUser) => {
    try {
      const { email, username, password } = data;

      await registerUser({
        email,
        username,
        password,
      });
      navigateToSignInScreen();
    } catch (error) {}
  };

  return (
    <SafeAreaWrapper>
      <LinearGradient
        colors={[
          "#ffcc66",
          "#ffe6b3",
          "#fff7e6",
          "#fff7e6",
          "#ffe6b3",
          "#ffcc66",
        ]}
        style={{ flex: 1 }}
      >
        <Box flex={1} px="5.5" mt={"13"}>
          <Text variant="textXl" fontWeight="700">
            Want to track your activities?
          </Text>
          <Text variant="textBase" fontWeight="700" mb="6">
            Firstly, create an account!
          </Text>

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Username"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Username"
                error={errors.username}
              />
            )}
            name="username"
          />
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
              Already have an account?
            </Text>
            <Pressable onPress={navigateToSignInScreen}>
              <Text color="primary" textAlign="right" ml="1">
                Log in!
              </Text>
            </Pressable>
          </Box>
          <Box mb="5.5" />
          <Button
            title="Register"
            onPress={handleSubmit(onSubmit)}
            uppercase
            backgroundColor="orange400"
          />
        </Box>
      </LinearGradient>
    </SafeAreaWrapper>
  );
};

export default SignUpScreen;
