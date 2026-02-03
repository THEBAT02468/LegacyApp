import { Tabs } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Platform, View, StyleSheet } from 'react-native';

const COLORS = {
  neonBlue: '#00F0FF',
  darkBlue: '#0A1A2F',
  lightBlue: '#4DA8DA',
  white: '#FFFFFF',
  black: '#000000',
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.darkBlue,
          borderTopColor: 'rgba(0, 240, 255, 0.3)',
          borderTopWidth: 2,
          height: Platform.OS === 'ios' ? 88 : 68,
          paddingBottom: Platform.OS === 'ios' ? 28 : 8,
          paddingTop: 8,
          position: 'absolute',
          elevation: 15,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          overflow: 'hidden',
        },
        tabBarBackground: () => (
          <View style={StyleSheet.absoluteFill}>
            <View style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: COLORS.darkBlue,
              opacity: 0.95,
            }} />
            <View style={{
              height: 2,
              backgroundColor: COLORS.neonBlue,
              width: '100%',
              opacity: 0.3,
            }} />
          </View>
        ),
        tabBarActiveTintColor: COLORS.neonBlue,
        tabBarInactiveTintColor: COLORS.lightBlue,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '700',
          letterSpacing: 0.5,
          marginBottom: Platform.OS === 'ios' ? 0 : 4,
        },
        tabBarItemStyle: {
          borderRadius: 12,
          marginHorizontal: 4,
          marginVertical: 4,
        },
        tabBarIconStyle: {
          marginBottom: Platform.OS === 'ios' ? -2 : 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ focused, color, size }) => (
            <View style={[styles.iconContainer, focused && styles.activeIcon]}>
              <Ionicons 
                name={focused ? 'home' : 'home-outline'} 
                size={size - 2} 
                color={color} 
              />
            </View>
          ),
        }}
      />
      
      <Tabs.Screen
        name="workouts"
        options={{
          title: 'Entrenar',
          tabBarIcon: ({ focused, color, size }) => (
            <View style={[styles.iconContainer, focused && styles.activeIcon]}>
              <MaterialCommunityIcons 
                name={focused ? 'dumbbell' : 'dumbbell'} 
                size={size - 2} 
                color={color} 
              />
            </View>
          ),
        }}
      />
      
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Rutinas',
          tabBarIcon: ({ focused, color, size }) => (
            <View style={[styles.iconContainer, focused && styles.activeIcon]}>
              <Ionicons 
                name={focused ? 'barbell' : 'barbell-outline'} 
                size={size} 
                color={color} 
              />
            </View>
          ),
        }}
      />
      
      <Tabs.Screen
        name="progress"
        options={{
          title: 'Progreso',
          tabBarIcon: ({ focused, color, size }) => (
            <View style={[styles.iconContainer, focused && styles.activeIcon]}>
              <Ionicons 
                name={focused ? 'stats-chart' : 'stats-chart-outline'} 
                size={size} 
                color={color} 
              />
            </View>
          ),
        }}
      />
      
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ focused, color, size }) => (
            <View style={[styles.iconContainer, focused && styles.activeIcon]}>
              <Ionicons 
                name={focused ? 'person' : 'person-outline'} 
                size={size} 
                color={color} 
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    padding: 4,
    borderRadius: 8,
  },
  activeIcon: {
    backgroundColor: 'rgba(0, 240, 255, 0.1)',
  },
});
