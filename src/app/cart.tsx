import { View, Text, Platform, FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";
// import { useContext } from "react";
// import { CartContext } from "../providers/CartContextprovider";
import { useCart } from "../providers/CartContextprovider";
import CartListItem from "../components/CartListitem";
import Button from "../components/button";
const CartScreen = () => {
  const { items, total } = useCart();
  return (
    <View style={{ padding: 10 }}>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ gap: 10 }}
      />
      <Text style={{ marginTop: 20, fontSize: 20, fontWeight: "500" }}>
        Total: {total}
      </Text>
      <Button text="checkout" />
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
};
export default CartScreen;
