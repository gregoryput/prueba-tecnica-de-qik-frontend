import React from 'react'
import { View, Text, TouchableOpacity, } from 'react-native'
import { Clapperboard, Heart, SearchIcon } from 'lucide-react-native'

export default function Nav() {
    return (
        <View className="flex w-full flex-row h-[70px] justify-between items-center p-3  ">
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
    )
}