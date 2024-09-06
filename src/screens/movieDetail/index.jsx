import { View, Text, TouchableOpacity, FlatList, VirtualizedList, Modal } from 'react-native'
import react, { useState, useEffect } from "react";
import { SafeAreaView } from 'react-native-safe-area-context'
import { ArrowLeft, Heart, Star, X, } from 'lucide-react-native';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Image } from 'expo-image';
import { IMG_PATH } from '../../constants/img';
import { LinearGradient } from 'expo-linear-gradient';
import StarRating from 'react-native-star-rating-widget';
import api from '../../api/api';
import * as Progress from 'react-native-progress';
import * as NavigationBar from 'expo-navigation-bar';
import { QueryClient } from 'react-query';

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
      {loanding == true || isLoading == true ? <>
        <View className="w-full h-full flex-1 justify-center items-center">
          <Progress.CircleSnail size={60} indeterminate={true} color="red" />
        </View>
      </> : <>
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
              Premiere
            </Text>
            <Text className="text-white text-[15px] font-light mb-2">
              {data.release_date}
            </Text>
            <Text className="text-white text-[15px] font-bold ">
              Votes
            </Text>
            <View className="flex flex-row  gap-4 justify-center mb-3">

              <Text className="text-white text-[15px] font-semibold">
                {data.vote_count}
              </Text>
              <ModalRating id={id} />
            </View>

            <Text className="text-white text-[10px] w-full text-justify font-light">
              {data.overview}
            </Text>

          </View>
        </View>

        <View className="w-[400px] h-10 pl-5">

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
        </View>

        <View className="mt-3 p-5 w-full h-[300px]">
          <Text className="text-white text-[20px] my-2">Credits</Text>
          <FlatList
            contentContainerStyle={{ paddingHorizontal: 0 }}
            data={credit?.cast}
            horizontal
            initialNumToRender={5}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <>
                <TouchableOpacity className="w-[110px] h-full">
                  {item.profile_path != null || item.profile_path != undefined ? <>
                    <Image
                      className="w-[100px] h-[70%] rounded-[20px]"
                      source={{ uri: `${IMG_PATH}${item.profile_path}` }}
                      // style={{ width: 200, height: '100%' }}
                      contentFit="contain"
                    />
                  </> : <>
                    <Image
                      className="w-[100px] h-[70%] rounded-[20px]"
                      source={{ uri: `${IMG_PATH}/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg` }}
                      // style={{ width: 200, height: '100%' }}
                      contentFit="contain"
                    />
                  </>}
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
      </>}
    </SafeAreaView>
  )
}




const ModalRating = ({ id }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const queryClient = useQueryClient();

  const InsertRating = async (data) => {
    const { data: response } = await api.post(`/movie/${id}/rating`, data);
    return response;
  };

  const mutationRating = useMutation({
    mutationFn: InsertRating,
    onSuccess: (data) => {
      console.log("Data received in postRating:", data);
      setModalVisible(!modalVisible);
      queryClient.invalidateQueries({ queryKey: ['details','topRated','popular','movies'] })
    }
  })


  const postRating = () => {
    let dataJson = {
      "value": rating
    }


    mutationRating.mutate(dataJson)
  }


  return (
    <View className="flex-1">
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View className="flex-1 justify-center items-center">

          <View className="bg-black justify-center items-center rounded-lg p-8 shadow-lg w-[300px] h-[200px]">
            <TouchableOpacity
              className=" rounded-lg p-3 mt-2  absolute right-0 top-0"
              onPress={() => setModalVisible(!modalVisible)}
            >

              <X size={25} color="white" />

            </TouchableOpacity >
            <Text className="text-white text-[20px] mb-5">Qualification {rating}</Text>
            <StarRating
              rating={rating}
              delay={4} // Delay si deseas un efecto de espera, puedes ajustarlo según tus necesidades
              maxStars={5} // Número de estrellas
              starSize={30} // Tamaño de las estrellas
              onChange={(newRating) => setRating(newRating)} // Actualiza la calificación cuando se presiona
            />
            <TouchableOpacity
              className=" rounded-lg p-3 mt-4"
              onPress={() => postRating()}
            >

              <Text className="text-white font-bold text-center">Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        className="flex flex-row gap-3 w-[100px] h-[40px] ml-4"
        onPress={() => setModalVisible(true)}
      >
        <Star size={25} color="white" />
      </TouchableOpacity>
    </View>
  );
};