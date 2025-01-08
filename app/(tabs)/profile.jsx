import { StyleSheet, Image, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { auth } from './../../configs/FirebaseConfig';
import { useNavigation, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '../../constants/Colors';
import { getAuth, signOut } from 'firebase/auth';
import ModalMessage from '../../components/ModalMessage';

export default function Profile() {
  const user = auth.currentUser;
  const navigation = useNavigation();
  const router = useRouter();
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
          console.error('Logout error: ', error);
        });
    } else {
      setModalVisible(false);
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    console.log('Profile saved:', profileData);
    setIsEditing(false);
  };

  const handleChange = (key, value) => {
    setProfileData({ ...profileData, [key]: value });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>My Profile</Text>
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
      </View>

      <TouchableOpacity style={styles.editButton} onPress={toggleEdit}>
        <Text style={styles.editButtonText}>{isEditing ? 'Cancel' : 'Edit Profile'}</Text>
      </TouchableOpacity>

      <ModalMessage
        visible={modalVisible}
        message="Are you sure you want to log out?"
        onClose={() => setModalVisible(false)}
        onConfirm={handleLogOut}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingTop: 55,
    backgroundColor: Colors.WHITE,
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
    backgroundColor: Colors.PRIMARAY,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  editButtonText: {
    color: Colors.WHITE,
    fontFamily: 'outfit-bold',
    fontSize: 16,
  },
});
