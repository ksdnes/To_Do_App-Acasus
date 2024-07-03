import React from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity } from "react-native";
import RNModal from "react-native-modal";

type ModalProps = {
  isVisible: boolean;
  title: string;
  description: string;
  onClose: () => void;
  [x: string]: any;
};

export const Modal = ({
  isVisible = false,
  title,
  description,
  onClose,
  ...props
}: ModalProps) => {
  return (
    <RNModal
      isVisible={isVisible}
      animationInTiming={1000}
      animationOutTiming={1000}
      backdropTransitionInTiming={800}
      backdropTransitionOutTiming={800}
      {...props}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeButton}>X</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.body}>
          <Text style={styles.description}>{description}</Text>
        </View>
        <View style={styles.footer}>
          <Button title="Go back" onPress={onClose} />
        </View>
      </View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#000",
    borderStyle: "solid",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  closeButton: {
    fontSize: 18,
    color: "red",
  },
  body: {
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
