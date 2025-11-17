import { fireStoreDB } from '@/config/FirebaseConfig';
import Colors from '@/shared/Colors';
import { useUser } from '@clerk/clerk-expo';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import { doc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';

const CreateAgent = () => {
  const navigation = useNavigation();
  const [emoji, setEmoji] = useState('🤖');
  const [isOpen, setIsOpen] = useState(false);
  const [agentName, setAgentName] = useState('');
  const [instruction, setInstruction] = useState('');
  const {user}=useUser();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Create Agent',
      headerShown: true,
    });
  }, []);


  const createNewAgent=async ()=>{
    if(!agentName || !instruction || !emoji){
Alert.alert('Error','Please fill all the fields');
return;
    }
setIsLoading(true);

    const agentID=Date.now().toString();
    await setDoc(doc(fireStoreDB,'agents',agentID),{
      id:agentID,
      agentName:agentName,
      emoji:emoji,
pormt:instruction ,

userEmail:user?.primaryEmailAddress?.emailAddress || 'unknown',
createdAt: new Date()
    } );
    Alert.alert('Confirmation','Agent created successfully' ,  
      [
        {

          text:'Ok',onPress:()=>console.log('Ok pressed'),style:'cancel'

        },
        {
          text:'Go to Agent',onPress:()=>
          {
            router.push({
              pathname:'/chat',
              params:{
                agentId:agentID,
                agentName:agentName,
                agentPrompt:instruction,
                initialText:'',
              }
            })
          }
        },
      ]
    );
    setAgentName('');
    setInstruction('');

    setIsLoading(false);

  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.background || '#fff',
        padding: 20,
      }}
    >
      {/* Emoji Picker Section */}
      <View
        style={{
          alignItems: 'center',
          marginTop: 30,
          marginBottom: 20,
        }}
      >
        <TouchableOpacity onPress={() => setIsOpen(true)}>
          <Text
            style={{
              fontSize: 50,
              backgroundColor: '#f2f2f2',
              borderRadius: 50,
              padding: 15,
              textAlign: 'center',
            }}
          >
            {emoji}
          </Text>
        </TouchableOpacity>

        {/* <Modal visible={isOpen} animationType="slide">
          <EmojiSelector
            onEmojiSelected={(emoji) => {
              setEmoji(emoji);
              setIsOpen(false);
            }}
            showSearchBar={false}
            showHistory={true}
            columns={8}
          />
        </Modal> */}
      </View>

      {/* Agent Name Input */}
      <Text style={{ fontWeight: '600', fontSize: 14, color: '#333' }}>
        Agent/Assistant Name
      </Text>
      <TextInput
        value={agentName}
        onChangeText={setAgentName}
        placeholder="Agent Name"
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 10,
          padding: 12,
          marginTop: 8,
          marginBottom: 20,
          fontSize: 16,
        }}
      />

      {/* Instruction Input */}
      <Text style={{ fontWeight: '600', fontSize: 14, color: '#333' }}>
        Instruction
      </Text>
      <TextInput
        value={instruction}
        onChangeText={setInstruction}
        placeholder="Ex. You are a professional teacher"
        multiline
        numberOfLines={4}
        textAlignVertical="top"
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 10,
          padding: 12,
          marginTop: 8,
          marginBottom: 30,
          fontSize: 16,
        }}
      />

      {/* Create Button */}
      <TouchableOpacity
        onPress={() => createNewAgent()}
        disabled={isLoading}
        style={{
          backgroundColor: Colors.primary || '#007bff',
          paddingVertical: 15,
          borderRadius: 12,
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            color: 'white',
            fontWeight: '600',
            fontSize: 16,
          }}
        >
          Create Agent
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateAgent;
