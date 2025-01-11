import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Colors } from '../constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function NotificationMessage({ visible, id, message, onClose }) {
    useEffect(() => {
        if (visible) {
            const timer = setTimeout(() => {
                onClose?.();
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [visible, onClose]);

    return (
        <Modal visible={visible} animationType="fade" onRequestClose={onClose} transparent>
            <Pressable style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    {id === 1 ? 
                        (<MaterialIcons name="error-outline" size={24} color="red" />) : 
                        (<MaterialIcons name="check-circle-outline" size={24} color="green" />)
                    }
                    <Text>{message}</Text>
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
        padding: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
        alignItems: 'center',
    }
});
