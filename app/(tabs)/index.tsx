import { FlatList, Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {Ionicons} from '@expo/vector-icons';
import { Header } from "react-native/Libraries/NewAppScreen";
import { SearchBar } from "react-native-screens";
import {Checkbox} from 'expo-checkbox';

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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {alert('clicked!')}}>
           <Ionicons name="menu" size={24} color={'#333'} />
        </TouchableOpacity> 
        <TouchableOpacity onPress={() => {}}>
        <Image 
        source={{uri: 'https://xsgames.co/randomusers/avatar.php?g=male'}} 
        style={{width:40, height:40, borderRadius:20}} />
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
       data = {todoData} 
       keyExtractor={(item) => item.id.toString()} 
       renderItem={({ item }) => (  
        <ToDoItem todo={item}/>
      )}  
      />

    <KeyboardAvoidingView 
          style={styles.footer}
          behavior="padding" 
          keyboardVerticalOffset={48}>
      <TextInput placeholder="Add New ToDo" placeholderTextColor={"gray"} style={styles.newTodoInput}  />
      <TouchableOpacity style={styles.addButton} onPress={() => {}}>
        <Ionicons name="add" size={34} color={'#fff'} />
      </TouchableOpacity>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const ToDoItem = ({todo} : {todo: ToDoType}) => (
  <View style={styles.todoContainer}>
          <View style={styles.todoInfoContainer}>
          <Checkbox 
          value={todo.isDone} 
          color={todo.isDone ? "#1dbd14ff" : undefined}
          />
          <Text style={[styles.todoText, todo.isDone && {textDecorationLine:'line-through'}]}>
                {todo.title}</Text>
        </View> 
          <TouchableOpacity 
            onPress={() => {
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
    marginBottom:20,
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