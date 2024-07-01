import Button from "@/components/shared/button";
import SafeAreaWrapper from "@/components/shared/safe-area-wrapper";
import { AuthScreenNavigationType } from "@/navigation/types";
import { AnimatedBox, Box, Text, colors } from "@/utils/theme";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image } from "react-native";
import Animated, { ZoomIn } from "react-native-reanimated";

const BLOSSOM_IMAGE =
  "https://static.vecteezy.com/system/resources/previews/023/477/419/large_2x/ai-generative-collection-of-sports-equipment-commonly-sold-at-a-supermarket-circle-label-for-a-sports-goods-free-png.png";
const WelcomeScreen = () => {
  const navigation = useNavigation<AuthScreenNavigationType<"Welcome">>();

  const navigateToSignUpScreen = () => {
    navigation.navigate("SignUp");
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
        <Box flex={1} justifyContent="center">
          <Box alignItems="center" mb="3.5">
            <Animated.View entering={ZoomIn.duration(2000)}>
              <Image
                source={{
                  uri: BLOSSOM_IMAGE,
                  width: 300,
                  height: 300,
                }}
              />
            </Animated.View>
          </Box>
          <Text textAlign="center" variant="textXl" fontWeight="700">
            Do you want to track your activity?
          </Text>
          <Box my="3.5" mx="10">
            <Button
              title="Lets get started"
              onPress={navigateToSignUpScreen}
              backgroundColor="orange400"
            />
          </Box>
        </Box>
      </LinearGradient>
    </SafeAreaWrapper>
  );
};

export default WelcomeScreen;
