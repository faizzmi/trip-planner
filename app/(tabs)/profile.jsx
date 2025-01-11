import { StyleSheet, Image, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { auth } from './../../configs/FirebaseConfig';
import { useNavigation, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '../../constants/Colors';
import { getAuth, signOut } from 'firebase/auth';
import ModalMessage from '../../components/ModalMessage';
import NotificationMessage from '../../components/NotificationMessage';

export default function Profile() {
  const user = auth.currentUser;
  const navigation = useNavigation();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [notiModal, setNotiModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.displayName || '',
    phoneNumber: user?.phoneNumber || '',
    nationality: '',
    religion: '',
  });

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: '',
      headerRight: () => (
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicons style={{ marginRight: 15 }} name="log-out" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, []);

  const handleLogOut = (logout) => {
    const logOut = getAuth();
    if (logout) {
      signOut(logOut)
        .then(() => {
          router.replace('auth/sign-in');
        })
        .catch((error) => {
          setNotiModal(true);
          setErrorMessage(error)
        });
    } else {
      setModalVisible(false);
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setIsEditing(false);
    setNotiModal(true);
    setSuccessMessage('Profile saved')
  };

  const handleChange = (key, value) => {
    setProfileData({ ...profileData, [key]: value });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>My Profile</Text>

      <View style={styles.profileCard}>
        <View style={styles.profileSection}>
          <Image source={require('./../../assets/images/profile-picture.jpg')} style={styles.profileImage} />
          <Text style={styles.name}>{profileData.name || 'Your Name'}</Text>
        </View>

        <View style={styles.detailsSection}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.disableInput]}
              placeholder="Your Name"
              value={profileData.name}
              editable={isEditing}
              onChangeText={(value) => handleChange('name', value)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[styles.input, styles.disableInput]}
              placeholder="Your Email"
              value={user?.email || ''}
              editable={false}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.disableInput]}
              placeholder="Your Phone Number"
              value={profileData.phoneNumber}
              editable={isEditing}
              onChangeText={(value) => handleChange('phoneNumber', value)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nationality</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.disableInput]}
              placeholder="Your Nationality"
              value={profileData.nationality}
              editable={isEditing}
              onChangeText={(value) => handleChange('nationality', value)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Religion</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.disableInput]}
              placeholder="Your Religion"
              value={profileData.religion}
              editable={isEditing}
              onChangeText={(value) => handleChange('religion', value)}
            />
          </View>

          {isEditing && (
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={isEditing ? styles.editButton : styles.saveButton} onPress={toggleEdit}>
            <Text style={isEditing ? styles.editButtonText : styles.saveButtonText}>{isEditing ? 'Cancel' : 'Edit Profile'}</Text>
          </TouchableOpacity>
          
        </View>

      </View>

      <ModalMessage
        visible={modalVisible}
        message="Are you sure you want to log out?"
        onClose={() => setModalVisible(false)}
        onConfirm={handleLogOut}
      />
      {(errorMessage || successMessage) && (
        <NotificationMessage
            visible={notiModal}
            id={errorMessage ? 1 : 2} 
            message={errorMessage || successMessage}
            onClose={() => setNotiModal(false)}
        />
      )}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingTop: 55,
    backgroundColor: Colors.L_WHITE,
    height: '100%',
  },
  title: {
    fontFamily: 'outfit-bold',
    fontSize: 35,
    marginBottom: 10,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginTop: 60
  },
  name: {
    marginTop: 10,
    fontFamily: 'outfit-bold',
    fontSize: 20,
  },
  detailsSection: {
    marginBottom: 20,
  },
  inputGroup: {
    marginVertical: 15,
  },
  label: {
    fontFamily: 'outfit-bold',
    fontSize: 17,
    marginBottom: 5,
  },
  input: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.GRAY,
    fontFamily: 'outfit',
  },
  disableInput: {
    backgroundColor: Colors.LIGHT_GRAY,
    color: Colors.GRAY,
  },
  saveButton: {
    backgroundColor: Colors.PRIMARAY,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: Colors.WHITE,
    fontFamily: 'outfit-bold',
    fontSize: 16,
  },
  editButton: {
    backgroundColor: Colors.LIGHT_GRAY,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.DARK_GRAY,
    marginTop: 20,
  },
  editButtonText: {
    color: Colors.PRIMARAY,
    fontFamily: 'outfit-bold',
    fontSize: 16,
  },
  profileCard: {
    backgroundColor: Colors.WHITE,
    borderRadius: 12,
    padding: 20,
    elevation: 10,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
  }
});