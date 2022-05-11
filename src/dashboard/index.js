import React, { useEffect, useState } from "react"

import {
    ScrollView,
    Text, View, FlatList, Image, StyleSheet
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ArtistGif } from "./artist";
import { Stories } from "./stories";
import { TrendingGif } from "./trending";
import { SearchBar } from "../components/searchBar";


export const Dashboard = () => {
    const [trendingData, setTrendingData] = useState({});
    const [storiesData, setStoriesData] = useState({});
    const [artistData, setArtistData] = useState('');
    const [searchata, setSearchata] = useState([]);

    useEffect(() => {
        // Trending Data Request
        fetch('https://api.giphy.com/v1/gifs/trending?api_key=ggYXPlDTKZdbaEjn8w1z22lr3inEJq6R&limit=51&rating=g')
            .then((resp) => resp.json())
            .then((data) => setTrendingData(data))

        // Stories Data Request
        fetch('https://x.giphy.com/v1/stories/trending?api_key=3eFQvabDx69SMoOemSPiYfh9FY0nzO9x&sort=desc&since=2022-05-04T19:00:00.000Z&next_cursor=12754')
            .then((resp) => resp.json())
            .then((data) => setStoriesData(data))

        // Artist Data Request
        fetch('https://giphy.com/api/v4/artists/?filter=&freelance=false&order=desc&sort=updatetime&limit=10')
            .then((resp) => resp.json())
            .then((data) => setArtistData(data))


    }, []);

    function handleInfinityScroll(event) {
        let mHeight = event.nativeEvent.layoutMeasurement.height;
        let cSize = event.nativeEvent.contentSize.height;
        let Y = event.nativeEvent.contentOffset.y;
        if (Math.ceil(mHeight + Y) >= cSize) return true;
        return false;
    }

    const searchImages = (userInput) => {
        fetch(`https://api.giphy.com/v1/channels/search?q=${userInput}&api_key=L8eXbxrbPETZxlvgXN9kIEzQ55Df04v0`)
            .then((resp) => resp.json())
            .then((data) => setSearchata(data));
    }

    const artistScrollEnd = (e) => {
        //Scroll End Artist Data
        fetch('https://giphy.com/api/v4/artists/?filter=&freelance=false&order=desc&sort=updatetime&limit=5')
            .then((resp) => resp.json())
            .then((data) => setArtistData({ results: [...data.results, ...artistData.results] }))

    }

    return (
        <View style={{
            paddingRight: 10,
            paddingLeft: 10
        }}>
            <SearchBar onSearch={(userInput) => searchImages(userInput)} />
            <ScrollView onScroll={(event) => {
                if (handleInfinityScroll(event)) {
                    fetch('https://x.giphy.com/v1/stories/trending?api_key=3eFQvabDx69SMoOemSPiYfh9FY0nzO9x&sort=desc&since=2022-05-04T19:00:00.000Z&next_cursor=12754')
                        .then((resp) => resp.json())
                        .then((data) => setStoriesData({ data: [...data.data, ...storiesData.data] }))
                }
            }}>
                {/* Search Data */}
                {(searchata.data && searchata.data.length) ? <Text style={styles.heading}>Search Result</Text> : null}
                <FlatList
                    horizontal
                    data={searchata.data}
                    renderItem={({ item, index }) => {
                        if (item.featured_gif && Object.keys(item.featured_gif).length) {
                            return <View key={item.id + Date.now() + index}>
                                <View style={{ marginBottom: 10, marginRight: 15, flex: 1 }}>
                                    <Image source={{ uri: item.featured_gif.images.fixed_height_small.url }} style={{ height: 100, width: 100, borderRadius: 5 }} resizeMode={'stretch'} />
                                </View>
                            </View>
                        }
                        return null;
                    }}
                />

                {/* Trending Gif data */}
                <Text style={styles.heading}><Icon name={"trending-up"} size={25} color={"green"} /> Trending</Text>
                <TrendingGif trendingData={Object.keys(trendingData).length ? trendingData.data : []} />

                {/* Artist Section */}
                <Text style={styles.heading}><Icon name={"filmstrip-box"} size={25} color={"green"} /> Artist</Text>
                <ArtistGif artistData={artistData.results} artistScrollEnd={(e) => artistScrollEnd(e)} />

                {/* Stories */}
                <Text style={styles.heading}><Icon name={"television-stop"} size={25} color={"green"} /> Stories</Text>
                <Stories storiesData={
                    Object.keys(storiesData).length ? storiesData.data : []
                } />
            </ScrollView>

        </View>


    )
}

const styles = StyleSheet.create({
    heading: {
        marginTop: 20,
        marginBottom: 20,
        fontSize: 20,
        fontWeight: "800",
        color: "#fff"
    },
});