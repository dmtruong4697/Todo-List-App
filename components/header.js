import { StyleSheet, Text, View, SafeAreaView, Pressable } from "react-native";
import React from "react";
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons';

const Header = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Todo List</Text>
            <Text style={styles.num}>{props.num}</Text>
            <Pressable onPress={props.onDeleteAll}>
                <Text style={styles.delete}>Clear all</Text>
            </Pressable>
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        alignSelf: 'center',
        width: '90%',
        alignItems: 'center',
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
        
    },

    title:{
        fontSize: 30,
        flex: 1,
        marginLeft: 10,
        fontWeight: 'bold'
    },

    delete: {
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },

    num: {
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'red',
        marginRight: 10,
    }
});