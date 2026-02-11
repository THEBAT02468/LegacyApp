import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  Easing,
  FadeIn,
  FadeInDown,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

const backgroundImage = require("@/assets/images/welcome-bg.jpeg");
const gymLogo = require("@/assets/images/legacy_logo.png");

const COLORS = {
  neonBlue: "#00F0FF",
  neonBlueLight: "#80F8FF",
  neonBluePulse: "rgba(0, 240, 255, 0.6)",
  darkBlue: "#050B14",
  deepBlue: "#0A1A2F",
  lightBlue: "#4DA8DA",
  white: "#FFFFFF",
  black: "#000000",
  gradientStart: "rgba(5, 11, 20, 0.95)",
  gradientEnd: "rgba(5, 11, 20, 0.6)",
};

export default function WelcomeScreen() {
  const router = useRouter();
  const scale = useSharedValue(1);

  // Valores para las rayas luminosas
  const topLineProgress = useSharedValue(0);
  const rightLineProgress = useSharedValue(0);
  const bottomLineProgress = useSharedValue(0);
  const leftLineProgress = useSharedValue(0);
  const lineOpacity = useSharedValue(1);

  useEffect(() => {
    // Animación secuencial de las rayas
    topLineProgress.value = withSequence(
      withTiming(1, { duration: 1200, easing: Easing.linear }),
      withTiming(0, { duration: 0 }),
    );

    setTimeout(() => {
      rightLineProgress.value = withSequence(
        withTiming(1, { duration: 1200, easing: Easing.linear }),
        withTiming(0, { duration: 0 }),
      );
    }, 300);

    setTimeout(() => {
      bottomLineProgress.value = withSequence(
        withTiming(1, { duration: 1200, easing: Easing.linear }),
        withTiming(0, { duration: 0 }),
      );
    }, 600);

    setTimeout(() => {
      leftLineProgress.value = withSequence(
        withTiming(1, { duration: 1200, easing: Easing.linear }),
        withTiming(0, { duration: 0 }),
      );
    }, 900);

    // Repetir toda la secuencia
    const interval = setInterval(() => {
      topLineProgress.value = withSequence(
        withTiming(1, { duration: 1200, easing: Easing.linear }),
        withTiming(0, { duration: 0 }),
      );

      setTimeout(() => {
        rightLineProgress.value = withSequence(
          withTiming(1, { duration: 1200, easing: Easing.linear }),
          withTiming(0, { duration: 0 }),
        );
      }, 300);

      setTimeout(() => {
        bottomLineProgress.value = withSequence(
          withTiming(1, { duration: 1200, easing: Easing.linear }),
          withTiming(0, { duration: 0 }),
        );
      }, 600);

      setTimeout(() => {
        leftLineProgress.value = withSequence(
          withTiming(1, { duration: 1200, easing: Easing.linear }),
          withTiming(0, { duration: 0 }),
        );
      }, 900);
    }, 4500); // Tiempo total del ciclo

    // Animación de pulso de opacidad
    lineOpacity.value = withRepeat(
      withSequence(
        withTiming(0.8, { duration: 1000 }),
        withTiming(1, { duration: 1000 }),
      ),
      -1,
      false,
    );

    return () => clearInterval(interval);
  }, [
    topLineProgress,
    rightLineProgress,
    bottomLineProgress,
    leftLineProgress,
    lineOpacity,
  ]);

  const handlePress = () => {
    scale.value = withSequence(
      withTiming(0.95, { duration: 100 }),
      withSpring(1, { damping: 10 }),
    );

    setTimeout(() => {
      router.push("/home");
    }, 200);
  };

  const animatedButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  // Estilos animados para las rayas
  const topLineStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: topLineProgress.value * (width + 100) - 100 }],
    opacity: lineOpacity.value,
  }));

  const rightLineStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: rightLineProgress.value * (height + 100) - 100 }],
    opacity: lineOpacity.value,
  }));

  const bottomLineStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: -bottomLineProgress.value * (width + 100) + 100 },
    ],
    opacity: lineOpacity.value,
  }));

  const leftLineStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: -leftLineProgress.value * (height + 100) + 100 }],
    opacity: lineOpacity.value,
  }));

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <LinearGradient
        colors={[COLORS.gradientStart, COLORS.gradientEnd]}
        style={styles.gradientOverlay}
      />

      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      {/* Rayas luminosas en los bordes */}

      {/* Raya superior */}
      <Animated.View style={[styles.edgeLine, styles.topLine, topLineStyle]}>
        <LinearGradient
          colors={[
            "transparent",
            COLORS.neonBlue,
            COLORS.neonBlueLight,
            COLORS.neonBlue,
            "transparent",
          ]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.lineGradient}
        />
      </Animated.View>

      {/* Raya derecha */}
      <Animated.View
        style={[styles.edgeLine, styles.rightLine, rightLineStyle]}
      >
        <LinearGradient
          colors={[
            "transparent",
            COLORS.neonBlue,
            COLORS.neonBlueLight,
            COLORS.neonBlue,
            "transparent",
          ]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.lineGradient}
        />
      </Animated.View>

      {/* Raya inferior */}
      <Animated.View
        style={[styles.edgeLine, styles.bottomLine, bottomLineStyle]}
      >
        <LinearGradient
          colors={[
            "transparent",
            COLORS.neonBlue,
            COLORS.neonBlueLight,
            COLORS.neonBlue,
            "transparent",
          ]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.lineGradient}
        />
      </Animated.View>

      {/* Raya izquierda */}
      <Animated.View style={[styles.edgeLine, styles.leftLine, leftLineStyle]}>
        <LinearGradient
          colors={[
            "transparent",
            COLORS.neonBlue,
            COLORS.neonBlueLight,
            COLORS.neonBlue,
            "transparent",
          ]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.lineGradient}
        />
      </Animated.View>

      {/* Esquinas con efecto */}
      <View style={[styles.cornerDot, styles.cornerTopLeft]} />
      <View style={[styles.cornerDot, styles.cornerTopRight]} />
      <View style={[styles.cornerDot, styles.cornerBottomLeft]} />
      <View style={[styles.cornerDot, styles.cornerBottomRight]} />

      <View style={styles.container}>
        <Animated.View
          style={styles.logoContainer}
          entering={FadeInDown.duration(800).delay(200)}
        >
          <Image
            source={gymLogo}
            style={styles.logoImage}
            resizeMode="contain"
          />
          <View style={styles.divider} />
          <Text style={styles.logoSubtitle}>LEGACY GYM • EST. 2024</Text>
        </Animated.View>

        <Animated.View
          style={styles.content}
          entering={FadeIn.duration(1000).delay(400)}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.titlePrefix}>WELCOME TO</Text>
            <Text style={styles.title}>
              LEGACY<Text style={{ color: COLORS.white }}> GYM</Text>
            </Text>
          </View>

          <View style={styles.textWrapper}>
            <Animated.Text
              style={styles.subtitle}
              entering={FadeInUp.duration(800).delay(600)}
            >
              FORJA TU LEGADO
            </Animated.Text>

            <Animated.Text
              style={styles.highlight}
              entering={FadeInUp.duration(800).delay(700)}
            >
              SUPERAR LÍMITES ES NUESTRA TRADICIÓN
            </Animated.Text>

            <Animated.Text
              style={styles.description}
              entering={FadeInUp.duration(800).delay(800)}
            >
              Transforma tu cuerpo, fortalece tu mente.{"\n"}
              Donde cada entrenamiento es un paso hacia{"\n"}
              la mejor versión de ti mismo.
            </Animated.Text>
          </View>
        </Animated.View>

        <Animated.View
          style={styles.footer}
          entering={FadeInUp.duration(800).delay(1000)}
        >
          <Animated.View style={animatedButtonStyle}>
            <TouchableOpacity
              style={styles.button}
              onPress={handlePress}
              activeOpacity={0.9}
            >
              <View style={styles.glowEffect} />

              <LinearGradient
                colors={[COLORS.neonBlue, "#00B4D8", COLORS.neonBlue]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientButton}
              >
                <View style={styles.buttonContent}>
                  <Text style={styles.buttonText}>COMENZAR MI LEGADO</Text>
                  <View style={styles.buttonIcon}>
                    <Text style={styles.arrow}>→</Text>
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>150+</Text>
              <Text style={styles.statLabel}>Miembros</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>10+</Text>
              <Text style={styles.statLabel}>Disciplinas</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>24/7</Text>
              <Text style={styles.statLabel}>Entrenamiento</Text>
            </View>
          </View>

          <Text style={styles.versionText}>Legacy Gym App v1.0</Text>
        </Animated.View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 30,
    paddingTop: StatusBar.currentHeight || 40,
  },
  // Estilos para las rayas de borde
  edgeLine: {
    position: "absolute",
    zIndex: 1,
    overflow: "hidden",
  },
  topLine: {
    top: 0,
    left: -100,
    width: width + 200,
    height: 2,
  },
  rightLine: {
    top: -100,
    right: 0,
    width: 2,
    height: height + 200,
  },
  bottomLine: {
    bottom: 0,
    left: -100,
    width: width + 200,
    height: 2,
  },
  leftLine: {
    top: -100,
    left: 0,
    width: 2,
    height: height + 200,
  },
  lineGradient: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  // Puntos en las esquinas
  cornerDot: {
    position: "absolute",
    width: 8,
    height: 8,
    backgroundColor: COLORS.neonBlue,
    borderRadius: 4,
    zIndex: 2,
    shadowColor: COLORS.neonBlue,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  cornerTopLeft: {
    top: 15,
    left: 15,
  },
  cornerTopRight: {
    top: 15,
    right: 15,
  },
  cornerBottomLeft: {
    bottom: 15,
    left: 15,
  },
  cornerBottomRight: {
    bottom: 15,
    right: 15,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: height * 0.08,
  },
  logoImage: {
    width: width * 0.7,
    height: 80,
    marginBottom: 10,
    shadowColor: COLORS.neonBlue,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  divider: {
    width: 60,
    height: 2,
    backgroundColor: COLORS.neonBlue,
    marginVertical: 12,
    borderRadius: 1,
    opacity: 0.8,
    shadowColor: COLORS.neonBlue,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  logoSubtitle: {
    color: COLORS.lightBlue,
    fontSize: 11,
    letterSpacing: 2,
    fontWeight: "500",
    opacity: 0.9,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  titlePrefix: {
    color: COLORS.lightBlue,
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 3,
    marginBottom: 5,
    opacity: 0.8,
  },
  title: {
    color: COLORS.neonBlue,
    fontSize: 48,
    fontWeight: "900",
    letterSpacing: -0.5,
    textShadowColor: "rgba(0, 240, 255, 0.3)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  textWrapper: {
    alignItems: "center",
    maxWidth: 320,
  },
  subtitle: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "300",
    letterSpacing: 1,
    textAlign: "center",
    lineHeight: 28,
    marginBottom: 10,
  },
  highlight: {
    color: COLORS.neonBlue,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 32,
    marginBottom: 25,
    textShadowColor: "rgba(0, 240, 255, 0.2)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
  description: {
    color: COLORS.lightBlue,
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
    opacity: 0.9,
    fontWeight: "400",
  },
  footer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 40,
  },
  button: {
    width: "100%",
    height: 65,
    borderRadius: 18,
    overflow: "visible",
    shadowColor: COLORS.neonBlue,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 25,
    elevation: 20,
    marginBottom: 30,
  },
  gradientButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    borderWidth: 2,
    borderColor: COLORS.neonBlue,
    borderRadius: 16,
    shadowColor: COLORS.neonBlue,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 15,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  buttonText: {
    color: COLORS.darkBlue,
    fontSize: 17,
    fontWeight: "800",
    letterSpacing: 1.2,
  },
  buttonIcon: {
    marginLeft: 10,
    backgroundColor: COLORS.darkBlue,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.8,
  },
  arrow: {
    color: COLORS.neonBlue,
    fontSize: 16,
    fontWeight: "bold",
  },
  glowEffect: {
    position: "absolute",
    top: -8,
    left: -8,
    right: -8,
    bottom: -8,
    backgroundColor: "transparent",
    borderColor: COLORS.neonBlue,
    borderWidth: 1,
    borderRadius: 20,
    opacity: 0.5,
    zIndex: 0,
    shadowColor: COLORS.neonBlue,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(0, 240, 255, 0.1)",
  },
  statItem: {
    alignItems: "center",
    paddingHorizontal: 15,
  },
  statNumber: {
    color: COLORS.neonBlue,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  statLabel: {
    color: COLORS.lightBlue,
    fontSize: 11,
    fontWeight: "500",
  },
  statDivider: {
    width: 1,
    height: 25,
    backgroundColor: "rgba(77, 168, 218, 0.2)",
  },
  versionText: {
    color: COLORS.white,
    fontSize: 11,
    opacity: 0.3,
    letterSpacing: 0.5,
  },
});
