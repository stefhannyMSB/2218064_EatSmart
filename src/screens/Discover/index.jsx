import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
} from 'react-native';
import {SearchNormal1} from 'iconsax-react-native';
import {BlogList} from '../../data';
import {ItemSmall} from '../../components';
import {fontType, colors} from '../../theme';

const tags = ['Rekomendasi', 'Diet Sehat', 'Flu', 'Batuk'];

const Discover = () => {
  const recentBlog = BlogList.slice(5);

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <SearchNormal1 size={18} color={colors.grey(0.5)} variant="Linear" />
          <Text style={styles.placeholder}>Search</Text>
        </View>
      </View>

      {/* Recent Tags */}
      <Text style={styles.recentTitle}>Recent Search</Text>
      <FlatList
        data={tags}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View style={styles.tagItem}>
            <Text style={styles.tagText}>{item}</Text>
          </View>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{width: 10}} />}
        contentContainerStyle={{paddingHorizontal: 24, paddingVertical: 10}}
      />

      {/* Blog List */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.blogList}>
          {recentBlog.map((item, index) => (
            <ItemSmall key={index} item={item} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Discover;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BDB76B',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 4,
    height: 52,
    justifyContent: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8FBC8F',
    padding: 10,
    borderRadius: 10,
    gap: 10,
  },
  placeholder: {
    fontSize: 14,
    fontFamily: fontType['Pjs-Medium'],
    color: colors.grey(0.5),
  },
  recentTitle: {
    fontSize: 14,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.black(),
    paddingHorizontal: 24,
    paddingTop: 10,
  },
  tagItem: {
    paddingHorizontal: 15,
    paddingVertical: 5,
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
  blogList: {
    paddingHorizontal: 24,
    paddingBottom: 10,
    gap: 10,
  },
});
