import { View, Text, StyleSheet, Alert, Dimensions } from "react-native";
import Inputbox from "../../components/Forms/Inputbox";
import React, { useState } from "react";
import SubmitButton from "../../components/Forms/SubmitButton";
import axios from "axios";
import SafeAreaView from "react-native-safe-area-view";

const Register = ({ navigation }) => {
  // States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Functions
  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!name || !email || !password) {
        Alert.alert("Please fill all fields");
        setLoading(false);
        return;
      }
      const { data } = await axios.post("/auth/register", {
        name,
        email,
        password,
      });
      Alert.alert(data?.message || "Registration successful");
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert(error.response?.data?.message || "Registration failed");
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.pageTitle}>Register</Text>
        <Text style={styles.pageSubtitle}>
          Please create an account to continue.
        </Text>
        <View style={styles.inputContainer}>
          <Inputbox inputTitle="NAME" value={name} setValue={setName} />
          <Inputbox
            inputTitle="EMAIL"
            keyboardType="email-address"
            autoComplete="email"
            value={email}
            setValue={setEmail}
          />
          <Inputbox
            inputTitle="PASSWORD"
            secureTextEntry={true}
            autoComplete="password"
            value={password}
            setValue={setPassword}
          />
        </View>
        <SubmitButton
          btnTitle="Register"
          loading={loading}
          handleSubmit={handleSubmit}
        />
      </View>
      <Text style={styles.linkText}>
        Already registered?{" "}
        <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
          LOGIN
        </Text>
      </Text>
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
  linkText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  link: {
    color: "red",
    fontWeight: "bold",
  },
});

export default Register;
