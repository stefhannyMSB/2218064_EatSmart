import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {Setting2} from 'iconsax-react-native';
import FastImage from '@d11/react-native-fast-image';
import {BlogList} from '../../data';
import {ItemSmall} from '../../components';
import {fontType, colors} from '../../theme';

const data = BlogList.slice(5);

const Profile = () => (
  <View style={styles.container}>
    {/* Header */}
    <View style={styles.header}>
      <Text style={styles.title}>MY PROFILE</Text>
      <Setting2 color={colors.black()} variant="Linear" size={24} />
    </View>

    {/* Content */}
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}>

      {/* Profile Card */}
      <View style={styles.profileCard}>
        <FastImage
          style={styles.pic}
          source={{
            uri: 'https://png.pngtree.com/png-clipart/20221012/original/pngtree-doctor-woman-dokter-perempuan-indonesia-wanita-png-image_8679062.png',
            headers: {Authorization: 'someAuthToken'},
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.cover}
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
  </View>
);

export default Profile;

// Styles
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
});
