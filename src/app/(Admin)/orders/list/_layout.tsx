import { Stack, Tabs, withLayoutContext } from "expo-router";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SafeAreaView } from "react-native-safe-area-context";

const MyTabs = withLayoutContext(createMaterialTopTabNavigator().Navigator);
export default function OrderListNavigator() {
  return (
    <SafeAreaView>
      <MyTabs />
    </SafeAreaView>
  );
}
