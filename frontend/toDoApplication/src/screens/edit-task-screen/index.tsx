import { Box, Text } from "@/utils/theme";
import React from "react";
import { Button } from "react-native";
import SafeAreaWrapper from "@/components/shared/safe-area-wrapper";

const EditTaskScreen = () => {
  return (
    <SafeAreaWrapper>
      <Box>
        <Text>EditTask Screen</Text>
        <Button title="Navigate to sign up" />
      </Box>
    </SafeAreaWrapper>
  );
};

export default EditTaskScreen;
