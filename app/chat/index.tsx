import Colors from "@/shared/Colors";
import { ApiChatModel } from "@/shared/GlobalAPI";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Camera, Copy, Plus, Send, X } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";

import { fireStoreDB } from "@/config/FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";
import * as Clipboard from "expo-clipboard";
import * as ImagePicker from "expo-image-picker";
import { doc, setDoc } from "firebase/firestore";
import { Image } from "react-native";

const initialMessagesDummy = [
  {
    role: "user",
    content: "Hello, how can I help you today?",
  },
  {
    role: "assistant",
    content: "I'm here to assist you with any questions you may have.",
  },
];

type Message = {
  role: String;
  content: String;
};
export default function ChatUI() {
  const navigation = useNavigation();
  const { agentName, agentPromts, agentInitialText, chatId } =
    useLocalSearchParams<any>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [file, setFile] = useState<String>();
  const [input, setInput] = useState<String>();
  const [docId, setDocId] = useState<string | null>("");
  const { user } = useUser();
  useEffect(() => {
    console.log("----->", agentName);
    console.log("------->>inital mesgss", agentInitialText);

    navigation.setOptions({
      headerShown: true,
      title: agentName || "Chat",
      headerTitleAlign: "center",
      headerRight: () => (
        <TouchableOpacity style={{ marginRight: 10 }}>
          <Plus color="#000" />
        </TouchableOpacity>
      ),
    });
    if (!chatId) {
      // chatiD  not exits then need to create doc id
      const id = Date.now().toString();

      setDocId(id);
    }
  }, [navigation, agentName]);

  useEffect(() => {
    setInput(agentInitialText);
    if (agentPromts) {
      setMessages((prev) => [
        ...prev,
        {
          role: "system",
          content: agentPromts.toString(),
        },
      ]);
    }
  }, [agentPromts]);

  //   const onSendMsg=async()=>{
  //     if(!input?.trim()) return;
  //     const newMsg={role:'user' , content:input};
  // // setMessages((prev)=>[...prev ,newMsg])
  // setMessages((pre)=>[...pre, newMsg]);

  // setInput('');
  // const result =await ApiChatModel([...messages , newMsg]);
  // console.log('result---->', result.aiResponse);

  // setMessages((prev)=>[...prev ,result.aiResponse ]);
  //   };
  const onSendMsg = async () => {
    if (!input?.trim()) return;

    const newMsg = { role: "user", content: input };
    setInput("");
    setMessages((prev) => [...prev, newMsg]);

    const loadingMsg = {
      role: "assistant",
      content: "_loading.....",
    };
    setMessages((prev) => [...prev, loadingMsg]);

    try {
      const result = await ApiChatModel([...messages, newMsg]);
      console.log("result---->", result);

      // Append the assistant reply properly formatted
      // setMessages(prev => [
      //   ...prev,
      //   { role: 'assistant', content: result.aiResponse }
      // ]);

      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: result.aiResponse,
        }; //result?.aiResponse;
        return updated;
      });
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, something went wrong. Please try again.",
        },
      ]);
    }
  };

  const CopyTOClicpBord = async (msg: any) => {
    console.log("value------", msg);
    await Clipboard.setStringAsync(msg);
    alert("Copied to Clipboard !!");
    ToastAndroid.show("Copied to Clipboard !!", ToastAndroid.BOTTOM);
  };

  const PickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      // mediaTypes: ['images', 'videos'],
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5, //1, full quality
    });

    if (!result.canceled) {
      setFile(result.assets[0].uri);
      console.log("image ------>>", result);
    }
  };

  useEffect(() => {

    const saveMessges=async()=>{
      
      if (messages?.length >  0 && docId) {
  
        
        await setDoc(doc(fireStoreDB, "chats", docId || chatId || ""), {
          userEmail:user?.primaryEmailAddress?.emailAddress,
          messages: messages,
          docId: docId || chatId,
          agentName: agentName,
          agentPromts: agentPromts,
          
        },{
          merge: true, // check if doc exists then merge
        });
      }

    }

    saveMessges();

  }, [messages]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={80}
    >
      <View style={{ flex: 1, padding: 10 }}>
        {/* <Text>Chat with {agentName}</Text>
         */}

        <FlatList
          data={messages}
          renderItem={({ item, index }) =>
            item.role != "system" && (
              <View
                style={[
                  styles.messageContainer,
                  ,
                  item.role === "user" ? styles.userMsg : styles.assistantMSg,
                ]}
              >
                {item?.content == "_loading....." ? (
                  <>
                    <ActivityIndicator size={"small"} color={Colors.black} />
                  </>
                ) : (
                  <>
                    <Text
                      style={{
                        color:
                          item.role === "user" ? Colors.white : Colors.black,
                      }}
                    >
                      {" "}
                      {item.content}
                    </Text>
                  </>
                )}

                {item?.role == "assistant" && (
                  <Pressable
                    style={{
                      marginTop: 10,
                      flexDirection: "row-reverse",
                    }}
                    onPress={() => CopyTOClicpBord(item?.content)}
                  >
                    <Copy />
                  </Pressable>
                )}
              </View>
            )
          }
          keyExtractor={(item, index) => index.toString()}
        />

        <View style={{ flexDirection: "row", display: "flex" }}>
          {file && (
            <>
              <Image
                source={{
                  uri: file,
                }}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 6,
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  setFile("");
                }}
              >
                <X
                  style={{
                    marginTop: -10,
                  }}
                />
              </TouchableOpacity>
            </>
          )}
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            style={{
              // backgroundColor:Colors.primary,
              padding: 10,
              marginLeft: 10,
              borderRadius: 999,
            }}
            onPress={PickImage}
          >
            <Camera
              color={Colors.black}
              style={{
                padding: 10,
                // backgroundColor:Colors.white,
                borderRadius: 4,
              }}
            />
          </TouchableOpacity>
          <TextInput
            placeholder="Type your message..."
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 25,
              paddingHorizontal: 15,
              paddingVertical: 10,
              marginBottom: 10,
              padding: 15,
              marginHorizontal: 10,
            }}
            value={input}
            onChangeText={(value) => {
              setInput(value);
            }}
          />
          <TouchableOpacity
            style={{
              backgroundColor: Colors.primary,
              padding: 10,
              borderRadius: 999,
              justifyContent: "center",
            }}
            onPress={onSendMsg}
          >
            <Send
              color={Colors.white}
              style={{
                padding: 10,
                // backgroundColor:Colors.white,
                borderRadius: 4,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  messageContainer: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    maxWidth: "75%",
    margin: 10,
  },
  userMsg: {
    backgroundColor: Colors.primary,
    alignSelf: "flex-end",
    borderBottomRightRadius: 2,
    padding: 12,
  },
  assistantMSg: {
    backgroundColor: "#e0e0e0",
    alignSelf: "flex-start",
    borderBottomLeftRadius: 2,
    padding: 12,
  },
});
