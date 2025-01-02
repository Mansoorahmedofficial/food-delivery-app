import { StyleSheet, Image, Pressable } from "react-native";
// import EditScreenInfo from "@/src/components/EditScreenInfo";
import { Text, View } from "@/src/components/Themed";
import Colors from "@/src/constants/Colors";
import products from "@/assets/data/products";
import { Product } from "../types";
import { Link, useSegments } from "expo-router";
type ProductListIiemProps = {
  product: Product;
};

export const DefualtPizzaImage =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";

export const ProductListIiem = ({ product }: ProductListIiemProps) => {
  const segments = useSegments()
  console.log(segments)
  return (
    <Link href={`/${segments[0]}/menu/${product.id}`} asChild>
      <Pressable style={styles.container}>
        <Image
          source={{ uri: product.image || DefualtPizzaImage }}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.title}>{product.id}</Text>
        <Text>${product.price}</Text>
        {/* <Link href={"/product"}>Cick here to visit</Link> */}
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    maxWidth: "50%",
  },

  title: { fontSize: 20, fontWeight: "bold", marginVertical: 10 },
  price: {
    color: Colors.light.tint,
  },
  image: {
    width: "100%",
    aspectRatio: 1 / 1,
  },
});
