import { useAuth } from "@/src/providers/Authprovider";
import { Redirect, Stack } from "expo-router";

export default function Authlayout() {
  const { session } = useAuth();
  if (session) {
    return <Redirect href={"/"} />;
  }
  return <Stack />;
}
