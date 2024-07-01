import Button from "@/components/shared/button";
import SafeAreaWrapper from "@/components/shared/safe-area-wrapper";
import { AuthScreenNavigationType } from "@/navigation/types";
import { useNavigation } from "@react-navigation/native";
import { Box, Text } from "@/utils/theme";

const SignUpScreen = () => {
  const navigation = useNavigation<AuthScreenNavigationType<"SignUp">>();

  const navigateToSignIpScreen = () => {
    navigation.navigate("SignIn");
  };

  return (
    <SafeAreaWrapper>
      <Box>
        <Text>sign up Screen</Text>
        <Button title="Navigate to sign up" onPress={navigateToSignIpScreen} />
      </Box>
    </SafeAreaWrapper>
  );
};

export default SignUpScreen;
