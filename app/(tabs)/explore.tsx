import UserCreatedAgentList from '@/Components/Explore/UserCreatedAgentList'
import AgentListComponent from '@/Components/Home/AgentListComponent'
import CreateAgentBanner from '@/Components/Home/CreateAgentBanner'
import React from 'react'
import { Text, View } from 'react-native'

const Explore = () => {
  return (
    <View style={{
      padding:20,
    }}>

      <CreateAgentBanner/>
      <UserCreatedAgentList/>
      <Text style={{
        fontSize:18,
        fontWeight:'bold',
        marginTop:20,
      }}>
        Featured Agents
      </Text>
      <AgentListComponent isFeatured={true} />
   </View>
  )
}

export default Explore