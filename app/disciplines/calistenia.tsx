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

// Types
type LevelId = "basico" | "intermedio" | "avanzado";

interface Level {
  id: LevelId;
  name: string;
  color: string;
  icon: string;
  description: string;
  duration: string;
  focus: string[];
  exercises: string[];
}

interface Exercise {
  id: string;
  name: string;
  level: string;
  difficulty: string;
  description: string;
  progression: string[];
  image: any;
}

interface WorkoutPlan {
  id: string;
  name: string;
  focus: string;
  duration: string;
  exercises: string[];
}

const COLORS = {
  neonBlue: "#00F0FF",
  darkBlue: "#0A1A2F",
  lightBlue: "#4DA8DA",
  white: "#FFFFFF",
  black: "#000000",
  cardBg: "rgba(255, 255, 255, 0.05)",
  green: "#4CD964",
  orange: "#FF9500",
  purple: "#AF52DE",
  calistenia: "#4ECDC4",
};

const LEVELS: Level[] = [
  {
    id: "basico",
    name: "BÁSICO",
    color: "#4CD964",
    icon: "school",
    description: "Para quienes recién comienzan su viaje en calistenia",
    duration: "4-8 semanas",
    focus: ["Técnica fundamental", "Fuerza de base", "Consistencia"],
    exercises: [
      "Flexiones de rodillas",
      "Dominadas asistidas",
      "Fondos en banco",
    ],
  },
  {
    id: "intermedio",
    name: "INTERMEDIO",
    color: "#FF9500",
    icon: "trophy",
    description: "Domina los movimientos fundamentales y avanza a variaciones",
    duration: "8-16 semanas",
    focus: ["Fuerza relativa", "Control corporal", "Progresiones"],
    exercises: [
      "Flexiones estándar",
      "Dominadas completas",
      "Muscle-up progresión",
    ],
  },
  {
    id: "avanzado",
    name: "AVANZADO",
    color: "#FF3B30",
    icon: "rocket",
    description: "Movimientos avanzados y combinaciones de alta complejidad",
    duration: "16+ semanas",
    focus: ["Skills avanzados", "Potencia explosiva", "Rutinas complejas"],
    exercises: ["Planche progresión", "Front lever", "One arm pull-up"],
  },
];

const EXERCISES: Exercise[] = [
  {
    id: "1",
    name: "DOMINADAS",
    level: "Todos los niveles",
    difficulty: "Variable",
    description: "Ejercicio fundamental para espalda y brazos",
    progression: ["Asistidas", "Negativas", "Completas", "Weighted"],
    image: require("../../assets/images/calistenia/pull-up.jpg"),
  },
  {
    id: "2",
    name: "FLEXIONES",
    level: "Básico - Avanzado",
    difficulty: "Variable",
    description: "Desarrollo completo del torso y brazos",
    progression: ["De rodillas", "Estándar", "Diamante", "Planche push-up"],
    image: require("../../assets/images/calistenia/push-up.jpg"),
  },
  {
    id: "3",
    name: "MUSCLE-UP",
    level: "Intermedio - Avanzado",
    difficulty: "Alto",
    description: "Movimiento de transición de dominada a fondo",
    progression: ["False grip", "Explosive pull", "Transition drill"],
    image: require("../../assets/images/calistenia/muscle-up.jpeg"),
  },
];

const WORKOUT_PLANS: WorkoutPlan[] = [
  {
    id: "1",
    name: "RUTINA INICIAL 3x/SEMANA",
    focus: "Fuerza y técnica",
    duration: "45-60 min",
    exercises: ["Flexiones", "Dominadas", "Sentadillas", "Plancha"],
  },
  {
    id: "2",
    name: "RUTINA INTERMEDIA PPL",
    focus: "Hipertrofia calisténica",
    duration: "60-75 min",
    exercises: ["Push day", "Pull day", "Legs day", "Skill work"],
  },
  {
    id: "3",
    name: "RUTINA AVANZADA SKILLS",
    focus: "Movimientos avanzados",
    duration: "75-90 min",
    exercises: ["Planche training", "Front lever", "Handstand", "Combos"],
  },
];

export default function CalisteniaDetail() {
  const router = useRouter();

  const renderLevelCard = ({ item }: { item: Level }) => (
    <TouchableOpacity
      style={styles.levelCard}
      onPress={() => router.push(`/levels/${item.id}`)}
      activeOpacity={0.8}
    >
      <View
        style={[styles.levelHeader, { backgroundColor: item.color + "20" }]}
      >
        <Ionicons name={item.icon as any} size={30} color={item.color} />
        <Text style={[styles.levelName, { color: item.color }]}>
          {item.name}
        </Text>
      </View>
      <View style={styles.levelContent}>
        <Text style={styles.levelDescription}>{item.description}</Text>
        <View style={styles.levelDetail}>
          <Ionicons name="time" size={16} color={COLORS.lightBlue} />
          <Text style={styles.levelDetailText}>{item.duration}</Text>
        </View>
        <View style={styles.focusContainer}>
          {item.focus.map((focusItem: string, index: number) => (
            <View key={`focus-${item.id}-${index}`} style={styles.focusTag}>
              <Text style={styles.focusText}>{focusItem}</Text>
            </View>
          ))}
        </View>
        <View style={styles.exercisesPreview}>
          <Text style={styles.exercisesTitle}>Ejercicios clave:</Text>
          {item.exercises.slice(0, 2).map((exercise: string, index: number) => (
            <Text
              key={`ex-prev-${item.id}-${index}`}
              style={styles.exerciseItem}
            >
              • {exercise}
            </Text>
          ))}
        </View>
      </View>
      <TouchableOpacity
        style={[styles.levelButton, { backgroundColor: item.color }]}
        onPress={() => router.push(`/levels/${item.id}`)}
      >
        <Text style={styles.levelButtonText}>EXPLORAR NIVEL</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderExerciseCard = ({ item }: { item: Exercise }) => (
    <TouchableOpacity style={styles.exerciseCard} activeOpacity={0.8}>
      <Image source={item.image} style={styles.exerciseImage} />
      <View style={styles.exerciseInfo}>
        <View style={styles.exerciseHeader}>
          <Text style={styles.exerciseName}>{item.name}</Text>
          <View style={styles.difficultyBadge}>
            <Text style={styles.difficultyText}>{item.difficulty}</Text>
          </View>
        </View>
        <Text style={styles.exerciseLevel}>{item.level}</Text>
        <Text style={styles.exerciseDescription}>{item.description}</Text>
        <View style={styles.progressionContainer}>
          <Text style={styles.progressionTitle}>Progresión:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {item.progression.map((step: string, index: number) => (
              <View
                key={`prog-${item.id}-${index}`}
                style={styles.progressionStep}
              >
                <Text style={styles.progressionStepText}>{step}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderWorkoutPlan = ({ item }: { item: WorkoutPlan }) => (
    <TouchableOpacity style={styles.workoutPlanCard} activeOpacity={0.8}>
      <View style={styles.planHeader}>
        <Text style={styles.planName}>{item.name}</Text>
        <MaterialCommunityIcons
          name="dumbbell"
          size={24}
          color={COLORS.calistenia}
        />
      </View>
      <View style={styles.planDetails}>
        <View style={styles.planDetail}>
          <Ionicons name="flame" size={16} color={COLORS.calistenia} />
          <Text style={styles.planDetailText}>{item.focus}</Text>
        </View>
        <View style={styles.planDetail}>
          <Ionicons name="time" size={16} color={COLORS.calistenia} />
          <Text style={styles.planDetailText}>{item.duration}</Text>
        </View>
      </View>
      <View style={styles.exercisesList}>
        {item.exercises.map((exercise: string, index: number) => (
          <View key={`workplan-${item.id}-${index}`} style={styles.exerciseTag}>
            <Text style={styles.exerciseTagText}>{exercise}</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.startWorkoutButton}>
        <Text style={styles.startWorkoutText}>INICIAR RUTINA</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header con imagen */}
        <View style={styles.header}>
          <Image
            source={require("../../assets/images/calistenia/header.jpg")}
            style={styles.headerImage}
          />
          <View style={styles.headerOverlay}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color={COLORS.white} />
            </TouchableOpacity>
            <View style={styles.headerContent}>
              <Text style={styles.disciplineTitle}>CALISTENIA</Text>
              <Text style={styles.disciplineSubtitle}>
                El arte del movimiento con peso corporal
              </Text>
            </View>
          </View>
        </View>

        {/* Introducción */}
        <View style={styles.introSection}>
          <Text style={styles.introTitle}>¿QUÉ ES LA CALISTENIA?</Text>
          <Text style={styles.introText}>
            La calistenia es un sistema de entrenamiento que utiliza el peso del
            propio cuerpo para desarrollar fuerza, flexibilidad y control
            corporal. Desde movimientos básicos hasta habilidades avanzadas, es
            el camino hacia el dominio de tu cuerpo.
          </Text>
          <View style={styles.benefitsContainer}>
            <View style={styles.benefitItem}>
              <Ionicons name="body" size={28} color={COLORS.calistenia} />
              <Text style={styles.benefitText}>Fuerza Funcional</Text>
            </View>
            <View style={styles.benefitItem}>
              <Ionicons name="fitness" size={28} color={COLORS.calistenia} />
              <Text style={styles.benefitText}>Control Corporal</Text>
            </View>
            <View style={styles.benefitItem}>
              <Ionicons name="cube" size={28} color={COLORS.calistenia} />
              <Text style={styles.benefitText}>Minimalismo</Text>
            </View>
            <View style={styles.benefitItem}>
              <Ionicons name="people" size={28} color={COLORS.calistenia} />
              <Text style={styles.benefitText}>Comunidad</Text>
            </View>
          </View>
        </View>

        {/* Niveles de Progresión */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>NIVELES DE PROGRESIÓN</Text>
            <Text style={styles.sectionSubtitle}>
              Avanza paso a paso en tu viaje calisténico
            </Text>
          </View>
          <FlatList
            data={LEVELS}
            renderItem={renderLevelCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.levelsList}
          />
        </View>

        {/* Ejercicios Fundamentales */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>EJERCICIOS FUNDAMENTALES</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Ver todos</Text>
            </TouchableOpacity>
          </View>
          {EXERCISES.map((exercise) => renderExerciseCard({ item: exercise }))}
        </View>

        {/* Rutinas Predefinidas */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>RUTINAS PREDEFINIDAS</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Personalizar</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={WORKOUT_PLANS}
            renderItem={renderWorkoutPlan}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.workoutList}
          />
        </View>

        {/* Equipamiento */}
        <View style={styles.equipmentSection}>
          <Text style={styles.equipmentTitle}>EQUIPAMIENTO BÁSICO</Text>
          <View style={styles.equipmentGrid}>
            <View style={styles.equipmentItem}>
              <Ionicons name="barbell" size={32} color={COLORS.calistenia} />
              <Text style={styles.equipmentName}>Barra de Dominadas</Text>
            </View>
            <View style={styles.equipmentItem}>
              <Ionicons name="square" size={32} color={COLORS.calistenia} />
              <Text style={styles.equipmentName}>Paralelas</Text>
            </View>
            <View style={styles.equipmentItem}>
              <Ionicons name="bandage" size={32} color={COLORS.calistenia} />
              <Text style={styles.equipmentName}>Bandas de Resistencia</Text>
            </View>
            <View style={styles.equipmentItem}>
              <Ionicons name="globe" size={32} color={COLORS.calistenia} />
              <Text style={styles.equipmentName}>Anillas Gimnásticas</Text>
            </View>
          </View>
        </View>

        {/* CTA */}
        <TouchableOpacity style={styles.ctaButton}>
          <Text style={styles.ctaText}>
            DESCARGAR GUÍA COMPLETA DE CALISTENIA
          </Text>
          <Ionicons name="download" size={24} color={COLORS.darkBlue} />
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
  },
  header: {
    height: 300,
    position: "relative",
  },
  headerImage: {
    width: "100%",
    height: "100%",
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(10, 26, 47, 0.7)",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  headerContent: {
    flex: 1,
    justifyContent: "center",
  },
  disciplineTitle: {
    fontSize: 48,
    fontWeight: "900",
    color: COLORS.calistenia,
    marginBottom: 10,
    textShadowColor: "rgba(78, 205, 196, 0.3)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  disciplineSubtitle: {
    fontSize: 18,
    color: COLORS.white,
    maxWidth: 300,
  },
  introSection: {
    padding: 25,
    backgroundColor: COLORS.cardBg,
    marginTop: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  introTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.white,
    marginBottom: 15,
  },
  introText: {
    fontSize: 16,
    color: COLORS.lightBlue,
    lineHeight: 24,
    marginBottom: 25,
  },
  benefitsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  benefitItem: {
    width: "48%",
    alignItems: "center",
    marginBottom: 15,
  },
  benefitText: {
    fontSize: 12,
    color: COLORS.calistenia,
    marginTop: 5,
    textAlign: "center",
    fontWeight: "600",
  },
  section: {
    paddingHorizontal: 25,
    marginBottom: 30,
  },
  sectionHeader: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.white,
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: COLORS.lightBlue,
  },
  seeAll: {
    fontSize: 14,
    color: COLORS.calistenia,
    fontWeight: "600",
  },
  levelsList: {
    paddingRight: 25,
  },
  levelCard: {
    width: 280,
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    marginRight: 15,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(0, 240, 255, 0.1)",
  },
  levelHeader: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  levelName: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  levelContent: {
    padding: 20,
  },
  levelDescription: {
    fontSize: 14,
    color: COLORS.lightBlue,
    marginBottom: 15,
    lineHeight: 20,
  },
  levelDetail: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  levelDetailText: {
    fontSize: 14,
    color: COLORS.lightBlue,
    marginLeft: 8,
  },
  focusContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 15,
  },
  focusTag: {
    backgroundColor: "rgba(78, 205, 196, 0.1)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  focusText: {
    fontSize: 12,
    color: COLORS.calistenia,
  },
  exercisesPreview: {
    marginTop: 10,
  },
  exercisesTitle: {
    fontSize: 14,
    color: COLORS.white,
    fontWeight: "600",
    marginBottom: 5,
  },
  exerciseItem: {
    fontSize: 13,
    color: COLORS.lightBlue,
    marginBottom: 2,
  },
  levelButton: {
    padding: 16,
    alignItems: "center",
  },
  levelButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.black,
  },
  exerciseCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    marginBottom: 15,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(0, 240, 255, 0.1)",
  },
  exerciseImage: {
    width: "100%",
    height: 180,
  },
  exerciseInfo: {
    padding: 20,
  },
  exerciseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  exerciseName: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.white,
    flex: 1,
  },
  difficultyBadge: {
    backgroundColor: "rgba(78, 205, 196, 0.2)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 10,
  },
  difficultyText: {
    fontSize: 12,
    color: COLORS.calistenia,
    fontWeight: "bold",
  },
  exerciseLevel: {
    fontSize: 14,
    color: COLORS.calistenia,
    marginBottom: 10,
    fontWeight: "600",
  },
  exerciseDescription: {
    fontSize: 15,
    color: COLORS.lightBlue,
    lineHeight: 22,
    marginBottom: 15,
  },
  progressionContainer: {
    marginTop: 10,
  },
  progressionTitle: {
    fontSize: 16,
    color: COLORS.white,
    fontWeight: "600",
    marginBottom: 10,
  },
  progressionStep: {
    backgroundColor: "rgba(78, 205, 196, 0.1)",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
    marginRight: 10,
  },
  progressionStepText: {
    fontSize: 13,
    color: COLORS.calistenia,
    fontWeight: "600",
  },
  workoutList: {
    paddingRight: 25,
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
    marginBottom: 15,
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
  exercisesList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 20,
  },
  exerciseTag: {
    backgroundColor: "rgba(78, 205, 196, 0.1)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  exerciseTagText: {
    fontSize: 12,
    color: COLORS.calistenia,
  },
  startWorkoutButton: {
    backgroundColor: COLORS.calistenia,
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  startWorkoutText: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.black,
  },
  equipmentSection: {
    padding: 25,
    backgroundColor: COLORS.cardBg,
    marginHorizontal: 25,
    borderRadius: 20,
    marginBottom: 30,
  },
  equipmentTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.white,
    marginBottom: 20,
    textAlign: "center",
  },
  equipmentGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  equipmentItem: {
    width: "48%",
    alignItems: "center",
    marginBottom: 20,
  },
  equipmentName: {
    fontSize: 12,
    color: COLORS.lightBlue,
    marginTop: 8,
    textAlign: "center",
  },
  ctaButton: {
    backgroundColor: COLORS.calistenia,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    borderRadius: 25,
    marginHorizontal: 25,
    marginBottom: 40,
    shadowColor: COLORS.calistenia,
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
    textAlign: "center",
  },
});
