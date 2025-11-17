

import { SignedOut } from "@clerk/clerk-expo";
import { router } from "expo-router";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Profile() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>

        {/* Header */}
        <Text style={styles.header}>Profile</Text>

        {/* Avatar + Email */}
        <View style={styles.avatarBox}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>S</Text>
          </View>
          <Text style={styles.email}>gameplayapp007@gmail.com</Text>
        </View>

        {/* Menu Items */}
        <TouchableOpacity style={styles.item}>
          <Text style={styles.icon}>＋</Text>
          <Text style={styles.itemText}>Create Agent</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <Text style={styles.icon}>🧭</Text>
          <Text style={styles.itemText}>Explore</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <Text style={styles.icon}>🕒</Text>
          <Text style={styles.itemText}>My History</Text>
        </TouchableOpacity>

        <TouchableOpacity 
        
        onPress={async()=> {
          await SignedOut();
          router.replace('/');
        }}
        style={[styles.item, { borderBottomWidth: 0 }]}>
          <Text style={[styles.icon, { color: "red" }]}>⎋</Text>
          <Text style={[styles.itemText, { color: "red" }]}>Logout</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 20,
  },
  avatarBox: {
    alignItems: "center",
    marginBottom: 30,
  },
  avatarCircle: {
    width: 90,
    height: 90,
    borderRadius: 50,
    backgroundColor: "#0A7C5F",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 40,
    color: "#fff",
  },
  email: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderColor: "#ececec",
  },
  icon: {
    fontSize: 22,
    width: 30,
  },
  itemText: {
    fontSize: 16,
    marginLeft: 10,
  },
});
