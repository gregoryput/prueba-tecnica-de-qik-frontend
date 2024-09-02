import { StyleSheet, Text, View } from "react-native";
import LayoutNav from "./src/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

export default function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <LayoutNav />
      </QueryClientProvider>
    </>
  );
}
