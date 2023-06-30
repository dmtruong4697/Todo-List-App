import { StyleSheet, Text, View, SafeAreaView, Pressable } from "react-native";
import React from "react";
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {app, db, collection, addDoc, getFirestore, getDoc, getDocs, doc, querySnapshot, deleteDoc, updateDoc} from '../firebase/db';

const Item = (props) => {

    const iconName = props.isChecked ? "checksquare" : "checksquareo";

    const [isChecked, setIsChecked] = useState(props.isChecked);

    const updateIsChecked = async() => {
        const ItemRef = doc(db, "item", props.id);
        await updateDoc(ItemRef, {
            isChecked: !isChecked
          });
          setIsChecked(!isChecked);
          props.onRefresh();
    }


    const deleteItem = async() => {
        await deleteDoc(doc(db, "item", props.id));
        props.onRefresh();
    }

    return (
        <View style={styles.container}>
            <Pressable onPress={updateIsChecked}>
                <AntDesign name={iconName} size={24} color="black" />
            </Pressable>
            <Text style={styles.title}>{props.title}</Text>
            <Pressable style={styles.delete} onPress={deleteItem}>
                <MaterialIcons name="delete" size={24} color="black" />
            </Pressable>
        </View>
    );
};

export default Item;

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        backgroundColor: 'lightgrey',
        alignSelf: 'center',
        width: '90%',
        alignItems: 'center',
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
        
    },

    title:{
        fontSize: 20,
        flex: 1,
        marginLeft: 10,
    },

    delete: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2
    }
});