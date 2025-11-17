import { AgentList } from "@/shared/AgentList";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import AgentCard from "./AgentCard";
import NonFeaturedAgentCard from "./NonFeaturedAgentCard";

const AgentListComponent = ({isFeature}:any) => {

  const router=useRouter();
  return (
    <View style={styles.container}>
      <FlatList
        data={AgentList}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={styles.columnWrapper}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          item.featured === isFeature && (
            <TouchableOpacity onPress={() => {
              router.push({
                pathname:'/chat',
                params:{
                  agentName:item.name,
                  agentDesc:item.desc,
                  agentId:item.id,
                  agentInitialText:item.initialText,
                  agentPrompt:item.prompt,
                  agentType:item.type,
                  // agentFeature:item.feature ? item  .feature.toString() : 'false',
                }
              });
            }}>
          <View style={styles.cardWrapper}>
            {
              item.featured  ? (
                <AgentCard agent={item}  key={item.id}/>
              ) : (
                <NonFeaturedAgentCard agent={item} key={item.id } />
              )
            }
          </View>
            </TouchableOpacity>
        ))}
      />
    </View>
  );
};

export default AgentListComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F4", // light neutral background
    paddingHorizontal: 12,


  },
  listContainer: {
    paddingBottom: 100,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  cardWrapper: {
    flex: 1,
    marginVertical: 4,
    marginHorizontal: 6,
  },
});


// import { AgentList } from '@/shared/AgentList'
// import React from 'react'
// import { FlatList, View } from 'react-native'
// import AgentCard from './AgentCard'

// const AgentListComponent = () => {


//     console.log('AgentList:-------------------->', AgentList);
    
//   return (
//     <View style={{ 
//       // padding: 16 , backgroundColor:'red'
//        }}>
//       <FlatList
//         data={AgentList}
//         numColumns={2}
//         renderItem={({ item, index }) => (
//           <View style={{ flex: 1, margin: 8 , padding:5 , backgroundColor:'red' }}>
//             <AgentCard
//               agent={item}
//               key={index }
//             />
//           </View>
//         )}
//         keyExtractor={item => item.id.toString()}
//       />
//     </View>
//   )
// }

// export default AgentListComponent;