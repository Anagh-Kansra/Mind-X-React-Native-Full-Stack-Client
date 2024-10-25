import React, { useState } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const UploadImage = ({ onImageSelect }) => {
  const [image, setImage] = useState(null);

  const selectImage = async () => {
    // Request permission to access media library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri); // Corrected the URI access
      onImageSelect(result.assets[0].uri); // Pass the selected image URI back to the parent component
    }
  };

  const removeImage = () => {
    setImage(null);
    onImageSelect(null); // Pass null to parent to indicate no image selected
  };

  return (
    <View style={{ alignItems: "center" }}>
      <TouchableOpacity style={styles.uploadButton} onPress={selectImage}>
        {!image && <Text style={styles.buttonText}>Add a snippet</Text>}
        {image && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.image} />
            <TouchableOpacity style={styles.removeButton} onPress={removeImage}>
              <FontAwesome5 name="times" size={16} color="red" />
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  uploadButton: {
    backgroundColor: "#ffffff",
    paddingTop: 8,
    borderRadius: 5,
    marginTop: "5%",
    fontSize: 16,
    paddingHorizontal: 15,
    paddingBottom: 8,
    borderColor: "gray",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "gray",
    fontSize: 16,
  },
  imageContainer: {
    position: "relative",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    margin: 10,
  },
  removeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    height: 30,
    width: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default UploadImage;
