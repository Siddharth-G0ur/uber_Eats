import { View } from 'react-native'
import React, {useEffect, useState} from 'react'
import HeaderTabs from '../components/home/HeaderTabs'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchBar from '../components/home/SearchBar'
import Categories from '../components/home/Categories'
import { ScrollView,Alert } from 'react-native'
import RestaurantItems, { localRestaurants } from '../components/home/RestaurantItems'
import { Divider } from 'react-native-elements'
import BottomTabs from '../components/home/BottomTabs'

const YELP_API_KEY = "A9s-wyxiwHfssoxC8rLo4rUMg_HWEiP07sPIwfUuj0mpMH_nebjxZI8rpDi0QHRXxKgdRJ1En9oNo78px-11s85-e4INgfW5FX9nbQMFKt9eBjPJegRrkZnVRS9HYnYx";
export default function Home({navigation}) {
  const [restaurantData, setRestaurantData] = useState(localRestaurants);
  const [city, setCity] = useState("San Francisco");
  const [activeTab, setActiveTab] = useState("Delivery");

  const getRestaurantFromYelp = () => {
    const yelpUrl =
        `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${city}`;

    const apiOptions = {
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
      },
    };

    return fetch(yelpUrl, apiOptions)
      .then((res) => res.json())
      .then((json) => setRestaurantData(json.businesses.filter((business) => 
            business.transactions.includes(activeTab.toLowerCase())
        )
      )
    );
  };

  useEffect(() => {
    getRestaurantFromYelp();
  }, [city, activeTab])

  return (
    <SafeAreaView style={{backgroundColor: "#eee", flex: 1}}>
      <View style={{backgroundColor: "white", padding: 15}}>
        <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <SearchBar cityHandler={setCity} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Categories />
        <RestaurantItems restaurantData={restaurantData} navigation={navigation} />
      </ScrollView>
      <Divider width={1} />
      <BottomTabs />
    </SafeAreaView>
  )
}