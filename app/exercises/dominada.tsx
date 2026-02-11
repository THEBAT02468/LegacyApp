import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Colores consistentes con tu diseño anterior
const COLORS = {
  neonBlue: "#00F0FF",
  darkBlue: "#0A1A2F",
  lightBlue: "#4DA8DA",
  white: "#FFFFFF",
  cardBg: "rgba(255, 255, 255, 0.05)",
  accent: "#4CD964", // Este podría cambiar según el nivel
};

export default function ExerciseDetail() {
  const router = useRouter();

  // En un caso real, buscarías los datos del ejercicio por ID
  // Aquí simulamos la data para que veas el diseño:
  // Simulación de data ajustada para Dominadas Asistidas
  const exerciseData = {
    name: "DOMINADAS ASISTIDAS",
    level: "PRINCIPIANTE",
    videoThumbnail: require("../../assets/images/calistenia/assisted-pullup.jpg"), // Asegúrate de tener esta imagen o usa la anterior
    videoUrl: "https://www.youtube.com/shorts/BvDq9tHV7yY",
    description:
      "La variante perfecta para construir la fuerza base necesaria. Utiliza asistencia (máquina o banda) para completar el rango de movimiento con técnica perfecta.",
    muscles: ["Dorsales", "Bíceps", "Escápulas", "Core"],
    steps: [
      "Ajusta el peso en la máquina (a más peso, más ayuda) o coloca la banda en la barra.",
      "Apoya las rodillas o pies firmemente en la plataforma o banda elástica.",
      "Sujeta la barra con un agarre cómodo y realiza una retracción escapular (hombros abajo).",
      "Sube de forma controlada hasta que tu barbilla supere la barra, manteniendo el pecho erguido.",
      "Baja lentamente extendiendo los brazos por completo sin soltar la tensión.",
    ],
    tips: "No dejes que el peso de la máquina te empuje hacia arriba bruscamente; mantén el control en todo momento.",
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header con Imagen/Video */}
        <View style={styles.mediaContainer}>
          <Image
            source={exerciseData.videoThumbnail}
            style={styles.imageHeader}
          />
          <View style={styles.overlay} />

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.white} />
          </TouchableOpacity>

          <View style={styles.playButtonContainer}>
            <TouchableOpacity
              style={styles.playButton}
              onPress={() => Linking.openURL(exerciseData.videoUrl)}
            >
              <Ionicons name="play" size={40} color={COLORS.darkBlue} />
            </TouchableOpacity>
            <Text style={styles.playText}>VER TUTORIAL</Text>
          </View>
        </View>

        {/* Info Content */}
        <View style={styles.content}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{exerciseData.name}</Text>
            <View style={[styles.badge, { borderColor: COLORS.neonBlue }]}>
              <Text style={styles.badgeText}>{exerciseData.level}</Text>
            </View>
          </View>

          <Text style={styles.description}>{exerciseData.description}</Text>

          {/* Músculos */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>MÚSCULOS OBJETIVO</Text>
            <View style={styles.muscleContainer}>
              {exerciseData.muscles.map((muscle, index) => (
                <View key={index} style={styles.muscleChip}>
                  <MaterialCommunityIcons
                    name="arm-flex"
                    size={16}
                    color={COLORS.neonBlue}
                  />
                  <Text style={styles.muscleText}>{muscle}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Pasos */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>EJECUCIÓN PASO A PASO</Text>
            {exerciseData.steps.map((step, index) => (
              <View key={index} style={styles.stepCard}>
                <View style={styles.stepNumberContainer}>
                  <Text style={styles.stepNumber}>{index + 1}</Text>
                </View>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))}
          </View>

          {/* Tip Pro */}
          <View style={styles.tipBox}>
            <Ionicons name="bulb" size={24} color={COLORS.neonBlue} />
            <Text style={styles.tipBoxText}>
              <Text style={{ fontWeight: "bold" }}>PRO TIP: </Text>
              {exerciseData.tips}
            </Text>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Botón Flotante para Iniciar */}
      <TouchableOpacity style={styles.floatingAction}>
        <Text style={styles.floatingActionText}>REGISTRAR SERIE</Text>
        <Ionicons name="add" size={24} color={COLORS.darkBlue} />
      </TouchableOpacity>

      {/* Botón flotante de cámara */}
      <TouchableOpacity
        style={styles.cameraButton}
        onPress={() => router.push("../camera/exerciseCamera")}
      >
        <Ionicons name="camera" size={26} color={COLORS.white} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.darkBlue },
  container: { flex: 1 },
  mediaContainer: {
    height: 350,
    width: "100%",
    position: "relative",
  },
  imageHeader: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(10, 26, 47, 0.4)",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  playButtonContainer: {
    position: "absolute",
    bottom: -30,
    alignSelf: "center",
    alignItems: "center",
  },
  playButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: COLORS.neonBlue,
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
    shadowColor: COLORS.neonBlue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  playText: {
    color: COLORS.white,
    marginTop: 8,
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 1,
  },
  content: {
    paddingHorizontal: 25,
    paddingTop: 60,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: COLORS.white,
    flex: 1,
  },
  badge: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    color: COLORS.neonBlue,
    fontSize: 12,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    color: COLORS.lightBlue,
    lineHeight: 24,
    marginBottom: 30,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.white,
    marginBottom: 15,
    letterSpacing: 1.5,
  },
  muscleContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  muscleChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.cardBg,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  muscleText: {
    color: COLORS.white,
    marginLeft: 8,
    fontSize: 14,
  },
  stepCard: {
    flexDirection: "row",
    backgroundColor: COLORS.cardBg,
    padding: 15,
    borderRadius: 15,
    marginBottom: 12,
    alignItems: "center",
  },
  stepNumberContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.neonBlue,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  stepNumber: {
    color: COLORS.darkBlue,
    fontWeight: "bold",
  },
  stepText: {
    color: COLORS.lightBlue,
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  tipBox: {
    flexDirection: "row",
    backgroundColor: "rgba(0, 240, 255, 0.1)",
    padding: 20,
    borderRadius: 15,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.neonBlue,
    alignItems: "center",
  },
  tipBoxText: {
    color: COLORS.white,
    flex: 1,
    marginLeft: 15,
    fontSize: 14,
  },
  floatingAction: {
    position: "absolute",
    bottom: 30,
    left: 25,
    right: 25,
    height: 60,
    backgroundColor: COLORS.neonBlue,
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  floatingActionText: {
    color: COLORS.darkBlue,
    fontWeight: "bold",
    fontSize: 16,
    marginRight: 10,
  },
  cameraButton: {
    position: "absolute",
    bottom: 30,
    right: 25,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.neonBlue,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: COLORS.neonBlue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },

});
