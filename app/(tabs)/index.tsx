import { FlatList, Image, Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {Ionicons} from '@expo/vector-icons';
import { Header } from "react-native/Libraries/NewAppScreen";
import { SearchBar } from "react-native-screens";
import {Checkbox} from 'expo-checkbox';
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ToDoType ={
  id: number;
  title:string;
  isDone:boolean;
}

export default function Index(){

  const todoData = [
    {
      id:1,
      title:"Todo 1",
      isDone: false,
    },
        {
      id:2,
      title:"Todo 2",
      isDone: false,
    },
        {
      id:3,
      title:"Todo 3",
      isDone: true,
    },
        {
      id:4,
      title:"Todo 4",
      isDone: false,
    },
        {
      id:5,
      title:"Todo 5",
      isDone: false,
    },
        {
      id:6,
      title:"Todo 6",
      isDone: false,
    },
  ];

  const [todos,setTodos] = useState<ToDoType[]>([]);
  const [todoText, setTodoText] = useState<string>("");

  useEffect(() => {
    const getTodos = async() => {
      try {
        const todos = await AsyncStorage.getItem('my-todo');
        if( todos !== null) {
          setTodos(JSON.parse(todos));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getTodos();
  }, []);

  const addTodo = async() => {
    try {
    const newTodo= {
      id: Math.random(),
      title: todoText,
      isDone:false,
    };
    todos.push(newTodo);
    setTodos(todos);
    await AsyncStorage.setItem("my-todo",JSON.stringify(todos));
    setTodoText("");
    Keyboard.dismiss();
  } catch (error){
    console.log(error);
  }
  };

  const deleteTodo= async(id: number) => {
    try {
      const newTodos = todos.filter((todo) => todo.id !== id);
      await AsyncStorage.setItem("my-todo",JSON.stringify(newTodos));
      setTodos(newTodos);
    } catch(error) {
      console.log(error);
    }
  };

  const handledone = async (id: number) => {
    try {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          todo.isDone = !todo.isDone;
        }
        return todo;
      }); 
      await AsyncStorage.setItem("my-todo",JSON.stringify(newTodos));
      setTodos(newTodos);
    } catch(error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {alert('clicked!')}}>
           <Ionicons name="menu" size={24} color={'#333'} />
        </TouchableOpacity> 
        <TouchableOpacity onPress={() => {}}>
        <Image 
        source={{uri: 'https://scontent.fcmb2-2.fna.fbcdn.net/v/t39.30808-6/481051954_1160194058826328_8007575794699909124_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=EgStiRlTUssQ7kNvwHgpg4Y&_nc_oc=AdnWGCbuVIMRlZAojgCSmiAdX3QbYQLYxmlBISCsDIgaI2AYEhG4aN9AZxMygrG1kmU&_nc_zt=23&_nc_ht=scontent.fcmb2-2.fna&_nc_gid=mu3MQybBHWiCB8VOyO9Aew&oh=00_AfRJerkWK9rzmwyyt1TdR8IQojT1BE9gl9FN0P1u_xrAYA&oe=687DA884'}} 
        style={{width:46, height:46, borderRadius:30}} />
        </TouchableOpacity>
      </View>

      <View style={styles.SearchBar}>
         <Ionicons name="search" size={24} color={'#333'} />
         <TextInput 
         placeholder="Search" placeholderTextColor={"gray"}
         style={styles.SearchInput} 
         clearButtonMode="always"/>
      </View>

      <FlatList
       data = {[...todos]} 
       keyExtractor={(item) => item.id.toString()} 
       renderItem={({ item }) => (  
        <ToDoItem todo={item} 
        deleteTodo={deleteTodo} 
        handleTodo={handledone}
        />
      )}  
      />

    <KeyboardAvoidingView 
          style={styles.footer}
          behavior="padding" 
          keyboardVerticalOffset={48}>
      <TextInput 
      placeholder="Add New ToDo" 
      placeholderTextColor={"gray"}
      value={todoText}
      onChangeText={(text) => setTodoText(text)}
      style={styles.newTodoInput}
      autoCorrect={false}  />
      <TouchableOpacity style={styles.addButton} onPress={() => addTodo()}>
        <Ionicons name="add" size={34} color={'#fff'} />
      </TouchableOpacity>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const ToDoItem = ({ 
  todo, 
  deleteTodo,
  handleTodo,
 } : {
  todo: ToDoType;
  deleteTodo: (id: number) => void;
  handleTodo: (id: number) => void;
}) => (
  <View style={styles.todoContainer}>
          <View style={styles.todoInfoContainer}>
          <Checkbox 
          value={todo.isDone} 
          onValueChange={() => handleTodo(todo.id)}
          color={todo.isDone ? "#1dbd14ff" : undefined}
          />
          <Text style={[styles.todoText, todo.isDone && {textDecorationLine:'line-through'}]}>
                {todo.title}</Text>
        </View> 
          <TouchableOpacity 
            onPress={() => {
            deleteTodo(todo.id);
            alert('Deleted ' + todo.id);
            }}
            >
            <Ionicons name="trash" size={24} color={'red'} />
          </TouchableOpacity>
      </View>
)

const styles = StyleSheet.create({
  container: {
        flex: 1,
        paddingHorizontal:20,
        backgroundColor:'#ffffffff',  
  },
  header: {
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginBottom:9,
  },
  SearchBar: {
    backgroundColor:'#7dcaee93',
    flexDirection:'row',
    padding:12,
    borderRadius:12,
    gap:12,
    marginBottom:30
  },
  SearchInput: {
    flex:1,
    fontSize:16,
    color:'#333',
  },
  todoContainer: {
    backgroundColor: '#c8e6f0a2',
    padding: 15,
    borderRadius: 12,
    marginBottom: 21,
    flexDirection:'row',
    justifyContent:'space-between',
  },
  todoInfoContainer: {
    flexDirection: 'row',
    gap:12,
    alignItems:'center',
  },
  todoText: {
    fontSize:16,
    color:'black',
  },
  footer: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
  },
  newTodoInput: {
    flex:1,
    backgroundColor:'#7dcaee93',
    padding:15,
    borderRadius:12,
    fontSize:16,
    color:'black',
  },
  addButton: {
    backgroundColor:'#306bebd7',
    padding:7.5,
    borderRadius:12,
    marginLeft:18,
  }
});