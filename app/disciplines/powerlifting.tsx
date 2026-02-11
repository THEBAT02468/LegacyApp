import { Ionicons } from "@expo/vector-icons";
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

// Types
type LevelId = "principiante" | "intermedio" | "avanzado" | "elite";

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  gym: "#FF6B6B",
  powerlifting: "#FFD700", // Dorado - para powerlifting
};

const LEVELS: Level[] = [
  {
    id: "principiante",
    name: "PRINCIPIANTE",
    color: "#4CD964",
    icon: "shield",
    description: "Domina la técnica perfecta de los 3 levantamientos",
    duration: "4-12 semanas",
    focus: ["Técnica impecable", "Rango de movimiento", "Activación muscular"],
    exercises: [
      "Sentadilla con barra vacía",
      "Press banca técnica",
      "Peso muerto con barra olímpica",
    ],
  },
  {
    id: "intermedio",
    name: "INTERMEDIO",
    color: "#FF9500",
    icon: "trending-up",
    description: "Periodización y aumento progresivo de cargas",
    duration: "12-24 semanas",
    focus: ["Programación 5x5", "Fuerza máxima", "Accesorios específicos"],
    exercises: [
      "Sentadilla 3x5",
      "Press banca 5x5",
      "Peso muerto 1x5",
    ],
  },
  {
    id: "avanzado",
    name: "AVANZADO",
    color: "#FF3B30",
    icon: "trophy",
    description: "Preparación para competencias y marcas personales",
    duration: "24-48 semanas",
    focus: ["Peaking", "RPE/RIR", "Competencia"],
    exercises: [
      "Sentadilla 1RM",
      "Press banca 1RM",
      "Peso muerto 1RM",
    ],
  },
  {
    id: "elite",
    name: "ÉLITE",
    color: "#FFD700",
    icon: "ribbon",
    description: "Nivel competitivo con cargas de 500+ kg total",
    duration: "48+ semanas",
    focus: ["Records personales", "Equipamiento especial", "Periodización avanzada"],
    exercises: [
      "Sentadilla 2.5xBW",
      "Press banca 1.8xBW",
      "Peso muerto 3xBW",
    ],
  },
];

const EXERCISES: Exercise[] = [
  {
    id: "1",
    name: "SENTADILLA",
    level: "Todos los niveles",
    difficulty: "Técnica crítica",
    description: "El levantamiento que desarrolla fuerza absoluta en piernas y core",
    progression: ["Barra alta", "Barra baja", "Safety bar", "Competencia"],
    image: require("../../assets/images/powerlifting/squat.jpg"),
  },
  {
    id: "2",
    name: "PRESS BANCA",
    level: "Todos los niveles",
    difficulty: "Técnica moderada",
    description: "Máximo desarrollo de fuerza en pectorales, hombros y tríceps",
    progression: ["Tocado-pecho", "Con arco", "Competencia", "Board press"],
    image: require("../../assets/images/powerlifting/bench.jpg"),
  },
  {
    id: "3",
    name: "PESO MUERTO",
    level: "Intermedio - Élite",
    difficulty: "Técnica crítica",
    description: "El rey de los levantamientos, fuerza total de cadena posterior",
    progression: ["Convencional", "Sumo", "Deficit", "Competencia"],
    image: require("../../assets/images/powerlifting/deadlift.jpg"),
  },
];

export default function PowerliftingDetail() {
  const router = useRouter();
  const { disciplineId } = useLocalSearchParams<{ disciplineId: string }>();

  /* ---------- RENDER LEVEL ---------- */
  const renderLevelCard = ({ item }: { item: Level }) => (
    <TouchableOpacity
      style={styles.levelCard}
      onPress={() => router.push(`../levels/${item.id}` as any)}
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
          {item.focus.map((focusItem, index) => (
            <View key={index} style={styles.focusTag}>
              <Text style={styles.focusText}>{focusItem}</Text>
            </View>
          ))}
        </View>
      </View>

      <TouchableOpacity
        style={[styles.levelButton, { backgroundColor: item.color }]}
        onPress={() =>
          router.push(`/disciplines/${disciplineId}/levels/${item.id}` as any)
        }
      >
        <Text style={styles.levelButtonText}>EXPLORAR NIVEL</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  /* ---------- RENDER EXERCISE ---------- */
  const renderExerciseCard = ({ item }: { item: Exercise }) => (
    <TouchableOpacity
      style={styles.exerciseCard}
      activeOpacity={0.85}
      onPress={() =>
        router.push(`/disciplines/${disciplineId}/exercises/${item.id}` as any)
      }
    >
      <Image source={item.image} style={styles.exerciseImage} />
      <View style={styles.exerciseInfo}>
        <View style={styles.exerciseHeader}>
          <Text style={styles.exerciseName}>{item.name}</Text>
          <View style={styles.difficultyBadge}>
            <Text style={styles.difficultyText}>{item.difficulty}</Text>
          </View>
        </View>
        <Text style={styles.exerciseDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <Image
            source={require("../../assets/images/powerlifting/header.jpg")}
            style={styles.headerImage}
          />
          <View style={styles.headerOverlay}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>

            <View style={styles.headerContent}>
              <Text style={styles.disciplineTitle}>POWERLIFTING</Text>
              <Text style={styles.disciplineSubtitle}>
                La disciplina definitiva de fuerza máxima
              </Text>
            </View>
          </View>
        </View>

        {/* INTRO SECTION */}
        <View style={styles.introSection}>
          <Text style={styles.introTitle}>FUERZA ABSOLUTA</Text>
          <Text style={styles.introText}>
            Powerlifting es la búsqueda de la fuerza máxima en los 3 levantamientos 
            básicos: sentadilla, press banca y peso muerto. Cada repetición es una 
            batalla contra la gravedad.
          </Text>
          
          <View style={styles.benefitsContainer}>
            <View style={styles.benefitItem}>
              <Ionicons name="barbell" size={28} color={COLORS.powerlifting} />
              <Text style={styles.benefitText}>3 LEVANTAMIENTOS</Text>
            </View>
            <View style={styles.benefitItem}>
              <Ionicons name="stats-chart" size={28} color={COLORS.powerlifting} />
              <Text style={styles.benefitText}>1RM MÁXIMO</Text>
            </View>
            <View style={styles.benefitItem}>
              <Ionicons name="trophy" size={28} color={COLORS.powerlifting} />
              <Text style={styles.benefitText}>COMPETICIONES</Text>
            </View>
            <View style={styles.benefitItem}>
              <Ionicons name="flash" size={28} color={COLORS.powerlifting} />
              <Text style={styles.benefitText}>POTENCIA</Text>
            </View>
          </View>
        </View>

        {/* NIVELES */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>NIVELES DE FUERZA</Text>
            <Text style={styles.sectionSubtitle}>
              Desde principiante hasta élite competitivo
            </Text>
          </View>
          <FlatList
            data={LEVELS}
            horizontal
            renderItem={renderLevelCard}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.levelsList}
          />
        </View>

        {/* BIG THREE */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>LOS 3 SAGRADOS</Text>
            <Text style={styles.sectionSubtitle}>
              Domina los levantamientos fundamentales
            </Text>
          </View>
          {EXERCISES.map((exercise) => renderExerciseCard({ item: exercise }))}
        </View>

        {/* ESTÁNDARES DE FUERZA */}
        <View style={styles.standardsSection}>
          <Text style={styles.standardsTitle}>ESTÁNDARES DE FUERZA</Text>
          <Text style={styles.standardsSubtitle}>
            ¿Dónde te encuentras? (peso corporal 75kg)
          </Text>
          
          <View style={styles.standardsGrid}>
            <View style={styles.standardItem}>
              <Text style={styles.standardLevel}>PRINCIPIANTE</Text>
              <Text style={styles.standardValue}>Sentadilla: 60kg</Text>
              <Text style={styles.standardValue}>Banca: 50kg</Text>
              <Text style={styles.standardValue}>Peso muerto: 70kg</Text>
            </View>
            
            <View style={styles.standardItem}>
              <Text style={styles.standardLevel}>INTERMEDIO</Text>
              <Text style={styles.standardValue}>Sentadilla: 110kg</Text>
              <Text style={styles.standardValue}>Banca: 85kg</Text>
              <Text style={styles.standardValue}>Peso muerto: 135kg</Text>
            </View>
            
            <View style={styles.standardItem}>
              <Text style={styles.standardLevel}>AVANZADO</Text>
              <Text style={styles.standardValue}>Sentadilla: 160kg</Text>
              <Text style={styles.standardValue}>Banca: 115kg</Text>
              <Text style={styles.standardValue}>Peso muerto: 185kg</Text>
            </View>
            
            <View style={styles.standardItem}>
              <Text style={styles.standardLevel}>ÉLITE</Text>
              <Text style={styles.standardValue}>Sentadilla: 200kg+</Text>
              <Text style={styles.standardValue}>Banca: 140kg+</Text>
              <Text style={styles.standardValue}>Peso muerto: 230kg+</Text>
            </View>
          </View>
        </View>

        {/* EQUIPAMIENTO ESPECIALIZADO */}
        <View style={styles.equipmentSection}>
          <Text style={styles.equipmentTitle}>EQUIPAMIENTO POWERLIFTING</Text>
          <View style={styles.equipmentGrid}>
            <View style={styles.equipmentItem}>
              <Ionicons name="footsteps" size={32} color={COLORS.powerlifting} />
              <Text style={styles.equipmentName}>Zapatos sentadilla</Text>
            </View>
            <View style={styles.equipmentItem}>
              <Ionicons name="body" size={32} color={COLORS.powerlifting} />
              <Text style={styles.equipmentName}>Cinturón 10mm</Text>
            </View>
            <View style={styles.equipmentItem}>
              <Ionicons name="bandage" size={32} color={COLORS.powerlifting} />
              <Text style={styles.equipmentName}>Muñequeras</Text>
            </View>
            <View style={styles.equipmentItem}>
              <Ionicons name="golf" size={32} color={COLORS.powerlifting} />
              <Text style={styles.equipmentName}>Rodilleras</Text>
            </View>
            <View style={styles.equipmentItem}>
              <Ionicons name="brush" size={32} color={COLORS.powerlifting} />
              <Text style={styles.equipmentName}>Magnesio</Text>
            </View>
            <View style={styles.equipmentItem}>
              <Ionicons name="barbell" size={32} color={COLORS.powerlifting} />
              <Text style={styles.equipmentName}>Barra olímpica</Text>
            </View>
          </View>
        </View>

        {/* PROGRAMAS FAMOSOS */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>PROGRAMAS CLÁSICOS</Text>
            <Text style={styles.sectionSubtitle}>
              Rutinas probadas por campeones
            </Text>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.programsScroll}>
            <TouchableOpacity style={styles.programCard}>
              <Ionicons name="flame" size={32} color={COLORS.powerlifting} />
              <Text style={styles.programName}>SMOLOV JR</Text>
              <Text style={styles.programDescription}>Sentadilla - 3 semanas</Text>
              <Text style={styles.programGoal}>+20kg a tu 1RM</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.programCard}>
              <Ionicons name="rocket" size={32} color={COLORS.powerlifting} />
              <Text style={styles.programName}>5/3/1</Text>
              <Text style={styles.programDescription}>Jim Wendler</Text>
              <Text style={styles.programGoal}>Progresión lenta y constante</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.programCard}>
              <Ionicons name="trophy" size={32} color={COLORS.powerlifting} />
              <Text style={styles.programName}>SHEIKO</Text>
              <Text style={styles.programDescription}>Volumen ruso</Text>
              <Text style={styles.programGoal}>Élite competitivo</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.programCard}>
              <Ionicons name="repeat" size={32} color={COLORS.powerlifting} />
              <Text style={styles.programName}>5x5</Text>
              <Text style={styles.programDescription}>StrongLifts</Text>
              <Text style={styles.programGoal}>Base de fuerza</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* CTA BUTTON */}
        <TouchableOpacity style={styles.ctaButton}>
          <Text style={styles.ctaText}>CALCULA TU 1RM</Text>
          <Ionicons name="calculator" size={20} color={COLORS.black} />
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
    backgroundColor: "rgba(10, 26, 47, 0.8)",
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
    color: COLORS.powerlifting,
    marginBottom: 10,
    textShadowColor: "rgba(255, 215, 0, 0.3)",
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
    color: COLORS.powerlifting,
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
    color: COLORS.powerlifting,
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
    borderColor: "rgba(255, 215, 0, 0.1)",
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
    backgroundColor: "rgba(255, 215, 0, 0.1)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  focusText: {
    fontSize: 12,
    color: COLORS.powerlifting,
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
    borderColor: "rgba(255, 215, 0, 0.1)",
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
    backgroundColor: "rgba(255, 215, 0, 0.2)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 10,
  },
  difficultyText: {
    fontSize: 12,
    color: COLORS.powerlifting,
    fontWeight: "bold",
  },
  exerciseLevel: {
    fontSize: 14,
    color: COLORS.powerlifting,
    marginBottom: 10,
    fontWeight: "600",
  },
  exerciseDescription: {
    fontSize: 15,
    color: COLORS.lightBlue,
    lineHeight: 22,
  },
  standardsSection: {
    padding: 25,
    backgroundColor: COLORS.cardBg,
    marginHorizontal: 25,
    borderRadius: 20,
    marginBottom: 30,
  },
  standardsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.white,
    marginBottom: 8,
    textAlign: "center",
  },
  standardsSubtitle: {
    fontSize: 14,
    color: COLORS.lightBlue,
    marginBottom: 20,
    textAlign: "center",
  },
  standardsGrid: {
    gap: 15,
  },
  standardItem: {
    backgroundColor: "rgba(255, 215, 0, 0.05)",
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 215, 0, 0.2)",
  },
  standardLevel: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.powerlifting,
    marginBottom: 8,
  },
  standardValue: {
    fontSize: 14,
    color: COLORS.lightBlue,
    marginBottom: 2,
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
  programsScroll: {
    flexDirection: "row",
  },
  programCard: {
    width: 200,
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    padding: 20,
    marginRight: 15,
    borderWidth: 1,
    borderColor: "rgba(255, 215, 0, 0.1)",
    alignItems: "center",
  },
  programName: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.white,
    marginTop: 10,
    marginBottom: 5,
  },
  programDescription: {
    fontSize: 13,
    color: COLORS.lightBlue,
    textAlign: "center",
    marginBottom: 5,
  },
  programGoal: {
    fontSize: 12,
    color: COLORS.powerlifting,
    fontWeight: "600",
    textAlign: "center",
  },
  ctaButton: {
    backgroundColor: COLORS.powerlifting,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    borderRadius: 25,
    marginHorizontal: 25,
    marginBottom: 40,
    shadowColor: COLORS.powerlifting,
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