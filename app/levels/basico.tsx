import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
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

// Types for this file
type LevelKey = "basico" | "intermedio" | "avanzado";

interface LevelInfo {
  name: string;
  color: string;
  description: string;
  duration: string;
  difficulty: string;
  icon: string;
  goals: string[];
  focus: string;
}

interface LevelExercise {
  id: string;
  name: string;
  description: string;
  sets: string;
  rest: string;
  focus: string[];
  progression: string;
  slug?: string;
  image: any;
}

interface Program {
  id: string;
  name: string;
  days: string[];
  duration: string;
  focus: string;
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
  red: "#FF3B30",
  yellow: "#FFCC00",
  purple: "#AF52DE",
};

const LEVEL_DATA: Record<LevelKey, LevelInfo> = {
  basico: {
    name: "BÁSICO",
    color: "#4CD964",
    description: "Comienza tu viaje en calistenia con fundamentos sólidos",
    duration: "4-8 semanas",
    difficulty: "Principiante",
    icon: "school",
    goals: [
      "Dominar técnica correcta",
      "Desarrollar fuerza base",
      "Establecer consistencia",
      "Prevenir lesiones",
    ],
    focus: "Fundamentos y técnica",
  },
  intermedio: {
    name: "INTERMEDIO",
    color: "#FF9500",
    description: "Domina los movimientos fundamentales y avanza a variaciones",
    duration: "8-16 semanas",
    difficulty: "Intermedio",
    icon: "trophy",
    goals: [
      "Consolidar movimientos básicos",
      "Introducir progresiones",
      "Mejorar fuerza relativa",
      "Desarrollar control corporal",
    ],
    focus: "Progresión y variedad",
  },
  avanzado: {
    name: "AVANZADO",
    color: "#FF3B30",
    description:
      "Desafía tus límites con movimientos complejos y skills avanzados",
    duration: "16+ semanas",
    difficulty: "Avanzado",
    icon: "rocket",
    goals: [
      "Dominar skills avanzados",
      "Desarrollar potencia explosiva",
      "Combinar movimientos",
      "Optimizar rendimiento",
    ],
    focus: "Skills y complejidad",
  },
};

const EXERCISES: Record<LevelKey, LevelExercise[]> = {
  basico: [
    {
      id: "1",
      name: "FLEXIONES DE RODILLAS",
      slug: "knee-pushups",
      description: "Variación modificada para desarrollar fuerza en el torso",
      sets: "3 x 8-12",
      rest: "60-90 seg",
      focus: ["Pectoral", "Tríceps", "Deltoides"],
      progression: "Avanzar a flexiones estándar",
      image: require("../../assets/images/calistenia/knee-pushups.jpg"),
    },
    {
      id: "2",
      name: "DOMINADAS ASISTIDAS",
      slug: "dominada",
      description: "Con banda de resistencia para aprender el movimiento",
      sets: "3 x 5-8",
      rest: "90-120 seg",
      focus: ["Dorsal", "Bíceps", "Trapecio"],
      progression: "Reducir asistencia gradualmente",
      image: require("../../assets/images/calistenia/assisted-pullup.jpg"),
    },
    {
      id: "3",
      name: "SENTADILLAS CON PESO CORPORAL",
      slug: "sentadillas",
      description: "Ejercicio fundamental para desarrollo de piernas",
      sets: "3 x 12-15",
      rest: "60 seg",
      focus: ["Cuádriceps", "Glúteos", "Isquiotibiales"],
      progression: "Añadir peso o profundidad",
      image: require("../../assets/images/calistenia/bodyweight-squat.jpg"),
    },
    {
      id: "4",
      name: "PLANCHA FRONTAL",
      slug: "plancha",
      description: "Desarrollo de core y estabilidad",
      sets: "3 x 30-60 seg",
      rest: "60 seg",
      focus: ["Abdominal", "Oblicuos", "Lumbares"],
      progression: "Aumentar tiempo o añadir variaciones",
      image: require("../../assets/images/calistenia/plank.jpg"),
    },
  ],
  intermedio: [
    {
      id: "1",
      name: "FLEXIONES ESTÁNDAR",
      description: "Movimiento completo para desarrollo del torso",
      sets: "4 x 8-12",
      rest: "60 seg",
      focus: ["Pectoral", "Tríceps", "Deltoides"],
      progression: "Diamante o declinadas",
      image: require("../../assets/images/calistenia/push-up.jpg"),
    },
    {
      id: "2",
      name: "DOMINADAS COMPLETAS",
      description: "Sin asistencia para máxima ganancia de fuerza",
      sets: "4 x 4-8",
      rest: "120 seg",
      focus: ["Dorsal", "Bíceps", "Trapecio"],
      progression: "Weighted pull-ups",
      image: require("../../assets/images/calistenia/pull-up.jpg"),
    },
  ],
  avanzado: [
    {
      id: "1",
      name: "FLEXIONES EN PARALELAS",
      description: "Para mayor rango de movimiento",
      sets: "4 x 6-10",
      rest: "90 seg",
      focus: ["Pectoral", "Tríceps", "Deltoides"],
      progression: "Muscle-up transition",
      image: require("../../assets/images/calistenia/dips.jpg"),
    },
    {
      id: "2",
      name: "MUSCLE-UP",
      description: "Combinación de dominada y fondo",
      sets: "3-5 x 1-3",
      rest: "180 seg",
      focus: ["Dorsal", "Pectoral", "Tríceps"],
      progression: "Strict muscle-ups",
      image: require("../../assets/images/calistenia/muscle-up.jpeg"),
    },
  ],
};

const WORKOUT_PROGRAMS: Record<LevelKey, Program[]> = {
  basico: [
    {
      id: "1",
      name: "RUTINA FULL BODY 3x",
      days: ["Lunes", "Miércoles", "Viernes"],
      duration: "45-60 min",
      focus: "Adaptación y técnica",
      exercises: [
        "Flexiones de rodillas 3x8-12",
        "Dominadas asistidas 3x5-8",
        "Sentadillas 3x12-15",
        "Plancha 3x30s",
        "Remo invertido 3x8-12",
      ],
    },
    {
      id: "2",
      name: "RUTINA A/B PARA PRINCIPIANTES",
      days: ["Lunes (A)", "Miércoles (B)", "Viernes (A)"],
      duration: "40-50 min",
      focus: "Variación y recuperación",
      exercises: [
        "Día A: Push & Core",
        "Día B: Pull & Legs",
        "Descanso activo entre días",
      ],
    },
  ],
  intermedio: [
    {
      id: "1",
      name: "RUTINA PUSH/PULL/LEGS",
      days: ["Push", "Pull", "Legs", "Descanso"],
      duration: "60-75 min",
      focus: "Especialización por grupos",
      exercises: [
        "Push: Flexiones, Dips, Pike push-ups",
        "Pull: Dominadas, Rows, Face pulls",
        "Legs: Pistol squats, Lunges, Calf raises",
      ],
    },
  ],
  avanzado: [
    {
      id: "1",
      name: "RUTINA SKILLS + STRENGTH",
      days: ["Skills", "Fuerza", "Skills", "Fuerza", "Descanso"],
      duration: "75-90 min",
      focus: "Habilidades avanzadas",
      exercises: [
        "Skills: Planche, Front lever, Handstand",
        "Fuerza: Weighted calisthenics",
        "Accesorios: Isométricos, explosivos",
      ],
    },
  ],
};

const TIPS: Record<LevelKey, string[]> = {
  basico: [
    "Prioriza la técnica sobre la cantidad",
    "Descansa 48 horas entre sesiones",
    "Mantén un diario de entrenamiento",
    "No compares tu progreso con otros",
    "Concéntrate en la consistencia",
  ],
  intermedio: [
    "Varía los ejercicios cada 4-6 semanas",
    "Incorpora días de movilidad",
    "Trabaja en puntos débiles",
    "Registra tus PRs personales",
    "Escucha a tu cuerpo",
  ],
  avanzado: [
    "Periodiza tu entrenamiento",
    "Incluye trabajo de prehabilitación",
    "Prioriza la recuperación",
    "Entrena con propósito específico",
    "Busca coaching especializado",
  ],
};

export default function LevelScreen() {
  const { level } = useLocalSearchParams();
  const router = useRouter();

  const rawLevel = Array.isArray(level) ? level[0] : level;
  const allowedLevels = ["basico", "intermedio", "avanzado"] as const;
  const levelKey =
    typeof rawLevel === "string" &&
    (allowedLevels as readonly string[]).includes(rawLevel)
      ? (rawLevel as LevelKey)
      : "basico";

  const levelInfo: LevelInfo = LEVEL_DATA[levelKey];
  const levelExercises: LevelExercise[] = EXERCISES[levelKey];
  const levelPrograms: Program[] = WORKOUT_PROGRAMS[levelKey];
  const levelTips: string[] = TIPS[levelKey];

  const renderExerciseCard = ({ item }: { item: LevelExercise }) => (
    <TouchableOpacity
      style={styles.exerciseCard}
      activeOpacity={0.8}
      onPress={() => router.push(`/exercises/${item.slug || item.id}` as any)}
    >
      <Image source={item.image} style={styles.exerciseImage} />
      <View style={styles.exerciseContent}>
        <View style={styles.exerciseHeader}>
          <Text style={styles.exerciseName}>{item.name}</Text>
          <View
            style={[
              styles.setsBadge,
              { backgroundColor: levelInfo.color + "30" },
            ]}
          >
            <Text style={[styles.setsText, { color: levelInfo.color }]}>
              {item.sets}
            </Text>
          </View>
        </View>
        <Text style={styles.exerciseDescription}>{item.description}</Text>

        <View style={styles.muscleGroups}>
          {item.focus.map((muscle: string, index: number) => (
            <View
              key={`${item.id}-muscle-${index}`}
              style={[
                styles.muscleTag,
                { backgroundColor: levelInfo.color + "15" },
              ]}
            >
              <Text style={[styles.muscleText, { color: levelInfo.color }]}>
                {muscle}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.exerciseDetails}>
          <View style={styles.detailItem}>
            <Ionicons name="time" size={16} color={COLORS.lightBlue} />
            <Text style={styles.detailText}>Descanso: {item.rest}</Text>
          </View>
          <TouchableOpacity style={styles.detailButton}>
            <Text style={styles.detailButtonText}>VER PROGRESIÓN</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderProgramCard = ({ item }: { item: Program }) => (
    <TouchableOpacity style={styles.programCard} activeOpacity={0.8}>
      <View style={styles.programHeader}>
        <Text style={styles.programName}>{item.name}</Text>
        <View
          style={[
            styles.levelBadge,
            { backgroundColor: levelInfo.color + "30" },
          ]}
        >
          <Text style={[styles.levelBadgeText, { color: levelInfo.color }]}>
            {levelInfo.difficulty}
          </Text>
        </View>
      </View>

      <View style={styles.programDetails}>
        <View style={styles.programDetail}>
          <Ionicons name="calendar" size={16} color={levelInfo.color} />
          <Text style={[styles.programDetailText, { color: levelInfo.color }]}>
            {item.days.join(" • ")}
          </Text>
        </View>
        <View style={styles.programDetail}>
          <Ionicons name="time" size={16} color={levelInfo.color} />
          <Text style={[styles.programDetailText, { color: levelInfo.color }]}>
            {item.duration}
          </Text>
        </View>
        <View style={styles.programDetail}>
          <Ionicons name={"target" as any} size={16} color={levelInfo.color} />
          <Text style={[styles.programDetailText, { color: levelInfo.color }]}>
            {item.focus}
          </Text>
        </View>
      </View>

      <View style={styles.exercisesList}>
        {item.exercises.map((exercise: string, index: number) => (
          <View key={`${item.id}-ex-${index}`} style={styles.exerciseListItem}>
            <Ionicons
              name="checkmark-circle"
              size={16}
              color={levelInfo.color}
            />
            <Text style={styles.exerciseListItemText}>{exercise}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.startButton, { backgroundColor: levelInfo.color }]}
        onPress={() => router.push("./workout-session")}
      >
        <Text style={styles.startButtonText}>INICIAR ESTA RUTINA</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderTipCard = ({ item, index }: { item: string; index: number }) => (
    <View style={styles.tipCard} key={`tip-${index}`}>
      <View
        style={[styles.tipNumber, { backgroundColor: levelInfo.color + "30" }]}
      >
        <Text style={[styles.tipNumberText, { color: levelInfo.color }]}>
          {index + 1}
        </Text>
      </View>
      <Text style={styles.tipText}>{item}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View
          style={[styles.header, { backgroundColor: levelInfo.color + "20" }]}
        >
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.white} />
          </TouchableOpacity>

          <View style={styles.levelHeader}>
            <View
              style={[
                styles.levelIconContainer,
                { backgroundColor: levelInfo.color + "30" },
              ]}
            >
              <Ionicons
                name={levelInfo.icon as any}
                size={40}
                color={levelInfo.color}
              />
            </View>
            <Text style={styles.levelTitle}>NIVEL {levelInfo.name}</Text>
            <Text style={styles.levelSubtitle}>{levelInfo.focus}</Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{levelExercises.length}</Text>
              <Text style={styles.statLabel}>Ejercicios</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{levelInfo.duration}</Text>
              <Text style={styles.statLabel}>Duración</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{levelPrograms.length}</Text>
              <Text style={styles.statLabel}>Rutinas</Text>
            </View>
          </View>
        </View>

        {/* Descripción */}
        <View style={styles.descriptionSection}>
          <Text style={styles.descriptionTitle}>ACERCA DE ESTE NIVEL</Text>
          <Text style={styles.descriptionText}>{levelInfo.description}</Text>

          <View style={styles.goalsContainer}>
            <Text style={styles.goalsTitle}>OBJETIVOS PRINCIPALES</Text>
            {levelInfo.goals.map((goal: string, index: number) => (
              <View key={`goal-${index}`} style={styles.goalItem}>
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color={levelInfo.color}
                />
                <Text style={styles.goalText}>{goal}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Ejercicios */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>EJERCICIOS {levelInfo.name}</Text>
            <TouchableOpacity onPress={() => router.push("./exercises")}>
              <Text style={styles.seeAll}>Ver todos →</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={levelExercises}
            renderItem={renderExerciseCard}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.exercisesListContainer}
          />
        </View>

        {/* Programas de Entrenamiento */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>RUTINAS RECOMENDADAS</Text>
            <TouchableOpacity onPress={() => router.push("./programs")}>
              <Text style={styles.seeAll}>Personalizar →</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={levelPrograms}
            renderItem={renderProgramCard}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.programsListContainer}
          />
        </View>

        {/* Consejos */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>CONSEJOS CLAVE</Text>
            <Ionicons name="bulb" size={24} color={levelInfo.color} />
          </View>

          <FlatList
            data={levelTips}
            renderItem={renderTipCard}
            keyExtractor={(item, index) => index.toString()}
            scrollEnabled={false}
            contentContainerStyle={styles.tipsListContainer}
          />
        </View>

        {/* Progresión */}
        <View
          style={[
            styles.progressionSection,
            { borderColor: levelInfo.color + "30" },
          ]}
        >
          <Text style={styles.progressionTitle}>¿CUÁNDO AVANZAR?</Text>
          <Text style={styles.progressionText}>
            Considera avanzar al siguiente nivel cuando puedas realizar todos
            los ejercicios de este nivel con técnica perfecta y completes las
            rutinas sin dificultad extrema durante al menos 4 semanas
            consecutivas.
          </Text>
          <TouchableOpacity
            style={[
              styles.nextLevelButton,
              { backgroundColor: levelInfo.color },
            ]}
            onPress={() => {
              const nextLevel =
                levelKey === "basico" ? "intermedio" : "avanzado";
              router.push(`/levels/${nextLevel}`);
            }}
          >
            <Text style={styles.nextLevelButtonText}>
              {levelKey === "avanzado"
                ? "EXPLORAR TUTORIALES AVANZADOS"
                : `VER NIVEL ${levelKey === "basico" ? "INTERMEDIO" : "AVANZADO"}`}
            </Text>
          </TouchableOpacity>
        </View>

        {/* CTA Principal */}
        <TouchableOpacity
          style={[styles.mainCTA, { backgroundColor: levelInfo.color }]}
          onPress={() => router.push("./workout-session")}
        >
          <View style={styles.ctaContent}>
            <MaterialCommunityIcons
              name="dumbbell"
              size={32}
              color={COLORS.darkBlue}
            />
            <View style={styles.ctaTextContainer}>
              <Text style={styles.ctaTitle}>COMENZAR ENTRENAMIENTO</Text>
              <Text style={styles.ctaSubtitle}>
                Inicia tu sesión guiada paso a paso
              </Text>
            </View>
          </View>
          <Ionicons name="play-circle" size={32} color={COLORS.darkBlue} />
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
    paddingTop: 50,
    paddingHorizontal: 25,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  levelHeader: {
    alignItems: "center",
    marginBottom: 30,
  },
  levelIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  levelTitle: {
    fontSize: 36,
    fontWeight: "900",
    color: COLORS.white,
    marginBottom: 5,
  },
  levelSubtitle: {
    fontSize: 18,
    color: COLORS.white,
    opacity: 0.9,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 20,
    padding: 20,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.white,
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.white,
    opacity: 0.8,
  },
  descriptionSection: {
    padding: 25,
  },
  descriptionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.white,
    marginBottom: 15,
  },
  descriptionText: {
    fontSize: 16,
    color: COLORS.lightBlue,
    lineHeight: 24,
    marginBottom: 25,
  },
  goalsContainer: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  goalsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.white,
    marginBottom: 15,
  },
  goalItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  goalText: {
    fontSize: 15,
    color: COLORS.lightBlue,
    marginLeft: 12,
    flex: 1,
  },
  section: {
    paddingHorizontal: 25,
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
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
  exercisesListContainer: {
    gap: 15,
  },
  exerciseCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  exerciseImage: {
    width: "100%",
    height: 160,
  },
  exerciseContent: {
    padding: 20,
  },
  exerciseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.white,
    flex: 1,
  },
  setsBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginLeft: 10,
  },
  setsText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  exerciseDescription: {
    fontSize: 14,
    color: COLORS.lightBlue,
    lineHeight: 20,
    marginBottom: 15,
  },
  muscleGroups: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 15,
  },
  muscleTag: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  muscleText: {
    fontSize: 12,
    fontWeight: "600",
  },
  exerciseDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailText: {
    fontSize: 13,
    color: COLORS.lightBlue,
    marginLeft: 6,
  },
  detailButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  detailButtonText: {
    fontSize: 12,
    color: COLORS.neonBlue,
    fontWeight: "600",
  },
  programsListContainer: {
    gap: 15,
  },
  programCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  programHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  programName: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.white,
    flex: 1,
  },
  levelBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    marginLeft: 10,
  },
  levelBadgeText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  programDetails: {
    gap: 8,
    marginBottom: 15,
  },
  programDetail: {
    flexDirection: "row",
    alignItems: "center",
  },
  programDetailText: {
    fontSize: 14,
    marginLeft: 8,
    fontWeight: "500",
  },
  exercisesList: {
    marginBottom: 20,
  },
  exerciseListItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  exerciseListItemText: {
    fontSize: 14,
    color: COLORS.lightBlue,
    marginLeft: 8,
    flex: 1,
  },
  startButton: {
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.black,
  },
  tipsListContainer: {
    gap: 12,
  },
  tipCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.cardBg,
    borderRadius: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  tipNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  tipNumberText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: COLORS.lightBlue,
    lineHeight: 20,
  },
  progressionSection: {
    marginHorizontal: 25,
    marginBottom: 30,
    padding: 25,
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    borderWidth: 2,
  },
  progressionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.white,
    marginBottom: 15,
    textAlign: "center",
  },
  progressionText: {
    fontSize: 15,
    color: COLORS.lightBlue,
    lineHeight: 22,
    textAlign: "center",
    marginBottom: 20,
  },
  nextLevelButton: {
    padding: 16,
    borderRadius: 15,
    alignItems: "center",
  },
  nextLevelButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.black,
    textAlign: "center",
  },
  mainCTA: {
    marginHorizontal: 25,
    marginBottom: 40,
    padding: 25,
    borderRadius: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  ctaContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  ctaTextContainer: {
    marginLeft: 15,
    flex: 1,
  },
  ctaTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.black,
    marginBottom: 5,
  },
  ctaSubtitle: {
    fontSize: 14,
    color: COLORS.darkBlue,
    opacity: 0.8,
  },
});
