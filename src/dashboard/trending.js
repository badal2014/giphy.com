import React from 'react';
import { Text, View, Image, ScrollView, FlatList } from 'react-native';


export const TrendingGif = (props) => {
    return (
        <ScrollView horizontal={true}>
            <View style={{ flexDirection: 'column' }}>
                <FlatList
                    ListEmptyComponent={<Text style={{ color: '#fff' }}>No Data Found</Text>}
                    horizontal
                    data={props.trendingData.filter((_, k) => k % 2 == 0)}
                    renderItem={({ item, index }) => {
                        return <View key={index + Date.now()} style={{ marginBottom: 10, marginRight: 5, flex: 1 }}>
                            <Image source={{ uri: item.images.fixed_height_small.url }}
                                style={{
                                    height: parseInt(item.images.fixed_height_small.height),
                                    width: parseInt(item.images.fixed_height_small.width),
                                    borderRadius: 5
                                }}
                                resizeMode={'stretch'}
                            />
                        </View>
                    }}

                />
                <FlatList
                    horizontal
                    data={props.trendingData.filter((_, k) => k % 2 != 0)}
                    renderItem={({ item, index }) => {
                        return <View key={index + Date.now()} style={{ marginBottom: 10, marginRight: 5, flex: 1 }}>
                            <Image
                                source={{ uri: item.images.fixed_height_small.url }}
                                style={{
                                    height: parseInt(item.images.fixed_height_small.height),
                                    width: parseInt(item.images.fixed_height_small.width),
                                    borderRadius: 5
                                }}
                                resizeMode={'stretch'}
                            />
                        </View>

                    }}
                />
            </View>

        </ScrollView>
    )
}