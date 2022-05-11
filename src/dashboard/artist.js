import React from 'react';
import { Text, View, Image, ScrollView, FlatList, StyleSheet } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


export const ArtistGif = (props) => {
    return (
        <View style={{ flexDirection: 'column' }}>
            <FlatList
                onEndReached={(e) => props.artistScrollEnd(e)}
                onEndReachedThreshold={1}
                horizontal
                data={props.artistData}
                ListEmptyComponent={<Text style={{ color: '#fff' }}>No Data Found</Text>}
                renderItem={({ item, index }) => {
                    return <View key={item.id + Date.now() + index}>
                        <View style={styles.container}>
                            <Image source={{ uri: item.featured_gif.images.fixed_height_small.url }} style={{ height: parseInt(item.featured_gif.images.fixed_height_small.height + 50), width: parseInt(item.featured_gif.images.fixed_height_small.width + 50) }} resizeMode={'stretch'} />
                            <Text style={styles.displayName}>{item.display_name}</Text>
                            <View style={styles.slugContainer}>
                                <Text style={styles.slugName}>
                                    @{item.slug}
                                </Text>
                                <Icon name={"check-decagram"} color="green" size={16} />
                            </View>

                        </View>
                    </View>
                }}
            />
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        marginRight: 5,
        flex: 1
    },
    displayName: {
        marginTop: 10,
        textAlign: "center",
        fontSize: 16,
        fontWeight: '700',
        color: "#fff"
    },
    slugContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        color: "#fff"
    },
    slugName: {
        fontSize: 12,
        marginRight: 5,
        color: "#fff"
    }
});
