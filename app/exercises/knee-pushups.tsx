import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  Animated,
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

const EXERCISE_ID = "knee-pushups";

// Colores Legacy Gym con acento para calistenia
const COLORS = {
  neonBlue: "#00F0FF",
  darkBlue: "#0A1A2F",
  lightBlue: "#4DA8DA",
  white: "#FFFFFF",
  black: "#000000",
  cardBg: "rgba(255, 255, 255, 0.05)",
  calistenia: "#4ECDC4", // Color específico para calistenia
  green: "#4CD964",
  orange: "#FF9500",
};

export default function KneePushups() {
  const router = useRouter();
  const [sets, setSets] = useState<
    { reps: number; date: string; weight?: number }[]
  >([]);
  const [fadeAnim] = useState(new Animated.Value(0));

  // Cargar series guardadas al volver de cámara
  useFocusEffect(
    useCallback(() => {
      const loadSets = async () => {
        const stored = await AsyncStorage.getItem(`exercise-${EXERCISE_ID}`);
        setSets(stored ? JSON.parse(stored) : []);

        // Animación de entrada
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }).start();
      };

      loadSets();
    }, [fadeAnim]),
  );

  const exerciseData = {
    name: "FLEXIONES DE RODILLAS",
    subtitle: "Variación modificada para principiantes",
    level: "BÁSICO",
    videoThumbnail: require("../../assets/images/calistenia/knee-pushups.jpg"),
    videoUrl: "https://www.youtube.com/shorts/UIcct-7b6oE",
    description:
      "Ejercicio ideal para iniciar en las flexiones. Al apoyar las rodillas se reduce la carga, permitiendo desarrollar fuerza en pecho, brazos y core mientras se perfecciona la técnica. Perfecto como punto de partida para progresar a flexiones estándar.",
    benefits: [
      "Reduce carga en hombros",
      "Mejora control corporal",
      "Progresión gradual segura",
      "Fortalece técnica base",
    ],
    muscles: [
      { name: "Pectoral Mayor", importance: "Principal" },
      { name: "Tríceps", importance: "Secundario" },
      { name: "Deltoides Anterior", importance: "Estabilizador" },
      { name: "Core", importance: "Estabilizador" },
    ],
    steps: [
      {
        step: 1,
        title: "Posición inicial",
        instruction:
          "Colócate en posición de plancha apoyando las manos debajo de los hombros y las rodillas en el suelo.",
      },
      {
        step: 2,
        title: "Alineación corporal",
        instruction:
          "Mantén el cuerpo alineado desde la cabeza hasta las rodillas y activa el core.",
      },
      {
        step: 3,
        title: "Descenso controlado",
        instruction:
          "Flexiona los codos bajando el pecho de forma controlada hacia el suelo.",
      },
      {
        step: 4,
        title: "Extensión completa",
        instruction:
          "Empuja con las palmas para volver a la posición inicial sin bloquear codos.",
      },
      {
        step: 5,
        title: "Respiración",
        instruction:
          "Inspira al bajar y exhala al subir manteniendo un ritmo constante.",
      },
    ],
    tips: [
      "Mantén los codos a 45° del cuerpo",
      "No arquees la espalda baja",
      "Mantén el cuque en línea con la columna",
      "Activa el core durante todo el movimiento",
    ],
    progression: {
      current: "Flexiones de rodillas",
      next: "Flexiones estándar",
      requirements: "3 series de 12 repeticiones con técnica perfecta",
    },
    setsRecommendation: "3-4 series de 8-15 repeticiones",
    restTime: "60-90 segundos entre series",
  };

  const handleRecordSet = async () => {
    router.push(`../exercises/camera/${EXERCISE_ID}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />

      <Animated.View style={{ opacity: fadeAnim, flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.container}
        >
          {/* HEADER CON IMAGEN */}
          <View style={styles.headerContainer}>
            <Image
              source={exerciseData.videoThumbnail}
              style={styles.headerImage}
              resizeMode="cover"
            />

            <View style={styles.headerOverlay}>
              {/* Botón de regreso */}
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.back()}
              >
                <Ionicons name="arrow-back" size={24} color={COLORS.white} />
              </TouchableOpacity>

              {/* Título flotante */}
              <View style={styles.headerTitleContainer}>
                <Text style={styles.headerTitle}>{exerciseData.name}</Text>
                <Text style={styles.headerSubtitle}>
                  {exerciseData.subtitle}
                </Text>
              </View>

              {/* Botón de video tutorial */}
              <View style={styles.videoButtonContainer}>
                <TouchableOpacity
                  style={styles.playButton}
                  onPress={() => Linking.openURL(exerciseData.videoUrl)}
                  activeOpacity={0.8}
                >
                  <Ionicons name="play" size={28} color={COLORS.darkBlue} />
                </TouchableOpacity>
                <Text style={styles.playText}>VER TUTORIAL</Text>
              </View>
            </View>
          </View>

          {/* CONTENIDO PRINCIPAL */}
          <View style={styles.contentContainer}>
            {/* Badge de nivel */}
            <View style={styles.levelBadgeContainer}>
              <View
                style={[
                  styles.levelBadge,
                  { backgroundColor: COLORS.calistenia + "20" },
                ]}
              >
                <Ionicons name="school" size={18} color={COLORS.calistenia} />
                <Text style={[styles.levelText, { color: COLORS.calistenia }]}>
                  {exerciseData.level}
                </Text>
              </View>
              <View style={styles.recommendationBadge}>
                <Ionicons name="barbell" size={16} color={COLORS.lightBlue} />
                <Text style={styles.recommendationText}>
                  {exerciseData.setsRecommendation}
                </Text>
              </View>
            </View>

            {/* Descripción */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>DESCRIPCIÓN</Text>
              <Text style={styles.description}>{exerciseData.description}</Text>
            </View>

            {/* Beneficios */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>BENEFICIOS</Text>
              <View style={styles.benefitsGrid}>
                {exerciseData.benefits.map((benefit, index) => (
                  <View key={index} style={styles.benefitCard}>
                    <View
                      style={[
                        styles.benefitIcon,
                        { backgroundColor: COLORS.calistenia + "20" },
                      ]}
                    >
                      <Ionicons
                        name="checkmark-circle"
                        size={20}
                        color={COLORS.calistenia}
                      />
                    </View>
                    <Text style={styles.benefitText}>{benefit}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Progreso Personal */}
            <View style={[styles.section, styles.progressSection]}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>TU PROGRESO</Text>
                <TouchableOpacity onPress={handleRecordSet}>
                  <Text style={styles.recordButton}>REGISTRAR SERIE</Text>
                </TouchableOpacity>
              </View>

              {sets.length > 0 ? (
                <View style={styles.progressStats}>
                  <View style={styles.statCard}>
                    <Text style={styles.statNumber}>{sets.length}</Text>
                    <Text style={styles.statLabel}>Series totales</Text>
                  </View>
                  <View style={styles.statCard}>
                    <Text style={styles.statNumber}>
                      {Math.max(...sets.map((s) => s.reps))}
                    </Text>
                    <Text style={styles.statLabel}>Récord personal</Text>
                  </View>
                  <View style={styles.statCard}>
                    <Text style={styles.statNumber}>
                      {new Date(sets[sets.length - 1]?.date).toLocaleDateString(
                        "es-ES",
                        { day: "numeric", month: "short" },
                      )}
                    </Text>
                    <Text style={styles.statLabel}>Última sesión</Text>
                  </View>
                </View>
              ) : (
                <View style={styles.emptyProgress}>
                  <Ionicons
                    name="stats-chart"
                    size={40}
                    color={COLORS.calistenia}
                  />
                  <Text style={styles.emptyProgressText}>
                    Registra tu primera serie para comenzar a seguir tu progreso
                  </Text>
                </View>
              )}
            </View>

            {/* Músculos trabajados */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>MÚSCULOS TRABAJADOS</Text>
              <View style={styles.musclesGrid}>
                {exerciseData.muscles.map((muscle, index) => (
                  <View key={index} style={styles.muscleCard}>
                    <View style={styles.muscleHeader}>
                      <MaterialCommunityIcons
                        name="arm-flex"
                        size={20}
                        color={COLORS.calistenia}
                      />
                      <Text style={styles.muscleName}>{muscle.name}</Text>
                    </View>
                    <View
                      style={[
                        styles.importanceBadge,
                        {
                          backgroundColor:
                            muscle.importance === "Principal"
                              ? COLORS.calistenia + "30"
                              : muscle.importance === "Secundario"
                                ? COLORS.lightBlue + "30"
                                : COLORS.neonBlue + "30",
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.importanceText,
                          {
                            color:
                              muscle.importance === "Principal"
                                ? COLORS.calistenia
                                : muscle.importance === "Secundario"
                                  ? COLORS.lightBlue
                                  : COLORS.neonBlue,
                          },
                        ]}
                      >
                        {muscle.importance}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>

            {/* Pasos de ejecución */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>EJECUCIÓN PASO A PASO</Text>
              {exerciseData.steps.map((step) => (
                <View key={step.step} style={styles.stepCard}>
                  <View
                    style={[
                      styles.stepNumber,
                      { backgroundColor: COLORS.calistenia + "20" },
                    ]}
                  >
                    <Text
                      style={[
                        styles.stepNumberText,
                        { color: COLORS.calistenia },
                      ]}
                    >
                      {step.step}
                    </Text>
                  </View>
                  <View style={styles.stepContent}>
                    <Text style={styles.stepTitle}>{step.title}</Text>
                    <Text style={styles.stepInstruction}>
                      {step.instruction}
                    </Text>
                  </View>
                </View>
              ))}
            </View>

            {/* Consejos */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>CONSEJOS TÉCNICOS</Text>
              <View style={styles.tipsContainer}>
                {exerciseData.tips.map((tip, index) => (
                  <View key={index} style={styles.tipItem}>
                    <Ionicons name="bulb" size={18} color={COLORS.calistenia} />
                    <Text style={styles.tipText}>{tip}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Progresión */}
            <View style={[styles.section, styles.progressionSection]}>
              <Text style={styles.sectionTitle}>PRÓXIMA PROGRESIÓN</Text>
              <View style={styles.progressionCard}>
                <View style={styles.progressionCurrent}>
                  <Text style={styles.progressionLabel}>ACTUAL</Text>
                  <Text style={styles.progressionCurrentText}>
                    {exerciseData.progression.current}
                  </Text>
                </View>
                <View style={styles.progressionArrow}>
                  <Ionicons
                    name="arrow-forward"
                    size={24}
                    color={COLORS.calistenia}
                  />
                </View>
                <View style={styles.progressionNext}>
                  <Text style={styles.progressionLabel}>SIGUIENTE</Text>
                  <Text style={styles.progressionNextText}>
                    {exerciseData.progression.next}
                  </Text>
                </View>
              </View>
              <Text style={styles.progressionRequirements}>
                Requisitos: {exerciseData.progression.requirements}
              </Text>
            </View>

            {/* Espacio para botón flotante */}
            <View style={{ height: 90 }} />
          </View>
        </ScrollView>

        {/* BOTÓN FLOTANTE PRINCIPAL */}
        <View style={styles.floatingButtonContainer}>
          <TouchableOpacity
            style={styles.floatingButton}
            onPress={handleRecordSet}
            activeOpacity={0.8}
          >
            <View style={styles.floatingButtonContent}>
              <Ionicons name="camera" size={22} color={COLORS.white} />
              <View style={styles.floatingButtonTextContainer}>
                <Text style={styles.floatingButtonTitle}>REGISTRAR SERIE</Text>
                <Text style={styles.floatingButtonSubtitle}>
                  Usa la cámara para contar repeticiones
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={22} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </Animated.View>
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
  headerContainer: {
    height: 320,
    position: "relative",
  },
  headerImage: {
    width: "100%",
    height: "100%",
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(10, 26, 47, 0.7)",
    justifyContent: "space-between",
    paddingTop: 50,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  headerTitleContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "900",
    color: COLORS.white,
    textAlign: "center",
    marginBottom: 8,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: COLORS.calistenia,
    textAlign: "center",
    fontWeight: "600",
  },
  videoButtonContainer: {
    alignItems: "center",
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.calistenia,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: COLORS.calistenia,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  playText: {
    color: COLORS.white,
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 14,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  levelBadgeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  levelBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.calistenia + "40",
  },
  levelText: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 8,
  },
  recommendationBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.cardBg,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  recommendationText: {
    fontSize: 12,
    color: COLORS.lightBlue,
    marginLeft: 6,
    fontWeight: "500",
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
    marginBottom: 15,
    letterSpacing: 0.5,
  },
  description: {
    fontSize: 16,
    color: COLORS.lightBlue,
    lineHeight: 24,
  },
  benefitsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  benefitCard: {
    width: "48%",
    alignItems: "center",
    backgroundColor: COLORS.cardBg,
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  benefitIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  benefitText: {
    fontSize: 12,
    color: COLORS.white,
    textAlign: "center",
    fontWeight: "500",
  },
  progressSection: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(0, 240, 255, 0.1)",
  },
  recordButton: {
    fontSize: 12,
    color: COLORS.calistenia,
    fontWeight: "bold",
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: COLORS.calistenia + "15",
    borderRadius: 10,
  },
  progressStats: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statCard: {
    alignItems: "center",
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.calistenia,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.lightBlue,
    textAlign: "center",
  },
  emptyProgress: {
    alignItems: "center",
    paddingVertical: 30,
  },
  emptyProgressText: {
    fontSize: 14,
    color: COLORS.lightBlue,
    textAlign: "center",
    marginTop: 15,
    lineHeight: 20,
  },
  musclesGrid: {
    gap: 12,
  },
  muscleCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 15,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  muscleHeader: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  muscleName: {
    fontSize: 16,
    color: COLORS.white,
    marginLeft: 12,
    fontWeight: "500",
  },
  importanceBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  importanceText: {
    fontSize: 11,
    fontWeight: "bold",
  },
  stepCard: {
    flexDirection: "row",
    backgroundColor: COLORS.cardBg,
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  stepNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  stepNumberText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.white,
    marginBottom: 4,
  },
  stepInstruction: {
    fontSize: 14,
    color: COLORS.lightBlue,
    lineHeight: 20,
  },
  tipsContainer: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  tipItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  tipText: {
    fontSize: 14,
    color: COLORS.lightBlue,
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
  },
  progressionSection: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    padding: 20,
    borderWidth: 2,
    borderColor: COLORS.calistenia + "30",
  },
  progressionCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  progressionCurrent: {
    flex: 1,
    alignItems: "flex-start",
  },
  progressionNext: {
    flex: 1,
    alignItems: "flex-end",
  },
  progressionLabel: {
    fontSize: 12,
    color: COLORS.lightBlue,
    marginBottom: 6,
    fontWeight: "600",
  },
  progressionCurrentText: {
    fontSize: 16,
    color: COLORS.calistenia,
    fontWeight: "bold",
  },
  progressionNextText: {
    fontSize: 16,
    color: COLORS.neonBlue,
    fontWeight: "bold",
    textAlign: "right",
  },
  progressionArrow: {
    paddingHorizontal: 15,
  },
  progressionRequirements: {
    fontSize: 13,
    color: COLORS.lightBlue,
    fontStyle: "italic",
    textAlign: "center",
  },
  floatingButtonContainer: {
    position: "absolute",
    bottom: 25,
    left: 20,
    right: 20,
  },
  floatingButton: {
    backgroundColor: COLORS.calistenia,
    borderRadius: 25,
    paddingVertical: 18,
    paddingHorizontal: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  floatingButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  floatingButtonTextContainer: {
    marginLeft: 15,
    flex: 1,
  },
  floatingButtonTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.white,
    marginBottom: 2,
  },
  floatingButtonSubtitle: {
    fontSize: 12,
    color: COLORS.white,
    opacity: 0.9,
  },
});
