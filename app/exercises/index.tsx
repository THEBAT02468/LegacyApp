import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const COLORS = {
  neonBlue: "#00F0FF",
  darkBlue: "#0A1A2F",
  lightBlue: "#4DA8DA",
  white: "#FFFFFF",
  black: "#000000",
  gray: "#8E8E93",
  cardBg: "rgba(255, 255, 255, 0.05)",
  green: "#4CD964",
  red: "#FF3B30",
  yellow: "#FFCC00",
};

const EXERCISE_CATEGORIES = [
  {
    id: "1",
    name: "PECHO",
    icon: "fitness",
    color: "#FF6B6B",
    count: 12,
    description: "Desarrollo completo del torso",
  },
  {
    id: "2",
    name: "ESPALDA",
    icon: "body",
    color: "#4ECDC4",
    count: 15,
    description: "Fuerza y postura",
  },
  {
    id: "3",
    name: "PIERNAS",
    icon: "walk",
    color: "#45B7D1",
    count: 18,
    description: "Base fundamental",
  },
  {
    id: "4",
    name: "HOMBROS",
    icon: "body-outline",
    color: "#96CEB4",
    count: 10,
    description: "Desarrollo 3D",
  },
  {
    id: "5",
    name: "BRAZOS",
    icon: "barbell",
    color: "#FFEAA7",
    count: 14,
    description: "Fuerza y definición",
  },
  {
    id: "6",
    name: "CORE",
    icon: "ellipse",
    color: "#DDA0DD",
    count: 20,
    description: "Estabilidad y fuerza",
  },
];

const POPULAR_EXERCISES = [
  {
    id: "1",
    name: "PRESS BANCA",
    category: "Pecho",
    difficulty: "Intermedio",
    equipment: "Barra y banco",
    muscleGroups: ["Pectoral Mayor", "Tríceps", "Deltoides Anterior"],
    image: require("../../assets/images/Main.jpeg"),
  },
  {
    id: "2",
    name: "SENTADILLAS",
    category: "Piernas",
    difficulty: "Básico",
    equipment: "Barra",
    muscleGroups: ["Cuádriceps", "Glúteos", "Isquiotibiales"],
    image: require("../../assets/images/Main.jpeg"),
  },
];

const WORKOUT_PLANS = [
  {
    id: "1",
    name: "FUERZA MAXIMA",
    duration: "12 semanas",
    focus: "Ganancia de fuerza",
    level: "Avanzado",
  },
  {
    id: "2",
    name: "HIPERTROFIA",
    duration: "8 semanas",
    focus: "Desarrollo muscular",
    level: "Intermedio",
  },
  {
    id: "3",
    name: "DEFINICIÓN",
    duration: "6 semanas",
    focus: "Pérdida de grasa",
    level: "Todos los niveles",
  },
];

export default function Exercises() {
  const router = useRouter();

  const renderCategoryCard = ({ item }: any) => (
    <TouchableOpacity
      style={styles.categoryCard}
      onPress={() => router.push(`./exercises/category/${item.id}`)}
      activeOpacity={0.8}
    >
      <View
        style={[
          styles.categoryIconContainer,
          { backgroundColor: item.color + "20" },
        ]}
      >
        <Ionicons name={item.icon} size={32} color={item.color} />
      </View>
      <Text style={styles.categoryName}>{item.name}</Text>
      <Text style={styles.categoryCount}>{item.count} ejercicios</Text>
      <Text style={styles.categoryDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  const renderExerciseCard = ({ item }: any) => (
    <TouchableOpacity
      style={styles.exerciseCard}
      onPress={() => router.push(`./exercises/${item.id}`)}
      activeOpacity={0.8}
    >
      <Image source={item.image} style={styles.exerciseImage} />
      <View style={styles.exerciseInfo}>
        <View style={styles.exerciseHeader}>
          <Text style={styles.exerciseName}>{item.name}</Text>
          <View
            style={[
              styles.difficultyBadge,
              {
                backgroundColor:
                  item.difficulty === "Básico"
                    ? COLORS.green + "30"
                    : item.difficulty === "Intermedio"
                      ? COLORS.yellow + "30"
                      : COLORS.red + "30",
              },
            ]}
          >
            <Text
              style={[
                styles.difficultyText,
                {
                  color:
                    item.difficulty === "Básico"
                      ? COLORS.green
                      : item.difficulty === "Intermedio"
                        ? COLORS.yellow
                        : COLORS.red,
                },
              ]}
            >
              {item.difficulty}
            </Text>
          </View>
        </View>
        <Text style={styles.exerciseCategory}>{item.category}</Text>
        <Text style={styles.exerciseEquipment}>{item.equipment}</Text>
        <View style={styles.muscleGroups}>
          {item.muscleGroups.slice(0, 2).map((muscle: any, index: number) => (
            <View key={index} style={styles.muscleTag}>
              <Text style={styles.muscleTagText}>{muscle}</Text>
            </View>
          ))}
          {item.muscleGroups.length > 2 && (
            <View style={styles.moreTag}>
              <Text style={styles.moreTagText}>
                +{item.muscleGroups.length - 2}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderWorkoutPlan = ({ item }: any) => (
    <TouchableOpacity
      style={styles.workoutPlanCard}
      onPress={() => router.push(`./workout-plans/${item.id}`)}
      activeOpacity={0.8}
    >
      <View style={styles.planHeader}>
        <Text style={styles.planName}>{item.name}</Text>
        <MaterialCommunityIcons
          name="arrow-right"
          size={24}
          color={COLORS.neonBlue}
        />
      </View>
      <View style={styles.planDetails}>
        <View style={styles.planDetail}>
          <Ionicons name="time" size={16} color={COLORS.lightBlue} />
          <Text style={styles.planDetailText}>{item.duration}</Text>
        </View>
        <View style={styles.planDetail}>
          <Ionicons name="flame" size={16} color={COLORS.lightBlue} />
          <Text style={styles.planDetailText}>{item.focus}</Text>
        </View>
        <View style={styles.planDetail}>
          <Ionicons name="person" size={16} color={COLORS.lightBlue} />
          <Text style={styles.planDetailText}>{item.level}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>EJERCICIOS LEGACY</Text>
          <Text style={styles.subtitle}>
            Biblioteca completa de ejercicios y rutinas
          </Text>
        </View>

        {/* Buscador */}
        <TouchableOpacity style={styles.searchBar}>
          <Ionicons name="search" size={20} color={COLORS.lightBlue} />
          <Text style={styles.searchText}>Buscar ejercicios o músculos...</Text>
        </TouchableOpacity>

        {/* Categorías */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>CATEGORÍAS</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Ver todas</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={EXERCISE_CATEGORIES}
            renderItem={renderCategoryCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>

        {/* Ejercicios Populares */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>EJERCICIOS POPULARES</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Ver todos</Text>
            </TouchableOpacity>
          </View>
          {POPULAR_EXERCISES.map((exercise) => (
            <TouchableOpacity
              key={exercise.id}
              style={styles.exerciseCard}
              onPress={() => router.push(`./exercises/${exercise.id}`)}
              activeOpacity={0.8}
            >
              <Image source={exercise.image} style={styles.exerciseImage} />
              <View style={styles.exerciseInfo}>
                <View style={styles.exerciseHeader}>
                  <Text style={styles.exerciseName}>{exercise.name}</Text>
                  <View
                    style={[
                      styles.difficultyBadge,
                      {
                        backgroundColor:
                          exercise.difficulty === "Básico"
                            ? COLORS.green + "30"
                            : exercise.difficulty === "Intermedio"
                              ? COLORS.yellow + "30"
                              : COLORS.red + "30",
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.difficultyText,
                        {
                          color:
                            exercise.difficulty === "Básico"
                              ? COLORS.green
                              : exercise.difficulty === "Intermedio"
                                ? COLORS.yellow
                                : COLORS.red,
                        },
                      ]}
                    >
                      {exercise.difficulty}
                    </Text>
                  </View>
                </View>
                <Text style={styles.exerciseCategory}>{exercise.category}</Text>
                <Text style={styles.exerciseEquipment}>
                  {exercise.equipment}
                </Text>
                <View style={styles.muscleGroups}>
                  {exercise.muscleGroups.slice(0, 2).map((muscle, index) => (
                    <View key={index} style={styles.muscleTag}>
                      <Text style={styles.muscleTagText}>{muscle}</Text>
                    </View>
                  ))}
                  {exercise.muscleGroups.length > 2 && (
                    <View style={styles.moreTag}>
                      <Text style={styles.moreTagText}>
                        +{exercise.muscleGroups.length - 2}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Planes de Entrenamiento */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>PLANES DE ENTRENAMIENTO</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Ver todos</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={WORKOUT_PLANS}
            renderItem={renderWorkoutPlan}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.plansList}
          />
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Ionicons name="barbell" size={28} color={COLORS.neonBlue} />
            <Text style={styles.statNumber}>89</Text>
            <Text style={styles.statLabel}>Ejercicios</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="play" size={28} color={COLORS.neonBlue} />
            <Text style={styles.statNumber}>24</Text>
            <Text style={styles.statLabel}>Rutinas</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="videocam" size={28} color={COLORS.neonBlue} />
            <Text style={styles.statNumber}>156</Text>
            <Text style={styles.statLabel}>Videos</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="time" size={28} color={COLORS.neonBlue} />
            <Text style={styles.statNumber}>∞</Text>
            <Text style={styles.statLabel}>Horas</Text>
          </View>
        </View>

        {/* CTA */}
        <TouchableOpacity style={styles.ctaButton}>
          <Text style={styles.ctaText}>CREAR RUTINA PERSONALIZADA</Text>
          <Ionicons name="add-circle" size={24} color={COLORS.darkBlue} />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.darkBlue,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    paddingVertical: 30,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    color: COLORS.neonBlue,
    letterSpacing: 2,
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.lightBlue,
    textAlign: "center",
    maxWidth: 300,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 14,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "rgba(0, 240, 255, 0.1)",
  },
  searchText: {
    color: COLORS.lightBlue,
    fontSize: 16,
    marginLeft: 10,
    opacity: 0.8,
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.white,
  },
  seeAll: {
    fontSize: 14,
    color: COLORS.neonBlue,
    fontWeight: "600",
  },
  categoriesList: {
    paddingRight: 20,
  },
  categoryCard: {
    width: 140,
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    padding: 20,
    marginRight: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(0, 240, 255, 0.1)",
  },
  categoryIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.white,
    marginBottom: 4,
    textAlign: "center",
  },
  categoryCount: {
    fontSize: 12,
    color: COLORS.neonBlue,
    marginBottom: 8,
  },
  categoryDescription: {
    fontSize: 11,
    color: COLORS.lightBlue,
    textAlign: "center",
    lineHeight: 14,
  },
  exerciseCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    marginBottom: 15,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(0, 240, 255, 0.1)",
    shadowColor: COLORS.neonBlue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  exerciseImage: {
    width: "100%",
    height: 150,
  },
  exerciseInfo: {
    padding: 16,
  },
  exerciseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.white,
    flex: 1,
  },
  difficultyBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 10,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  exerciseCategory: {
    fontSize: 14,
    color: COLORS.neonBlue,
    marginBottom: 4,
    fontWeight: "600",
  },
  exerciseEquipment: {
    fontSize: 13,
    color: COLORS.lightBlue,
    marginBottom: 12,
  },
  muscleGroups: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  muscleTag: {
    backgroundColor: "rgba(77, 168, 218, 0.2)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  muscleTagText: {
    fontSize: 11,
    color: COLORS.lightBlue,
  },
  moreTag: {
    backgroundColor: "rgba(0, 240, 255, 0.2)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  moreTagText: {
    fontSize: 11,
    color: COLORS.neonBlue,
    fontWeight: "bold",
  },
  plansList: {
    paddingRight: 20,
  },
  workoutPlanCard: {
    width: 250,
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    padding: 20,
    marginRight: 15,
    borderWidth: 1,
    borderColor: "rgba(0, 240, 255, 0.1)",
  },
  planHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  planName: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.white,
    flex: 1,
  },
  planDetails: {
    gap: 8,
  },
  planDetail: {
    flexDirection: "row",
    alignItems: "center",
  },
  planDetailText: {
    fontSize: 14,
    color: COLORS.lightBlue,
    marginLeft: 8,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  statCard: {
    flex: 1,
    alignItems: "center",
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    padding: 15,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "rgba(0, 240, 255, 0.1)",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.neonBlue,
    marginTop: 5,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.lightBlue,
    marginTop: 2,
  },
  ctaButton: {
    backgroundColor: COLORS.neonBlue,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    borderRadius: 25,
    marginBottom: 40,
    shadowColor: COLORS.neonBlue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  ctaText: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.black,
    marginRight: 10,
  },
});
