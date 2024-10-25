import React, { useContext, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FooterMenu from "../components/Menus/footerMenu";
import { PostContext } from "../context/postContext";
import PostCard from "../components/PostCard";
import LoadingScreen from "../components/Loading";
import SafeAreaView from "react-native-safe-area-view";
import { useFocusEffect } from "@react-navigation/native";

const Search = () => {
  const handleSearch = () => {
    // Implement your search logic here
    console.log("Search button pressed");
  };

  // Global state
  const [post, , getAllPost] = useContext(PostContext);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state

  // Refresh control
  const onRefresh = useCallback(() => {
    setRefresh(true);
    getAllPost(); // Call the function to fetch posts
    setRefresh(false);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getAllPost();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search... (under development)"
        />
        <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
          <FontAwesome5 name="search" size={20} color="black" />
        </TouchableOpacity>
      </View>
      {loading ? (
        <LoadingScreen message="Loading posts, please wait..." />
      ) : (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
            }
          >
            <PostCard post={post} MyPostsScreen={false} />
          </ScrollView>
        </>
      )}
      <View style={{ flex: 0, justifyContent: "flex-end" }}>
        <FooterMenu />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 10,
  },
  searchButton: {
    padding: 10,
  },
});

export default Search;
