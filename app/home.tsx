import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Importa tu imagen local de fondo
const backgroundImage = require("../assets/images/Main.jpeg");

const COLORS = {
  neonBlue: "#00F0FF",
  darkBlue: "#0A1A2F",
  lightBlue: "#4DA8DA",
  white: "#FFFFFF",
  black: "#000000",
  darkGray: "#1A1A1A",
  gradientStart: "rgba(10, 26, 47, 0.95)",
  gradientEnd: "rgba(10, 26, 47, 0.7)",
};

export default function Home() {
  const router = useRouter();

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Overlay con gradiente */}
      <View style={styles.overlay}>
        <SafeAreaView style={styles.safeArea}>
          <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Header con saludo */}
            <View style={styles.header}>
              <Text style={styles.greeting}>¡BIENVENIDO A</Text>
              <Text style={styles.title}>LEGACY GYM</Text>
              <Text style={styles.subtitle}>
                Forja tu legado, supera tus límites
              </Text>
            </View>

            {/* Estadísticas rápidas */}
            <View style={styles.statsContainer}>
              <View style={styles.statCard}>
                <Ionicons name="flame" size={30} color={COLORS.neonBlue} />
                <Text style={styles.statNumber}>28</Text>
                <Text style={styles.statLabel}>Días seguidos</Text>
              </View>
              <View style={styles.statCard}>
                <Ionicons name="barbell" size={30} color={COLORS.neonBlue} />
                <Text style={styles.statNumber}>145kg</Text>
                <Text style={styles.statLabel}>PR Deadlift</Text>
              </View>
              <View style={styles.statCard}>
                <Ionicons name="trophy" size={30} color={COLORS.neonBlue} />
                <Text style={styles.statNumber}>12</Text>
                <Text style={styles.statLabel}>Logros</Text>
              </View>
            </View>

            {/* Tarjetas principales */}
            <View style={styles.cardsContainer}>
              <TouchableOpacity
                style={styles.mainCard}
                onPress={() => router.push("/disciplines/MenuPrincipal")}
                activeOpacity={0.8}
              >
                <View style={styles.cardIconContainer}>
                  <Ionicons name="fitness" size={40} color={COLORS.neonBlue} />
                </View>
                <Text style={styles.cardTitle}>ENTRENAMIENTOS</Text>
                <Text style={styles.cardDescription}>
                  Descubre todas nuestras disciplinas y rutinas personalizadas
                </Text>
                <View style={styles.cardFooter}>
                  <Text style={styles.cardActionText}>Explorar →</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.mainCard, styles.cardSecondary]}
                onPress={() => router.push("/instructors")}
                activeOpacity={0.8}
              >
                <View style={styles.cardIconContainer}>
                  <Ionicons name="people" size={40} color={COLORS.lightBlue} />
                </View>
                <Text style={styles.cardTitle}>INSTRUCTORES</Text>
                <Text style={styles.cardDescription}>
                  Conoce a nuestro equipo de expertos certificados
                </Text>
                <View style={styles.cardFooter}>
                  <Text style={styles.cardActionText}>Conocer →</Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Tarjetas rápidas */}
            <View style={styles.quickActions}>
              <TouchableOpacity style={styles.quickCard}>
                <Ionicons name="calendar" size={24} color={COLORS.neonBlue} />
                <Text style={styles.quickCardText}>Mi Rutina</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.quickCard}>
                <Ionicons
                  name="stats-chart"
                  size={24}
                  color={COLORS.neonBlue}
                />
                <Text style={styles.quickCardText}>Progreso</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.quickCard}>
                <Ionicons name="nutrition" size={24} color={COLORS.neonBlue} />
                <Text style={styles.quickCardText}>Nutrición</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.quickCard}>
                <Ionicons name="time" size={24} color={COLORS.neonBlue} />
                <Text style={styles.quickCardText}>Horarios</Text>
              </TouchableOpacity>
            </View>

            {/* Mensaje del día */}
            <View style={styles.messageCard}>
              <Text style={styles.messageTitle}>💪 ENTRENAMIENTO DEL DÍA</Text>
              <Text style={styles.messageText}>
                `El éxito no es para los que piensan que pueden, sino para los
                que saben que pueden.`
              </Text>
              <Text style={styles.messageAuthor}>- Legacy Gym Team</Text>
            </View>

            {/* Clase destacada */}
            <View style={styles.featuredClass}>
              <Text style={styles.featuredTitle}>CLASE DESTACADA</Text>
              <View style={styles.classCard}>
                <View style={styles.classInfo}>
                  <Text style={styles.className}>POWERLIFTING AVANZADO</Text>
                  <Text style={styles.classTime}>18:00 - 19:30</Text>
                  <Text style={styles.classInstructor}>
                    Instructor: Carlos R.
                  </Text>
                </View>
                <TouchableOpacity style={styles.joinButton}>
                  <Text style={styles.joinButtonText}>UNIRSE</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    backgroundColor: COLORS.gradientStart,
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 30,
  },
  greeting: {
    color: COLORS.lightBlue,
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 2,
  },
  title: {
    color: COLORS.neonBlue,
    fontSize: 42,
    fontWeight: "900",
    letterSpacing: 3,
    marginVertical: 10,
    textShadowColor: "rgba(0, 240, 255, 0.3)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  subtitle: {
    color: COLORS.white,
    fontSize: 16,
    textAlign: "center",
    opacity: 0.9,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  statCard: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(0, 240, 255, 0.05)",
    borderRadius: 16,
    padding: 15,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "rgba(0, 240, 255, 0.1)",
  },
  statNumber: {
    color: COLORS.neonBlue,
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 5,
  },
  statLabel: {
    color: COLORS.lightBlue,
    fontSize: 12,
    marginTop: 2,
    textAlign: "center",
  },
  cardsContainer: {
    marginBottom: 25,
  },
  mainCard: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 20,
    padding: 25,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(0, 240, 255, 0.2)",
    shadowColor: COLORS.neonBlue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  cardSecondary: {
    borderColor: "rgba(77, 168, 218, 0.2)",
  },
  cardIconContainer: {
    marginBottom: 15,
  },
  cardTitle: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardDescription: {
    color: COLORS.lightBlue,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  cardActionText: {
    color: COLORS.neonBlue,
    fontSize: 16,
    fontWeight: "600",
  },
  quickActions: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  quickCard: {
    width: "48%",
    backgroundColor: "rgba(10, 26, 47, 0.7)",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "rgba(0, 240, 255, 0.1)",
  },
  quickCardText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "600",
    marginTop: 10,
  },
  messageCard: {
    backgroundColor: "rgba(0, 240, 255, 0.05)",
    borderRadius: 16,
    padding: 20,
    marginBottom: 25,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.neonBlue,
  },
  messageTitle: {
    color: COLORS.neonBlue,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  messageText: {
    color: COLORS.white,
    fontSize: 15,
    lineHeight: 22,
    fontStyle: "italic",
    marginBottom: 10,
  },
  messageAuthor: {
    color: COLORS.lightBlue,
    fontSize: 14,
    textAlign: "right",
  },
  featuredClass: {
    marginBottom: 20,
  },
  featuredTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  classCard: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(0, 240, 255, 0.2)",
  },
  classInfo: {
    flex: 1,
  },
  className: {
    color: COLORS.neonBlue,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  classTime: {
    color: COLORS.white,
    fontSize: 14,
    marginBottom: 3,
  },
  classInstructor: {
    color: COLORS.lightBlue,
    fontSize: 13,
  },
  joinButton: {
    backgroundColor: COLORS.neonBlue,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  joinButtonText: {
    color: COLORS.darkBlue,
    fontWeight: "bold",
    fontSize: 14,
  },
});
