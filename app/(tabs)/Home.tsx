import AgentListComponent from '@/Components/Home/AgentListComponent';
import CreateAgentBanner from '@/Components/Home/CreateAgentBanner';
import Colors from '@/shared/Colors';
import { useNavigation } from 'expo-router';
import { Settings } from 'lucide-react-native';
import React, { useEffect } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const Home = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: () => (
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Ai Pocket Agent</Text>
      ),
      headerTitleAlign: 'center',
      // 👇 This helps visually center the title even with headerLeft & headerRight
      headerTitleContainerStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 40, // Adjust if it still looks off on your device
      },
      headerRight: () => (
        <TouchableOpacity style={{ marginRight: 15 }}>
          <Settings color={Colors.primary} size={22} />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginLeft: 15,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
            backgroundColor: Colors.primary,
            paddingHorizontal: 10,
            borderRadius: 14,
            paddingVertical: 4,
          }}
        >
          <Image
            source={require('../../assets/images/daimond.png')}
            style={{ width: 30, height: 30 }}
          />
          <Text style={{ color: Colors.white, marginRight: 7 }}>Pro</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={{ flex: 1, 
      

     }}>
      {/* <Text>Home</Text> */}
      <AgentListComponent isFeature={false} />
      <CreateAgentBanner/>
      <AgentListComponent  isFeature={true}/>
      {/* <NonFeaturedAgentCard agent={item} key={item.id} />
       */}
{/* <NonFeaturedAgentCard /> */}
    </View>
  );
};

export default Home;
