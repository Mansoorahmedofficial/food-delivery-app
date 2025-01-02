import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import products from "@/assets/data/products";
import { DefualtPizzaImage } from "@/src/components/ProductItemList";
import { useEffect, useState } from "react";
import Button from "@/src/components/button";
import { useCart } from "@/src/providers/CartContextprovider";
import { PizzaSize, Product } from "@/src/types";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/src/constants/Colors";
const Sizes: PizzaSize[] = ["S", "M", "X", "XL"];

const ProductsDetailsScreen = (props: any) => {
  const router = useRouter();
  const [Selectedsize, setselectedsize] = useState<PizzaSize>("M");
  const { id } = useLocalSearchParams();
  const { additems } = useCart();
  const product = products.find((p) => p.id.toString() === id);

  const addTocart = () => {
    // console.warn("Add to cart, size", Selectedsize);
    if (!product) {
      return;
    }
    additems(product, Selectedsize);
    router.push("/cart");
  };
  if (!product) {
    return <Text>Product Not Found</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Menu",
          headerRight: () => (
            <Link href={`/(Admin)/menu/create?id=${id}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={25}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Stack.Screen options={{ title: product?.name }} />
      <Image
        style={styles.Image}
        source={{ uri: product.image || DefualtPizzaImage }}
      />

      <Text style={styles.title}>Price:{product.name}</Text>
      <Text style={styles.price}>Price:{product.price}</Text>
    </View>
  );
};
export default ProductsDetailsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 10,
  },
  Image: {
    width: "100%",
    aspectRatio: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
