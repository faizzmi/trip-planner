import React from 'react';
import { Modal, View, Text, TouchableOpacity, Pressable, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

export default function ModalMessage({
  visible,
  message,
  onClose,
  onConfirm,
  confirmText = 'Yes',
  cancelText = 'No',
}) {
  const [hoverConfirm, setHoverConfirm] = React.useState(false);
  const [hoverCancel, setHoverCancel] = React.useState(false);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <View style={styles.modalContent}>
          <Text style={{ textAlign: 'center', margin: 20 }}>{message}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.modalItem, { borderBottomLeftRadius: 5 }, hoverConfirm && { backgroundColor: 'green' }]}
              onPressIn={() => setHoverConfirm(true)}
              onPressOut={() => setHoverConfirm(false)}
              onPress={onConfirm}
              accessibilityLabel={confirmText}
            >
              <Text style={styles.modalText}>{confirmText}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalItem, { borderBottomRightRadius: 5 }, hoverCancel && { backgroundColor: 'red' }]}
              onPressIn={() => setHoverCancel(true)}
              onPressOut={() => setHoverCancel(false)}
              onPress={onClose}
              accessibilityLabel={cancelText}
            >
              <Text style={styles.modalText}>{cancelText}</Text>
            </TouchableOpacity>
          </View>
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
    width: '70%',
    elevation: 5,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '50%',
    borderWidth: 1,
    borderColor: Colors.GRAY,
  },
  modalText: {
    fontFamily: 'outfit',
    fontSize: 16,
    color: Colors.BLACK,
    textAlign: 'center',
  },
});
