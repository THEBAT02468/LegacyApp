import React from "react";
import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View, Dimensions, StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

const gymLogo = require("@/assets/images/legacy_logo.png");

const COLORS = {
  neonBlue: "#00F0FF",
  darkBlue: "#050B14", // Un azul casi negro para más elegancia
  deepBlue: "#0A1A2F",
  lightBlue: "#4DA8DA",
  white: "#FFFFFF",
};

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Fondo con Gradiente para dar profundidad */}
      <LinearGradient
        colors={[COLORS.darkBlue, COLORS.deepBlue, COLORS.darkBlue]}
        style={styles.background}
      />

      <View style={styles.logoContainer}>
        <Image source={gymLogo} style={styles.logoImage} resizeMode="contain" />
        <View style={styles.divider} />
        <Text style={styles.logoSubtitle}>EST. 2025</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>LEGACY<Text style={{color: COLORS.white}}> GYM</Text></Text>
        
        <View style={styles.textWrapper}>
          <Text style={styles.subtitle}>
            Forja tu legado{"\n"}
            <Text style={styles.highlight}>SUPERA TUS LÍMITES</Text>
          </Text>
          
          <Text style={styles.description}>
            Transforma tu cuerpo, fortalece tu mente.{"\n"}
            El entrenamiento que define tu legado.
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/home")}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={[COLORS.neonBlue, "#00B4D8"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientButton}
          >
            <Text style={styles.buttonText}>COMENZAR MI LEGADO</Text>
          </LinearGradient>
        </TouchableOpacity>
        
        <Text style={styles.versionText}>v1.0.0</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 30,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: height,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: height * 0.1,
  },
  logoImage: {
    width: width * 0.5,
    height: 100,
  },
  divider: {
    width: 40,
    height: 2,
    backgroundColor: COLORS.neonBlue,
    marginVertical: 8,
  },
  logoSubtitle: {
    color: COLORS.white,
    fontSize: 10,
    letterSpacing: 4,
    opacity: 0.7,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: COLORS.neonBlue,
    fontSize: 42,
    fontWeight: "900",
    letterSpacing: -1,
    marginBottom: 10,
    textAlign: "center",
  },
  textWrapper: {
    marginTop: 20,
    alignItems: 'center',
  },
  subtitle: {
    color: COLORS.white,
    fontSize: 22,
    textAlign: "center",
    fontWeight: "300",
    lineHeight: 28,
  },
  highlight: {
    color: COLORS.neonBlue,
    fontWeight: "bold",
    fontSize: 24,
  },
  description: {
    color: COLORS.lightBlue,
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
    marginTop: 25,
    opacity: 0.8,
  },
  footer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 40,
  },
  button: {
    width: "100%",
    height: 60,
    borderRadius: 15,
    overflow: "hidden", // Para que el gradiente respete el borderRadius
    elevation: 10,
    shadowColor: COLORS.neonBlue,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
  },
  gradientButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: COLORS.darkBlue,
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 1.5,
  },
  versionText: {
    color: COLORS.white,
    fontSize: 10,
    marginTop: 20,
    opacity: 0.3,
  },
});