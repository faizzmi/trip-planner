import { StyleSheet, Image, Text, View, ScrollView, TextInput, TouchableOpacity} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { auth } from './../../configs/FirebaseConfig';
import { useNavigation, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '../../constants/Colors';
import { getAuth, signOut } from 'firebase/auth';
import ModalMessage from '../../components/ModalMessage';
import NotificationMessage from '../../components/NotificationMessage';
import { collection, query, where, doc, setDoc, getDocs } from 'firebase/firestore';
import { db } from './../../configs/FirebaseConfig';
import * as ImagePicker from 'expo-image-picker';
import LoadingModal from '../../components/LoadingModal';
import Feather from '@expo/vector-icons/Feather';

export default function Profile() {
  const isMounted = useRef(true); 
  const user = auth.currentUser;
  const navigation = useNavigation();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [notiModal, setNotiModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    phoneNumber: '',
    email: user?.email || '',
    nationality: '',
    religion: '',
    // profilePicture: ''
  });
  const [tempProfileData, setTempProfileData] = useState({ ...profileData });

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

  useEffect(() => {
  let mounted = true;
  
  const getProfileData = async () => {
    if (mounted) {
      try {
        const q = query(collection(db, 'users'), where('email', '==', user?.email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const data = querySnapshot.docs[0].data();
          setProfileData((prev) => ({
            ...prev,
            name: data.name || '',
            phoneNumber: data.phoneNumber || '',
            nationality: data.nationality || '',
            religion: data.religion || '',
            // profilePicture: data.profilePicture || ''
          }));

        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    }
  };
  
  getProfileData();
  
  return () => {
    mounted = false;
  };
}, []);

  // const pickImage = async () => {
  //   try {
  //     const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //     if (!permissionResult.granted) {
  //       setErrorMessage('Permission to access media library is required!');
  //       setNotiModal(true)
  //       return;
  //     }

  //     const result = await ImagePicker.launchImageLibraryAsync({
  //       mediaTypes: 'Images',
  //       allowsEditing: true,
  //       quality: 1,
  //     });

  //     if (!result.canceled && isMounted.current) {
  //       const url = await uploadImageToFirebase(result.uri);
  //       setTempProfileData({ ...profileData, profilePicture: url });
  //     }
  //   } catch (error) {
  //       if (isMounted.current) {
  //         setNotiModal(true);
  //         setErrorMessage('Error picking image');
  //       }
  //   }
  // };

  // const uploadImageToFirebase = async (uri) => {
  //   const response = await fetch(uri);
  //   const blob = await response.blob();
  //   const storageRef = ref(storage, 'profilePicture/' + user.uid);
  //   await uploadBytes(storageRef, blob);
  //   const url = await getDownloadURL(storageRef);
  //   return url;
  // };

  const handleLogOut = async (logout) => {
    if (logout) {
      setUploading(true);
      const logOut = getAuth();
      try {
        await signOut(logOut);
        setUploading(false);
        router.replace('auth/sign-in');
      } catch (error) {
        setUploading(false);
        setNotiModal(true);
        setErrorMessage(error.message);
      }
    } else {
      setModalVisible(false);
    }
};

  const toggleEdit = () => {
    if (!isEditing) {
      setTempProfileData({ ...profileData });
    }
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
      setUploading(true);
    try {
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, { ...tempProfileData }, { merge: true });

      setProfileData({ ...tempProfileData });

      setIsEditing(false);
      setNotiModal(true);
      setUploading(false);
      setSuccessMessage('Profile saved successfully!'); 
    } catch (error) {
      setIsEditing(false);
      setUploading(false);
      setNotiModal(true);
      setErrorMessage('Error saving profile');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>My Profile</Text>

      <View style={styles.profileCard}>
        <View style={styles.profileSection}>
          <TouchableOpacity>
            <View
              source={{ uri: './../../assets/images/profile-picture.jpg' }}
              style={styles.profileImage}
            ></View>
            {/* {isEditing && 
              <Feather style={styles.editPhoto} name="edit" size={24} color="white" />
            } */}
          </TouchableOpacity>
          <Text style={styles.name}>{profileData.name || 'Your Name'}</Text>
          
        </View>

        <View style={styles.detailsSection}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.disableInput]}
              placeholder="Your Name"
              value={isEditing ? tempProfileData.name : profileData.name}
              editable={isEditing}
              onChangeText={(value) => setTempProfileData({ ...tempProfileData, name: value })}
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
              value={isEditing ? tempProfileData.phoneNumber : profileData.phoneNumber}
              editable={isEditing}
              onChangeText={(value) => setTempProfileData({ ...tempProfileData, phoneNumber: value })}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nationality</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.disableInput]}
              placeholder="Your Nationality"
              value={isEditing ? tempProfileData.nationality : profileData.nationality}
              editable={isEditing}
              onChangeText={(value) => setTempProfileData({ ...tempProfileData, nationality: value })}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Religion</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.disableInput]}
              placeholder="Your Religion"
              value={isEditing ? tempProfileData.religion : profileData.religion}
              editable={isEditing}
              onChangeText={(value) => setTempProfileData({ ...tempProfileData, religion: value })}
            />
          </View>

          {isEditing && (
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={isEditing ? styles.editButton : styles.saveButton}
            onPress={toggleEdit}
          >
            <Text style={isEditing ? styles.editButtonText : styles.saveButtonText}>
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </Text>
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
      {uploading && <LoadingModal visible={uploading} />}
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
    marginTop: 60,
    backgroundColor: Colors.LIGHT_GRAY,
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
  },
  editPhoto: {
    marginTop: -40, 
    left: 80, 
    backgroundColor: 'rgba(0, 0, 0 ,0.3)',
    padding: 10,
    width: '35%',
    borderRadius: 20
  }
  
});
