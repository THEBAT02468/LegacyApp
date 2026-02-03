import { useLocalSearchParams, useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function DisciplineDetail() {
  const { discipline } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View>
      <Text>
        {Array.isArray(discipline)
          ? discipline.join(", ").toUpperCase()
          : discipline
            ? discipline.toUpperCase()
            : ""}
      </Text>

      <TouchableOpacity onPress={() => router.push("/levels/basico")}>
        <Text>Básico</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/levels/intermedio")}>
        <Text>Intermedio</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/levels/avanzado")}>
        <Text>Avanzado</Text>
      </TouchableOpacity>
    </View>
  );
}
