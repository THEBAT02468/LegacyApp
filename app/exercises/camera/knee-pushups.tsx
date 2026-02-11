import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useLocalSearchParams, useRouter } from "expo-router";
import { DeviceMotion } from "expo-sensors";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native";

// Importar tensorflow y mediapipe (para futuro uso)
import * as posedetection from "@tensorflow-models/pose-detection";
import * as tf from "@tensorflow/tfjs";

// Colores Legacy Gym
const COLORS = {
  neonBlue: "#00F0FF",
  darkBlue: "#0A1A2F",
  lightBlue: "#4DA8DA",
  white: "#FFFFFF",
  black: "#000000",
  green: "#4CD964",
  orange: "#FF9500",
  red: "#FF3B30",
  cardBg: "rgba(255, 255, 255, 0.05)",
};

// Landmarks de MediaPipe Pose (para futuro uso)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const POSE_LANDMARKS = {
  NOSE: 0,
  LEFT_SHOULDER: 11,
  RIGHT_SHOULDER: 12,
  LEFT_ELBOW: 13,
  RIGHT_ELBOW: 14,
  LEFT_WRIST: 15,
  RIGHT_WRIST: 16,
  LEFT_HIP: 23,
  RIGHT_HIP: 24,
  LEFT_KNEE: 25,
  RIGHT_KNEE: 26,
  LEFT_ANKLE: 27,
  RIGHT_ANKLE: 28,
};

export default function ExerciseCamera() {
  const router = useRouter();
  const { exerciseId } = useLocalSearchParams<{ exerciseId: string }>();

  const [permission, requestPermission] = useCameraPermissions();
  const [reps, setReps] = useState(0);
  const [status, setStatus] = useState<"LISTO" | "BAJANDO" | "SUBIENDO">(
    "LISTO",
  );
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [poseDetector, setPoseDetector] = useState<any>(null);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [formStatus, setFormStatus] = useState<
    "BAJANDO" | "SUBIENDO" | "LISTO"
  >("LISTO");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const cameraRef = useRef<CameraView>(null);
  const goingDown = useRef(false);
  const lastRepTime = useRef(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const motionSubscription = useRef<any>(null);

  // 🔥 USEEFFECT QUE ARREGLA TODO - Conteo con DeviceMotion
  useEffect(() => {
    if (!isRecording) {
      // Limpiar suscripción cuando no está grabando
      if (motionSubscription.current) {
        motionSubscription.current.remove();
        motionSubscription.current = null;
      }
      return;
    }

    DeviceMotion.setUpdateInterval(200);

    const subscription = DeviceMotion.addListener((motion) => {
      const z = motion.accelerationIncludingGravity?.z ?? 0;
      const now = Date.now();

      // Bajada
      if (z < -0.8 && !goingDown.current) {
        goingDown.current = true;
        setStatus("BAJANDO");
        setFormStatus("BAJANDO");

        // Animación de pulso al bajar
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start();
      }

      // Subida → cuenta rep
      if (z > 0.8 && goingDown.current && now - lastRepTime.current > 800) {
        goingDown.current = false;
        lastRepTime.current = now;
        setReps((prev) => prev + 1);
        setStatus("SUBIENDO");
        setFormStatus("SUBIENDO");
        Vibration.vibrate(50);
      }
    });

    motionSubscription.current = subscription;

    return () => {
      if (motionSubscription.current) {
        motionSubscription.current.remove();
        motionSubscription.current = null;
      }
    };
  }, [pulseAnim, isRecording]);

  // Inicializar modelo de pose detection (para futuro uso)
  const initializePoseDetection = async () => {
    try {
      // Esperar a que TensorFlow esté listo
      await tf.ready();

      // Crear detector MediaPipe Pose
      const detectorConfig = {
        runtime: "tfjs",
        modelType: "lite",
        enableSmoothing: true,
        minPoseDetectionConfidence: 0.5,
        minPosePresenceConfidence: 0.5,
        minTrackingConfidence: 0.5,
      };

      const detector = await posedetection.createDetector(
        posedetection.SupportedModels.BlazePose,
        detectorConfig,
      );

      setPoseDetector(detector);
      setIsModelLoaded(true);
      console.log("Modelo de pose detection cargado (para uso futuro)");
    } catch (error) {
      console.error("Error al cargar el modelo:", error);
      // No mostramos alerta para no molestar al usuario
    }
  };

  // Iniciar sesión de entrenamiento
  const startSession = () => {
    setIsRecording(true);
    setReps(0);
    setStatus("LISTO");
    setFormStatus("LISTO");
    setSessionTime(0);
    goingDown.current = false;

    // Animación de entrada
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    // Iniciar temporizador
    timerRef.current = setInterval(() => {
      setSessionTime((prev) => prev + 1);
    }, 1000) as any;
  };

  // Detener sesión
  const stopSession = () => {
    setIsRecording(false);

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    setShowSaveModal(true);
  };

  // Reiniciar contador
  const resetSession = () => {
    Alert.alert(
      "Reiniciar sesión",
      "¿Estás seguro de que quieres reiniciar el contador? Se perderán las repeticiones actuales.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Reiniciar",
          style: "destructive",
          onPress: () => {
            setReps(0);
            setStatus("LISTO");
            setFormStatus("LISTO");
            goingDown.current = false;
            setSessionTime(0);
            Vibration.vibrate([100, 50, 100]);
          },
        },
      ],
    );
  };

  // 🔥 Guardar serie en AsyncStorage - FUNCIONA AHORA
  const saveSet = async () => {
    if (!exerciseId || reps === 0) {
      Alert.alert(
        "Sin repeticiones",
        "Completa al menos una repetición antes de guardar.",
      );
      return;
    }

    try {
      const key = `exercise-${exerciseId}`;
      const existing = await AsyncStorage.getItem(key);
      const parsed = existing ? JSON.parse(existing) : [];

      const newSet = {
        reps,
        date: new Date().toISOString(),
        timestamp: Date.now(),
        sessionTime,
        level: getLevelByReps(reps),
        formScore: "Buena", // Por ahora siempre buena, IA vendrá después
      };

      await AsyncStorage.setItem(key, JSON.stringify([...parsed, newSet]));

      // Mostrar confirmación
      Alert.alert("✅ Serie guardada", `Has guardado ${reps} repeticiones.`, [
        {
          text: "Ver progreso",
          onPress: () => {
            setShowSaveModal(false);
            router.back();
          },
        },
        {
          text: "Nueva serie",
          onPress: () => {
            setShowSaveModal(false);
            startSession();
          },
        },
      ]);
    } catch {
      Alert.alert("Error", "No se pudo guardar la serie. Intenta nuevamente.");
    }
  };

  // Determinar nivel por repeticiones
  const getLevelByReps = (repsCount: number) => {
    if (repsCount >= 20) return "Avanzado";
    if (repsCount >= 12) return "Intermedio";
    return "Básico";
  };

  // Formatear tiempo
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  useEffect(() => {
    // Inicializar IA para uso futuro (sin bloquear UI)
    initializePoseDetection();

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }

      if (motionSubscription.current) {
        motionSubscription.current.remove();
      }

      if (poseDetector) {
        poseDetector.dispose();
      }
    };
  }, [poseDetector]);

  if (!permission?.granted) {
    return (
      <View style={styles.permissionContainer}>
        <View style={styles.permissionCard}>
          <Ionicons name="camera" size={60} color={COLORS.neonBlue} />
          <Text style={styles.permissionTitle}>Acceso a la cámara</Text>
          <Text style={styles.permissionText}>
            Necesitamos acceso a la cámara para el modo futuro con IA
          </Text>
          <TouchableOpacity
            style={styles.permissionButton}
            onPress={requestPermission}
          >
            <Text style={styles.permissionButtonText}>PERMITIR CÁMARA</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Cámara */}
      <CameraView style={{ flex: 1 }} facing="front" ratio="16:9" />

      {/* Overlay */}
      <View style={styles.overlay} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>

        <View style={styles.exerciseInfo}>
          <Text style={styles.exerciseTitle}>
            {exerciseId?.replace("-", " ").toUpperCase() || "KNEE PUSH-UPS"}
          </Text>
          <Text style={styles.exerciseSubtitle}>
            {isModelLoaded
              ? "IA lista para futuro"
              : "Sensor de movimiento activo"}
          </Text>
        </View>
      </View>

      {/* Contador principal */}
      <Animated.View
        style={[
          styles.counterContainer,
          { opacity: fadeAnim, transform: [{ scale: pulseAnim }] },
        ]}
      >
        <Text style={styles.repsNumber}>{reps}</Text>
        <Text style={styles.repsLabel}>REPETICIONES</Text>

        <View style={styles.statusContainer}>
          <View
            style={[
              styles.statusDot,
              {
                backgroundColor:
                  status === "LISTO"
                    ? COLORS.neonBlue
                    : status === "BAJANDO"
                      ? COLORS.orange
                      : COLORS.green,
              },
            ]}
          />
          <Text style={styles.statusText}>{status}</Text>
        </View>

        {isRecording && (
          <View style={styles.sessionInfo}>
            <Ionicons name="time" size={16} color={COLORS.lightBlue} />
            <Text style={styles.sessionTime}>{formatTime(sessionTime)}</Text>
          </View>
        )}
      </Animated.View>

      {/* Instrucciones para knee pushups */}
      {!isRecording && (
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionsTitle}>
            INSTRUCCIONES KNEE PUSH-UPS
          </Text>
          <View style={styles.instructionItem}>
            <Ionicons name="body" size={20} color={COLORS.neonBlue} />
            <Text style={styles.instructionText}>
              Coloca el dispositivo en tu pecho o frente a ti
            </Text>
          </View>
          <View style={styles.instructionItem}>
            <Ionicons name="fitness" size={20} color={COLORS.neonBlue} />
            <Text style={styles.instructionText}>
              Realiza los knee push-ups normalmente
            </Text>
          </View>
          <View style={styles.instructionItem}>
            <Ionicons name="move" size={20} color={COLORS.neonBlue} />
            <Text style={styles.instructionText}>
              El sensor contará cada repetición automáticamente
            </Text>
          </View>
          <View style={styles.instructionItem}>
            <Ionicons name="bulb" size={20} color={COLORS.neonBlue} />
            <Text style={styles.instructionText}>
              IA de postura disponible en futuras actualizaciones
            </Text>
          </View>
        </View>
      )}

      {/* Botón flotante para registrar serie */}
      <TouchableOpacity
        style={styles.floatingAction}
        onPress={() => {
          if (!isRecording) {
            startSession();
          } else {
            stopSession();
          }
        }}
      >
        {!isRecording ? (
          <>
            <Ionicons name="play-circle" size={28} color={COLORS.white} />
            <Text style={styles.floatingActionText}>INICIAR SERIE</Text>
          </>
        ) : (
          <>
            <Ionicons name="stop-circle" size={28} color={COLORS.white} />
            <Text style={styles.floatingActionText}>FINALIZAR SERIE</Text>
          </>
        )}
      </TouchableOpacity>

      {/* Controles adicionales */}
      {isRecording && (
        <View style={styles.bottomControls}>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={resetSession}
          >
            <Ionicons name="refresh" size={20} color={COLORS.white} />
            <Text style={styles.secondaryButtonText}>Reiniciar</Text>
          </TouchableOpacity>

          <View style={styles.sessionStats}>
            <Ionicons name="stats-chart" size={16} color={COLORS.neonBlue} />
            <Text style={styles.statsText}>
              {reps} reps • {formatTime(sessionTime)}
            </Text>
          </View>
        </View>
      )}

      {/* Modal de confirmación */}
      <Modal
        visible={showSaveModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowSaveModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Ionicons
                name="checkmark-circle"
                size={50}
                color={COLORS.green}
              />
              <Text style={styles.modalTitle}>SESIÓN COMPLETADA</Text>
            </View>

            <View style={styles.sessionStatsModal}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{reps}</Text>
                <Text style={styles.statLabel}>Repeticiones</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{formatTime(sessionTime)}</Text>
                <Text style={styles.statLabel}>Tiempo</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text
                  style={[
                    styles.statNumber,
                    {
                      color:
                        getLevelByReps(reps) === "Avanzado"
                          ? COLORS.green
                          : getLevelByReps(reps) === "Intermedio"
                            ? COLORS.orange
                            : COLORS.neonBlue,
                    },
                  ]}
                >
                  {getLevelByReps(reps)}
                </Text>
                <Text style={styles.statLabel}>Nivel</Text>
              </View>
            </View>

            <Text style={styles.modalText}>
              ¿Deseas guardar esta serie en tu historial de entrenamiento?
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setShowSaveModal(false);
                  startSession();
                }}
              >
                <Text style={styles.cancelButtonText}>DESCARTAR</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.saveModalButton]}
                onPress={saveSet}
              >
                <Text style={styles.saveModalButtonText}>GUARDAR SERIE</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={() => setShowSaveModal(false)}
            >
              <Ionicons name="close" size={24} color={COLORS.lightBlue} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  permissionContainer: {
    flex: 1,
    backgroundColor: COLORS.darkBlue,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  permissionCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 25,
    padding: 40,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(0, 240, 255, 0.1)",
  },
  permissionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.white,
    marginTop: 20,
    marginBottom: 10,
  },
  permissionText: {
    fontSize: 16,
    color: COLORS.lightBlue,
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 22,
  },
  permissionButton: {
    backgroundColor: COLORS.neonBlue,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  permissionButtonText: {
    color: COLORS.darkBlue,
    fontWeight: "bold",
    fontSize: 16,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(10, 26, 47, 0.3)",
  },
  header: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    zIndex: 10,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.white,
    marginBottom: 4,
  },
  exerciseSubtitle: {
    fontSize: 14,
    color: COLORS.neonBlue,
  },
  counterContainer: {
    position: "absolute",
    top: "20%",
    alignSelf: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    paddingHorizontal: 40,
    paddingVertical: 25,
    borderRadius: 30,
    alignItems: "center",
    borderWidth: 2,
    borderColor: COLORS.neonBlue,
    shadowColor: COLORS.neonBlue,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  repsNumber: {
    color: COLORS.neonBlue,
    fontSize: 64,
    fontWeight: "900",
    textShadowColor: "rgba(0, 240, 255, 0.3)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  repsLabel: {
    color: COLORS.white,
    fontSize: 14,
    letterSpacing: 2,
    marginTop: 5,
    fontWeight: "600",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  statusText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "bold",
  },
  sessionInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  sessionTime: {
    color: COLORS.lightBlue,
    fontSize: 14,
    marginLeft: 6,
    fontWeight: "600",
  },
  instructionsContainer: {
    position: "absolute",
    bottom: 120,
    left: 20,
    right: 20,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(0, 240, 255, 0.2)",
  },
  instructionsTitle: {
    color: COLORS.neonBlue,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  instructionItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  instructionText: {
    color: COLORS.white,
    fontSize: 14,
    marginLeft: 10,
    flex: 1,
  },
  floatingAction: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
    backgroundColor: COLORS.green,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 18,
    borderRadius: 30,
    shadowColor: COLORS.green,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  floatingActionText: {
    color: COLORS.darkBlue,
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 10,
  },
  bottomControls: {
    position: "absolute",
    bottom: 100,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  secondaryButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
  },
  secondaryButtonText: {
    color: COLORS.white,
    fontSize: 12,
    marginLeft: 8,
    fontWeight: "600",
  },
  sessionStats: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 240, 255, 0.1)",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
  },
  statsText: {
    color: COLORS.neonBlue,
    fontSize: 14,
    marginLeft: 8,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: COLORS.darkBlue,
    borderRadius: 30,
    padding: 30,
    width: "100%",
    maxWidth: 400,
    borderWidth: 2,
    borderColor: COLORS.neonBlue,
    alignItems: "center",
  },
  modalHeader: {
    alignItems: "center",
    marginBottom: 25,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.white,
    marginTop: 15,
    textAlign: "center",
  },
  sessionStatsModal: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    padding: 20,
    marginBottom: 25,
    width: "100%",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.neonBlue,
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.lightBlue,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  modalText: {
    fontSize: 16,
    color: COLORS.lightBlue,
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 22,
  },
  modalButtons: {
    flexDirection: "row",
    gap: 15,
    width: "100%",
  },
  modalButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButton: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  cancelButtonText: {
    color: COLORS.lightBlue,
    fontWeight: "bold",
    fontSize: 14,
  },
  saveModalButton: {
    backgroundColor: COLORS.neonBlue,
  },
  saveModalButtonText: {
    color: COLORS.darkBlue,
    fontWeight: "bold",
    fontSize: 14,
  },
  closeModalButton: {
    position: "absolute",
    top: 15,
    right: 15,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
