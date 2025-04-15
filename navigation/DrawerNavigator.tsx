import React, { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import {View, Text, Image, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import ParkingScreen from '../screens/ParkingScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { DrawerLayout } from 'react-native-gesture-handler';


export type DrawerParamList = {
  Home: undefined;
  Parking: undefined;
  Profile: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

const homeIcon = require('../assets/menu.png');
const carIcon = require('../assets/menu.png');

function CustomDrawerContent(props: any) {
  const auth = getAuth();
  const user = auth.currentUser;
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);

  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (user) {
        console.log("Usuario autenticado:", user); // <--- revisa esto
        const db = getFirestore();
        const userRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userRef);
  
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setRole(userData.role || null);
        }
      } else {
        console.log("No hay usuario autenticado.");
      }
    };
  
    fetchUserRole();
  }, []);
  
  

  const handleLogout = () => {
    // Aquí pones tu lógica de cierre de sesión
    Alert.alert("Cerrar sesión", "¿Estás seguro que quieres salir?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Cerrar sesión",
        style: "destructive",
        onPress: () => {
          // Redirige al login u otra lógica
          props.navigation.navigate('Login');
        },
      },
    ]);
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>

      {role === 'admin' && (
        <View style={styles.adminContainer}>
          <Text style={styles.adminText}>Usuario Admin</Text>
        </View>
      )}

      {/* Elementos del drawer */}
      <View style={{ flex: 1 }}>
        <DrawerItemList {...props} />
      </View>

      {/* Botón de cerrar sesión abajo */}
      <View style={styles.logoutContainer}>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      initialRouteName="Home"
      screenOptions={{
        headerShown: true,
        drawerActiveTintColor: '#2196F3',
        drawerLabelStyle: { fontSize: 16 },
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} options={{ drawerLabel: 'Principal' }} />
      <Drawer.Screen name="Parking" component={ParkingScreen} options={{ drawerLabel: 'Parqueadero'}} />
      <Drawer.Screen name="Profile" component={ProfileScreen} options={{ drawerLabel: 'Perfil'}} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  adminContainer: {
    padding: 16,
    backgroundColor: '#E0F7FA',
    alignItems: 'center',
    marginBottom: 16
  },
  adminText: {
    color: '#00796B',
    fontWeight: 'bold',
    fontSize: 16,
  },
  
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  logoutContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  logoutButton: {
    paddingVertical: 10,
  },
  logoutText: {
    fontSize: 16,
    color: 'red',
    fontWeight: 'bold',
  },
});
