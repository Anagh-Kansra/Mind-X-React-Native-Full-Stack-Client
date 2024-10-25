import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import { PostContext } from "../context/postContext";
import SubmitButton from "../components/Forms/SubmitButton";
import axios from "axios";
import FooterMenu from "../components/Menus/footerMenu";
import UploadImage from "../components/uploadImage";
import SafeAreaView from "react-native-safe-area-view";

const Post = ({ navigation }) => {
  // Global state
  const [post, setPost] = useContext(PostContext);
  // Local state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUri, setImageUri] = useState(null); // Changed to null to handle no image scenario
  const [links, setLinks] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle post data
  const handlePostSubmission = async () => {
    try {
      if (!title) {
        alert("Please fill in the title");
        return;
      }
      if (!description) {
        alert("Please fill in the description");
        return;
      }

      // Prepare FormData
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("links", links);
      formData.append("hashtags", hashtags);

      if (imageUri) {
        formData.append("images", {
          uri: imageUri,
          type: "image/jpeg", // Adjust the type according to the image format
          name: "photo.jpg", // Name the file
        });
      }

      setLoading(true);
      const { data } = await axios.post(
        "post/create-post", // Update with your server URL
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            // Include authorization if needed
            // 'Authorization': `Bearer ${token}`
          },
        }
      );
      setLoading(false);
      setPost([...post, data?.post]);
      alert(data?.message);
      navigation.navigate("Home");
    } catch (error) {
      alert(error.response?.data?.message || error.message);
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.heading}>Create an Insight</Text>
            <TextInput
              style={styles.inputBox}
              placeholder={"Add a title"}
              placeholderTextColor={"gray"}
              value={title}
              onChangeText={setTitle}
            />
            <TextInput
              style={[
                styles.inputBox,
                {
                  minHeight: 100,
                  textAlignVertical: "top",
                },
              ]}
              placeholder={"Add an insight"}
              placeholderTextColor={"gray"}
              multiline={true}
              numberOfLines={6}
              value={description}
              onChangeText={setDescription}
            />
            <TextInput
              style={styles.inputBox}
              placeholder={"Add a #hashtag"}
              placeholderTextColor={"gray"}
              value={hashtags}
              onChangeText={setHashtags}
            />
            <TextInput
              style={styles.inputBox}
              placeholder={"Add a link"}
              placeholderTextColor={"gray"}
              value={links}
              onChangeText={setLinks}
            />
            <UploadImage onImageSelect={(uri) => setImageUri(uri)} />
          </View>

          <View style={styles.postButton}>
            <SubmitButton
              btnTitle={"Post"}
              iconName={"plus"}
              handleSubmit={handlePostSubmission}
              loading={loading}
            />
          </View>
        </ScrollView>
        <FooterMenu style={styles.footerMenu} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "flex-start",
    marginTop: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  inputBox: {
    backgroundColor: "#ffffff",
    textAlignVertical: "top",
    paddingTop: 8,
    width: "80%",
    borderRadius: 5,
    marginTop: "5%",
    fontSize: 16,
    paddingHorizontal: 15,
    borderColor: "gray",
    borderWidth: 1,
    minHeight: 35,
    textAlignVertical: "top",
  },
  postButton: {
    marginTop: "10%",
    justifyContent: "center",
  },
  footerMenu: {
    flex: 0,
  },
});

export default Post;
