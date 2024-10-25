import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import Home from "../../screens/Home";
import Login from "../../screens/auth/Login";
import Register from "../../screens/auth/Register";
import { AuthContext } from "../../context/authContext";
import HeaderMenu from "./HeaderMenu";
import Post from "../../screens/Post";
import Account from "../../screens/Account";
import MyPosts from "../../screens/MyPosts";
import Search from "../../screens/Search";
import ChatScreen from "../../screens/AIChat";

const ScreenMenu = () => {
  //global state
  const [state] = useContext(AuthContext);
  //auth condition true false
  const authenticatedUser = state?.user && state?.token;
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        animation: "fade",
      }}
    >
      {authenticatedUser ? (
        <>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              header: () => (
                <HeaderMenu Title={"Mind X"} TextStyle={styles.headerText} />
              ),
            }}
          />
          <Stack.Screen
            name="Search"
            component={Search}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="MyPosts"
            component={MyPosts}
            options={{
              headerBackTitle: "Back",
              header: () => (
                <HeaderMenu
                  Title={"My Mind"}
                  TextStyle={styles.subheaderText}
                />
              ),
            }}
          />
          <Stack.Screen
            name="Post"
            component={Post}
            options={{
              headerBackTitle: "Back",
              header: () => (
                <HeaderMenu
                  Title={"Post Your Mind"}
                  TextStyle={styles.subheaderText}
                />
              ),
            }}
          />
          <Stack.Screen
            name="Account"
            component={Account}
            options={{
              headerBackTitle: "Back",
              header: () => (
                <HeaderMenu
                  Title={"My Account"}
                  TextStyle={styles.subheaderText}
                />
              ),
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default ScreenMenu;

const styles = StyleSheet.create({
  headerText: {
    fontSize: 20,
    fontStyle: "italic",
    marginLeft: 10,
    color: "red",
    fontWeight: "bold",
  },
  subheaderText: {
    fontSize: 20,
    marginLeft: 10,
    fontWeight: "bold",
  },
});
