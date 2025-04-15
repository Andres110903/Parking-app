import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Image source={require('../assets/logo.png')} style={styles.icon} />
        </TouchableOpacity>

        <Image source={require('../assets/logo.png')} style={styles.logo} />

        <TouchableOpacity>
          <Image source={require('../assets/logo.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc egestas ex vel ligula
          maximus rhoncus. Nullam vitae pellentesque felis.
        </Text>
        <Image source={require('../assets/cosmo.png')} style={styles.image} />
      </View>

      {/* Botones */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Ingresar vehículo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Visualizar espacios</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  content: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  text: {
    flex: 1,
    fontSize: 14,
    marginRight: 10,
    color: '#333',
  },
  image: {
    width: 130,
    height: 130,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#ddd',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#000',
  },
});
