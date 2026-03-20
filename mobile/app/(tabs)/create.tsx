// app/(tabs)/create.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import ObjectForm from '../../components/ObjectForm';

export default function CreateScreen() {
  return (
    <View style={styles.container}>
      <ObjectForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});