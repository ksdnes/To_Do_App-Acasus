import { Box, Text } from "@/utils/theme";
import { Pressable } from "react-native";

type ButtonProps = {
  title: string;
  onPress: () => void;
  onLongPress?: () => void;
  disabled?: boolean;
  uppercase?: boolean;
};

const Button = ({
  title,
  onLongPress,
  onPress,
  disabled,
  uppercase,
}: ButtonProps) => {
  return (
    <Pressable onPress={onPress} onLongPress={onLongPress} disabled={disabled}>
      <Box
        bg={disabled ? "gray800" : "primary"}
        py="3.5"
        borderRadius="rounded-7xl"
      >
        <Text
          variant="textXs"
          fontWeight="700"
          color="white"
          textAlign="center"
          textTransform={uppercase ? "uppercase" : "none"}
        >
          {title}
        </Text>
      </Box>
    </Pressable>
  );
};

export default Button;
