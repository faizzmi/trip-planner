import { View, Text, Modal, StyleSheet, ActivityIndicator, Pressable } from 'react-native';
import React from 'react';
import { Colors } from '../constants/Colors';

export default function LoadingModal({ visible }) {
  return (
    <Modal visible={visible} animationType="fade" transparent>
      <Pressable style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <ActivityIndicator size="large" color={Colors.PRIMARAY} />
          <Text style={styles.loadText}>Please Wait...</Text>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    width: '30%',
    elevation: 5,
    padding: 20,
  },
  loadText: {
    marginTop: 20,
    textAlign: 'center',
    color: Colors.GRAY,
  },
});
