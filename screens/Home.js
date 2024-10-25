import { View, StyleSheet, ScrollView, RefreshControl } from "react-native";
import React, { useContext, useState, useCallback } from "react";
import FooterMenu from "../components/Menus/footerMenu";
import { PostContext } from "../context/postContext";
import PostCard from "../components/PostCard";
import LoadingScreen from "../components/Loading";
import SafeAreaView from "react-native-safe-area-view";
import { useFocusEffect } from "@react-navigation/native";

const Home = () => {
  // Global state
  const [post, getAllPost] = useContext(PostContext);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);

  // Refresh control
  const onRefresh = useCallback(() => {
    setLoading(true);
    setRefresh(true);
    getAllPost(); // Call the function to fetch posts
    setLoading(false);
    setRefresh(false);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      getAllPost();
      setLoading(false);
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <LoadingScreen message="Loading posts, please wait..." />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
          }
        >
          <PostCard post={post} MyPostsScreen={false} />
        </ScrollView>
      )}
      <View style={{ justifyContent: "flex-end" }}>
        <FooterMenu />
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
});
