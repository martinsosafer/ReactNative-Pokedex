import { View, Text } from 'react-native'
import React from 'react'
import LoginForm from '../Components/Auth/LoginForm';
import UserData from '../Components/Auth/UserData';
import useAuth from '../hooks/useAuth';

export default function Account() {
  const {auth} = useAuth();
 

  return (
    <View>
      {auth ?<UserData/>:<LoginForm/>}
      
    </View>
  )
}