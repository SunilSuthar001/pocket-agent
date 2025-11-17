import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const CreateAgentBanner = () => {

  const router=useRouter();
  return (
    <TouchableOpacity onPress={() => {
      router.push('/create-agent');
    }}>
    <View style={{ padding: 16, backgroundColor: '#f0f0f0', margin: 10, borderRadius: 8 , borderWidth:1 , alignContent:'center' , justifyContent:'center' ,alignItems:'center'}}  >
      {/* <Text>CreateAgentBanner</Text> */}

    {/* <Image source={require('../../assets/images/your-image.png')} /> */}

    <Text style={{ fontSize: 16, color: '#333' }}>  
      Create Your Own Agent
    </Text>
    </View>
    </TouchableOpacity>
  )
}

export default CreateAgentBanner