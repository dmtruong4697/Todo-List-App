import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Pressable, FlatList, ActivityIndicator, ScrollView, KeyboardAvoidingView, Modal } from 'react-native';
import Item from './components/Item'; 
import Header from './components/header';
import { useEffect, useState } from 'react';
import {app, db, collection, addDoc, getFirestore, getDoc, getDocs, doc, querySnapshot, deleteDoc} from './firebase/db';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export default function App() {

  const [title,setTitle] = useState("");
  const [listItem,setListItem] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const addItem = async () => {
    try {
      const docRef = await addDoc(collection(db, "item"), {
        title: title,
        isChecked: false,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setTitle('');
    getItemList();
  };

  const getItemList = async () => {
    const querySnapshot = await getDocs(collection(db, "item"));
    const items = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setListItem(items);
  };
  
  const onPressSubmit = () => {
    addItem();
    setModalVisible(!modalVisible);
  }

  const deleteItemList = async() => {
    const querySnapshot = await getDocs(collection(db, "item"));
    querySnapshot.docs.map((item) => deleteDoc(doc(db, "item", item.id)) );
    getItemList();
}

  useEffect (() => {
    getItemList();
  }, []);

  return (
    <SafeAreaView>
      <Header num={listItem.length} 
        onDeleteAll={deleteItemList}
      />
      {
        listItem.length > 0? (
      <FlatList 
        style={styles.itemList}
        data={listItem}
        renderItem={({item}) => <Item 
        id={item.id}
        title={item.title} 
        isChecked={item.isChecked}
        onRefresh={getItemList}
        />}
        keyExtractor={item=>item.id}
      />)
      : (
        <Text style={styles.nothing}>You have nothing to do ＼(^o^)／</Text>
      )
      }

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <TextInput placeholder='...' 
            value={title} 
            onChangeText={(text)=>setTitle(text)}
            onSubmitEditing={addItem}
            autoFocus
          ></TextInput>
          <View style={styles.modalButton}>
            <Pressable
              onPress={onPressSubmit}>
              <Ionicons name="add-circle" size={40} color="black" />
            </Pressable>

            <Pressable
              onPress={() => setModalVisible(!modalVisible)}>
              <MaterialIcons name="cancel" size={38} color="black" />
            </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Pressable
        onPress={() => setModalVisible(true)}>
        <Ionicons style={styles.addButton} name="add-circle" size={85} color="black" />
      </Pressable>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  inputfield: {
    flexDirection: 'row',
    //alignItems: 'center',
    // justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
    paddingHorizontal: 10,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
    
  },
  modalView: {
    flexDirection: 'row',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
    justifyContent: 'space-between',
  },

  addButton: {
    alignSelf: 'center',
  },

  itemList: {
    // backgroundColor: 'red',
    height: '75%',
  },

  modalButton: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
  },

  nothing: {
    alignSelf: 'center',
        justifyContent: 'center',
        fontSize: 20,
        fontWeight: '500',
        marginTop: 30,
        marginBottom: 30,
  }
});


