// app/(tabs)/index.tsx
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useFocusEffect } from 'expo-router';
import ObjectList from '../../components/ObjectList';
import { objectApi } from '../../lib/api';
import { Object } from '../../lib/types';

export default function HomeScreen() {
  const [objects, setObjects] = useState<Object[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchObjects = async () => {
    try {
      const response = await objectApi.getAll();
      if (response.success && Array.isArray(response.data)) {
        setObjects(response.data);
      }
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchObjects();
    }, [])
  );

  return (
    <View style={styles.container}>
      <ObjectList objects={objects} loading={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});