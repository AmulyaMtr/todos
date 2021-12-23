import React, {useEffect, useState} from 'react';
import {
  Text,
  TextInput,
  SafeAreaView,
  View,
  Button,
  FlatList,
} from 'react-native';
import styles from '../styles';
import endpoints from '../endpoints';

const Tasks = props => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const userId = props.route.params.userId;
  const [count, setCount] = useState(0);

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = id => {
    fetch(endpoints.getTodos + 1, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        setTodos(responseJson);
        console.log(responseJson[0]);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const setCompleted = (id)=>{
    let todosList = todos;
    let oneTodo = todosList.filter(item=>item.id == id)[0];
    oneTodo = {
      id: id,
      completed: true,
      title: oneTodo.title,
      userId: oneTodo.userId,
    };
    let index = todosList.findIndex(item=>item.id == id);

    todosList.splice(index, 1, oneTodo);
    console.log('todoList', todosList[0]);
    setTodos(todosList);
    setCount(count+1);
    fetch(endpoints.updateTask + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(oneTodo),
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log('response ', responseJson);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const renderItem = item => {
    return (
      <View key={item.item.id + "view"} style={[styles.card,{height:'auto',backgroundColor:item.item.completed?'#c4fadf':'#f2dfda'}]}>
        <Text key={item.item.id + "text"} style={styles.title}>{item.item.title}</Text>
        {!item.item.completed ? (
          <Button
            title={'Done'}
            key={item.item.id + 'button'}
            onPress={() => {
              setCompleted(item.item.id);
            }}
          />
        ) : null}
      </View>
    );
  };
  const addTask = ()=>{
    let todosList = todos;
    let id = todos.length+1;
    if (task != ''){
      let oneTodo={
        id,
        completed: false,
        title: task,
        userId: userId,
      }
      todosList.push(oneTodo);
      alert('Successfully added Task');
      fetch(endpoints.addTask, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(oneTodo),
      })
        .then(response => response.json())
        .then(responseJson => {
          console.log('response ', responseJson);
        })
        .catch(err => {
          console.log(err);
        });
      setTodos(todosList);
      setTask('');
    }else{
      alert('Please enter task')
    }
  };
  const listHeader = ()=>{
    return (
      <View key={'textInputView'}>
        <TextInput
          style={[styles.textInput, {width: 200}]}
          placeholder={'Todo'}
          value={task}
          onChangeText={text => setTask(text)}
        />
        <Button
          title={'Add Task'}
          onPress={() => {
            addTask();
          }}
        />
        <Text style={[styles.title, {alignSelf: 'center'}]}>Todos List</Text>
      </View>
    );
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.container, styles.centerAlign]}>
        {listHeader()}
        <FlatList
          data={todos}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{paddingBottom: 50}}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  );
};

export default Tasks;
