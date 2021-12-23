import React, {useEffect, useState} from 'react';
import {
  Text,
  TextInput,
  SafeAreaView,
  View,
  TouchableOpacity,
  Button,
  FlatList,
  Image,
} from 'react-native';
import styles from '../styles';
import endpoints from '../endpoints';

const Album = props => {
  const [album, setAlbum] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [albumPhotos, setAlbumPhotos] = useState([]);
  const [item, setItem] = useState({});
  const [onePic, setOnePic] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [fullPicMode, setFullPicMode] = useState(false);
  const getAlbum = () => {
    fetch(endpoints.getAlbum, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        setAlbum(responseJson);
        console.log(responseJson[0]);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getPhotos = () => {
    fetch(endpoints.getPhotos, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        setPhotos(responseJson);
        console.log(responseJson[0]);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const getAlbumPhotos = id => {
    let list = photos;
    let albumPhotos = list.filter(photo => photo.albumId == id);
    setAlbumPhotos(albumPhotos);
  };
  const renderItem = item => {
    return (
      <TouchableOpacity
        onPress={() => {
          getAlbumPhotos(item.item.id);
          setItem(item.item)
          setModalOpen(true);
        }}>
        <View style={[styles.card, {height: 'auto'}]}>
          <Text style={styles.title}>{item.item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  const renderPhotos = item => {
    return (
      <TouchableOpacity
        onPress={() => {
          setOnePic(item.item);
          setFullPicMode(true);
        }}>
        <Image
          source={{uri: item.item.thumbnailUrl}}
          style={styles.thumbnail}
        />
      </TouchableOpacity>
    );
  };
  useEffect(() => {
    getAlbum();
    getPhotos();
  }, []);

  return (
    <SafeAreaView style={[styles.container]}>
      {!modalOpen && !fullPicMode ? (
        <View style={[styles.container, styles.centerAlign]}>
          <FlatList data={album} renderItem={renderItem} />
        </View>
      ) : !fullPicMode ? (
        <View style={[styles.container, styles.centerAlign]}>
          <Button title={'Close'} onPress={() => setModalOpen(false)} />
          <FlatList
            ListHeaderComponent={<View><Text style={[styles.title,{width:'90%',alignSelf:'center'}]}>{item.title}</Text></View>}
            contentContainerStyle={styles.thumbnailsView}
            numColumns={5}
            data={albumPhotos}
            renderItem={renderPhotos}
          />
        </View>
      ) : (
        <View>
          <Button title={'Close'} onPress={() => setFullPicMode(false)} />
          <Image source={{uri: onePic.url}} style={styles.fullImage} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Album;
