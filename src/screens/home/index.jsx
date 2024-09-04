import { View, Text, TouchableOpacity, Dimensions, ScrollView, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Clapperboard, Heart, SearchIcon, TicketX } from 'lucide-react-native'
import api from '../../api/api'
import { useQuery } from '@tanstack/react-query'
import { IMG_PATH, IMG_PATH_2 } from '../../constants/img'
import { Image, ImageBackground } from 'expo-image'
import Carousel from 'react-native-reanimated-carousel'
import { LinearGradient } from 'expo-linear-gradient'
import StarRating from 'react-native-star-rating-widget';



export default function Home({navigation }) {

  const width = Dimensions.get('window').width;
  const [rating, setRating] = useState(1);
  const fetchMovie = async () => {
    const response = await api.get('/movie/now_playing?language=en-US&page=1');
    return response.data;
  };

  const { isLoading, data, error } = useQuery({
    queryKey: ['movies'],
    queryFn: fetchMovie,
  });

  const [currentItem, setCurrentItem] = useState();

  const handleSnapToItem = (index = 0) => {
    const item = data?.results[index];
    setCurrentItem(item);
  }

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  const TextWithEllipsis = ({ text, maxLength }) => {
    return <Text>{truncateText(text, maxLength)}</Text>;
  };

  // useEffect(() => {
  //   setCurrentItem(data?.results[0])
  // }, [data])

  return (
    <SafeAreaView className="flex-1  bg-black">


      <View className="w-full h-[60%]  absolute ">
        <ImageBackground
          className="w-full h-full"
          source={{ uri: `${IMG_PATH + currentItem?.backdrop_path}` }}
          contentFit="cover"
        />
        <LinearGradient
          colors={['#000', 'transparent']}
          start={{ x: 1, y: 1 }}
          end={{ x: 1, y: 0 }}
          className="w-full h-full absolute "
        />
      </View>

      <View className="flex w-[100%] flex-row h-[70px] justify-between items-center p-5">
        <Image
          className="w-[100px] h-[100px]"
          source={`${IMG_PATH_2 + "/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg"}`}
          contentFit="cover"
        />
        <TouchableOpacity>
          <SearchIcon size={30} color="white" />
        </TouchableOpacity>

      </View>

      <View className="flex h-full w-full ">

        <Carousel
          loop
          autoPlay
          autoPlayInterval={9000}
          width={width}
          height={350}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.6,
            parallaxScrollingOffset: 10,
          }}
          data={data?.results}
          onSnapToItem={handleSnapToItem}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('Details',{id: item.id, data:item})} className='flex-1 relative'>
              <>
                <View className="w-full h-full ">
                  <Image
                    className="w-[200px] h-full  border-spacing-1  rounded-[20px]"
                    source={`${IMG_PATH}` + item.poster_path}
                    contentFit="cover"

                  />
                  <View>
                    <Text className="text-white text-[30px] font-bold mt-3">
                      {item.title}
                    </Text>
                  </View>
                </View>
                <View className=" pl-5 absolute w-full left-52">

                  <Text className="text-white text-[25px] font-bold ">
                    Estreno
                  </Text>
                  <Text className="text-white text-[20px] font-light mb-5">
                    {item.release_date}
                  </Text>
                  <Text className="text-white text-[25px] font-bold ">
                    Calificacion
                  </Text>
                  <View className="flex flex-row gap-2">
                    <StarRating
                      rating={1}
                      delay={4}
                      maxStars={1}
                    />
                    <Text className="text-white text-[25px] font-semibold mb-4">
                      {item.vote_count}
                    </Text>
                  </View>
                  <Text className="text-white text-[20px] w-[60%] text-ellipsis font-light mb-4">
                    <TextWithEllipsis text={item.overview} maxLength={80} />
                  </Text>
                </View>
              </>
            </TouchableOpacity>
          )}
        />

      </View>


      <ScrollView className="w-full h-[50%] absolute bottom-0 p-5">
        <View className="h-[270px]">
          <Text className="text-white mt-9  text-[20px]">Tendencia</Text>
          <FlatList
            contentContainerStyle={{ paddingHorizontal: 0 }}
            data={data?.results}
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <>
                <TouchableOpacity  onPress={() => navigation.navigate('Details',{id: item.id, data:item})} className="w-[110px] h-full">
                  <Image
                    className="w-[100px] h-[90%] rounded-[10px]"
                    source={{ uri: `${IMG_PATH}${item.poster_path}` }}
                    // style={{ width: 200, height: '100%' }}
                    contentFit="contain"
                  />
                  <Text className="text-white text-[10px] font-bold">
                    <TextWithEllipsis text={item.title} maxLength={17} />
                  </Text>
                </TouchableOpacity>
              </>
            )}
          />
        </View>
        <View className="h-[270px]">
          <Text className="text-white mt-5  text-[20px]">Populares</Text>
          <FlatList
            contentContainerStyle={{ paddingHorizontal: 0 }}
            data={data?.results}
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <>
                <TouchableOpacity  onPress={() => navigation.navigate('Details',{id: item.id, data:item})} className="w-[110px] h-full">
                  <Image
                    className="w-[100px] h-[90%] rounded-[10px]"
                    source={{ uri: `${IMG_PATH}${item.poster_path}` }}
                    // style={{ width: 200, height: '100%' }}
                    contentFit="contain"
                  />
                  <Text className="text-white text-[10px] font-bold">
                    <TextWithEllipsis text={item.title} maxLength={17} />
                  </Text>
                </TouchableOpacity>
              </>
            )}
          />
        </View>

      </ScrollView>

    </SafeAreaView >
  )
}
