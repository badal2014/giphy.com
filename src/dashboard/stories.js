import React from 'react';
import { Text, View, Image, FlatList } from 'react-native';

export const Stories = (props) => {
    console.log('props.storiesData', props.storiesData);
    return (
        <View style={{ flexDirection: 'row' }}>
            <FlatList
                ListEmptyComponent={<Text style={{ color: '#fff' }}>No Data Found</Text>}
                data={props.storiesData.filter((_, k) => k % 2 == 0)}
                renderItem={({ item, index }) => {
                    return <View key={index + Date.now()} style={{ marginBottom: 10, marginRight: 15, flex: 1 }}>
                        <Image
                            source={{ uri: item.cover_gif.gif.images.fixed_height_small.url }}
                            style={{
                                height: parseInt(item.cover_gif.gif.images.fixed_height_small.height),
                                width: '100%', marginRight: 15,
                                borderRadius: 5
                            }}
                            resizeMode={'stretch'}
                        />
                    </View>

                }}
            />
            <View style={{ flex: 1 }}>
                <FlatList
                    data={props.storiesData.filter((_, k) => k % 2 != 0)}
                    renderItem={({ item, index }) => {
                        return <View key={index + Date.now()} style={{ marginBottom: 10 }}>
                            <Image
                                source={{ uri: item.cover_gif.gif.images.fixed_height_small.url }}
                                style={{
                                    height: parseInt(item.cover_gif.gif.images.fixed_height_small.height),
                                    width: '100%',
                                    marginRight: 15,
                                    borderRadius: 5
                                }}
                                resizeMode={'stretch'}
                            />
                        </View>
                    }}
                />

            </View>
        </View>
    )
}