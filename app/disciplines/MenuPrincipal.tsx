import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Dimensions,
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

const { width } = Dimensions.get("window");

const COLORS = {
  neonBlue: "#00F0FF",
  darkBlue: "#0A1A2F",
  lightBlue: "#4DA8DA",
  white: "#FFFFFF",
  black: "#000000",
  gray: "#8E8E93",
  cardBg: "rgba(255, 255, 255, 0.05)",
  green: "#4CD964",
  orange: "#FF9500",
  purple: "#AF52DE",
};

const DISCIPLINES = [
  {
    id: "1",
    name: "CALISTENIA",
    icon: "body",
    color: "#4ECDC4",
    difficulty: "Todos los niveles",
    duration: "45-60 min",
    description:
      "Entrenamiento con peso corporal que desarrolla fuerza, flexibilidad y control.",
    benefits: [
      "Fuerza funcional",
      "Control corporal",
      "Sin equipo costoso",
      "Mejora postural",
    ],
    image: require("../../assets/images/Main.jpeg"),
  },
  {
    id: "2",
    name: "POWERLIFTING",
    icon: "barbell",
    color: "#FF6B6B",
    difficulty: "Intermedio - Avanzado",
    duration: "60-90 min",
    description:
      "Deporte de fuerza centrado en tres levantamientos principales: sentadilla, press banca y peso muerto.",
    benefits: [
      "Fuerza máxima",
      "Densidad ósea",
      "Confianza mental",
      "Comunidad activa",
    ],
    image: require("../../assets/images/Main.jpeg")
  },
  {
    id: "3",
    name: "GIMNASIO CLÁSICO",
    icon: "fitness",
    color: "#45B7D1",
    difficulty: "Principiante - Avanzado",
    duration: "45-75 min",
    description:
      "Entrenamiento con máquinas y pesos libres para desarrollo muscular general.",
    benefits: [
      "Musculación completa",
      "Equipamiento variado",
      "Progresión medible",
      "Flexibilidad horaria",
    ],
    image: require("../../assets/images/Main.jpeg")
  },
];

const FEATURED_CLASSES = [
  {
    id: "1",
    title: "CALISTENIA AVANZADA",
    discipline: "Calistenia",
    time: "18:00 - 19:30",
    instructor: "David Chen",
    level: "Avanzado",
    spots: "8/12",
  },
  {
    id: "2",
    title: "POWERLIFTING INICIAL",
    discipline: "Powerlifting",
    time: "17:00 - 18:30",
    instructor: "Carlos Rodríguez",
    level: "Principiante",
    spots: "10/15",
  },
  {
    id: "3",
    title: "YOGA MATUTINO",
    discipline: "Yoga",
    time: "07:00 - 08:00",
    instructor: "Sofía Ramírez",
    level: "Todos",
    spots: "15/20",
  },
];

export default function Disciplines() {
  const router = useRouter();

  const renderDisciplineCard = ({ item }: any) => (
    <TouchableOpacity
      style={styles.disciplineCard}
      onPress={() => router.push(`./calistenia`)}
      activeOpacity={0.8}
    >
      <Image source={item.image} style={styles.disciplineImage} />
      <View style={styles.disciplineOverlay}>
        <View
          style={[styles.iconContainer, { backgroundColor: item.color + "30" }]}
        >
          <Ionicons name={item.icon} size={32} color={item.color} />
        </View>
        <Text style={styles.disciplineName}>{item.name}</Text>
        <Text style={styles.disciplineDifficulty}>
          <Ionicons name="flag" size={14} color={COLORS.lightBlue} />{" "}
          {item.difficulty}
        </Text>
        <Text style={styles.disciplineDuration}>
          <Ionicons name="time" size={14} color={COLORS.lightBlue} />{" "}
          {item.duration}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderFeaturedClass = ({ item }: any) => (
    <TouchableOpacity style={styles.featuredClassCard} activeOpacity={0.8}>
      <View style={styles.classHeader}>
        <Text style={styles.classTitle}>{item.title}</Text>
        <View
          style={[
            styles.levelBadge,
            {
              backgroundColor:
                item.level === "Principiante"
                  ? COLORS.green + "30"
                  : item.level === "Intermedio"
                    ? COLORS.orange + "30"
                    : COLORS.neonBlue + "30",
            },
          ]}
        >
          <Text
            style={[
              styles.levelText,
              {
                color:
                  item.level === "Principiante"
                    ? COLORS.green
                    : item.level === "Intermedio"
                      ? COLORS.orange
                      : COLORS.neonBlue,
              },
            ]}
          >
            {item.level}
          </Text>
        </View>
      </View>
      <Text style={styles.classDiscipline}>{item.discipline}</Text>
      <View style={styles.classDetails}>
        <View style={styles.classDetail}>
          <Ionicons name="time" size={16} color={COLORS.lightBlue} />
          <Text style={styles.classDetailText}>{item.time}</Text>
        </View>
        <View style={styles.classDetail}>
          <Ionicons name="person" size={16} color={COLORS.lightBlue} />
          <Text style={styles.classDetailText}>{item.instructor}</Text>
        </View>
      </View>
      <View style={styles.spotsContainer}>
        <Text style={styles.spotsText}>Cupos: {item.spots}</Text>
        <TouchableOpacity style={styles.bookButton}>
          <Text style={styles.bookButtonText}>RESERVAR</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>DISCIPLINAS LEGACY</Text>
          <Text style={styles.subtitle}>
            Descubre todos nuestros estilos de entrenamiento
          </Text>
        </View>

        {/* Estadísticas */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Ionicons name="barbell" size={24} color={COLORS.neonBlue} />
            <Text style={styles.statNumber}>6</Text>
            <Text style={styles.statLabel}>Disciplinas</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="people" size={24} color={COLORS.neonBlue} />
            <Text style={styles.statNumber}>24</Text>
            <Text style={styles.statLabel}>Clases diarias</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="calendar" size={24} color={COLORS.neonBlue} />
            <Text style={styles.statNumber}>7</Text>
            <Text style={styles.statLabel}>Días/semana</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="star" size={24} color={COLORS.neonBlue} />
            <Text style={styles.statNumber}>15</Text>
            <Text style={styles.statLabel}>Instructores</Text>
          </View>
        </View>

        {/* Todas las disciplinas */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>TODAS LAS DISCIPLINAS</Text>
            <Text style={styles.sectionSubtitle}>
              Elige la que mejor se adapte a tus objetivos
            </Text>
          </View>
          <FlatList
            data={DISCIPLINES}
            renderItem={renderDisciplineCard}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.gridRow}
            scrollEnabled={false}
            contentContainerStyle={styles.gridContainer}
          />
        </View>

        {/* Clases Destacadas */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>CLASES DESTACADAS</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Ver horario completo</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={FEATURED_CLASSES}
            renderItem={renderFeaturedClass}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredList}
          />
        </View>

        {/* Comparativa */}
        <View style={styles.comparisonSection}>
          <Text style={styles.comparisonTitle}>¿CUÁL ELEGIR?</Text>
          <View style={styles.comparisonTable}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>Disciplina</Text>
              <Text style={styles.tableHeaderText}>Objetivo Principal</Text>
              <Text style={styles.tableHeaderText}>Tiempo/Semana</Text>
            </View>
            {DISCIPLINES.slice(0, 3).map((item) => (
              <View key={item.id} style={styles.tableRow}>
                <Text style={styles.tableCell}>{item.name}</Text>
                <Text style={styles.tableCell}>
                  {item.name === "CALISTENIA"
                    ? "Fuerza funcional"
                    : item.name === "POWERLIFTING"
                      ? "Fuerza máxima"
                      : "Desarrollo muscular"}
                </Text>
                <Text style={styles.tableCell}>3-4 sesiones</Text>
              </View>
            ))}
          </View>
        </View>

        {/* CTA */}
        <TouchableOpacity style={styles.ctaCard} activeOpacity={0.8}>
          <View style={styles.ctaContent}>
            <Ionicons name="help-circle" size={40} color={COLORS.neonBlue} />
            <View style={styles.ctaTextContainer}>
              <Text style={styles.ctaTitle}>¿NO SABES POR DÓNDE COMENZAR?</Text>
              <Text style={styles.ctaDescription}>
                Agenda una evaluación gratuita con nuestros expertos
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.ctaButton}>
            <Text style={styles.ctaButtonText}>AGENDAR EVALUACIÓN</Text>
          </TouchableOpacity>
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
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "rgba(0, 240, 255, 0.1)",
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.neonBlue,
    marginTop: 5,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.lightBlue,
    marginTop: 2,
    textAlign: "center",
  },
  section: {
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
    color: COLORS.neonBlue,
    fontWeight: "600",
  },
  gridContainer: {
    paddingBottom: 10,
  },
  gridRow: {
    justifyContent: "space-between",
    marginBottom: 15,
  },
  disciplineCard: {
    width: (width - 50) / 2,
    height: 200,
    borderRadius: 20,
    overflow: "hidden",
    position: "relative",
  },
  disciplineImage: {
    width: "100%",
    height: "100%",
  },
  disciplineOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(10, 26, 47, 0.7)",
    padding: 15,
    justifyContent: "flex-end",
  },
  iconContainer: {
    position: "absolute",
    top: 15,
    right: 15,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  disciplineName: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.white,
    marginBottom: 5,
  },
  disciplineDifficulty: {
    fontSize: 12,
    color: COLORS.lightBlue,
    marginBottom: 3,
  },
  disciplineDuration: {
    fontSize: 12,
    color: COLORS.lightBlue,
  },
  featuredList: {
    paddingRight: 20,
  },
  featuredClassCard: {
    width: 280,
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    padding: 20,
    marginRight: 15,
    borderWidth: 1,
    borderColor: "rgba(0, 240, 255, 0.1)",
  },
  classHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  classTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.white,
    flex: 1,
  },
  levelBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 10,
  },
  levelText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  classDiscipline: {
    fontSize: 14,
    color: COLORS.neonBlue,
    marginBottom: 15,
    fontWeight: "600",
  },
  classDetails: {
    gap: 8,
    marginBottom: 15,
  },
  classDetail: {
    flexDirection: "row",
    alignItems: "center",
  },
  classDetailText: {
    fontSize: 14,
    color: COLORS.lightBlue,
    marginLeft: 8,
  },
  spotsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  spotsText: {
    fontSize: 14,
    color: COLORS.lightBlue,
  },
  bookButton: {
    backgroundColor: COLORS.neonBlue,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
  },
  bookButtonText: {
    fontSize: 12,
    fontWeight: "bold",
    color: COLORS.black,
  },
  comparisonSection: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "rgba(0, 240, 255, 0.1)",
  },
  comparisonTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.white,
    marginBottom: 15,
    textAlign: "center",
  },
  comparisonTable: {
    borderWidth: 1,
    borderColor: "rgba(0, 240, 255, 0.2)",
    borderRadius: 12,
    overflow: "hidden",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "rgba(0, 240, 255, 0.1)",
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  tableHeaderText: {
    flex: 1,
    fontSize: 12,
    fontWeight: "bold",
    color: COLORS.neonBlue,
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 240, 255, 0.1)",
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  tableCell: {
    flex: 1,
    fontSize: 12,
    color: COLORS.lightBlue,
    textAlign: "center",
  },
  ctaCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    padding: 25,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: "rgba(0, 240, 255, 0.2)",
  },
  ctaContent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  ctaTextContainer: {
    flex: 1,
    marginLeft: 15,
  },
  ctaTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.white,
    marginBottom: 5,
  },
  ctaDescription: {
    fontSize: 14,
    color: COLORS.lightBlue,
  },
  ctaButton: {
    backgroundColor: COLORS.neonBlue,
    paddingVertical: 16,
    borderRadius: 15,
    alignItems: "center",
  },
  ctaButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.black,
  },
});
