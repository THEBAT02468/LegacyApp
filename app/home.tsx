import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

// Importa tu imagen local de fondo
const backgroundImage = require("../assets/images/Main.jpeg");

const COLORS = {
  neonBlue: "#00F0FF",
  neonBlueLight: "#80F8FF",
  neonPurple: "#9D4EDD",
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

  // Animaciones principales
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const pulseAnim = useRef(new Animated.Value(0)).current;
  const rotationAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const waveAnim = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  // Animación de partículas
  const particles = useRef(
    Array.from({ length: 15 }, () => ({
      x: new Animated.Value(Math.random() * width),
      y: new Animated.Value(Math.random() * height),
      size: new Animated.Value(Math.random() * 3 + 1),
      opacity: new Animated.Value(Math.random() * 0.5 + 0.1),
    })),
  ).current;

  useEffect(() => {
    // Animación de entrada con secuencia
    Animated.stagger(100, [
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
      ]),
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: true,
          }),
        ]),
      ),
      Animated.loop(
        Animated.timing(rotationAnim, {
          toValue: 1,
          duration: 20000,
          useNativeDriver: true,
        }),
      ),
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(glowAnim, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ]),
      ),
      Animated.loop(
        Animated.sequence([
          Animated.timing(waveAnim, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
          }),
          Animated.timing(waveAnim, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: true,
          }),
        ]),
      ),
      Animated.loop(
        Animated.sequence([
          Animated.timing(floatAnim, {
            toValue: 1,
            duration: 4000,
            useNativeDriver: true,
          }),
          Animated.timing(floatAnim, {
            toValue: 0,
            duration: 4000,
            useNativeDriver: true,
          }),
        ]),
      ),
    ]).start();

    // Animación de partículas
    particles.forEach((particle) => {
      Animated.loop(
        Animated.parallel([
          Animated.timing(particle.x, {
            toValue: Math.random() * width,
            duration: Math.random() * 5000 + 5000,
            useNativeDriver: true,
          }),
          Animated.timing(particle.y, {
            toValue: Math.random() * height,
            duration: Math.random() * 5000 + 5000,
            useNativeDriver: true,
          }),
          Animated.sequence([
            Animated.timing(particle.opacity, {
              toValue: 0.7,
              duration: Math.random() * 2000 + 1000,
              useNativeDriver: true,
            }),
            Animated.timing(particle.opacity, {
              toValue: 0.1,
              duration: Math.random() * 2000 + 1000,
              useNativeDriver: true,
            }),
          ]),
        ]),
      ).start();
    });
  }, [
    fadeAnim,
    floatAnim,
    glowAnim,
    particles,
    pulseAnim,
    rotationAnim,
    slideAnim,
    waveAnim,
  ]);

  const renderParticles = () => (
    <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
      {particles.map((particle, index) => (
        <Animated.View
          key={index}
          style={[
            styles.particle,
            {
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              opacity: particle.opacity,
              backgroundColor: COLORS.neonBlue,
            },
          ]}
        />
      ))}
    </View>
  );

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Overlay con gradiente animado */}
      <Animated.View
        style={[
          styles.overlay,
          {
            opacity: glowAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0.95, 0.98],
            }),
          },
        ]}
      >
        <LinearGradient
          colors={[COLORS.gradientStart, COLORS.gradientEnd]}
          style={StyleSheet.absoluteFillObject}
        />
      </Animated.View>

      {/* Efectos de partículas */}
      {renderParticles()}

      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header con efectos especiales */}
          <Animated.View
            style={[
              styles.header,
              {
                opacity: fadeAnim,
                transform: [
                  {
                    translateY: slideAnim.interpolate({
                      inputRange: [0, 30],
                      outputRange: [0, 30],
                    }),
                  },
                  {
                    scale: pulseAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.02],
                    }),
                  },
                ],
              },
            ]}
          >
            {/* Efecto de rotación sutil en el fondo del título */}
            <Animated.View
              style={[
                styles.titleGlow,
                {
                  transform: [
                    {
                      rotate: rotationAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ["0deg", "360deg"],
                      }),
                    },
                    {
                      scale: pulseAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 1.2],
                      }),
                    },
                  ],
                  opacity: glowAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.3, 0.6],
                  }),
                },
              ]}
            />

            <Text style={styles.greeting}>¡BIENVENIDO A</Text>
            <Animated.View
              style={{
                transform: [
                  {
                    scale: pulseAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.05],
                    }),
                  },
                ],
              }}
            >
              <Text style={styles.title}>LEGACY GYM</Text>
            </Animated.View>
            <Text style={styles.subtitle}>
              Forja tu legado, supera tus límites
            </Text>
          </Animated.View>

          {/* Estadísticas animadas */}
          <Animated.View
            style={[
              styles.statsContainer,
              {
                opacity: fadeAnim,
                transform: [
                  {
                    translateY: slideAnim.interpolate({
                      inputRange: [0, 30],
                      outputRange: [0, 30],
                    }),
                  },
                ],
              },
            ]}
          >
            {[
              { icon: "flame", value: "28", label: "Días seguidos" },
              { icon: "barbell", value: "145kg", label: "PR Deadlift" },
              { icon: "trophy", value: "12", label: "Logros" },
            ].map((stat, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.statCard,
                  {
                    transform: [
                      {
                        translateY: floatAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, index % 2 === 0 ? -5 : 5],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <Animated.View
                  style={[
                    styles.statIconContainer,
                    {
                      transform: [
                        {
                          scale: pulseAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, 1.1],
                          }),
                        },
                      ],
                    },
                  ]}
                >
                  <Ionicons
                    name={stat.icon as unknown as any}
                    size={30}
                    color={COLORS.neonBlue}
                  />
                </Animated.View>
                <Animated.Text
                  style={[
                    styles.statNumber,
                    {
                      opacity: glowAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 0.8],
                      }),
                    },
                  ]}
                >
                  {stat.value}
                </Animated.Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </Animated.View>
            ))}
          </Animated.View>

          {/* Tarjetas principales con efectos de onda */}
          <View style={styles.cardsContainer}>
            <Animated.View
              style={
                {
                  opacity: fadeAnim,
                  transform: [
                    { translateX: slideAnim },
                    {
                      scale: pulseAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 1.01],
                      }),
                    },
                  ],
                } as any
              }
            >
              <TouchableOpacity
                style={styles.mainCard}
                onPress={() => router.push("/disciplines/MenuPrincipal")}
                activeOpacity={0.7}
              >
                {/* Efecto de borde animado */}
                <Animated.View
                  style={[
                    styles.cardBorder,
                    {
                      borderColor: glowAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [
                          "rgba(0, 240, 255, 0.2)",
                          "rgba(0, 240, 255, 0.8)",
                        ],
                      }),
                      shadowOpacity: glowAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.2, 0.6],
                      }),
                    },
                  ]}
                />

                <Animated.View
                  style={[
                    styles.cardIconContainer,
                    {
                      transform: [
                        {
                          rotate: rotationAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: ["0deg", "720deg"],
                          }),
                        },
                      ],
                    },
                  ]}
                >
                  <Ionicons name="fitness" size={50} color={COLORS.neonBlue} />
                  <Animated.View
                    style={[
                      styles.iconGlow,
                      {
                        opacity: glowAnim,
                        transform: [
                          {
                            scale: glowAnim.interpolate({
                              inputRange: [0, 1],
                              outputRange: [0.8, 1.2],
                            }),
                          },
                        ],
                      },
                    ]}
                  />
                </Animated.View>

                <Animated.Text
                  style={[
                    styles.cardTitle,
                    {
                      textShadowRadius: glowAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [2, 10],
                      }),
                    },
                  ]}
                >
                  ENTRENAMIENTOS
                </Animated.Text>

                <Text style={styles.cardDescription}>
                  Explora todas nuestras disciplinas: Calistenia, Powerlifting,
                  Gimnasio y más
                </Text>

                <View style={styles.cardFooter}>
                  <Animated.View
                    style={[
                      styles.exerciseCount,
                      {
                        backgroundColor: glowAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [
                            "rgba(255, 255, 255, 0.05)",
                            "rgba(0, 240, 255, 0.15)",
                          ],
                        }),
                      },
                    ]}
                  >
                    <Ionicons
                      name="barbell"
                      size={16}
                      color={COLORS.neonBlue}
                    />
                    <Text style={styles.countText}>6+ disciplinas</Text>
                  </Animated.View>

                  <Animated.View
                    style={{
                      transform: [
                        {
                          translateX: waveAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 10],
                          }),
                        },
                      ],
                    }}
                  >
                    <Text style={styles.cardActionText}>Explorar →</Text>
                  </Animated.View>
                </View>
              </TouchableOpacity>
            </Animated.View>

            <Animated.View
              style={
                {
                  opacity: fadeAnim,
                  transform: [
                    { translateX: slideAnim },
                    {
                      scale: pulseAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 1.01],
                      }),
                    },
                  ],
                  marginTop: 20,
                } as any
              }
            >
              <TouchableOpacity
                style={[styles.mainCard, styles.cardSecondary]}
                onPress={() => router.push("/instructors")}
                activeOpacity={0.7}
              >
                {/* Efecto de borde animado */}
                <Animated.View
                  style={[
                    styles.cardBorder,
                    {
                      borderColor: glowAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [
                          "rgba(77, 168, 218, 0.3)",
                          "rgba(77, 168, 218, 0.8)",
                        ],
                      }),
                    },
                  ]}
                />

                <View style={styles.cardIconContainer}>
                  <Ionicons name="people" size={50} color={COLORS.lightBlue} />
                  <Animated.View
                    style={[
                      styles.iconGlow,
                      {
                        opacity: glowAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0.5, 0.8],
                        }),
                        backgroundColor: "rgba(77, 168, 218, 0.3)",
                      },
                    ]}
                  />
                </View>

                <Text style={styles.cardTitle}>INSTRUCTORES</Text>

                <Text style={styles.cardDescription}>
                  Entrena con nuestro equipo de expertos certificados en cada
                  disciplina
                </Text>

                <View style={styles.cardFooter}>
                  <Animated.View
                    style={[
                      styles.exerciseCount,
                      {
                        backgroundColor: glowAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [
                            "rgba(255, 255, 255, 0.05)",
                            "rgba(77, 168, 218, 0.15)",
                          ],
                        }),
                      },
                    ]}
                  >
                    <Ionicons
                      name="person"
                      size={16}
                      color={COLORS.lightBlue}
                    />
                    <Text style={styles.countText}>15+ expertos</Text>
                  </Animated.View>

                  <Animated.View
                    style={{
                      transform: [
                        {
                          translateX: waveAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 10],
                          }),
                        },
                      ],
                    }}
                  >
                    <Text
                      style={[
                        styles.cardActionText,
                        { color: COLORS.lightBlue },
                      ]}
                    >
                      Conocer →
                    </Text>
                  </Animated.View>
                </View>
              </TouchableOpacity>
            </Animated.View>
          </View>

          {/* Sección de Disciplinas Populares con scroll horizontal animado */}
          <Animated.View
            style={[
              styles.disciplinesSection,
              {
                opacity: fadeAnim,
                transform: [
                  {
                    translateY: slideAnim.interpolate({
                      inputRange: [0, 30],
                      outputRange: [0, 30],
                    }),
                  },
                ],
              },
            ]}
          >
            <Text style={styles.sectionTitle}>DISCIPLINAS POPULARES</Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.disciplinesScroll}
            >
              {[
                {
                  icon: "body",
                  name: "Calistenia",
                  level: "Todos los niveles",
                  color: "#4ECDC4",
                  route: "/disciplines/calistenia",
                },
                {
                  icon: "barbell",
                  name: "Powerlifting",
                  level: "Fuerza máxima",
                  color: "#FF6B6B",
                  route: "/disciplines/powerlifting",
                },
                {
                  icon: "fitness",
                  name: "Gimnasio",
                  level: "Musculación",
                  color: "#45B7D1",
                  route: "/disciplines/gym",
                },
                {
                  icon: "flash",
                  name: "CrossFit",
                  level: "HIIT",
                  color: "#FFEAA7",
                  route: "/disciplines/gym",
                },
              ].map((discipline, index) => (
                <Animated.View
                  key={index}
                  style={{
                    transform: [
                      {
                        translateY: floatAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, index % 2 === 0 ? -3 : 3],
                        }),
                      },
                    ],
                  }}
                >
                  <TouchableOpacity
                    style={[
                      styles.disciplineCard,
                      {
                        backgroundColor: `${discipline.color}15`,
                        borderColor: `${discipline.color}30`,
                      },
                    ]}
                    onPress={() =>
                      router.push(discipline.route as unknown as any)
                    }
                    activeOpacity={0.8}
                  >
                    <Animated.View
                      style={{
                        transform: [
                          {
                            scale: pulseAnim.interpolate({
                              inputRange: [0, 1],
                              outputRange: [1, 1.1],
                            }),
                          },
                        ],
                      }}
                    >
                      <Ionicons
                        name={discipline.icon as unknown as any}
                        size={30}
                        color={discipline.color}
                      />
                    </Animated.View>

                    <Text style={styles.disciplineName}>{discipline.name}</Text>
                    <Text
                      style={[
                        styles.disciplineLevel,
                        { color: discipline.color },
                      ]}
                    >
                      {discipline.level}
                    </Text>
                  </TouchableOpacity>
                </Animated.View>
              ))}
            </ScrollView>
          </Animated.View>

          {/* Mensaje motivacional animado */}
          <Animated.View
            style={[
              styles.motivationSection,
              {
                opacity: fadeAnim,
                transform: [
                  {
                    translateY: slideAnim.interpolate({
                      inputRange: [0, 30],
                      outputRange: [0, 30],
                    }),
                  },
                  {
                    scale: pulseAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.02],
                    }),
                  },
                ],
              },
            ]}
          >
            <Animated.View
              style={{
                transform: [
                  {
                    rotate: rotationAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["0deg", "360deg"],
                    }),
                  },
                ],
              }}
            >
              <Ionicons name="flame" size={40} color={COLORS.neonBlue} />
            </Animated.View>

            <Animated.Text
              style={[
                styles.motivationText,
                {
                  textShadowRadius: glowAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [2, 8],
                  }),
                },
              ]}
            >
              &quot;La disciplina es el puente entre metas y logros&quot;
            </Animated.Text>

            <Text style={styles.motivationAuthor}>- Legacy Gym Philosophy</Text>
          </Animated.View>

          {/* Botón de acción principal con efectos */}
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [
                {
                  translateY: slideAnim.interpolate({
                    inputRange: [0, 30],
                    outputRange: [0, 30],
                  }),
                },
              ],
            }}
          >
            <TouchableOpacity
              style={styles.ctaButton}
              onPress={() => router.push("/disciplines/MenuPrincipal")}
              activeOpacity={0.7}
            >
              {/* Efecto de pulso en el botón */}
              <Animated.View
                style={[
                  styles.ctaGlow,
                  {
                    opacity: glowAnim,
                    transform: [
                      {
                        scale: glowAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0.8, 1.2],
                        }),
                      },
                    ],
                  },
                ]}
              />

              <Animated.View
                style={[
                  styles.ctaContent,
                  {
                    transform: [
                      {
                        scale: pulseAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [1, 1.05],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <Animated.View
                  style={{
                    transform: [
                      {
                        rotate: rotationAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: ["0deg", "360deg"],
                        }),
                      },
                    ],
                  }}
                >
                  <Ionicons
                    name="play-circle"
                    size={28}
                    color={COLORS.darkBlue}
                  />
                </Animated.View>

                <Text style={styles.ctaText}>COMENZAR ENTRENAMIENTO</Text>
              </Animated.View>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
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
  overlay: {
    ...StyleSheet.absoluteFillObject,
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
    marginTop: 30,
    marginBottom: 30,
    position: "relative",
  },
  titleGlow: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: COLORS.neonBlue,
    opacity: 0.3,
    filter: "blur(40px)",
    top: -80,
  },
  greeting: {
    color: COLORS.lightBlue,
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 2,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  title: {
    color: COLORS.neonBlue,
    fontSize: 42,
    fontWeight: "900",
    letterSpacing: 3,
    marginVertical: 10,
    textShadowColor: "rgba(0, 240, 255, 0.5)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  subtitle: {
    color: COLORS.white,
    fontSize: 16,
    textAlign: "center",
    opacity: 0.9,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  statCard: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(0, 240, 255, 0.08)",
    borderRadius: 20,
    padding: 15,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "rgba(0, 240, 255, 0.15)",
    shadowColor: COLORS.neonBlue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  statIconContainer: {
    marginBottom: 8,
  },
  statNumber: {
    color: COLORS.neonBlue,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
    textShadowColor: "rgba(0, 240, 255, 0.3)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  statLabel: {
    color: COLORS.lightBlue,
    fontSize: 12,
    textAlign: "center",
    fontWeight: "500",
  },
  cardsContainer: {
    marginBottom: 40,
  },
  mainCard: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 30,
    padding: 30,
    borderWidth: 2,
    borderColor: "rgba(0, 240, 255, 0.2)",
    shadowColor: COLORS.neonBlue,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
    position: "relative",
    overflow: "hidden",
  },
  cardBorder: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 30,
    borderWidth: 2,
    shadowColor: COLORS.neonBlue,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 15,
  },
  cardSecondary: {
    borderColor: "rgba(77, 168, 218, 0.3)",
  },
  cardIconContainer: {
    marginBottom: 20,
    alignItems: "center",
    position: "relative",
  },
  iconGlow: {
    position: "absolute",
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(0, 240, 255, 0.2)",
  },
  cardTitle: {
    color: COLORS.white,
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  cardDescription: {
    color: COLORS.lightBlue,
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 25,
    textAlign: "center",
    fontWeight: "400",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  exerciseCount: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  countText: {
    color: COLORS.lightBlue,
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 6,
  },
  cardActionText: {
    color: COLORS.neonBlue,
    fontSize: 16,
    fontWeight: "bold",
    textShadowColor: "rgba(0, 240, 255, 0.3)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
  disciplinesSection: {
    marginBottom: 40,
  },
  sectionTitle: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    letterSpacing: 1,
  },
  disciplinesScroll: {
    marginHorizontal: -5,
    paddingHorizontal: 5,
  },
  disciplineCard: {
    width: 140,
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 8,
    alignItems: "center",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
  },
  disciplineName: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 12,
    marginBottom: 4,
    textAlign: "center",
  },
  disciplineLevel: {
    fontSize: 12,
    textAlign: "center",
    fontWeight: "500",
  },
  motivationSection: {
    backgroundColor: "rgba(0, 240, 255, 0.05)",
    borderRadius: 30,
    padding: 30,
    alignItems: "center",
    marginBottom: 40,
    borderWidth: 1,
    borderColor: "rgba(0, 240, 255, 0.15)",
    shadowColor: COLORS.neonBlue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  motivationText: {
    color: COLORS.white,
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
    fontStyle: "italic",
    lineHeight: 26,
    fontWeight: "500",
    textShadowColor: "rgba(0, 240, 255, 0.3)",
    textShadowOffset: { width: 0, height: 0 },
  },
  motivationAuthor: {
    color: COLORS.lightBlue,
    fontSize: 14,
    textAlign: "center",
    fontWeight: "500",
  },
  ctaButton: {
    backgroundColor: COLORS.neonBlue,
    borderRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 30,
    shadowColor: COLORS.neonBlue,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 12,
    position: "relative",
    overflow: "hidden",
  },
  ctaGlow: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 30,
  },
  ctaContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  ctaText: {
    color: COLORS.darkBlue,
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 12,
    textAlign: "center",
  },
  particle: {
    position: "absolute",
    borderRadius: 50,
  },
});
