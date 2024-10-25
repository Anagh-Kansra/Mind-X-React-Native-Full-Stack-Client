import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

const LoadingScreen = ({ message = "Loading, please wait..." }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#FF6F00" />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  message: {
    marginTop: 20,
    fontSize: 16,
    color: "#333",
  },
});

export default LoadingScreen;
