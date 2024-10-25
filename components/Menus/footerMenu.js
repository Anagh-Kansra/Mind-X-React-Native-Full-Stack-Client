import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
} from "react-native";
import React from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Feather from "react-native-vector-icons/Feather";
import { useNavigation, useRoute } from "@react-navigation/native";

const FooterMenu = () => {
  //Hooks
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <View style={styles.footer}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <FontAwesome5
          name="home"
          style={styles.iconStyle}
          color={route.name === "Home" ? "red" : "black"}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Search")}>
        <Feather
          name="search"
          style={styles.iconStyle}
          color={route.name === "Search" ? "red" : "black"}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Post")}>
        <FontAwesome5
          name="plus-square"
          style={styles.iconStyle}
          color={route.name === "Post" ? "red" : "black"}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("MyPosts")}>
        <FontAwesome5
          name="list"
          style={styles.iconStyle}
          color={route.name === "MyPosts" ? "red" : "black"}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Account")}>
        <Image
          source={{
            uri: "https://media.wired.com/photos/650399af65d83ff288720473/1:1/w_1285,h_1285,c_limit/If-Elon-Musk-Had-Been-a-Happy-Child,-Would-He-Still-Be-Launching-Rockets--Business-Redux-h_16082330.jpg",
          }}
          style={{
            height: 28,
            width: 28,
            borderRadius: 14,
            borderWidth: 2,
            borderColor: route.name === "Account" ? "red" : "black",
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    margin: 10,
    justifyContent: "space-around",
  },
  iconStyle: {
    marginBottom: Platform.OS === "android" ? 3 : 15, // Adjusts marginBottom based on platform
    alignSelf: "center",
    fontSize: 24,
  },
});

export default FooterMenu;
