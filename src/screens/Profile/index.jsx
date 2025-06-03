import React, { useEffect, useState, useCallback } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Image,
} from 'react-native';
import { Edit, Setting2 } from 'iconsax-react-native';
import { ProfileData } from '../../data'; // tetap diimport tapi nama dari sini tidak dipakai
import { ItemSmall } from '../../components';
import { useNavigation } from '@react-navigation/native';
import { fontType, colors } from '../../theme';
import { collection, getFirestore, onSnapshot } from '@react-native-firebase/firestore';

const Profile = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [blogData, setBlogData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  // URL gambar profil, ganti sesuai gambar kamu sendiri
  const profileImageUri = 'https://cdn4.iconfinder.com/data/icons/circle-avatars-1/128/050_girl_avatar_profile_woman_suit_student_officer-2-1024.png';

  useEffect(() => {
    const db = getFirestore();
    const blogRef = collection(db, 'blog');

    const subscriber = onSnapshot(blogRef, (snapshot) => {
      const blogs = [];
      snapshot.forEach((doc) => {
        blogs.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      setBlogData(blogs);
      setLoading(false);
    });

    return () => subscriber();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      const db = getFirestore();
      const blogRef = collection(db, 'blog');
      onSnapshot(blogRef, (snapshot) => {
        const blogs = [];
        snapshot.forEach((doc) => {
          blogs.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        setBlogData(blogs);
        setLoading(false);
      });

      setRefreshing(false);
    }, 1500);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>MY PROFILE</Text>
        <TouchableOpacity>
          <Setting2 color={colors.black()} variant="Linear" size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          gap: 10,
          paddingVertical: 20,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View
          style={{
            backgroundColor: colors.white(),
            borderRadius: 20,
            padding: 20,
            alignItems: 'center',
            gap: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
            elevation: 5,
          }}>
          {/* Foto Profil */}
          <Image
            source={{ uri: profileImageUri }}
            style={{ width: 80, height: 80, borderRadius: 40, marginBottom: 10 }}
          />
          <Text style={{ color: 'red', fontSize: 12 }}>Welcome</Text>
          {/* Nama diganti langsung */}
          <Text style={profile.name}>Stefhanny</Text>
          <TouchableOpacity style={profile.buttonEdit}>
            <Text style={profile.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={{ paddingVertical: 10, gap: 10 }}>
          {loading ? (
            <ActivityIndicator size={'large'} color={colors.blue()} />
          ) : (
            blogData.map((item, index) => <ItemSmall item={item} key={index} />)
          )}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('AddBlog')}>
        <Edit color={colors.white()} variant="Linear" size={20} />
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BDB76B',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  header: {
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    elevation: 8,
    paddingTop: 8,
    paddingBottom: 4,
    backgroundColor: '#d6cf91',
  },
  title: {
    fontSize: 18,
    fontFamily: fontType['Pjs-SemiBold'],
    color: colors.black(),
  },
  floatingButton: {
    backgroundColor: colors.blue(),
    padding: 15,
    position: 'absolute',
    bottom: 24,
    right: 24,
    borderRadius: 10,
    shadowColor: colors.blue(),
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});

const profile = StyleSheet.create({
  name: {
    color: colors.black(),
    fontSize: 20,
    fontFamily: fontType['Pjs-ExtraBold'],
    textAlign: 'center',
  },
  buttonEdit: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: colors.grey(0.1),
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 14,
    fontFamily: fontType['Pjs-SemiBold'],
    color: colors.black(),
  },
});
