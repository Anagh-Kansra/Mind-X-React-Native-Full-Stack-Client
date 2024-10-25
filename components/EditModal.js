import React, { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const EditModal = ({ postItem, modalVisible, setModalVisible }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  //handle post update
  const postUpdateHandler = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.put(`/post/update-post/${id}`, {
        title,
        description,
      });
      setLoading(false);
      alert(data?.message);
      navigation.push("MyPosts");
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert(error);
    }
  };

  useEffect(() => {
    setTitle(postItem?.title);
    setDescription(postItem?.description);
  }, [postItem]);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Update your post</Text>
            <Text>Title</Text>
            <TextInput
              style={styles.inputButton}
              value={title}
              onChangeText={(text) => {
                setTitle(text);
              }}
            />
            <Text>Description</Text>
            <TextInput
              style={styles.inputButton}
              value={description}
              multiline={true}
              numberOfLines={4}
              onChangeText={(text) => {
                setDescription(text);
              }}
            />
            <View style={styles.btnContainer}>
              <Pressable
                style={[styles.button, { backgroundColor: "#fff" }]}
                onPress={() => {
                  postUpdateHandler(postItem && postItem._id),
                    setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>
                  {loading ? "Please Wait..." : "UPDATE"}
                </Text>
              </Pressable>
              <Pressable
                style={[styles.button, { backgroundColor: "#fff" }]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>CANCEL</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 36,
    //alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  inputButton: {
    marginBottom: 20,
    marginTop: 8,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 8,
    textAlignVertical: "top",
    paddingTop: 10,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    borderRadius: 8,
    backgroundColor: "black",
    padding: 8,
    elevation: 4,
    width: 100,
    margin: 10,
  },
  buttonOpen: {
    backgroundColor: "#fff",
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 16,
    textAlign: "center",
  },
});

export default EditModal;
