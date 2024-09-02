import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import AppNav from "./appNav";
import AuthNav from "./authNav";

const Stack = createNativeStackNavigator();

export default function LayoutNav() {
  let token = true;
  return (
    <NavigationContainer>
      {token === true ? <AppNav /> : <AuthNav />}
    </NavigationContainer>
  );
}