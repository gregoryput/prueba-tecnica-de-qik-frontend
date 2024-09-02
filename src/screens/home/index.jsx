import { View, Text, TouchableOpacity, } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Clapperboard, Heart, SearchIcon } from 'lucide-react-native'
import api from '../../api/api'
import { useQuery } from '@tanstack/react-query'



export default function Home() {
  const fetchMovie = async () => {
    const response = await api.get('/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc');
    return response.data; 
  };

  const { isLoading, data, error } = useQuery({
    queryKey: ['movies'],
    queryFn: fetchGenres,
  });

  console.log(data);


  return (
    <SafeAreaView className="flex-1  bg-black">
      <View className="flex w-[100%] flex-row h-[70px] justify-between items-center p-3  ">
        <TouchableOpacity>
          <Heart size={35} color="white" />
        </TouchableOpacity>
        <View className="flex flex-row  items-center  px-3  py-1 justify-center">
          <Clapperboard color="white" size={30} />
          <Text className="text-white text-[20px] px-3">THE MOVIE</Text>
        </View>
        <TouchableOpacity>
          <SearchIcon size={35} color="white" />
        </TouchableOpacity>

      </View>

      <View className="flex  h-full">

      </View>
    </SafeAreaView>
  )
}