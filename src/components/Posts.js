import React, {useEffect, useState} from 'react';
import {
  Text,
  TextInput,
  SafeAreaView,
  View,
  TouchableOpacity,
  Button, FlatList,
  Modal
} from "react-native";
import styles from '../styles';
import endpoints from '../endpoints';

const Posts = props => {

  const [posts, setPosts] = useState([]);
  const [postComments, setPostComments] = useState([]);
  const [post, setPost] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const getPosts = () => {
    fetch(endpoints.getPosts, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((response)=>response.json())
      .then((responseJson)=>{
        setPosts(responseJson)
        console.log(responseJson[0]);
      }).catch(err=>{
      console.log(err)
    });
  };

  const getPostComments = (id) => {

    fetch(endpoints.getPostComments+id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }

    }).then((response)=>response.json())
      .then((responseJson)=>{
        setPostComments(responseJson)
        setModalOpen(true)
        console.log(responseJson[0]);
      }).catch(err=>{
      console.log(err)
    });
  };
  const renderItem=(item)=>{
    return(
      <TouchableOpacity onPress={()=> {
        setPost(item.item)
        getPostComments(item.item.id);
      }}>
        <View style={styles.card}>
          <Text style={styles.title}>{item.item.title}</Text>
          <Text>{item.item.body}</Text>
        </View>

      </TouchableOpacity>
    )
  }
  const renderComments=(item)=>{
    return(
        <View style={[styles.card]}>
          <Text style={styles.title}>{item.item.title}</Text>
          <Text>{item.item.body}</Text>
        </View>
    )
  }
  useEffect(()=>{
    getPosts()
  },[])

  return (
    <SafeAreaView style={[styles.container,]}>
      <View style={[styles.container, styles.centerAlign]}>
        <FlatList data={posts} renderItem={renderItem} />
      </View>
      {
        modalOpen?
          <View>
            <Button title={'Close'} onPress={()=>setModalOpen(false)}/>
            <FlatList
                ListHeaderComponent={<View><Text style={[styles.title,{width:'90%',alignSelf:'center'}]}>{post.title}</Text>
                  <Text></Text>
                  <Text style={[styles.title,{width:'90%',alignSelf:'center'}]}>Comments</Text>
                </View>}
              data={postComments} renderItem={renderComments} />
          </View>
          :null
      }

    </SafeAreaView>
  );
};

export default Posts;
