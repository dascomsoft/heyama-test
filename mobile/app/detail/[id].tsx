import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { API_URL } from '@env';

interface ObjectType {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
}

export default function DetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [object, setObject] = useState<ObjectType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchObject();
  }, []);

  const fetchObject = async () => {
    try {
      const response = await fetch(`${API_URL}/objects/${id}`);
      const data = await response.json();
      if (data.success && data.data) {
        setObject(data.data);
      }
    } catch (error) {
      console.error('Erreur fetch:', error);
      Alert.alert('Erreur', 'Impossible de charger l\'objet');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Confirmation',
      'Voulez-vous vraiment supprimer cet objet ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          onPress: async () => {
            try {
              const response = await fetch(`${API_URL}/objects/${id}`, {
                method: 'DELETE',
              });
              const result = await response.json();
              
              if (result.success) {
                Alert.alert('Succès', 'Objet supprimé', [
                  { text: 'OK', onPress: () => router.back() }
                ]);
              } else {
                Alert.alert('Erreur', result.message || 'Suppression impossible');
              }
            } catch (error) {
              console.error('Erreur delete:', error);
              Alert.alert('Erreur', 'Problème de connexion');
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!object) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Objet non trouvé</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {object.imageUrl ? (
        <Image source={{ uri: object.imageUrl }} style={styles.image} />
      ) : (
        <View style={[styles.image, styles.noImage]}>
          <Text style={styles.noImageText}>Pas d'image</Text>
        </View>
      )}

      <View style={styles.content}>
        <Text style={styles.title}>{object.title}</Text>
        <Text style={styles.date}>
          Créé le {new Date(object.createdAt).toLocaleDateString()}
        </Text>
        <Text style={styles.description}>{object.description}</Text>

        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteButtonText}>Supprimer</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 300,
  },
  noImage: {
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noImageText: {
    color: '#999',
    fontSize: 16,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: '#999',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 30,
  },
  deleteButton: {
    backgroundColor: '#ff4444',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 18,
    color: '#999',
  },
});