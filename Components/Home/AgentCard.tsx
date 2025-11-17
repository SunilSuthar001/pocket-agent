import Colors from "@/shared/Colors";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
export 
type Agent = {
  name: string;
  desc: string;
  id: number;
  initialText: string;
  prompt: string;
  type: string;
  feature?: boolean;
};

type Props = {
  agent: Agent;
};

export default function AgentCard({ agent }: Props) {

  const router= useRouter();
  return (  
    <TouchableOpacity onPress={() => {
// router.push('/chat'); 


}}>
    <View style={styles.card}>
      <Text style={styles.name}>{agent.name}</Text>
      <Text numberOfLines={2} style={styles.desc}>
        {agent.desc}
      </Text>
    </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 14,
    minHeight: 120,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    margin:3,

  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    color:"#222",
    marginBottom: 6,
  },
  desc: {
    fontSize: 14,
    color:  "#777",
    lineHeight: 18,
  },
});


// import Colors from "@/shared/Colors";
// import { Text, View } from "react-native";
// type Props={
//     agent:Agent
// }
// type Agent={
//     name:String ,
//     desc:String ,
//     id:number
//     ,
//     initialText:String
// ,

// prompt:String ,
// type:String,
// feature?:Boolean
// }
// export default function AgentCard( {agent  }:Props) {
//   return (
//     <View style={{
//       backgroundColor:Colors.white ,
//       borderRadius:15,
//       minHeight:180
//     }}>
//       <View style={{
//         padding:15 
//       }}>
//         <Text style={{
//           fontSize:20 ,
//           fontWeight:"bold"
//           ,
          
          
//         }}>{agent.name}</Text>
//         <Text style={{
//           // numberOfLines:2,
//           color:'grey',
//           // color:Colors.gray ,
//           fontSize:16 ,
//         }}>{agent.desc}</Text>

//         {/* {
//           agent.image && <Image
//           source={{ uri: agent.image }}
//           style={{
//             width: '100%',
//             height: 100,
//             borderRadius: 10,
//             marginTop: 10
//           }}
//           />
//         } */}
//         </View>
//     </View>
//   );
// }   