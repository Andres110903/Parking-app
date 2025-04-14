import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import ParkingScreen from '../screens/ParkingScreen';

export type DrawerParamList = {
  Home: undefined;
  Parking: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

const homeIcon = require('../assets/menu.png');
const carIcon = require('../assets/menu.png');

function CustomDrawerContent(props: any) {
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
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Parking" component={ParkingScreen} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
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
