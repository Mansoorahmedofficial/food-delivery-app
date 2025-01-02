import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import products from "@/assets/data/products";
import { DefualtPizzaImage } from "@/src/components/ProductItemList";
import { useEffect, useState } from "react";
import Button from "@/src/components/button";
import { useCart } from "@/src/providers/CartContextprovider";
import { PizzaSize, Product } from "@/src/types";
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
      
      <Stack.Screen options={{ title: product?.name }} />
      <Image
        style={styles.Image}
        source={{ uri: product.image || DefualtPizzaImage }}
      />
      <Text>Select Size</Text>
      <View style={styles.sizes}>
        {Sizes.map((size) => (
          <Pressable
            onPress={() => {
              setselectedsize(size);
            }}
            style={[
              styles.size,
              {
                backgroundColor: Selectedsize === size ? "gainsboro" : "white",
              },
            ]}
            key={size}
          >
            <Text
              style={[
                styles.sizeText,
                {
                  backgroundColor: Selectedsize === size ? "black" : "gray",
                },
              ]}
            >
              {size}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.price}>Price:{product.price}</Text>
      <Button onPress={addTocart} text="Add to cart" />
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
  price: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: "auto",
  },
  sizes: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  size: {
    backgroundColor: "gainsboro",
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  sizeText: {
    fontSize: 20,
    fontWeight: "500",
  },
});
