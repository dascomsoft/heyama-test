// mobile/components/ObjectForm.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from '@env';
import { objectApi } from '../lib/api';

export default function ObjectForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  const [imageUri, setImageUri] = useState<string | null>(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission refusée', 'Vous devez autoriser l\'accès aux photos.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const uploadImageToCloudinary = async (uri: string): Promise<string | null> => {
    setUploading(true);

    try {
      const response = await fetch(uri);
      const blob = await response.blob();

      const formData = new FormData();
      formData.append('file', blob, 'upload.jpg');
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
      formData.append('cloud_name', CLOUDINARY_CLOUD_NAME);

      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await uploadResponse.json();

      if (uploadResponse.ok) {
        setUploading(false);
        return data.secure_url;
      } else {
        console.error('Erreur Cloudinary:', data.error);
        setUploading(false);
        Alert.alert('Erreur upload', data.error?.message || 'Impossible d\'uploader l\'image');
        return null;
      }
    } catch (error) {
      console.error('Erreur:', error);
      setUploading(false);
      Alert.alert('Erreur', 'Problème lors de l\'upload');
      return null;
    }
  };



const handleSubmit = async () => {
  if (!formData.title || !formData.description) {
    Alert.alert('Erreur', 'Veuillez remplir tous les champs');
    return;
  }

  setLoading(true);

  try {
    let imageUrl = '';
    
    if (imageUri) {
      const uploadedUrl = await uploadImageToCloudinary(imageUri);
      if (uploadedUrl) {
        imageUrl = uploadedUrl;
      } else {
        setLoading(false);
        return;
      }
    }

    const response = await objectApi.create({
      title: formData.title,
      description: formData.description,
      imageUrl,
    });

    if (response.success) {
      Alert.alert('Succès', 'Objet créé avec succès', [
        { 
          text: 'OK', 
          onPress: () => {
            // ✅ Redirige vers l'onglet Accueil (tabs)
            router.push('/(tabs)');
          }
        }
      ]);
    } else {
      Alert.alert('Erreur', response.message || 'Erreur lors de la création');
    }
  } catch (error) {
    console.error('Erreur:', error);
    Alert.alert('Erreur', 'Impossible de contacter le serveur');
  } finally {
    setLoading(false);
  }
};
  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <View style={styles.field}>
          <Text style={styles.label}>Titre</Text>
          <TextInput
            style={styles.input}
            value={formData.title}
            onChangeText={(text) => setFormData({ ...formData, title: text })}
            placeholder="Titre de l'objet"
            editable={!loading && !uploading}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.description}
            onChangeText={(text) => setFormData({ ...formData, description: text })}
            placeholder="Description de l'objet"
            multiline
            numberOfLines={4}
            editable={!loading && !uploading}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Image</Text>
          <TouchableOpacity
            style={styles.imageButton}
            onPress={pickImage}
            disabled={loading || uploading}
          >
            <Text style={styles.imageButtonText}>
              {imageUri ? 'Changer l\'image' : 'Choisir une image'}
            </Text>
          </TouchableOpacity>

          {imageUri && (
            <Image source={{ uri: imageUri }} style={styles.preview} />
          )}

          {uploading && (
            <View style={styles.uploadingContainer}>
              <ActivityIndicator size="small" color="#007AFF" />
              <Text style={styles.uploadingText}>Upload en cours...</Text>
            </View>
          )}
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={() => router.back()}
            disabled={loading || uploading}
          >
            <Text style={styles.cancelButtonText}>Annuler</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.submitButton]}
            onPress={handleSubmit}
            disabled={loading || uploading}
          >
            <Text style={styles.submitButtonText}>
              {loading || uploading ? 'Traitement...' : 'Créer'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  form: {
    padding: 16,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  imageButton: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  imageButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
  preview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
    resizeMode: 'cover',
  },
  uploadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  uploadingText: {
    marginLeft: 8,
    color: '#007AFF',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 12,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#007AFF',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
});