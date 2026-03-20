import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { API_URL } from '@env';

export default function DetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');

  useEffect(() => {
    fetchObject();
  }, []);

  const fetchObject = async () => {
    try {
      const response = await fetch(`${API_URL}/objects/${id}`);
      const data = await response.json();
      if (data.success && data.data) {
        setTitle(data.data.title);
      }
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  // Test simple : alerte directe
  const testClick = () => {
    Alert.alert('CLIC', 'Le bouton a été cliqué !');
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={testClick}
      >
        <Text style={styles.buttonText}>TEST - CLIQUE ICI</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.button, styles.deleteButton]} 
        onPress={() => Alert.alert('Suppression', 'ID: ' + id)}
      >
        <Text style={styles.buttonText}>SUPPRIMER</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#ff4444',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});