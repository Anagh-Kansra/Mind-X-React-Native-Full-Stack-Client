import { View, Text, StyleSheet, Alert, Dimensions } from "react-native";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import Inputbox from "../../components/Forms/Inputbox";
import SubmitButton from "../../components/Forms/SubmitButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import SafeAreaView from "react-native-safe-area-view";

const Login = ({ navigation }) => {
  // Global state
  const [state, setState] = useContext(AuthContext);

  // Local state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle submit function
  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!email || !password) {
        Alert.alert("Please fill all fields");
        setLoading(false);
        return;
      }
      const { data } = await axios.post("/auth/login", { email, password });
      setState(data);
      await AsyncStorage.setItem("@auth", JSON.stringify(data));
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert(error.response?.data?.message || "Login failed");
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.pageTitle}>Login</Text>
        <Text style={styles.pageSubtitle}>Please sign in to continue.</Text>
        <View style={styles.inputContainer}>
          <Inputbox
            inputTitle="EMAIL"
            keyboardType="email-address"
            autoComplete="email"
            value={email}
            setValue={setEmail}
          />
          <Inputbox
            inputTitle="PASSWORD"
            secureTextEntry
            autoComplete="password"
            value={password}
            setValue={setPassword}
          />
        </View>
        <SubmitButton
          btnTitle="Login"
          loading={loading}
          handleSubmit={handleSubmit}
        />
      </View>
      <View style={styles.linkContainer}>
        <Text style={styles.linkText}>
          Don't have an account yet?{" "}
          <Text
            style={styles.link}
            onPress={() => navigation.navigate("Register")}
          >
            REGISTER
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingHorizontal: "5%",
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  pageTitle: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#1e2225",
    marginBottom: 10,
  },
  pageSubtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  linkContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  linkText: {
    fontSize: 16,
    color: "#666",
  },
  link: {
    color: "red",
    fontWeight: "bold",
  },
});

export default Login;
