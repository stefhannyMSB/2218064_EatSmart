// Tidak ada import formatDate atau formatNumber
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import FastImage from '@d11/react-native-fast-image';
import { ArrowLeft, AddSquare, Add } from 'iconsax-react-native';
import { useNavigation } from '@react-navigation/native';
import { fontType, colors } from '../../theme';
import ImagePicker from 'react-native-image-crop-picker';
import { addDoc, collection, getFirestore } from '@react-native-firebase/firestore';

const AddBlogForm = () => {
  const [loading, setLoading] = useState(false);
  const [blogData, setBlogData] = useState({
    title: '',
    content: '',
    category: {},
  });
  const [image, setImage] = useState('');
  const navigation = useNavigation();

  const dataCategory = [
    { id: 1, name: 'Rekomendasi' },
    { id: 2, name: 'Diet Sehat' },
    { id: 3, name: 'Flu' },
    { id: 4, name: 'Batuk' },
  ];

  const handleChange = (key, value) => {
    setBlogData(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleImagePick = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 1920,
        height: 1080,
        cropping: true,
      });
      setImage(image.path);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpload = async () => {
    if (!image || !blogData.title || !blogData.content || !blogData.category?.id) {
      alert('Mohon lengkapi semua data dan unggah gambar');
      return;
    }

    let filename = image.substring(image.lastIndexOf('/') + 1);
    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    setLoading(true);
    try {
      const imageFormData = new FormData();
      imageFormData.append('file', {
        uri: image,
        type: `image/${extension}`,
        name: filename,
      });

      const result = await fetch('https://backend-file-praktikum.vercel.app/upload/', {
        method: 'POST',
        body: imageFormData,
      });

      if (result.status !== 200) {
        throw new Error('Gagal upload gambar');
      }

      const { url } = await result.json();

      const db = getFirestore();
      const blogRef = collection(db, 'blog');
      await addDoc(blogRef, {
        title: blogData.title,
        category: blogData.category,
        image: url,
        content: blogData.content,
        createdAt: new Date(),
      });

      setLoading(false);
      console.log('Blog added!');
      navigation.goBack();
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert('Terjadi kesalahan saat upload');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color={colors.black()} variant="Linear" size={24} />
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={styles.title}>Write blog</Text>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingVertical: 10,
          gap: 10,
        }}>
        <View style={textInput.borderDashed}>
          <TextInput
            placeholder="Title"
            value={blogData.title}
            onChangeText={text => handleChange('title', text)}
            placeholderTextColor={colors.grey(0.6)}
            multiline
            style={textInput.title}
          />
        </View>
        <View style={[textInput.borderDashed, { minHeight: 250 }]}>
          <TextInput
            placeholder="Content"
            value={blogData.content}
            onChangeText={text => handleChange('content', text)}
            placeholderTextColor={colors.grey(0.6)}
            multiline
            style={textInput.content}
          />
        </View>
        <View style={[textInput.borderDashed]}>
          <Text style={category.title}>Category</Text>
          <View style={category.container}>
            {dataCategory.map((item, index) => {
              const isSelected = item.id === blogData.category.id;
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    handleChange('category', { id: item.id, name: item.name })
                  }
                  style={[
                    category.item,
                    {
                      backgroundColor: isSelected ? colors.black() : colors.grey(0.08),
                    },
                  ]}>
                  <Text
                    style={[
                      category.name,
                      { color: isSelected ? colors.white() : colors.grey() },
                    ]}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        {image ? (
          <View style={{ position: 'relative' }}>
            <FastImage
              style={{ width: '100%', height: 127, borderRadius: 5 }}
              source={{
                uri: image,
                headers: { Authorization: 'someAuthToken' },
                priority: FastImage.priority.high,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: -5,
                right: -5,
                backgroundColor: colors.blue(),
                borderRadius: 25,
              }}
              onPress={() => setImage(null)}>
              <Add
                size={20}
                variant="Linear"
                color={colors.white()}
                style={{ transform: [{ rotate: '45deg' }] }}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={handleImagePick}>
            <View
              style={[
                textInput.borderDashed,
                {
                  gap: 10,
                  paddingVertical: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ]}>
              <AddSquare color={colors.grey(0.6)} variant="Linear" size={42} />
              <Text
                style={{
                  fontFamily: fontType['Pjs-Regular'],
                  fontSize: 12,
                  color: colors.grey(0.6),
                }}>
                Upload Thumbnail
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </ScrollView>
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.button} onPress={handleUpload}>
          <Text style={styles.buttonLabel}>Upload</Text>
        </TouchableOpacity>
      </View>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={colors.blue()} />
        </View>
      )}
    </View>
  );
};

export default AddBlogForm;

const styles = StyleSheet.create({
  loadingOverlay: {
    flex: 1,
    backgroundColor: colors.black(0.4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: colors.white(),
  },
  header: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    elevation: 8,
    paddingTop: 8,
    paddingBottom: 4,
  },
  title: {
    fontFamily: fontType['Pjs-Bold'],
    fontSize: 16,
    color: colors.black(),
  },
  bottomBar: {
    backgroundColor: colors.white(),
    alignItems: 'flex-end',
    paddingHorizontal: 24,
    paddingVertical: 10,
    shadowColor: colors.black(),
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.blue(),
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLabel: {
    fontSize: 14,
    fontFamily: fontType['Pjs-SemiBold'],
    color: colors.white(),
  },
});

const textInput = StyleSheet.create({
  borderDashed: {
    borderStyle: 'dashed',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    borderColor: colors.grey(0.4),
  },
  title: {
    fontSize: 16,
    fontFamily: fontType['Pjs-SemiBold'],
    color: colors.black(),
    padding: 0,
  },
  content: {
    fontSize: 12,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.black(),
    padding: 0,
  },
});

const category = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  item: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 25,
  },
  name: {
    fontSize: 10,
    fontFamily: fontType['Pjs-Medium'],
  },
});
