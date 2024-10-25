import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HeaderMenu = ({ Title, TextStyle }) => {
  const [state, setState] = useContext(AuthContext);
  //handle logout
  const handleLogout = async () => {
    setState({ token: "", user: null });
    await AsyncStorage.removeItem("@auth");
  };

  const handleLogoutPrompt = () => {
    Alert.alert("Confirm Logout", "Are you sure you want to log out?", [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: () => handleLogout(),
        style: "destructive",
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={TextStyle}>{Title}</Text>
      <TouchableOpacity
        onPress={handleLogoutPrompt}
        style={{
          flexDirection: "row",
          borderColor: "black",
          borderWidth: 1,
          borderRadius: 4,
          padding: 4,
          backgroundColor: "#f0f0f0",
          marginRight: 4,
        }}
      >
        <Text style={{ fontSize: 12 }}>Log out{"  "}</Text>
        <FontAwesome5 name="sign-out-alt" style={styles.iconStyle} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    height: 50,
    width: "100%",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  iconStyle: {
    fontSize: 16,
    color: "#000",
    alignSelf: "center",
    marginBottom: 3,
  },
});

export default HeaderMenu;
