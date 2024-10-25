import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { useContext, useState } from "react";
import { AuthContext } from "./../context/authContext";
import React from "react";
import FooterMenu from "../components/Menus/footerMenu";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import axios from "axios";
import SubmitButton from "../components/Forms/SubmitButton";
import SafeAreaView from "react-native-safe-area-view";

const Account = () => {
  // Global state
  const [state, setState] = useContext(AuthContext);
  const { user, token } = state;

  // Local state
  const [name, setName] = useState(user?.name);
  const [password, setPassword] = useState(user?.password);
  const [email] = useState(user?.email);
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Handle update user
  const handleUpdateUser = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put("/auth/update-user", {
        name,
        password,
        email,
      });
      setLoading(false);
      setState({ ...state, user: data?.updatedUser });
      Alert.alert(data && data.message);
      setIsEditing(false); // Exit editing mode after successful update
    } catch (error) {
      alert(error.response.data.message);
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={{ alignItems: "center", marginBottom: 20 }}>
          <Image
            source={{
              uri: "https://media.wired.com/photos/650399af65d83ff288720473/1:1/w_1285,h_1285,c_limit/If-Elon-Musk-Had-Been-a-Happy-Child,-Would-He-Still-Be-Launching-Rockets--Business-Redux-h_16082330.jpg",
            }}
            style={styles.image}
          />
          <Text style={styles.username}>{user?.name}</Text>
          <Text style={styles.email}>Email : {user?.email}</Text>
          <Text style={styles.role}>Role : {user?.role}</Text>
        </View>

        {!isEditing ? (
          <SubmitButton
            handleSubmit={() => setIsEditing(true)}
            btnTitle={"Edit Profile"}
          />
        ) : (
          <View>
            <View style={styles.editContainer}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputText}>NAME:</Text>
                <TextInput
                  value={name}
                  style={styles.inputBox}
                  onChangeText={(text) => setName(text)}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputText}>EMAIL:</Text>
                <TextInput
                  value={email}
                  style={styles.inputBox}
                  editable={false}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputText}>
                  PASSWORD: {"  "}
                  <TouchableOpacity
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  >
                    <FontAwesome5
                      name={isPasswordVisible ? "eye-slash" : "eye"}
                      size={16}
                      color="gray"
                    />
                  </TouchableOpacity>
                </Text>

                <TextInput
                  value={password}
                  style={styles.inputBox}
                  onChangeText={(text) => setPassword(text)}
                  secureTextEntry={!isPasswordVisible}
                  placeholder="* * * * * *"
                />
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <SubmitButton
                btnTitle="Save Changes"
                loading={loading}
                handleSubmit={handleUpdateUser}
              />

              <SubmitButton
                btnTitle="Cancel"
                handleSubmit={() => setIsEditing(false)}
              />
            </View>
          </View>
        )}
      </ScrollView>
      <View style={{ flex: 0, justifyContent: "flex-end" }}>
        <FooterMenu />
      </View>
    </SafeAreaView>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    paddingVertical: 20,
  },
  image: {
    marginTop: 20,
    height: 100,
    width: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "black",
  },
  username: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  email: {
    marginTop: 5,
    fontSize: 14,
    color: "gray",
  },
  role: {
    marginTop: 5,
    fontSize: 14,
    color: "gray",
  },
  editProfileButton: {
    marginTop: 20,
    backgroundColor: "red",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  editProfileText: {
    color: "#fff",
    fontWeight: "bold",
  },
  editContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
  },
  inputText: {
    fontSize: 12,
    fontWeight: "bold",
    width: "30%",
    color: "gray",
  },
  inputBox: {
    width: "60%",
    backgroundColor: "#fff",
    marginLeft: 10,
    fontSize: 12,
    paddingLeft: 10,
    borderRadius: 10,
    padding: 4,
    borderWidth: 1,
    borderColor: "black",
  },
  buttonContainer: {
    marginTop: 20,
    justifyContent: "center",
  },
});
