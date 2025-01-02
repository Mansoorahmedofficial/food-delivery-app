import { View, FlatList } from "react-native";
// // import EditScreenInfo from "@/src/components/EditScreenInfo";
// import { Text, View } from "@/src/components/Themed";
// import Colors from "@/src/constants/Colors";
import products from "@/assets/data/products";
import { ProductListIiem } from "@/src/components/ProductItemList";

// const product = products[1];
/*

// <View>
      {/* <ProductListIiem product={products[0]} />
      <ProductListIiem product={products[1]} /> */
/* </View> */

export default function MenuScreen() {
  return (
    <FlatList
      data={products}
      renderItem={({ item }) => <ProductListIiem product={item} />}
      numColumns={2}
      contentContainerStyle={{ gap: 10, padding: 10 }}
      columnWrapperStyle={{ gap: 10 }}
    />
  );
}
