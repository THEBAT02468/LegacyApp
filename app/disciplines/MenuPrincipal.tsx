import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

// Agrega tu imagen de fondo aquí:
const backgroundImage = require("@/assets/images/gym-bg2.jpeg");

const COLORS = {
  neonBlue: "#00F0FF",
  neonBlueLight: "#80F8FF",
  darkBlue: "#0A1A2F",
  lightBlue: "#4DA8DA",
  white: "#FFFFFF",
  black: "#000000",
  cardBg: "rgba(255, 255, 255, 0.05)",
  gradientStart: "rgba(10, 26, 47, 0.95)",
  gradientEnd: "rgba(10, 26, 47, 0.7)",
};

const DISCIPLINES = [
  {
    id: "calistenia",
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
    focus: ["Dominadas", "Flexiones", "Muscle-ups", "Movilidad"],
    instructor: "David Chen",
    image: require("../../assets/images/gym-area.jpg"),
  },
  {
    id: "powerlifting",
    name: "POWERLIFTING",
    icon: "barbell",
    color: "#FF6B6B",
    difficulty: "Intermedio - Avanzado",
    duration: "60-90 min",
    description:
      "Deporte de fuerza centrado en tres levantamientos principales.",
    benefits: [
      "Fuerza máxima",
      "Densidad ósea",
      "Confianza mental",
      "Comunidad activa",
    ],
    focus: ["Sentadilla", "Press banca", "Peso muerto", "Técnica"],
    instructor: "Carlos Rodríguez",
    image: require("../../assets/images/gym-area.jpg"),
  },
  {
    id: "gym",
    name: "GIMNASIO CLÁSICO",
    icon: "fitness",
    color: "#45B7D1",
    difficulty: "Principiante - Avanzado",
    duration: "45-75 min",
    description:
      "Entrenamiento con máquinas y pesos libres para desarrollo muscular.",
    benefits: [
      "Musculación completa",
      "Equipamiento variado",
      "Progresión medible",
      "Flexibilidad horaria",
    ],
    focus: ["Hipertrofia", "Fuerza", "Definición", "Recuperación"],
    instructor: "Miguel Torres",
    image: require("../../assets/images/gym-area.jpg"),
  },
  {
    id: "crossfit",
    name: "CROSSFIT",
    icon: "flash",
    color: "#FFEAA7",
    difficulty: "Intermedio - Avanzado",
    duration: "60 min",
    description:
      "Entrenamiento de alta intensidad que combina levantamiento, cardio y gimnasia.",
    benefits: [
      "Condicionamiento total",
      "Variedad constante",
      "Trabajo en comunidad",
      "Competencia sana",
    ],
    focus: ["WODs", "Levantamiento", "Gimnasia", "Cardio"],
    instructor: "Ana Martínez",
    image: require("../../assets/images/gym-area.jpg"),
  },
];

export default function Disciplines() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const laserAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animaciones iniciales
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    // Animación láser continua
    Animated.loop(
      Animated.sequence([
        Animated.timing(laserAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(laserAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [fadeAnim, slideAnim, laserAnim]);

  const renderDisciplineCard = ({ item }: any) => (
    <TouchableOpacity
      style={styles.disciplineCard}
      onPress={() => router.push(`/disciplines/${item.id}` as any)}
      activeOpacity={0.8}
    >
      {/* Efecto láser en el borde */}
      <Animated.View
        style={[
          styles.laserBorder,
          {
            borderColor: laserAnim.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [
                `${item.color}30`,
                `${item.color}FF`,
                `${item.color}30`,
              ],
            }),
            shadowColor: item.color,
            shadowOpacity: laserAnim.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [0.3, 0.8, 0.3],
            }),
            shadowRadius: laserAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [5, 15],
            }),
          },
        ]}
      />

      <Image
        source={item.image}
        style={styles.disciplineImage}
        resizeMode="cover"
      />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.7)"]}
        style={styles.disciplineGradient}
      />

      <View style={styles.disciplineContent}>
        <View style={styles.disciplineHeader}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: item.color + "30" },
            ]}
          >
            {/* Efecto láser en el icono */}
            <Animated.View
              style={[
                styles.iconLaserEffect,
                {
                  opacity: laserAnim,
                  transform: [
                    {
                      scale: laserAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.8, 1.2],
                      }),
                    },
                  ],
                },
              ]}
            />
            <Ionicons name={item.icon} size={28} color={item.color} />
          </View>
          <View style={styles.difficultyBadge}>
            <Text style={[styles.difficultyText, { color: item.color }]}>
              {item.difficulty}
            </Text>
          </View>
        </View>

        <Text style={styles.disciplineName}>{item.name}</Text>

        <View style={styles.disciplineDetails}>
          <View style={styles.detailItem}>
            <Ionicons name="time" size={14} color={COLORS.lightBlue} />
            <Text style={styles.detailText}>{item.duration}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="person" size={14} color={COLORS.lightBlue} />
            <Text style={styles.detailText}>{item.instructor}</Text>
          </View>
        </View>

        <Text style={styles.disciplineDescription} numberOfLines={2}>
          {item.description}
        </Text>

        <View style={styles.focusContainer}>
          {item.focus.slice(0, 2).map((focusItem: string, index: number) => (
            <View
              key={index}
              style={[styles.focusTag, { backgroundColor: item.color + "15" }]}
            >
              <Text style={[styles.focusText, { color: item.color }]}>
                {focusItem}
              </Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={styles.disciplineCard}
          onPress={() => router.push(`/disciplines/${item.id}` as any)}
          activeOpacity={0.8}
        >
          <Text style={styles.exploreButtonText}>EXPLORAR</Text>
          <Ionicons name="arrow-forward" size={16} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderInstructorCard = () => (
    <TouchableOpacity
      style={styles.instructorCard}
      onPress={() => router.push("/instructors")}
      activeOpacity={0.8}
    >
      {/* Efecto láser para la tarjeta de instructores */}
      <Animated.View
        style={[
          styles.instructorLaserBorder,
          {
            borderColor: laserAnim.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [
                "rgba(0, 240, 255, 0.3)",
                "rgba(0, 240, 255, 1)",
                "rgba(0, 240, 255, 0.3)",
              ],
            }),
            shadowOpacity: laserAnim.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [0.3, 0.9, 0.3],
            }),
          },
        ]}
      />

      <LinearGradient
        colors={[COLORS.neonBlue, "#00B4D8"]}
        style={styles.instructorGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={styles.instructorContent}>
          <View style={styles.instructorIcon}>
            {/* Efecto láser en el icono de instructores */}
            <Animated.View
              style={[
                styles.instructorIconGlow,
                {
                  opacity: laserAnim,
                  transform: [
                    {
                      scale: laserAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.9, 1.1],
                      }),
                    },
                  ],
                },
              ]}
            />
            <Ionicons name="people" size={40} color={COLORS.white} />
          </View>
          <View style={styles.instructorTextContainer}>
            <Text style={styles.instructorTitle}>
              CONOCE A NUESTROS EXPERTOS
            </Text>
            <Text style={styles.instructorDescription}>
              Entrena con instructores certificados y experimentados
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color={COLORS.white} />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.background}
      resizeMode="cover"
    >
      <LinearGradient
        colors={[COLORS.gradientStart, COLORS.gradientEnd]}
        style={StyleSheet.absoluteFillObject}
      />

      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" />
        <Animated.ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header con efecto láser */}
          <Animated.View
            style={[
              styles.header,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <View style={styles.titleContainer}>
              {/* Efecto láser para el título */}
              <Animated.View
                style={[
                  styles.titleLaserUnderline,
                  {
                    width: laserAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["20%", "80%"],
                    }),
                    opacity: laserAnim.interpolate({
                      inputRange: [0, 0.5, 1],
                      outputRange: [0.3, 1, 0.3],
                    }),
                  },
                ]}
              />
              <Text style={styles.title}>DISCIPLINAS</Text>
              <Animated.Text
                style={[
                  styles.titleGlow,
                  {
                    opacity: laserAnim,
                    textShadowRadius: laserAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [10, 20],
                    }),
                  },
                ]}
              >
                DISCIPLINAS
              </Animated.Text>
            </View>
            <Text style={styles.subtitle}>
              Elige tu camino hacia la transformación
            </Text>
          </Animated.View>

          {/* Estadísticas con efecto láser */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <View
                style={[
                  styles.statIcon,
                  { backgroundColor: COLORS.neonBlue + "20" },
                ]}
              >
                <Animated.View
                  style={[
                    styles.statIconGlow,
                    {
                      opacity: laserAnim,
                      backgroundColor: laserAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [
                          COLORS.neonBlue + "00",
                          COLORS.neonBlue + "40",
                        ],
                      }),
                    },
                  ]}
                />
                <Ionicons name="barbell" size={22} color={COLORS.neonBlue} />
              </View>
              <Text style={styles.statNumber}>{DISCIPLINES.length}</Text>
              <Text style={styles.statLabel}>Disciplinas</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <View
                style={[
                  styles.statIcon,
                  { backgroundColor: COLORS.lightBlue + "20" },
                ]}
              >
                <Animated.View
                  style={[
                    styles.statIconGlow,
                    {
                      opacity: laserAnim.interpolate({
                        inputRange: [0, 0.5, 1],
                        outputRange: [0, 0.6, 0],
                      }),
                      backgroundColor: COLORS.lightBlue + "40",
                    },
                  ]}
                />
                <Ionicons name="time" size={22} color={COLORS.lightBlue} />
              </View>
              <Text style={styles.statNumber}>50+</Text>
              <Text style={styles.statLabel}>Horas/semana</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <View
                style={[
                  styles.statIcon,
                  { backgroundColor: COLORS.neonBlue + "20" },
                ]}
              >
                <Animated.View
                  style={[
                    styles.statIconGlow,
                    {
                      opacity: laserAnim.interpolate({
                        inputRange: [0, 0.7, 1],
                        outputRange: [0, 0.8, 0],
                      }),
                      backgroundColor: COLORS.neonBlue + "40",
                    },
                  ]}
                />
                <Ionicons name="people" size={22} color={COLORS.neonBlue} />
              </View>
              <Text style={styles.statNumber}>15</Text>
              <Text style={styles.statLabel}>Instructores</Text>
            </View>
          </View>

          {/* Card de Instructores */}
          <Animated.View
            style={[
              styles.instructorSection,
              { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
            ]}
          >
            {renderInstructorCard()}
          </Animated.View>

          {/* Todas las disciplinas */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleContainer}>
                <Text style={styles.sectionTitle}>TODAS LAS DISCIPLINAS</Text>
                <Animated.View
                  style={[
                    styles.sectionTitleLaser,
                    {
                      opacity: laserAnim,
                      width: laserAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 100],
                      }),
                    },
                  ]}
                />
              </View>
              <Text style={styles.sectionSubtitle}>
                Cada disciplina, un camino único hacia tus objetivos
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

          {/* Beneficios Legacy */}
          <View style={styles.benefitsSection}>
            <View style={styles.benefitsTitleContainer}>
              <Text style={styles.benefitsTitle}>BENEFICIOS LEGACY</Text>
              <Animated.View
                style={[
                  styles.benefitsTitleGlow,
                  {
                    opacity: laserAnim,
                    height: laserAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 3],
                    }),
                  },
                ]}
              />
            </View>
            <View style={styles.benefitsGrid}>
              <View style={styles.benefitCard}>
                <View
                  style={[
                    styles.benefitIcon,
                    { backgroundColor: COLORS.neonBlue + "20" },
                  ]}
                >
                  <Animated.View
                    style={[
                      styles.benefitIconGlow,
                      {
                        opacity: laserAnim,
                        backgroundColor: COLORS.neonBlue + "30",
                      },
                    ]}
                  />
                  <MaterialCommunityIcons
                    name="shield-check"
                    size={28}
                    color={COLORS.neonBlue}
                  />
                </View>
                <Text style={styles.benefitTitle}>Certificados</Text>
                <Text style={styles.benefitText}>
                  Instructores profesionales certificados
                </Text>
              </View>

              <View style={styles.benefitCard}>
                <View
                  style={[
                    styles.benefitIcon,
                    { backgroundColor: COLORS.lightBlue + "20" },
                  ]}
                >
                  <Animated.View
                    style={[
                      styles.benefitIconGlow,
                      {
                        opacity: laserAnim.interpolate({
                          inputRange: [0, 0.5, 1],
                          outputRange: [0, 0.7, 0],
                        }),
                        backgroundColor: COLORS.lightBlue + "30",
                      },
                    ]}
                  />
                  <MaterialCommunityIcons
                    name="chart-line"
                    size={28}
                    color={COLORS.lightBlue}
                  />
                </View>
                <Text style={styles.benefitTitle}>Progresión</Text>
                <Text style={styles.benefitText}>
                  Seguimiento personalizado de avances
                </Text>
              </View>

              <View style={styles.benefitCard}>
                <View
                  style={[
                    styles.benefitIcon,
                    { backgroundColor: COLORS.neonBlue + "20" },
                  ]}
                >
                  <Animated.View
                    style={[
                      styles.benefitIconGlow,
                      {
                        opacity: laserAnim.interpolate({
                          inputRange: [0, 0.7, 1],
                          outputRange: [0, 0.8, 0],
                        }),
                        backgroundColor: COLORS.neonBlue + "30",
                      },
                    ]}
                  />
                  <MaterialCommunityIcons
                    name="arm-flex"
                    size={28}
                    color={COLORS.neonBlue}
                  />
                </View>
                <Text style={styles.benefitTitle}>Variedad</Text>
                <Text style={styles.benefitText}>
                  Amplio rango de disciplinas disponibles
                </Text>
              </View>

              <View style={styles.benefitCard}>
                <View
                  style={[
                    styles.benefitIcon,
                    { backgroundColor: COLORS.lightBlue + "20" },
                  ]}
                >
                  <Animated.View
                    style={[
                      styles.benefitIconGlow,
                      {
                        opacity: laserAnim.interpolate({
                          inputRange: [0, 0.3, 1],
                          outputRange: [0, 0.6, 0],
                        }),
                        backgroundColor: COLORS.lightBlue + "30",
                      },
                    ]}
                  />
                  <MaterialCommunityIcons
                    name="account-group"
                    size={28}
                    color={COLORS.lightBlue}
                  />
                </View>
                <Text style={styles.benefitTitle}>Comunidad</Text>
                <Text style={styles.benefitText}>
                  Grupo de apoyo y motivación constante
                </Text>
              </View>
            </View>
          </View>

          {/* CTA Final con efecto láser */}
          <TouchableOpacity
            style={styles.ctaButton}
            onPress={() => router.push("/instructors")}
            activeOpacity={0.8}
          >
            <Animated.View
              style={[
                styles.ctaLaserBorder,
                {
                  borderColor: laserAnim.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [
                      "rgba(0, 240, 255, 0.3)",
                      "rgba(0, 240, 255, 1)",
                      "rgba(0, 240, 255, 0.3)",
                    ],
                  }),
                  shadowOpacity: laserAnim.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [0.3, 0.9, 0.3],
                  }),
                },
              ]}
            />

            <LinearGradient
              colors={[COLORS.neonBlue, "#00B4D8"]}
              style={styles.ctaGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <View style={styles.ctaContent}>
                <View style={styles.ctaIcon}>
                  <Animated.View
                    style={[
                      styles.ctaIconGlow,
                      {
                        opacity: laserAnim,
                        transform: [
                          {
                            rotate: laserAnim.interpolate({
                              inputRange: [0, 1],
                              outputRange: ["0deg", "360deg"],
                            }),
                          },
                        ],
                      },
                    ]}
                  />
                  <Ionicons name="sparkles" size={24} color={COLORS.white} />
                </View>
                <View style={styles.ctaTextContainer}>
                  <Text style={styles.ctaTitle}>¿LISTO PARA COMENZAR?</Text>
                  <Text style={styles.ctaDescription}>
                    Conecta con nuestros expertos ahora
                  </Text>
                </View>
                <Ionicons
                  name="arrow-forward-circle"
                  size={28}
                  color={COLORS.white}
                />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
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
    paddingVertical: 30,
    alignItems: "center",
  },
  titleContainer: {
    position: "relative",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 42,
    fontWeight: "900",
    color: COLORS.neonBlue,
    letterSpacing: 2,
    textAlign: "center",
    textShadowColor: "rgba(0, 240, 255, 0.3)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  titleGlow: {
    position: "absolute",
    fontSize: 42,
    fontWeight: "900",
    color: COLORS.neonBlue,
    letterSpacing: 2,
    textAlign: "center",
    textShadowColor: COLORS.neonBlue,
    textShadowOffset: { width: 0, height: 0 },
  },
  titleLaserUnderline: {
    height: 3,
    backgroundColor: COLORS.neonBlue,
    borderRadius: 2,
    marginTop: 5,
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.lightBlue,
    textAlign: "center",
    maxWidth: 300,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    padding: 25,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: "rgba(0, 240, 255, 0.15)",
    position: "relative",
    overflow: "hidden",
  },
  statItem: {
    alignItems: "center",
    flex: 1,
    position: "relative",
  },
  statIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    position: "relative",
  },
  statIconGlow: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: COLORS.neonBlue,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.white,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.lightBlue,
    textAlign: "center",
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  instructorSection: {
    marginBottom: 30,
  },
  instructorCard: {
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: COLORS.neonBlue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    position: "relative",
  },
  instructorLaserBorder: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 20,
    borderWidth: 2,
    zIndex: 1,
    shadowColor: COLORS.neonBlue,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 15,
  },
  instructorGradient: {
    padding: 25,
  },
  instructorContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  instructorIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  instructorIconGlow: {
    position: "absolute",
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.5)",
  },
  instructorTextContainer: {
    flex: 1,
    marginHorizontal: 20,
  },
  instructorTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.white,
    marginBottom: 5,
  },
  instructorDescription: {
    fontSize: 14,
    color: COLORS.white,
    opacity: 0.9,
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    marginBottom: 25,
  },
  sectionTitleContainer: {
    position: "relative",
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.white,
  },
  sectionTitleLaser: {
    position: "absolute",
    bottom: -5,
    height: 2,
    backgroundColor: COLORS.neonBlue,
    borderRadius: 1,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: COLORS.lightBlue,
  },
  gridContainer: {
    paddingBottom: 10,
  },
  gridRow: {
    justifyContent: "space-between",
    marginBottom: 20,
  },
  disciplineCard: {
    width: (width - 50) / 2,
    borderRadius: 25,
    overflow: "hidden",
    backgroundColor: COLORS.cardBg,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
    position: "relative",
  },
  laserBorder: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 25,
    borderWidth: 2,
    zIndex: 1,
    shadowOffset: { width: 0, height: 0 },
  },
  disciplineImage: {
    width: "100%",
    height: 120,
  },
  disciplineGradient: {
    ...StyleSheet.absoluteFillObject,
    height: 120,
  },
  disciplineContent: {
    padding: 15,
  },
  disciplineHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  iconLaserEffect: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  difficultyText: {
    fontSize: 10,
    fontWeight: "bold",
  },
  disciplineName: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.white,
    marginBottom: 10,
  },
  disciplineDetails: {
    flexDirection: "row",
    marginBottom: 10,
    gap: 12,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailText: {
    fontSize: 12,
    color: COLORS.lightBlue,
    marginLeft: 4,
    fontWeight: "500",
  },
  disciplineDescription: {
    fontSize: 12,
    color: COLORS.lightBlue,
    lineHeight: 16,
    marginBottom: 12,
    height: 32,
  },
  focusContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 15,
  },
  focusTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  focusText: {
    fontSize: 10,
    fontWeight: "bold",
  },
  exploreButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    borderRadius: 10,
    gap: 6,
  },
  exploreButtonText: {
    fontSize: 12,
    fontWeight: "bold",
    color: COLORS.white,
  },
  benefitsSection: {
    marginBottom: 30,
  },
  benefitsTitleContainer: {
    position: "relative",
    alignItems: "center",
    marginBottom: 20,
  },
  benefitsTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.white,
    textAlign: "center",
  },
  benefitsTitleGlow: {
    position: "absolute",
    bottom: -5,
    width: "80%",
    backgroundColor: COLORS.neonBlue,
    borderRadius: 2,
  },
  benefitsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  benefitCard: {
    width: "48%",
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    position: "relative",
  },
  benefitIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    position: "relative",
  },
  benefitIconGlow: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
  },
  benefitTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.white,
    marginBottom: 8,
    textAlign: "center",
  },
  benefitText: {
    fontSize: 12,
    color: COLORS.lightBlue,
    textAlign: "center",
    lineHeight: 16,
  },
  ctaButton: {
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: COLORS.neonBlue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 10,
    position: "relative",
  },
  ctaLaserBorder: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 20,
    borderWidth: 2,
    zIndex: 1,
    shadowColor: COLORS.neonBlue,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 20,
  },
  ctaGradient: {
    padding: 25,
  },
  ctaContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ctaIcon: {
    position: "relative",
  },
  ctaIconGlow: {
    position: "absolute",
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.5)",
    left: -8,
    top: -8,
  },
  ctaTextContainer: {
    flex: 1,
    marginHorizontal: 20,
  },
  ctaTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.white,
    marginBottom: 5,
  },
  ctaDescription: {
    fontSize: 14,
    color: COLORS.white,
    opacity: 0.9,
  },
});
