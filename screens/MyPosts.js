import { View, StyleSheet, ScrollView, RefreshControl } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import FooterMenu from "../components/Menus/footerMenu";
import axios from "axios";
import PostCard from "../components/PostCard";
import LoadingScreen from "../components/Loading";
import SafeAreaView from "react-native-safe-area-view";
import { useFocusEffect } from "@react-navigation/native";

const MyPosts = () => {
  // Local state
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Get user posts
  const getUserPosts = async () => {
    try {
      setLoading(true);
      setRefreshing(true);
      const { data } = await axios.get("/post/get-user-post");
      setPosts(data?.userPost);
      setLoading(false);
      setRefreshing(false);
    } catch (error) {
      setLoading(false);
      setRefreshing(false);
      console.log(error);
      alert(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getUserPosts();
    }, [])
  );

  // Refresh control
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getUserPosts();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <LoadingScreen message="Loading posts, please wait..." />
      ) : (
        <ScrollView
          style={{ flex: 1 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <PostCard post={posts} MyPostsScreen={true} />
        </ScrollView>
      )}
      <View style={{ justifyContent: "flex-end" }}>
        <FooterMenu />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
});

export default MyPosts;
