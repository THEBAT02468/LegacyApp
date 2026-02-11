import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import {
  Animated,
  FlatList,
  Image,
  ImageBackground,
  Linking,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Agrega tu imagen de fondo aquí:
const backgroundImage = require("@/assets/images/gym-bg.jpeg");

const COLORS = {
  neonBlue: "#00F0FF",
  neonBlueLight: "#80F8FF",
  darkBlue: "#0A1A2F",
  lightBlue: "#4DA8DA",
  white: "#FFFFFF",
  black: "#000000",
  gray: "#8E8E93",
  cardBg: "rgba(255, 255, 255, 0.05)",
  gradientStart: "rgba(10, 26, 47, 0.95)",
  gradientEnd: "rgba(10, 26, 47, 0.7)",
};

const INSTRUCTORS = [
  {
    id: "1",
    name: "CARLOS RODRÍGUEZ",
    specialty: "POWERLIFTING & FUERZA",
    bio: "Entrenador certificado NSCA con 12 años de experiencia. Especialista en programación de fuerza máxima y técnica olímpica. Campeón nacional de powerlifting 2022.",
    experience: "12 años",
    certifications: [
      "NSCA-CPT",
      "ISSA Strength Coach",
      "Olympic Lifting Lvl 3",
    ],
    instagram: "@juliandav_sw",
    instagram_url: "https://www.instagram.com/juliandav_sw/",
    whatsapp:
      "https://wa.me/5491234567890?text=Hola%20Carlos,%20me%20gustaría%20recibir%20instrucción%20en%20powerlifting",
    image: require("../assets/images/Instructor1.jpg"),
    color: "#FF6B6B", // Rojo para powerlifting
  },
  {
    id: "2",
    name: "ANA MARTÍNEZ",
    specialty: "HIIT & CONDICIONAMIENTO",
    bio: 'Especialista en entrenamiento metabólico y acondicionamiento. Certificada en nutrición deportiva. Creadora del programa "Metabolic Burn" aplicado en Legacy Gym.',
    experience: "8 años",
    certifications: [
      "ACE Certified",
      "Precision Nutrition Lvl 2",
      "CrossFit Lvl 3",
    ],
    instagram: "@ana_hiitfit",
    instagram_url: "https://instagram.com/ana_hiitfit",
    whatsapp:
      "https://wa.me/5491234567890?text=Hola%20Ana,%20me%20gustaría%20recibir%20instrucción%20en%20HIIT",
    image: require("../assets/images/Main.jpeg"),
    color: "#4ECDC4", // Turquesa para HIIT
  },
  {
    id: "3",
    name: "DAVID CHEN",
    specialty: "CALISTENIA AVANZADA",
    bio: "Especialista en entrenamiento con peso corporal y movilidad. Coach certificado en calistenia avanzada. Campeón regional de street workout 2023.",
    experience: "6 años",
    certifications: ["Calisthenics Academy", "Functional Patterns"],
    instagram: "@david_calisthenics",
    instagram_url: "https://instagram.com/david_calisthenics",
    whatsapp:
      "https://wa.me/5491234567890?text=Hola%20David,%20me%20gustaría%20recibir%20instrucción%20en%20calistenia",
    image: require("../assets/images/Instructor1.jpg"),
    color: "#45B7D1", // Azul para calistenia
  },
  {
    id: "4",
    name: "SOFÍA RAMÍREZ",
    specialty: "YOGA & MOVILIDAD",
    bio: "Instructora certificada en yoga terapéutico y movilidad funcional. Especialista en recuperación activa y prevención de lesiones.",
    experience: "10 años",
    certifications: ["RYT 500", "Yoga Therapy Certified"],
    instagram: "@sofia_yogalegacy",
    instagram_url: "https://instagram.com/sofia_yogalegacy",
    whatsapp:
      "https://wa.me/5491234567890?text=Hola%20Sofía,%20me%20gustaría%20recibir%20instrucción%20en%20yoga",
    image: require("../assets/images/Main.jpeg"),
    color: "#96CEB4", // Verde para yoga
  },
];

export default function Instructors() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
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
  }, [fadeAnim, slideAnim]);

  // 👉 DETALLE DEL INSTRUCTOR
  if (id) {
    const instructor = INSTRUCTORS.find((i) => i.id === id);

    if (!instructor) {
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
          <View style={styles.errorContainer}>
            <Animated.View style={{ opacity: fadeAnim }}>
              <Ionicons name="alert-circle" size={60} color={COLORS.neonBlue} />
              <Text style={styles.errorText}>Instructor no encontrado</Text>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.back()}
              >
                <Text style={styles.backButtonText}>← Volver</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </ImageBackground>
      );
    }

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
          <ScrollView
            style={styles.detailContainer}
            showsVerticalScrollIndicator={false}
          >
            {/* Header con imagen */}
            <View style={styles.detailHeader}>
              <Image
                source={instructor.image}
                style={styles.detailImage}
                resizeMode="cover"
              />

              <LinearGradient
                colors={["transparent", COLORS.darkBlue]}
                style={styles.imageGradient}
              />

              <TouchableOpacity
                style={styles.backButtonDetail}
                onPress={() => router.back()}
              >
                <Ionicons name="arrow-back" size={24} color={COLORS.white} />
              </TouchableOpacity>

              <View style={styles.headerOverlay}>
                <Text style={styles.detailName}>{instructor.name}</Text>
                <Text style={styles.detailSpecialty}>
                  {instructor.specialty}
                </Text>
              </View>
            </View>

            {/* Información del instructor */}
            <Animated.View
              style={[
                styles.detailContent,
                { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
              ]}
            >
              {/* Estadísticas */}
              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <View
                    style={[
                      styles.statIcon,
                      { backgroundColor: instructor.color + "20" },
                    ]}
                  >
                    <Ionicons name="time" size={20} color={instructor.color} />
                  </View>
                  <Text style={styles.statValue}>{instructor.experience}</Text>
                  <Text style={styles.statLabel}>Experiencia</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <View
                    style={[
                      styles.statIcon,
                      { backgroundColor: instructor.color + "20" },
                    ]}
                  >
                    <Ionicons
                      name="ribbon"
                      size={20}
                      color={instructor.color}
                    />
                  </View>
                  <Text style={styles.statValue}>
                    {instructor.certifications.length}
                  </Text>
                  <Text style={styles.statLabel}>Certificaciones</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <View
                    style={[
                      styles.statIcon,
                      { backgroundColor: instructor.color + "20" },
                    ]}
                  >
                    <Ionicons name="flame" size={20} color={instructor.color} />
                  </View>
                  <Text style={styles.statValue}>24+</Text>
                  <Text style={styles.statLabel}>Clases/mes</Text>
                </View>
              </View>

              {/* Biografía */}
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Ionicons
                    name="document-text"
                    size={22}
                    color={COLORS.neonBlue}
                  />
                  <Text style={styles.sectionTitle}>BIOGRAFÍA</Text>
                </View>
                <Text style={styles.detailBio}>{instructor.bio}</Text>
              </View>

              {/* Certificaciones */}
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Ionicons name="school" size={22} color={COLORS.neonBlue} />
                  <Text style={styles.sectionTitle}>CERTIFICACIONES</Text>
                </View>
                {instructor.certifications.map((cert, index) => (
                  <View key={index} style={styles.certificationItem}>
                    <View
                      style={[
                        styles.certIcon,
                        { backgroundColor: instructor.color + "15" },
                      ]}
                    >
                      <Ionicons
                        name="checkmark-circle"
                        size={18}
                        color={instructor.color}
                      />
                    </View>
                    <Text style={styles.certificationText}>{cert}</Text>
                  </View>
                ))}
              </View>

              {/* Redes sociales */}
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Ionicons
                    name="share-social"
                    size={22}
                    color={COLORS.neonBlue}
                  />
                  <Text style={styles.sectionTitle}>CONÉCTATE</Text>
                </View>
                <TouchableOpacity
                  style={styles.socialButton}
                  onPress={() => {
                    if (instructor.instagram_url) {
                      Linking.openURL(instructor.instagram_url);
                    }
                  }}
                >
                  <View style={styles.socialIcon}>
                    <Ionicons
                      name="logo-instagram"
                      size={24}
                      color={COLORS.white}
                    />
                  </View>
                  <View style={styles.socialTextContainer}>
                    <Text style={styles.socialPlatform}>Instagram</Text>
                    <Text style={styles.socialHandle}>
                      {instructor.instagram}
                    </Text>
                  </View>
                  <Ionicons
                    name="open-outline"
                    size={20}
                    color={COLORS.lightBlue}
                  />
                </TouchableOpacity>
              </View>

              {/* Horarios de clase */}
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Ionicons name="logo-whatsapp" size={22} color="#25D366" />
                  <Text style={styles.sectionTitle}>
                    ¿QUIERES QUE TE INSTRUYA? ¡CONTÁCTAME!
                  </Text>
                </View>
                <TouchableOpacity
                  style={[
                    styles.contactButton,
                    { borderColor: COLORS.neonBlue },
                  ]}
                  onPress={() => {
                    if (instructor.whatsapp) {
                      Linking.openURL(instructor.whatsapp);
                    }
                  }}
                >
                  <Ionicons name="logo-whatsapp" size={24} color="#25D366" />
                  <Text
                    style={[
                      styles.contactButtonText,
                      { color: COLORS.neonBlue },
                    ]}
                  >
                    Enviar mensaje por WhatsApp
                  </Text>
                  <Ionicons
                    name="open-outline"
                    size={18}
                    color={COLORS.neonBlue}
                  />
                </TouchableOpacity>
              </View>
            </Animated.View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    );
  }

  // 👉 LISTA DE INSTRUCTORES
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
        <Animated.View
          style={[
            styles.container,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>ENTRENADORES</Text>
            <Text style={styles.headerSubtitle}>
              Entrena con los mejores expertos certificados de Legacy Gym
            </Text>
            <View style={styles.headerStats}>
              <View style={styles.headerStat}>
                <Text style={styles.headerStatNumber}>
                  {INSTRUCTORS.length}
                </Text>
                <Text style={styles.headerStatLabel}>Instructores</Text>
              </View>
              <View style={styles.headerStat}>
                <Text style={styles.headerStatNumber}>50+</Text>
                <Text style={styles.headerStatLabel}>Años totales</Text>
              </View>
              <View style={styles.headerStat}>
                <Text style={styles.headerStatNumber}>24/7</Text>
                <Text style={styles.headerStatLabel}>Disponibilidad</Text>
              </View>
            </View>
          </View>

          {/* Lista de instructores */}
          <FlatList
            data={INSTRUCTORS}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.card}
                onPress={() => router.push(`/instructors?id=${item.id}`)}
                activeOpacity={0.8}
              >
                <View style={styles.cardImageContainer}>
                  <Image
                    source={item.image}
                    style={styles.cardImage}
                    resizeMode="cover"
                  />
                  <LinearGradient
                    colors={["transparent", "rgba(0,0,0,0.7)"]}
                    style={styles.cardImageGradient}
                  />
                  <View
                    style={[
                      styles.specialtyBadge,
                      { backgroundColor: item.color + "30" },
                    ]}
                  >
                    <Text
                      style={[styles.specialtyBadgeText, { color: item.color }]}
                    >
                      {item.specialty.split(" & ")[0]}
                    </Text>
                  </View>
                </View>

                <View style={styles.cardContent}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.cardName}>{item.name}</Text>
                    <MaterialCommunityIcons
                      name="chevron-right"
                      size={24}
                      color={COLORS.neonBlue}
                    />
                  </View>

                  <View style={styles.cardDetails}>
                    <View style={styles.experienceBadge}>
                      <Ionicons
                        name="time"
                        size={14}
                        color={COLORS.lightBlue}
                      />
                      <Text style={styles.experienceText}>
                        {item.experience}
                      </Text>
                    </View>

                    <View style={styles.certCount}>
                      <Ionicons
                        name="ribbon"
                        size={14}
                        color={COLORS.lightBlue}
                      />
                      <Text style={styles.certText}>
                        {item.certifications.length} certs
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.cardSpecialty}>{item.specialty}</Text>

                  <View style={styles.cardTags}>
                    {item.certifications.slice(0, 2).map((cert, index) => (
                      <View
                        key={index}
                        style={[
                          styles.tag,
                          { backgroundColor: item.color + "15" },
                        ]}
                      >
                        <Text style={[styles.tagText, { color: item.color }]}>
                          {cert.split(" ")[0]}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </Animated.View>
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
    paddingHorizontal: 20,
  },
  header: {
    paddingVertical: 30,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: "900",
    color: COLORS.neonBlue,
    letterSpacing: 2,
    marginBottom: 10,
    textShadowColor: "rgba(0, 240, 255, 0.3)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  headerSubtitle: {
    fontSize: 16,
    color: COLORS.lightBlue,
    textAlign: "center",
    maxWidth: 300,
    marginBottom: 25,
  },
  headerStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "rgba(0, 240, 255, 0.05)",
    borderRadius: 20,
    padding: 20,
    width: "100%",
    borderWidth: 1,
    borderColor: "rgba(0, 240, 255, 0.1)",
  },
  headerStat: {
    alignItems: "center",
    flex: 1,
  },
  headerStatNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.neonBlue,
    marginBottom: 5,
  },
  headerStatLabel: {
    fontSize: 12,
    color: COLORS.lightBlue,
    textAlign: "center",
  },
  listContent: {
    paddingBottom: 30,
  },
  card: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 25,
    marginBottom: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(0, 240, 255, 0.15)",
    shadowColor: COLORS.neonBlue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  cardImageContainer: {
    height: 200,
    position: "relative",
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },
  cardImageGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  specialtyBadge: {
    position: "absolute",
    bottom: 15,
    left: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  specialtyBadgeText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  cardContent: {
    padding: 20,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  cardName: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.white,
    flex: 1,
  },
  cardDetails: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 12,
  },
  experienceBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(77, 168, 218, 0.1)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  experienceText: {
    fontSize: 12,
    color: COLORS.lightBlue,
    marginLeft: 5,
    fontWeight: "600",
  },
  certCount: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 240, 255, 0.1)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  certText: {
    fontSize: 12,
    color: COLORS.neonBlue,
    marginLeft: 5,
    fontWeight: "600",
  },
  cardSpecialty: {
    fontSize: 16,
    color: COLORS.neonBlue,
    marginBottom: 15,
    fontWeight: "600",
  },
  cardTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  tagText: {
    fontSize: 11,
    fontWeight: "600",
  },
  // Detalle del instructor
  detailContainer: {
    flex: 1,
  },
  detailHeader: {
    height: 350,
    position: "relative",
  },
  detailImage: {
    width: "100%",
    height: "100%",
  },
  imageGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  backButtonDetail: {
    position: "absolute",
    top: 50,
    left: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  headerOverlay: {
    position: "absolute",
    bottom: 30,
    left: 25,
    right: 25,
  },
  detailName: {
    fontSize: 32,
    fontWeight: "900",
    color: COLORS.white,
    marginBottom: 8,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  detailSpecialty: {
    fontSize: 20,
    color: COLORS.neonBlue,
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  detailContent: {
    padding: 25,
    marginTop: -30,
    backgroundColor: COLORS.darkBlue,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    padding: 25,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "rgba(0, 240, 255, 0.1)",
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  statValue: {
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
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.neonBlue,
    marginLeft: 10,
    letterSpacing: 0.5,
  },
  detailBio: {
    fontSize: 16,
    color: COLORS.lightBlue,
    lineHeight: 26,
  },
  certificationItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.cardBg,
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  certIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  certificationText: {
    fontSize: 15,
    color: COLORS.white,
    flex: 1,
    fontWeight: "500",
  },
  socialSection: {
    marginBottom: 25,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.cardBg,
    padding: 18,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  socialIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  socialTextContainer: {
    flex: 1,
  },
  socialPlatform: {
    fontSize: 16,
    color: COLORS.white,
    fontWeight: "600",
    marginBottom: 2,
  },
  socialHandle: {
    fontSize: 14,
    color: COLORS.lightBlue,
  },
  classSchedule: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(0, 240, 255, 0.1)",
  },
  classHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  classTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.white,
  },
  seeAll: {
    fontSize: 14,
    color: COLORS.neonBlue,
    fontWeight: "600",
  },
  classItem: {
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderRadius: 15,
    padding: 18,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.03)",
  },
  classDayTime: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  classDay: {
    fontSize: 16,
    color: COLORS.white,
    fontWeight: "600",
  },
  classTime: {
    fontSize: 16,
    color: COLORS.neonBlue,
    fontWeight: "600",
  },
  classType: {
    fontSize: 14,
    color: COLORS.lightBlue,
    marginBottom: 15,
  },
  bookButton: {
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  bookButtonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: COLORS.white,
  },
  contactButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 14,
    borderWidth: 2,
    backgroundColor: "rgba(37, 211, 102, 0.1)",
    marginTop: 10,
  },
  contactButtonText: {
    fontSize: 15,
    fontWeight: "bold",
    marginHorizontal: 10,
    flex: 1,
    textAlign: "center",
  },
  // Error
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 22,
    color: COLORS.neonBlue,
    marginTop: 20,
    marginBottom: 30,
    textAlign: "center",
    fontWeight: "600",
  },
  backButton: {
    backgroundColor: COLORS.neonBlue,
    paddingHorizontal: 35,
    paddingVertical: 15,
    borderRadius: 25,
    shadowColor: COLORS.neonBlue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.darkBlue,
  },
});
