import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function ExerciseDetail() {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>Ejercicio #{id}</Text>
      <Text>Descripción + Video explicativo</Text>
    </View>
  );
}
