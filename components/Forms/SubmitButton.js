import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const SubmitButton = ({ handleSubmit, btnTitle, loading, iconName }) => {
  return (
    <TouchableOpacity style={styles.SubmitBtn} onPress={handleSubmit}>
      <Text style={styles.btnText}>
        <FontAwesome5 name={iconName} size={18} />{" "}
        {loading ? "Please Wait..." : btnTitle}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  SubmitBtn: {
    backgroundColor: "red",
    height: 50,
    marginHorizontal: 20,
    borderRadius: 80,
    justifyContent: "center",
    marginBottom: 20,
    elevation: 5,
  },
  btnText: {
    color: "#fff",
    justifyContent: "center",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SubmitButton;
