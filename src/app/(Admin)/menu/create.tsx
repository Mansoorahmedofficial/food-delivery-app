import Button from "@/src/components/button";
import { DefualtPizzaImage } from "@/src/components/ProductItemList";
import Colors from "@/src/constants/Colors";
import { useState } from "react";
import { Text, View, StyleSheet, TextInput, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Stack, useLocalSearchParams } from "expo-router";

const createProductScreen = () => {
  const [name, setname] = useState("nothing");
  const [price, setPrice] = useState("");
  const [error, seterror] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const { id } = useLocalSearchParams();
  const isUpdating = !!id;
  const resetFields = () => {
    setname("");
    setPrice("");
  };
  const validateInput = () => {
    if (!name) {
      seterror("name is required");
      return false;
    }
    if (!price) {
      seterror("price is requried");
      return false;
    }
    if (isNaN(parseFloat(price))) {
      seterror("price is not in a form  of  number");
      return false;
    }
    return true;
  };
  const onSubmit = () => {
    if (isUpdating) {
      Updatetingproduct();
    } else {
      OnCreate();
    }
  };
  const OnCreate = () => {
    seterror("");
    if (!validateInput()) {
      return;
    }
    console.warn("create product", name);
    resetFields();
  };
  const Updatetingproduct = () => {
    seterror("");
    if (!validateInput()) {
      return;
    }
    console.warn("updating Product");
    resetFields();
  };
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const OnDelete = () => {
    console.warn("Delete !!!");
  };
  const ConfirmDelate = () => {
    Alert.alert("Confirm", "Are you sure you want to delete", [
      {
        text:"Cancel"
      }, 
      {
        text:"Delete", 
        style:"destructive", 
        onPress: OnDelete,
      }
    ]);
  };
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ title: isUpdating ? "Update product" : "Create product" }}
      />
      <Image
        source={{ uri: image || DefualtPizzaImage }}
        style={styles.image}
      />
      <Text onPress={pickImage} style={styles.textbutton}>
        Upload Image
      </Text>
      <Text style={styles.label}>Name</Text>
      <TextInput
        value={name}
        onChangeText={setname}
        placeholder="hey there"
        style={styles.input}
      />
      <Text style={styles.label}>price</Text>
      <TextInput
        placeholder="9.69"
        value={price}
        onChangeText={setPrice}
        style={styles.input}
        keyboardType="numeric"
      />
      <Text style={{ color: "red" }}>{error}</Text>
      <Button text={isUpdating ? "Update" : "Create"} onPress={onSubmit} />
      {isUpdating && (
        <Text onPress={ConfirmDelate} style={styles.textbutton}>
          Delete
        </Text>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 20,
  },
  label: {
    color: "gray",
    fontSize: 16,
  },
  image: {
    width: "50%",
    aspectRatio: 1,
    alignSelf: "center",
  },

  textbutton: {
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.light.tint,
    marginVertical: 10,
  },
});

export default createProductScreen;
