// components/ObjectList.tsx
import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import ObjectCard from './ObjectCard';
import { Object } from '../lib/types';

interface Props {
  objects: Object[];
  loading?: boolean;
}

export default function ObjectList({ objects, loading }: Props) {
  const router = useRouter();

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  if (objects.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>Aucun objet pour le moment</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={objects}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <ObjectCard
          object={item}
          onPress={() => router.push(`/detail/${item._id}`)}
        />
      )}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});