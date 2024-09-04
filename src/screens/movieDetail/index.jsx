import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ArrowLeft, Heart } from 'lucide-react-native';
import { useQuery } from '@tanstack/react-query'
import { Image } from 'expo-image';
import { IMG_PATH, IMG_PATH_2 } from '../../constants/img';
import { LinearGradient } from 'expo-linear-gradient';
import StarRating from 'react-native-star-rating-widget';
import api from '../../api/api';


export default function MovieDetail({ route, navigation }) {
  const { id, data } = route.params;

  const fetchMovieDetails = async () => {
    const response = await api.get(`/movie/${id}?language=en-US`);
    return response.data;
  };

  const { isLoading, data: detail, error } = useQuery({
    queryKey: ['details'],
    queryFn: fetchMovieDetails,
  });

  const fetchMovieCredits = async () => {
    const response = await api.get(`/movie/${id}/credits?language=en-US`);
    return response.data;
  };

  const { isLoading: loanding, data: credit } = useQuery({
    queryKey: ['creditis'],
    queryFn: fetchMovieCredits,
  });





  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="w-full h-[60%]  absolute ">
        <Image
          className="w-full h-full"
          source={{ uri: `${IMG_PATH + data?.backdrop_path}` }}
          contentFit="cover"
        />
        <LinearGradient
          colors={['#000', 'transparent']}
          start={{ x: 2, y: 1 }}
          end={{ x: 2.3, y: 0 }}
          className="w-full h-full absolute "
        />
      </View>
      <View className="flex w-[100%] flex-row h-[70px] justify-between items-center p-5">

        <TouchableOpacity onPress={() => navigation.goBack()} >
          <ArrowLeft size={30} color="white" />
        </TouchableOpacity>

        <TouchableOpacity>
          <Heart size={30} color="white" />
        </TouchableOpacity>


      </View>

      <View className="flex flex-row w-full h-[300px] p-5">
        <View className="pr-4">
          <Image
            className="w-[150px] h-[250px]  rounded-[20px]"
            source={`${IMG_PATH}` + data.poster_path}
            contentFit="cover"

          />
        </View>
        <View className="w-[50%]">
          <Text className="text-white text-[15px] font-bold ">
            Estreno
          </Text>
          <Text className="text-white text-[15px] font-light mb-2">
            {data.release_date}
          </Text>
          <Text className="text-white text-[15px] font-bold ">
            Calificacion
          </Text>
          <View className="flex flex-row gap-2">
            <StarRating
              rating={1}
              delay={4}
              maxStars={1}
              starSize={20}
            />
            <Text className="text-white text-[15px] font-semibold mb-4">
              {data.vote_count}
            </Text>
          </View>
          <Text className="text-white text-[10px] w-full text-justify font-light mb-4">
            {data.overview}
          </Text>
          <Text className="text-white text-[10px] w-full text-justify font-light mb-4">
            {/* {detail?.resutls[0]?.genres[0]?.name} */}
          </Text>
        </View>
      </View>

      <View className="w-[400px] h-10 pl-5">
        {isLoading == false ? <>
          <FlatList
            contentContainerStyle={{ paddingHorizontal: 0 }}
            data={detail?.genres}
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <>
                <TouchableOpacity className="w-[70px] h-full border border-white justify-center items-center rounded-[20px] mx-1 px-2">
                  <Text className="text-white text-[10px] font-bold">
                    {item.name}
                  </Text>
                </TouchableOpacity>
              </>
            )}
          />
        </> : <>
          <Text className="text-white">Cargando...</Text>
        </>}
      </View>

      <View className="mt-3 p-5 w-full h-[300px]">
        <Text className="text-white text-[20px] my-2">Credits</Text>
        <FlatList
            contentContainerStyle={{ paddingHorizontal: 0 }}
            data={credit?.cast}
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <>
                <TouchableOpacity  className="w-[110px] h-full">
                  <Image
                    className="w-[100px] h-[70%] rounded-[20px]"
                    source={{ uri: `${IMG_PATH}${item.profile_path}` }}
                    // style={{ width: 200, height: '100%' }}
                    contentFit="contain"
                  />
                  <Text className="text-white text-[10px] font-extralight">
                   {item.character}
                  </Text>
                  <Text className="text-white text-[10px] font-semibold">
                   {item.original_name}
                  </Text>
                </TouchableOpacity>
              </>
            )}
          />
      </View>
    </SafeAreaView>
  )
}