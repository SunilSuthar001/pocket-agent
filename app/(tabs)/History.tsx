import { fireStoreDB } from '@/config/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { MessageCircle } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native';

type History = {
  agentId: string;
  agentName: string;
  imageBanner: string;
  message: string;
  lastModified: any;
  emoji: string;
};

const HistoryScreen = () => {
  const { user } = useUser();
  const [history, setHistory] = useState<History[]>([]);

  useEffect(() => {
    if (user) GetChatHistory();
  }, [user]);

  const GetChatHistory = async () => {
    const q = query(
      collection(fireStoreDB, 'chats'),
      where('userEmail', '==', user?.primaryEmailAddress?.emailAddress)
    );

    const querySnapShot = await getDocs(q);

    const list: History[] = [];
    querySnapShot.forEach((doc) => {
      list.push(doc.data() as History);
    });
    setHistory(list);
  };

  const renderCard = ({ item }: { item: History }) => (
    <Pressable style={styles.cardContainer}>
      <View style={styles.leftIcon}>
        {item.emoji ? (
          <Text style={styles.emoji}>{item.emoji}</Text>
        ) : (
          <MessageCircle size={28} color="#555" />
        )}
      </View>

      {/* Right content */}
      <View style={{ flex: 1 }}>
        <Text style={styles.agentName}>{item.agentName}</Text>
        <Text numberOfLines={2} style={styles.agentMessage}>
          {item.message}
        </Text>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>History</Text>

      <FlatList
        data={history}
        renderItem={renderCard}
        keyExtractor={(item) => item.agentId}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </View>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },

  header: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 15,
  },

  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 15,
    marginBottom: 12,
    borderRadius: 12,
    gap: 12,

    // soft shadow
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },

  leftIcon: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 3,
    elevation: 2,
  },

  emoji: {
    fontSize: 28,
  },

  agentName: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 4,
  },

  agentMessage: {
    fontSize: 14,
    color: '#666',
  },
});
