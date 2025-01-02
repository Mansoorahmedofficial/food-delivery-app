import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import Button from "../components/button";
import { Link, Redirect, Stack } from "expo-router";
import { useAuth } from "../providers/Authprovider";
import { supabase } from "../lib/superbase";

const index = () => {
  const { session, loading, isadmin } = useAuth();
  if (loading) {
    return <ActivityIndicator />;
  }
  if (!session) {
    return <Redirect href={"/sign-up"} />;
  }
  if (!isadmin) {
    return <Redirect href={'/(user)'}/>
  }
  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
      <Stack.Screen options={{ title: "Pizza App" }} />
      <Text>Welcome to the Pizza </Text>
      <Link href={"/(user)"} asChild>
        <Button text="User" />
      </Link>
      <Link href={"/(Admin)"} asChild>
        <Button text="Admin" />
      </Link>
      {/* <Link href={"/sign-up"} asChild>
        <Button text="Sgn-in" />
      </Link> */}
      <Button text="Sign out"  onPress={()=> supabase.auth.signOut()}/>
    </View>
  );
};

export default index;
