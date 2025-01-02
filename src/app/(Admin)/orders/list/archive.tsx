import { Text, FlatList } from "react-native";
import orders from "@/assets/data/orders";
import OrderItemListItem from "@/src/components/OrderListItems";
export default function OrderScreen() {
  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderItemListItem order={item} />}
      contentContainerStyle={{ gap: 10, padding: 10 }}
    />
  );
}
