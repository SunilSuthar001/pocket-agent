// import React from 'react';
// import { Text, View } from 'react-native';
// import { Agent } from './AgentCard';
// import { Colors } from '@/app-example/constants/theme';

import Colors from '@/shared/Colors';
import React from 'react';
import { StyleSheet, Text, View } from "react-native";
import { Agent } from './AgentCard';
type Props = {
  agent: Agent;
};

const NonFeaturedAgentCard = ({ agent }: Props) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{agent.name}</Text>
      <Text numberOfLines={2} style={styles.desc}>
        {agent.desc}
      </Text>
    </View>
  );
};

export default NonFeaturedAgentCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 14,
    minHeight: 120,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    margin: 3,

  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
    marginBottom: 6,
  },
  desc: {
    fontSize: 14,
    color: '#777',
    lineHeight: 18,
  },
});


// type props={
// agent :Agent
// }


// const NonFeaturedAgentCard = ({agent}:props) => {
//   return (
//     // <View>
//     //   <Text>NonFeaturedAgentCard</Text>
//     //   <Text>{agent.name}</Text>
//     // </View>

//      <View style={styles.card}>
//           <Text style={styles.name}>{agent.name}</Text>
//           <Text numberOfLines={2} style={styles.desc}>
//             {agent.desc}
//           </Text>
//         </View>
//   )
// }

// export default NonFeaturedAgentCard;

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: Colors.white,
//     borderRadius: 16,
//     paddingVertical: 18,
//     paddingHorizontal: 14,
//     minHeight: 120,
//     justifyContent: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 4,
//     elevation: 2,
//     margin:3

//   },
//   name: {
//     fontSize: 16,
//     fontWeight: "700",
//     color:"#222",
//     marginBottom: 6,
//   },
//   desc: {
//     fontSize: 14,
//     color:  "#777",
//     lineHeight: 18,
//   },
// });