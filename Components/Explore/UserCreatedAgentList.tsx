
import { fireStoreDB } from '@/config/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { ArrowRight } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

type Agent = {
  agentName: string;
  agentId: string;
};

const UserCreatedAgentList = () => {
  const { user } = useUser();
  const [agentList, setAgentList] = useState<Agent[]>([]);

  const router=useRouter    ();
  useEffect(() => {
    if (user) {
      getUserAgentList();
    }
  }, [user]);

  const getUserAgentList = async () => {
    if (!user) return;

    const q = query(
      collection(fireStoreDB, 'agents'),
      where('userEmail', '==', user?.primaryEmailAddress?.emailAddress)
    );
setAgentList([]);
    const querySnapshot = await getDocs(q);

    const list: Agent[] = querySnapshot.docs.map((doc) => ({
      ...(doc.data() as any),
      agentId: doc.id,
    }));

    setAgentList(list);
  };

  return (
    <View
      style={{
        marginTop: 20,
        marginBottom: 20,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
        }}
      >
        My Agent / Assistant
      </Text>

<FlatList

data={agentList}
renderItem={({item})=>{
    <TouchableOpacity onPress={()=>{
        router.push({
            pathname:'/chat',
            params:{
                agentId:item.agentId,
                agentName:item.agentName,
                agentPrompt:'',
                initialText:'',
            }
        })
    }}>
    <View style={{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        padding:10,         
        justifyContent:'space-between', 
        borderRadius:15 ,
        marginTop:10
    }}>
      <Text style={{ marginTop: 10, fontSize: 16 }}>
        {item.agentName}
      </Text>
      <ArrowRight />
    </View>
        </TouchableOpacity>
}}
/>

    </View>
  );
};

export default UserCreatedAgentList;
