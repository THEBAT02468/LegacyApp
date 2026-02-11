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
type LevelId = "fundamentos" | "rx" | "rx-plus" | "competidor";

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

interface WOD {
  id: string;
  name: string;
  type: string;
  duration: string;
  movements: string[];
  description: string;
  difficulty: string;
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
  powerlifting: "#FFD700",
  crossfit: "#FF4444", // Rojo característico de CrossFit
};

const LEVELS: Level[] = [
  {
    id: "fundamentos",
    name: "FUNDAMENTOS",
    color: "#4CD964",
    icon: "school",
    description: "Aprende los movimientos básicos con técnica segura",
    duration: "4-6 semanas",
    focus: ["Técnica", "Movimientos básicos", "Familiarización"],
    exercises: [
      "Air squat",
      "Push-up",
      "Ring row",
      "Medball clean",
    ],
  },
  {
    id: "rx",
    name: "RX",
    color: "#FF9500",
    icon: "fitness",
    description: "Completa los WODs según lo programado",
    duration: "6-12 meses",
    focus: ["Cargas estándar", "Movimientos técnicos", "Condicionamiento"],
    exercises: [
      "Power clean",
      "Double-unders",
      "C2B pull-ups",
      "Box jumps",
    ],
  },
  {
    id: "rx-plus",
    name: "RX+",
    color: "#FF3B30",
    icon: "rocket",
    description: "Supera las cargas programadas y movimientos avanzados",
    duration: "1-2 años",
    focus: ["Cargas pesadas", "Gimnásticos avanzados", "WODs largos"],
    exercises: [
      "Muscle-ups",
      "Snatch",
      "Handstand push-ups",
      "Bar muscle-ups",
    ],
  },
  {
    id: "competidor",
    name: "COMPETIDOR",
    color: "#FF4444",
    icon: "trophy",
    description: "Prepárate para la temporada de competencias",
    duration: "2+ años",
    focus: ["Open", "Quarterfinals", "Games prep"],
    exercises: [
      "Grace", "Helen", "Fran", "Diane",
      "Murph", "Cindy", "Isabel", "Karen",
    ],
  },
];

const EXERCISES: Exercise[] = [
  {
    id: "1",
    name: "SNATCH",
    level: "Intermedio - Competidor",
    difficulty: "Técnica muy alta",
    description: "Levantamiento olímpico más complejo, explosividad total",
    progression: ["PVC pipe", "Barra vacía", "Power snatch", "Squat snatch"],
    image: require("../../assets/images/crossfit/snatch.jpg"),
  },
  {
    id: "2",
    name: "CLEAN & JERK",
    level: "Intermedio - Competidor",
    difficulty: "Técnica alta",
    description: "El rey de los levantamientos en CrossFit",
    progression: ["Medball clean", "Power clean", "Squat clean", "Split jerk"],
    image: require("../../assets/images/crossfit/cleanjerk.png"),
  },
  {
    id: "3",
    name: "MUSCLE-UP",
    level: "RX+ - Competidor",
    difficulty: "Muy alta",
    description: "Transición explosiva de anillas o barra",
    progression: ["Ring rows", "False grip", "C2B pull-ups", "Dip strength"],
    image: require("../../assets/images/crossfit/muscle-up.jpeg"),
  },
];

const BENCHMARK_WODS: WOD[] = [
  {
    id: "fran",
    name: "FRAN",
    type: "Benchmark",
    duration: "3-7 min",
    movements: ["Thrusters 43/30kg", "Pull-ups"],
    description: "21-15-9 reps. Tiempo. El WOD más famoso de CrossFit",
    difficulty: "RX",
  },
  {
    id: "helen",
    name: "HELEN",
    type: "Benchmark",
    duration: "10-14 min",
    movements: ["400m run", "KB swings 24/16kg", "Pull-ups"],
    description: "3 rondas. Resistencia y técnica",
    difficulty: "RX",
  },
  {
    id: "murph",
    name: "MURPH",
    type: "Hero",
    duration: "30-60 min",
    movements: ["1.6km run", "100 pull-ups", "200 push-ups", "300 squats", "1.6km run"],
    description: "Con chaleco de 9kg. En memoria del LT. Michael Murphy",
    difficulty: "RX+",
  },
  {
    id: "cindy",
    name: "CINDY",
    type: "Benchmark",
    duration: "20 min",
    movements: ["5 pull-ups", "10 push-ups", "15 squats"],
    description: "AMRAP 20min. Máximo número de rondas",
    difficulty: "Fundamentos",
  },
];

export default function CrossfitDetail() {
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

  /* ---------- RENDER WOD ---------- */
  const renderWODCard = ({ item }: { item: WOD }) => (
    <TouchableOpacity style={styles.wodCard} activeOpacity={0.85}>
      <View style={styles.wodHeader}>
        <Text style={styles.wodName}>{item.name}</Text>
        <View style={[styles.wodDifficultyBadge, 
          { backgroundColor: item.difficulty === "RX+" ? COLORS.crossfit + "40" : 
            item.difficulty === "RX" ? COLORS.orange + "40" : COLORS.green + "40" }
        ]}>
          <Text style={[styles.wodDifficultyText, 
            { color: item.difficulty === "RX+" ? COLORS.crossfit : 
              item.difficulty === "RX" ? COLORS.orange : COLORS.green }
          ]}>
            {item.difficulty}
          </Text>
        </View>
      </View>
      
      <View style={styles.wodTypeContainer}>
        <Ionicons name="flame" size={14} color={COLORS.crossfit} />
        <Text style={styles.wodType}>{item.type}</Text>
        <View style={styles.wodDot} />
        <Ionicons name="time" size={14} color={COLORS.lightBlue} />
        <Text style={styles.wodDuration}>{item.duration}</Text>
      </View>

      <Text style={styles.wodDescription}>{item.description}</Text>

      <View style={styles.wodMovements}>
        {item.movements.map((movement, index) => (
          <View key={index} style={styles.movementTag}>
            <Text style={styles.movementText}>{movement}</Text>
          </View>
        ))}
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
            source={require("../../assets/images/crossfit/header.jpg")}
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
              <Text style={styles.disciplineTitle}>CROSSFIT</Text>
              <Text style={styles.disciplineSubtitle}>
                Constant variance, functional movements, high intensity
              </Text>
            </View>
          </View>
        </View>

        {/* INTRO SECTION */}
        <View style={styles.introSection}>
          <Text style={styles.introTitle}>FORJAR ÉLITE DE FITNESS</Text>
          <Text style={styles.introText}>
            CrossFit combina halterofilia, gimnasia y cardio en WODs diarios. 
            Prepárate para lo inesperado, mejora tu condición física general 
            y únete a la comunidad más fuerte del mundo.
          </Text>
          
          <View style={styles.benefitsContainer}>
            <View style={styles.benefitItem}>
              <Ionicons name="barbell" size={28} color={COLORS.crossfit} />
              <Text style={styles.benefitText}>HALTEROFILIA</Text>
            </View>
            <View style={styles.benefitItem}>
              <Ionicons name="body" size={28} color={COLORS.crossfit} />
              <Text style={styles.benefitText}>GIMNASIA</Text>
            </View>
            <View style={styles.benefitItem}>
              <Ionicons name="heart" size={28} color={COLORS.crossfit} />
              <Text style={styles.benefitText}>METCON</Text>
            </View>
            <View style={styles.benefitItem}>
              <Ionicons name="bicycle" size={28} color={COLORS.crossfit} />
              <Text style={styles.benefitText}>MONO</Text>
            </View>
          </View>
        </View>

        {/* NIVELES */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>NIVELES DE DOMINIO</Text>
            <Text style={styles.sectionSubtitle}>
              De fundamentos a competidor de élite
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

        {/* BENCHMARK WODS */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>BENCHMARK WODS</Text>
            <Text style={styles.sectionSubtitle}>
              Los WODs que definen a un CrossFitter
            </Text>
          </View>
          <FlatList
            data={BENCHMARK_WODS}
            horizontal
            renderItem={renderWODCard}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.wodsList}
          />
        </View>

        {/* MOVIMIENTOS FUNDAMENTALES */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>MOVIMIENTOS CLAVE</Text>
            <Text style={styles.sectionSubtitle}>
              Domina la técnica para cargas pesadas
            </Text>
          </View>
          {EXERCISES.map((exercise) => renderExerciseCard({ item: exercise }))}
        </View>

        {/* GIRLS & HERO WODS */}
        <View style={styles.girlsSection}>
          <Text style={styles.girlsTitle}>GIRLS & HERO WODS</Text>
          <Text style={styles.girlsSubtitle}>
            Los WODs de referencia en CrossFit
          </Text>
          
          <View style={styles.girlsGrid}>
            <View style={styles.girlItem}>
              <Text style={styles.girlName}>FRAN</Text>
              <Text style={styles.girlType}>Thrusters + Pull-ups</Text>
            </View>
            <View style={styles.girlItem}>
              <Text style={styles.girlName}>DIANE</Text>
              <Text style={styles.girlType}>Deadlift + HSPU</Text>
            </View>
            <View style={styles.girlItem}>
              <Text style={styles.girlName}>GRACE</Text>
              <Text style={styles.girlType}>30 Clean & Jerks</Text>
            </View>
            <View style={styles.girlItem}>
              <Text style={styles.girlName}>ISABEL</Text>
              <Text style={styles.girlType}>30 Snatches</Text>
            </View>
            <View style={styles.girlItem}>
              <Text style={styles.girlName}>ANGIE</Text>
              <Text style={styles.girlType}>100-100-100-100</Text>
            </View>
            <View style={styles.girlItem}>
              <Text style={styles.girlName}>LINDA</Text>
              <Text style={styles.girlType}>3 Bars of Death</Text>
            </View>
            <View style={styles.girlItem}>
              <Text style={styles.girlName}>MURPH</Text>
              <Text style={styles.girlType}>1+100+200+300+1</Text>
            </View>
            <View style={styles.girlItem}>
              <Text style={styles.girlName}>JT</Text>
              <Text style={styles.girlType}>HSPU + Pistols + Push-ups</Text>
            </View>
          </View>
        </View>

        {/* EQUIPAMIENTO */}
        <View style={styles.equipmentSection}>
          <Text style={styles.equipmentTitle}>EQUIPAMIENTO BOX</Text>
          <View style={styles.equipmentGrid}>
            <View style={styles.equipmentItem}>
              <Ionicons name="barbell" size={32} color={COLORS.crossfit} />
              <Text style={styles.equipmentName}>Barra olímpica</Text>
            </View>
            <View style={styles.equipmentItem}>
              <Ionicons name="fitness" size={32} color={COLORS.crossfit} />
              <Text style={styles.equipmentName}>Kettlebells</Text>
            </View>
            <View style={styles.equipmentItem}>
              <Ionicons name="golf" size={32} color={COLORS.crossfit} />
              <Text style={styles.equipmentName}>Medballs</Text>
            </View>
            <View style={styles.equipmentItem}>
              <Ionicons name="body" size={32} color={COLORS.crossfit} />
              <Text style={styles.equipmentName}>Rig/Anillas</Text>
            </View>
            <View style={styles.equipmentItem}>
              <Ionicons name="stopwatch" size={32} color={COLORS.crossfit} />
              <Text style={styles.equipmentName}>Concept2</Text>
            </View>
            <View style={styles.equipmentItem}>
              <Ionicons name="bicycle" size={32} color={COLORS.crossfit} />
              <Text style={styles.equipmentName}>Assault Bike</Text>
            </View>
            <View style={styles.equipmentItem}>
              <Ionicons name="cube" size={32} color={COLORS.crossfit} />
              <Text style={styles.equipmentName}>Plyo Box</Text>
            </View>
            <View style={styles.equipmentItem}>
              <Ionicons name="bandage" size={32} color={COLORS.crossfit} />
              <Text style={styles.equipmentName}>Jump Rope</Text>
            </View>
          </View>
        </View>

        {/* OPEN WORKOUTS */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>CROSSFIT OPEN</Text>
            <Text style={styles.sectionSubtitle}>
              El evento anual más grande del mundo
            </Text>
          </View>
          
          <TouchableOpacity style={styles.openCard}>
            <View style={styles.openHeader}>
              <Ionicons name="trophy" size={32} color={COLORS.crossfit} />
              <Text style={styles.openYear}>2024 SEASON</Text>
            </View>
            <Text style={styles.openDescription}>
              21.1: Thrusters + Chest-to-bar + Double-unders{'\n'}
              21.2: Deadlifts + Bar muscle-ups{'\n'}
              21.3: Snatches + Lateral burpees{'\n'}
              21.4: Wall balls + Rowing + HSPU
            </Text>
            <TouchableOpacity style={styles.openButton}>
              <Text style={styles.openButtonText}>VER WORKOUTS OPEN</Text>
              <Ionicons name="arrow-forward" size={16} color={COLORS.black} />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>

        {/* CTA BUTTON */}
        <TouchableOpacity style={styles.ctaButton}>
          <Text style={styles.ctaText}>WOD DE HOY</Text>
          <Ionicons name="flash" size={20} color={COLORS.black} />
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
    color: COLORS.crossfit,
    marginBottom: 10,
    textShadowColor: "rgba(255, 68, 68, 0.3)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  disciplineSubtitle: {
    fontSize: 18,
    color: COLORS.white,
    maxWidth: 300,
    fontStyle: "italic",
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
    color: COLORS.crossfit,
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
    borderColor: "rgba(255, 68, 68, 0.1)",
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
    backgroundColor: "rgba(255, 68, 68, 0.1)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  focusText: {
    fontSize: 12,
    color: COLORS.crossfit,
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
    borderColor: "rgba(255, 68, 68, 0.1)",
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
    backgroundColor: "rgba(255, 68, 68, 0.2)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 10,
  },
  difficultyText: {
    fontSize: 12,
    color: COLORS.crossfit,
    fontWeight: "bold",
  },
  exerciseDescription: {
    fontSize: 15,
    color: COLORS.lightBlue,
    lineHeight: 22,
  },
  wodsList: {
    paddingRight: 25,
  },
  wodCard: {
    width: 300,
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    padding: 20,
    marginRight: 15,
    borderWidth: 1,
    borderColor: "rgba(255, 68, 68, 0.1)",
  },
  wodHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  wodName: {
    fontSize: 24,
    fontWeight: "900",
    color: COLORS.crossfit,
  },
  wodDifficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  wodDifficultyText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  wodTypeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  wodType: {
    fontSize: 13,
    color: COLORS.crossfit,
    marginLeft: 4,
    fontWeight: "600",
  },
  wodDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.lightBlue,
    marginHorizontal: 8,
  },
  wodDuration: {
    fontSize: 13,
    color: COLORS.lightBlue,
    marginLeft: 4,
  },
  wodDescription: {
    fontSize: 14,
    color: COLORS.lightBlue,
    lineHeight: 20,
    marginBottom: 15,
  },
  wodMovements: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  movementTag: {
    backgroundColor: "rgba(255, 68, 68, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  movementText: {
    fontSize: 12,
    color: COLORS.crossfit,
    fontWeight: "500",
  },
  girlsSection: {
    padding: 25,
    backgroundColor: COLORS.cardBg,
    marginHorizontal: 25,
    borderRadius: 20,
    marginBottom: 30,
  },
  girlsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.white,
    marginBottom: 8,
    textAlign: "center",
  },
  girlsSubtitle: {
    fontSize: 14,
    color: COLORS.lightBlue,
    marginBottom: 20,
    textAlign: "center",
  },
  girlsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  girlItem: {
    width: "48%",
    backgroundColor: "rgba(255, 68, 68, 0.05)",
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 68, 68, 0.2)",
  },
  girlName: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.crossfit,
    marginBottom: 4,
  },
  girlType: {
    fontSize: 12,
    color: COLORS.lightBlue,
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
    width: "23%",
    alignItems: "center",
    marginBottom: 20,
  },
  equipmentName: {
    fontSize: 10,
    color: COLORS.lightBlue,
    marginTop: 8,
    textAlign: "center",
  },
  openCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 68, 68, 0.2)",
  },
  openHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  openYear: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.crossfit,
    marginLeft: 10,
  },
  openDescription: {
    fontSize: 14,
    color: COLORS.lightBlue,
    lineHeight: 22,
    marginBottom: 20,
  },
  openButton: {
    backgroundColor: COLORS.crossfit,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 16,
  },
  openButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.black,
    marginRight: 8,
  },
  ctaButton: {
    backgroundColor: COLORS.crossfit,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    borderRadius: 25,
    marginHorizontal: 25,
    marginBottom: 40,
    shadowColor: COLORS.crossfit,
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