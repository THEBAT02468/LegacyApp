import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
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

const COLORS = {
  neonBlue: "#00F0FF",
  darkBlue: "#0A1A2F",
  lightBlue: "#4DA8DA",
  white: "#FFFFFF",
  black: "#000000",
  gray: "#8E8E93",
  cardBg: "rgba(255, 255, 255, 0.05)",
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
    instagram: "@carlos_power",
    image: require("../assets/images/Instructor1.jpg"),
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
    image: require("../assets/images/Main.jpeg"),
  },
];

export default function Instructors() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  // 👉 DETALLE DEL INSTRUCTOR
  if (id) {
    const instructor = INSTRUCTORS.find((i) => i.id === id);

    if (!instructor) {
      return (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={60} color={COLORS.neonBlue} />
          <Text style={styles.errorText}>Instructor no encontrado</Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>← Volver</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
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
            <TouchableOpacity
              style={styles.backButtonDetail}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color={COLORS.white} />
            </TouchableOpacity>
          </View>

          {/* Información del instructor */}
          <View style={styles.detailContent}>
            <Text style={styles.detailName}>{instructor.name}</Text>
            <Text style={styles.detailSpecialty}>{instructor.specialty}</Text>

            {/* Estadísticas */}
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Ionicons name="time" size={20} color={COLORS.neonBlue} />
                <Text style={styles.statValue}>{instructor.experience}</Text>
                <Text style={styles.statLabel}>Experiencia</Text>
              </View>
              <View style={styles.statItem}>
                <Ionicons name="ribbon" size={20} color={COLORS.neonBlue} />
                <Text style={styles.statValue}>
                  {instructor.certifications.length}
                </Text>
                <Text style={styles.statLabel}>Certificaciones</Text>
              </View>
            </View>

            {/* Biografía */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>BIOGRAFÍA</Text>
              <Text style={styles.detailBio}>{instructor.bio}</Text>
            </View>

            {/* Certificaciones */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>CERTIFICACIONES</Text>
              {instructor.certifications.map((cert, index) => (
                <View key={index} style={styles.certificationItem}>
                  <Ionicons
                    name="checkmark-circle"
                    size={18}
                    color={COLORS.neonBlue}
                  />
                  <Text style={styles.certificationText}>{cert}</Text>
                </View>
              ))}
            </View>

            {/* Redes sociales */}
            <View style={styles.socialSection}>
              <Text style={styles.sectionTitle}>CONÉCTATE</Text>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons
                  name="logo-instagram"
                  size={24}
                  color={COLORS.white}
                />
                <Text style={styles.socialText}>{instructor.instagram}</Text>
              </TouchableOpacity>
            </View>

            {/* Horarios de clase */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>CLASES DISPONIBLES</Text>
              <View style={styles.classSchedule}>
                <View style={styles.classItem}>
                  <Text style={styles.classDay}>LUN - MIÉ - VIE</Text>
                  <Text style={styles.classTime}>18:00 - 19:30</Text>
                </View>
                <TouchableOpacity style={styles.bookButton}>
                  <Text style={styles.bookButtonText}>RESERVAR CLASE</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // 👉 LISTA DE INSTRUCTORES
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>ENTRENADORES</Text>
          <Text style={styles.headerSubtitle}>
            Conoce a nuestro equipo de expertos certificados
          </Text>
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
              <Image
                source={item.image}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardName}>{item.name}</Text>
                  <MaterialCommunityIcons
                    name="chevron-right"
                    size={24}
                    color={COLORS.neonBlue}
                  />
                </View>
                <Text style={styles.cardSpecialty}>{item.specialty}</Text>
                <Text style={styles.cardExperience}>
                  <Ionicons name="time" size={14} color={COLORS.lightBlue} />{" "}
                  {item.experience} de experiencia
                </Text>
                <View style={styles.cardTags}>
                  <View style={styles.tag}>
                    <Text style={styles.tagText}>Certificado</Text>
                  </View>
                  <View style={styles.tag}>
                    <Text style={styles.tagText}>Disponible</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
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
  headerTitle: {
    fontSize: 32,
    fontWeight: "900",
    color: COLORS.neonBlue,
    letterSpacing: 2,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: COLORS.lightBlue,
    textAlign: "center",
    maxWidth: 300,
  },
  listContent: {
    paddingBottom: 30,
  },
  card: {
    flexDirection: "row",
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    marginBottom: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(0, 240, 255, 0.1)",
    shadowColor: COLORS.neonBlue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cardImage: {
    width: 100,
    height: "100%",
  },
  cardContent: {
    flex: 1,
    padding: 16,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  cardName: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.white,
    flex: 1,
  },
  cardSpecialty: {
    fontSize: 14,
    color: COLORS.neonBlue,
    marginBottom: 6,
    fontWeight: "600",
  },
  cardExperience: {
    fontSize: 13,
    color: COLORS.lightBlue,
    marginBottom: 12,
  },
  cardTags: {
    flexDirection: "row",
    gap: 8,
  },
  tag: {
    backgroundColor: "rgba(0, 240, 255, 0.1)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 11,
    color: COLORS.neonBlue,
    fontWeight: "600",
  },
  // Detalle del instructor
  detailContainer: {
    flex: 1,
    backgroundColor: COLORS.darkBlue,
  },
  detailHeader: {
    position: "relative",
  },
  detailImage: {
    width: "100%",
    height: 300,
  },
  backButtonDetail: {
    position: "absolute",
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  detailContent: {
    padding: 24,
    marginTop: -30,
    backgroundColor: COLORS.darkBlue,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  detailName: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.white,
    marginBottom: 4,
  },
  detailSpecialty: {
    fontSize: 18,
    color: COLORS.neonBlue,
    marginBottom: 20,
    fontWeight: "600",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "rgba(0, 240, 255, 0.05)",
    borderRadius: 16,
    padding: 20,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: "rgba(0, 240, 255, 0.1)",
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.neonBlue,
    marginTop: 5,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.lightBlue,
    marginTop: 2,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.neonBlue,
    marginBottom: 12,
    letterSpacing: 1,
  },
  detailBio: {
    fontSize: 15,
    color: COLORS.lightBlue,
    lineHeight: 24,
  },
  certificationItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "rgba(0, 240, 255, 0.05)",
    padding: 12,
    borderRadius: 10,
  },
  certificationText: {
    fontSize: 14,
    color: COLORS.white,
    marginLeft: 10,
    flex: 1,
  },
  socialSection: {
    marginBottom: 25,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 16,
    borderRadius: 12,
  },
  socialText: {
    fontSize: 16,
    color: COLORS.white,
    marginLeft: 12,
    fontWeight: "600",
  },
  classSchedule: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(0, 240, 255, 0.2)",
  },
  classItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
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
  bookButton: {
    backgroundColor: COLORS.neonBlue,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  bookButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.black,
  },
  // Error
  errorContainer: {
    flex: 1,
    backgroundColor: COLORS.darkBlue,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 20,
    color: COLORS.neonBlue,
    marginTop: 20,
    marginBottom: 30,
    textAlign: "center",
  },
  backButton: {
    backgroundColor: COLORS.neonBlue,
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.black,
  },
});
