import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image, 
} from 'react-native';
import {Setting2, Edit} from 'iconsax-react-native'; 
import {BlogList} from '../../data';
import {ItemSmall} from '../../components';
import {fontType, colors} from '../../theme';
import {useNavigation} from '@react-navigation/native'; 

const data = BlogList.slice(5);

const Profile = () => {
  const navigation = useNavigation(); 
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>MY PROFILE</Text>
        <Setting2 color={colors.black()} variant="Linear" size={24} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileCard}>
          <Image
            style={styles.pic}
            source={{
              uri: 'https://png.pngtree.com/png-clipart/20221012/original/pngtree-doctor-woman-dokter-perempuan-indonesia-wanita-png-image_8679062.png',
            }}
            resizeMode="cover"
          />
          <View style={styles.textCenter}>
            <Text style={styles.welcome}>Welcome</Text>
            <Text style={styles.name}>Stefhanny Marshanda SB</Text>
          </View>
          <TouchableOpacity style={styles.buttonEdit}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Blog List */}
        <View style={styles.blogList}>
          {data.map((item, index) => (
            <ItemSmall item={item} key={index} />
          ))}
        </View>
      </ScrollView>

      {/* Floating Button */}
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
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#EEE8AA',
    elevation: 8,
  },
  title: {
    fontSize: 18,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.black(),
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  profileCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    elevation: 4,
  },
  pic: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  textCenter: {
    alignItems: 'center',
    marginTop: 10,
  },
  welcome: {
    fontSize: 12,
    fontFamily: fontType['Pjs-Regular'],
    color: '#ec5353',
  },
  name: {
    color: colors.black(),
    fontSize: 20,
    fontFamily: fontType['Pjs-Bold'],
    textTransform: 'capitalize',
  },
  buttonEdit: {
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#BDB76B',
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 14,
    fontFamily: fontType['Pjs-SemiBold'],
    color: colors.black(),
  },
  blogList: {
    paddingTop: 10,
    gap: 10,
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
