import { View, Text, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function LevelScreen() {
  const { level } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View>
      <Text>Nivel: {level}</Text>

      <TouchableOpacity onPress={() => router.push('./exercises')}>
        <Text>Ver ejercicios</Text>
      </TouchableOpacity>
    </View>
  );
}
