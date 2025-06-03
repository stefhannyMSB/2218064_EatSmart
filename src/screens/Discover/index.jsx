import React, { useRef, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Animated,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import { SearchNormal1 } from 'iconsax-react-native';
import { ItemSmall } from '../../components';
import { fontType, colors } from '../../theme';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const tags = ['Rekomendasi', 'Diet Sehat', 'Flu', 'Batuk'];
const recentSearches = ['Diet sehat', 'Resep Sehat', 'Manfaat Buah', 'Tips Olahraga'];

const FlatListRecent = () => (
  <FlatList
    data={recentSearches}
    keyExtractor={(item, index) => index.toString()}
    horizontal
    showsHorizontalScrollIndicator={false}
    ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
    contentContainerStyle={styles.recentSearchTagsContainer}
    renderItem={({ item }) => (
      <TouchableOpacity style={styles.recentSearchTag}>
        <Text style={styles.recentSearchTagText}>{item}</Text>
      </TouchableOpacity>
    )}
  />
);

const Discover = () => {
  const navigation = useNavigation();
  const [blogs, setBlogs] = useState([]);

  const scrollY = useRef(new Animated.Value(0)).current;
  const diffClampY = Animated.diffClamp(scrollY, 0, 100);
  const headerTranslateY = diffClampY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -100],
    extrapolate: 'clamp',
  });

  // Fetch data dari API saat komponen mount
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
  try {
    const response = await axios.get('https://683d6909199a0039e9e55a0c.mockapi.io/api/blog');
    console.log('API Response:', response.data); // Tambahkan baris ini
    setBlogs(response.data);
  } catch (error) {
    console.error('Error fetching blogs:', error);
  }
};

  // Ambil beberapa artikel terbaru, misal 5 teratas
  const recentBlog = blogs.slice(0, 5);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, { transform: [{ translateY: headerTranslateY }] }]}>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('SearchPage')}>
          <View style={styles.searchBarContainer}>
            <SearchNormal1 size={20} color={colors.grey(0.5)} variant="Linear" />
            <TextInput
              placeholder="Cari artikel..."
              placeholderTextColor={colors.grey(0.5)}
              style={styles.searchInput}
            />
          </View>
        </TouchableWithoutFeedback>
        <Text style={styles.recentSearchTitle}>Pencarian Terakhir</Text>
        <FlatListRecent />
      </Animated.View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true },
        )}
        contentContainerStyle={styles.scrollViewContent}
      >
        <Text style={styles.sectionTitle}>Kategori Populer</Text>
        <FlatList
          data={tags}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.tagItem}>
              <Text style={styles.tagText}>{item}</Text>
            </TouchableOpacity>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
          contentContainerStyle={styles.tagsContainer}
        />

        <Text style={styles.sectionTitle}>Artikel Terbaru</Text>
        <View style={styles.blogList}>
          {recentBlog.length === 0 ? (
            <Text style={{ textAlign: 'center', color: colors.grey(0.7) }}>Loading...</Text>
          ) : (
            recentBlog.map((item, index) => <ItemSmall item={item} key={index} />)
          )}
        </View>
      </Animated.ScrollView>
    </View>
  );
};

export default Discover;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BDB76B',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: '#BDB76B',
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 10,
    height: 100,
    justifyContent: 'space-around',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#BDB76B',
    padding: 10,
    borderRadius: 10,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: fontType['Pjs-Medium'],
    color: colors.black(),
  },
  recentSearchTitle: {
    fontSize: 14,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.black(),
    marginTop: 10,
  },
  recentSearchTagsContainer: {
    paddingVertical: 5,
  },
  recentSearchTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: colors.grey(0.1),
  },
  recentSearchTagText: {
    fontSize: 12,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.grey(0.7),
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.black(),
    paddingHorizontal: 24,
    marginTop: 20,
    marginBottom: 10,
  },
  tagsContainer: {
    paddingHorizontal: 24,
    paddingVertical: 5,
  },
  tagItem: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: colors.grey(0.15),
    backgroundColor: '#8FBC8F',
  },
  tagText: {
    fontSize: 12,
    fontFamily: fontType['Pjs-Medium'],
    color: colors.grey(0.65),
  },
  scrollViewContent: {
    paddingTop: 100 + 20,
    paddingBottom: 20,
  },
  blogList: {
    paddingHorizontal: 24,
    gap: 15,
    marginBottom: 20,
  },
});
