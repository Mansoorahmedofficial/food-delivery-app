import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import { Link, Stack } from "expo-router";
import Button from "@/src/components/button";
import Colors from "@/src/constants/Colors";
import { supabase } from "@/src/lib/superbase";

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setloading] = useState(false);

  async function signUpwithEmail() {
    setloading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log(email, password);
    console.log("clicked");
    if (error) {
      Alert.alert(error.message);
    }
    setloading(false);
  }
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Sign In" }} />

      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="jon@gmail.com"
        style={styles.input}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder=""
        style={styles.input}
        secureTextEntry
      />

      <Button
        onPress={signUpwithEmail}
        disabled={loading}
        text={loading ? "Signing in " : "sign-in"}
      />

      <Link href="/sign-up" style={styles.textButton}>
        create Account
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
    flex: 1,
  },
  label: {
    color: "gray",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 5,
  },
  textButton: {
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.light.tint,
    marginVertical: 10,
  },
});

export default SignUpScreen;
