import React, { useState } from "react"
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native"

export const SearchBar = (props) => {
    const [searchData, setSearchData] = useState('')

    return (
        <View style={styles.container}>
            <TextInput onChangeText={(e) => {
                if (e == '') {
                    props.onSearch('')
                }
                else setSearchData(e)
            }}
                style={styles.searchInput}
                placeholder={'Search All the GIFs and stickers'}
            />

            <TouchableOpacity
                onPress={() => props.onSearch(searchData)}
                style={styles.searchButton}>
                <Icon name={"magnify"} size={30} color={'#fff'} />
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 15,
        marginBottom: 15
    },
    searchButton: {
        flex: 1,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: "center",
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5
    },
    searchInput: {
        backgroundColor: "#fff",
        flex: 4,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        paddingHorizontal: 10
    },
});