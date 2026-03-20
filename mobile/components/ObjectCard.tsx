// components/ObjectCard.tsx
import React from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';
import { Object } from '../lib/types';

interface Props {
  object: Object;
  onPress: () => void;
}

export default function ObjectCard({ object, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {object.imageUrl ? (
        <Image source={{ uri: object.imageUrl }} style={styles.image} />
      ) : (
        <View style={[styles.image, styles.noImage]}>
          <Text style={styles.noImageText}>Pas d'image</Text>
        </View>
      )}
      
      <View style={styles.content}>
        <Text style={styles.title}>{object.title}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {object.description}
        </Text>
        <Text style={styles.date}>
          {new Date(object.createdAt).toLocaleDateString()}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: '#f0f0f0',
  },
  noImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  noImageText: {
    color: '#999',
    fontSize: 16,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
});