import React, { useState } from "react";
import { View, Text, StyleSheet, Alert, Image } from "react-native";
import moment from "moment";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Card, Title, Paragraph } from "react-native-paper";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import EditModal from "./EditModal";

const PostCard = ({ post, MyPostsScreen }) => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [postItem, setPostItem] = useState({});

  const handleDeletePrompt = (id) => {
    Alert.alert("Are you sure you want to delete this post?", "", [
      {
        text: "Cancel",
        onPress: () => {},
      },
      {
        text: "Delete",
        onPress: () => {
          handleDeletePost(id);
        },
      },
    ]);
  };

  const handleDeletePost = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.delete(`/post/delete-post/${id}`);
      setLoading(false);
      alert(data?.message);
      navigation.push("MyPosts");
    } catch (error) {
      setLoading(false);
      console.error(error);
      alert(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <View style={styles.container}>
      {MyPostsScreen && (
        <EditModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          postItem={postItem}
        />
      )}

      {post?.map((postItem, i) => (
        <Card style={styles.card} key={i}>
          {MyPostsScreen && (
            <Card.Content style={styles.editContainer}>
              <FontAwesome5
                name="pen"
                size={18}
                color="gray"
                style={styles.editIcon}
                onPress={() => {
                  setPostItem(postItem), setModalVisible(true);
                }}
              />
              <FontAwesome5
                name="trash"
                size={18}
                color="red"
                style={styles.deleteIcon}
                onPress={() => handleDeletePrompt(postItem?._id)}
              />
            </Card.Content>
          )}

          <Card.Content>
            <Title style={styles.title}>
              <MaterialCommunityIcons name="brain" color="red" size={20} />
              {"  "}
              {postItem?.title}
            </Title>
            <Paragraph style={styles.content}>
              <MaterialCommunityIcons
                name="thought-bubble-outline"
                color="gray"
                size={20}
              />
              {"  "}
              {postItem?.description}
            </Paragraph>
            {postItem?.images?.url && (
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: postItem.images.url }}
                  style={styles.image}
                />
              </View>
            )}
          </Card.Content>

          <View style={styles.footer}>
            {postItem?.postedBy?.name && (
              <Text style={styles.postedBy}>
                <FontAwesome5 name="at" color="red" /> {postItem?.postedBy.name}
              </Text>
            )}
            <Text style={styles.date}>
              <FontAwesome5 name="clock" color="red" />{" "}
              {moment(postItem?.createdAt).format("DD/MM/YYYY")}
            </Text>
          </View>

          <View style={styles.extraInfo}>
            {postItem?.hashtags && (
              <Paragraph style={styles.hashtag}>
                <FontAwesome5 name="hashtag" color="orange" size={12} />
                {postItem?.hashtags}
              </Paragraph>
            )}
            {postItem?.links && (
              <Paragraph style={styles.link}>
                <MaterialCommunityIcons name="link" color="blue" size={12} />
                {"  "}
                {postItem?.links}
              </Paragraph>
            )}
          </View>
        </Card>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "95%",
    alignSelf: "center",
  },
  card: {
    borderRadius: 8,
    marginVertical: 8,
    elevation: 4, // Adds shadow for Android
    shadowColor: "#000", // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 }, // Offset for iOS shadow
    shadowOpacity: 0.2, // Opacity for iOS shadow
    shadowRadius: 4, // Radius for iOS shadow
    backgroundColor: "#fff",
  },
  editContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  editIcon: {
    marginHorizontal: 10,
  },
  deleteIcon: {
    marginHorizontal: 10,
  },
  title: {
    fontWeight: "bold",
    color: "#333",
  },
  content: {
    color: "#666",
    borderBottomWidth: 4,
    borderBottomColor: "#f0f0f0",
    paddingBottom: 10, // Reduced padding to ensure the content fits well with the image
  },
  hashtag: {
    color: "orange",
  },
  link: {
    color: "blue",
  },
  imageContainer: {
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 5,
    resizeMode: "cover",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  postedBy: {
    fontSize: 14,
    color: "#333",
    fontWeight: "bold",
  },
  date: {
    fontSize: 14,
    color: "#333",
  },
  extraInfo: {
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "space-around",
  },
});

export default PostCard;
