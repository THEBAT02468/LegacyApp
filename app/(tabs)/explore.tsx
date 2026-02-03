import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";

import { ExternalLink } from "@/components/external-link";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Collapsible } from "@/components/ui/collapsible";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";

// Colores para Legacy Gym
const COLORS = {
  neonBlue: "#00F0FF",
  darkBlue: "#0A1A2F",
  lightBlue: "#4DA8DA",
  black: "#000000",
  white: "#FFFFFF",
};

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: COLORS.darkBlue, dark: COLORS.darkBlue }}
      headerImage={
        <View style={styles.headerImageContainer}>
          <IconSymbol
            size={310}
            color={COLORS.neonBlue}
            name="dumbbell.fill"
            style={styles.headerImage}
          />
        </View>
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
            color: COLORS.neonBlue,
          }}
        >
          EXPLORAR LEGACY
        </ThemedText>
      </ThemedView>

      <ThemedText style={styles.welcomeText}>
        Bienvenido a tu centro de entrenamiento premium. Explora todas las
        funcionalidades diseñadas para optimizar tu rendimiento.
      </ThemedText>

      {/* Sección: Programas de Entrenamiento */}
      <Collapsible title="🏋️ PROGRAMAS DE ENTRENAMIENTO">
        <ThemedView style={styles.programCard}>
          <ThemedText type="defaultSemiBold" style={styles.programTitle}>
            Fuerza y Potencia
          </ThemedText>
          <ThemedText style={styles.programDescription}>
            Programa de 12 semanas enfocado en ganancias de fuerza máxima y
            potencia explosiva.
          </ThemedText>
          <ThemedText style={styles.programDetails}>
            • 4 días por semana{"\n"}• Enfoque en ejercicios compuestos{"\n"}•
            Progresión lineal
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.programCard}>
          <ThemedText type="defaultSemiBold" style={styles.programTitle}>
            Hipertrofia Definición
          </ThemedText>
          <ThemedText style={styles.programDescription}>
            Rutina para ganancia muscular con definición máxima.
          </ThemedText>
          <ThemedText style={styles.programDetails}>
            • 5 días por semana{"\n"}• División por grupos musculares{"\n"}•
            Alto volumen de entrenamiento
          </ThemedText>
        </ThemedView>
      </Collapsible>

      {/* Sección: Instalaciones */}
      <Collapsible title="🏢 NUESTRAS INSTALACIONES">
        <ThemedView style={styles.facilityCard}>
          <Image
            source={require("@/assets/images/gym-area.jpg")}
            style={styles.facilityImage}
            contentFit="cover"
          />
          <ThemedView style={styles.facilityInfo}>
            <ThemedText type="defaultSemiBold" style={styles.facilityTitle}>
              Zona de Pesas Libre
            </ThemedText>
            <ThemedText style={styles.facilityDescription}>
              Más de 50 máquinas de última generación y zona de peso libre
              equipada con barras olímpicas y discos.
            </ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.facilityCard}>
          <ThemedText type="defaultSemiBold" style={styles.facilityTitle}>
            Horarios de Operación
          </ThemedText>
          <ThemedText style={styles.facilityDescription}>
            Lunes a Viernes: 5:00 AM - 11:00 PM{"\n"}
            Sábados: 6:00 AM - 10:00 PM{"\n"}
            Domingos: 7:00 AM - 9:00 PM
          </ThemedText>
        </ThemedView>
      </Collapsible>

      {/* Sección: Entrenadores */}
      <Collapsible title="👥 ENTRENADORES CERTIFICADOS">
        <ThemedView style={styles.trainerCard}>
          <View style={styles.trainerAvatar}>
            <IconSymbol
              size={60}
              color={COLORS.neonBlue}
              name="person.circle.fill"
            />
          </View>
          <ThemedView style={styles.trainerInfo}>
            <ThemedText type="defaultSemiBold" style={styles.trainerName}>
              Carlos Rodríguez
            </ThemedText>
            <ThemedText style={styles.trainerSpecialty}>
              Especialista en Powerlifting
            </ThemedText>
            <ThemedText style={styles.trainerBio}>
              Certificado NSCA, 10 años de experiencia en entrenamiento de
              fuerza.
            </ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.trainerCard}>
          <View style={styles.trainerAvatar}>
            <IconSymbol
              size={60}
              color={COLORS.lightBlue}
              name="person.circle.fill"
            />
          </View>
          <ThemedView style={styles.trainerInfo}>
            <ThemedText type="defaultSemiBold" style={styles.trainerName}>
              Ana Martínez
            </ThemedText>
            <ThemedText style={styles.trainerSpecialty}>
              Nutrición Deportiva
            </ThemedText>
            <ThemedText style={styles.trainerBio}>
              Licenciada en Nutrición, especialista en suplementación deportiva.
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </Collapsible>

      {/* Sección: Eventos */}
      <Collapsible title="📅 EVENTOS Y COMPETICIONES">
        <ThemedView style={styles.eventCard}>
          <ThemedText type="defaultSemiBold" style={styles.eventTitle}>
            🏆 Torneo Legacy Powerlifting
          </ThemedText>
          <ThemedText style={styles.eventDate}>
            15 de Diciembre, 2024 • 9:00 AM
          </ThemedText>
          <ThemedText style={styles.eventDescription}>
            Competición interna de powerlifting para todos los niveles.
            Inscripciones abiertas.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.eventCard}>
          <ThemedText type="defaultSemiBold" style={styles.eventTitle}>
            🧘‍♀️ Clase Especial de Mobility
          </ThemedText>
          <ThemedText style={styles.eventDate}>
            Cada Sábado • 10:00 AM
          </ThemedText>
          <ThemedText style={styles.eventDescription}>
            Sesiones gratuitas de movilidad y flexibilidad para mejorar tu rango
            de movimiento.
          </ThemedText>
        </ThemedView>
      </Collapsible>

      {/* Sección: App Features */}
      <Collapsible title="📱 FUNCIONALIDADES DE LA APP">
        <ThemedText style={styles.featureItem}>
          ✅{" "}
          <ThemedText type="defaultSemiBold">
            Seguimiento de Progreso:
          </ThemedText>{" "}
          Registra tus PRs y evolución
        </ThemedText>
        <ThemedText style={styles.featureItem}>
          ✅{" "}
          <ThemedText type="defaultSemiBold">
            Rutinas Personalizadas:
          </ThemedText>{" "}
          Crea y guarda tus rutinas
        </ThemedText>
        <ThemedText style={styles.featureItem}>
          ✅ <ThemedText type="defaultSemiBold">Timer de Descanso:</ThemedText>{" "}
          Temporizador integrado para series
        </ThemedText>
        <ThemedText style={styles.featureItem}>
          ✅ <ThemedText type="defaultSemiBold">Calculadoras:</ThemedText> 1RM,
          calorías, macros y más
        </ThemedText>
      </Collapsible>

      {/* Sección: Contacto */}
      <ThemedView style={styles.contactSection}>
        <ThemedText type="defaultSemiBold" style={styles.contactTitle}>
          📍 CONTÁCTANOS
        </ThemedText>
        <ThemedText style={styles.contactInfo}>
          Calle del Deporte, 123{"\n"}
          Ciudad Fitness{"\n"}
          Tel: (123) 456-7890{"\n"}
          Email: info@legacygym.com
        </ThemedText>

        <ExternalLink href="https://legacygym.com">
          <ThemedText type="link" style={styles.websiteLink}>
            Visita nuestro sitio web
          </ThemedText>
        </ExternalLink>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImageContainer: {
    position: "absolute",
    bottom: -90,
    left: -35,
  },
  headerImage: {
    opacity: 0.8,
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 20,
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 30,
    textAlign: "center",
  },
  collapsibleTitle: {
    color: COLORS.neonBlue,
    fontSize: 18,
    fontWeight: "bold",
  },
  programCard: {
    backgroundColor: "rgba(0, 240, 255, 0.05)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(0, 240, 255, 0.1)",
  },
  programTitle: {
    color: COLORS.neonBlue,
    fontSize: 16,
    marginBottom: 8,
  },
  programDescription: {
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 20,
  },
  programDetails: {
    fontSize: 13,
    color: COLORS.lightBlue,
    lineHeight: 20,
  },
  facilityCard: {
    backgroundColor: "rgba(77, 168, 218, 0.05)",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
  },
  facilityImage: {
    width: "100%",
    height: 150,
  },
  facilityInfo: {
    padding: 16,
  },
  facilityTitle: {
    color: COLORS.lightBlue,
    fontSize: 16,
    marginBottom: 8,
  },
  facilityDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  trainerCard: {
    flexDirection: "row",
    backgroundColor: "rgba(10, 26, 47, 0.3)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: "center",
  },
  trainerAvatar: {
    marginRight: 16,
  },
  trainerInfo: {
    flex: 1,
  },
  trainerName: {
    color: COLORS.white,
    fontSize: 16,
    marginBottom: 4,
  },
  trainerSpecialty: {
    color: COLORS.neonBlue,
    fontSize: 14,
    marginBottom: 4,
  },
  trainerBio: {
    fontSize: 13,
    color: COLORS.lightBlue,
    lineHeight: 18,
  },
  eventCard: {
    backgroundColor: "rgba(0, 240, 255, 0.05)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.neonBlue,
  },
  eventTitle: {
    color: COLORS.white,
    fontSize: 16,
    marginBottom: 4,
  },
  eventDate: {
    color: COLORS.neonBlue,
    fontSize: 14,
    marginBottom: 8,
  },
  eventDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  featureItem: {
    fontSize: 14,
    marginBottom: 12,
    lineHeight: 22,
  },
  contactSection: {
    backgroundColor: "rgba(10, 26, 47, 0.5)",
    borderRadius: 16,
    padding: 24,
    marginTop: 20,
    marginBottom: 40,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(0, 240, 255, 0.1)",
  },
  contactTitle: {
    color: COLORS.neonBlue,
    fontSize: 20,
    marginBottom: 16,
    textAlign: "center",
  },
  contactInfo: {
    fontSize: 15,
    lineHeight: 24,
    textAlign: "center",
    marginBottom: 20,
    color: COLORS.lightBlue,
  },
  websiteLink: {
    color: COLORS.neonBlue,
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
