import { Box, Text } from "@/utils/theme";
import { Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type ButtonProps = {
  title: string;
  onPress: () => void;
  onLongPress?: () => void;
  disabled?: boolean;
  uppercase?: boolean;
  backgroundColor?: string;
  iconBeforeText?: {
    name: string;
    size: number;
    color: string;
  };
};

const Button = ({
  title,
  onLongPress,
  onPress,
  disabled,
  uppercase,
  backgroundColor,
  iconBeforeText,
}: ButtonProps) => {
  return (
    <Pressable onPress={onPress} onLongPress={onLongPress} disabled={disabled}>
      <Box
        bg={disabled ? "orange100" : backgroundColor || "primary"}
        py="3.5"
        px="3.5"
        borderRadius="rounded-7xl"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
      >
        {iconBeforeText && (
          <MaterialCommunityIcons
            name={iconBeforeText?.name}
            size={iconBeforeText?.size}
            color={iconBeforeText?.color}
            style={{ marginRight: 8 }}
          />
        )}
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
