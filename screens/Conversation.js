import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { Stack, TextInput, IconButton } from '@react-native-material/core';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Constants from '../Constants';
import { getProfile, getData } from '../services/userService';
import { getMessages, sendMessage } from '../services/messageService';

const adminData = {
  id: 'ExNr00GVAEcfu2oBpouqbsRoIvt2',
  email: 'support@contoso.ca',
  displayName: 'Support',
};

export default function Home() {
  const [userData, setUserData] = useState();
  const [idToken, setIdToken] = useState();
  const [chatMessage, setChatMessage] = useState();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const getUserData = async () => {
      const tokenData = await getData();
      if (tokenData && tokenData.idToken) {
        const userProfile = await getProfile(tokenData.idToken);
        setUserData(userProfile.users[0]);
        setIdToken(tokenData.idToken);
      }
    };

    getUserData();
  }, []);

  useEffect(() => {
    (async () => {
      if (userData?.localId) {
        const conversations = await getMessages(userData.localId, adminData.id);
        // alert(JSON.stringify(conversations, null, 2))
        setMessages(conversations.data || []);
      }
    })();
  }, [userData]);

  const renderMessageItem = ({ item }) => {
    if (!userData) return;

    const msgBoxStyle =
      item['from'].id === userData.localId
        ? styles.messageRight
        : styles.messageLeft;

    return (
      <View style={msgBoxStyle}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontWeight: 'bold' }}>{item.from.displayName} </Text>
          <Text>{item.date.toLocaleDateString()}</Text>
        </View>
        <Text>{item.content}</Text>
      </View>
    );
  };

  const sendChatMessage = async () => {
    const messageToSend = {
      from: {
        id: userData.localId,
        email: userData.email,
        displayName: userData.displayName,
      },
      to: adminData,
      content: chatMessage,
      date: new Date(),
    };

    // Message envoyé par l'utilisateur connecté
    await sendMessage(
      userData.localId,
      messageFrom(adminData.id, messageToSend)
    );

    // Message reçu par l'autre utilisateur
    await sendMessage(
      adminData.id,
      messageFrom(userData.localId, messageToSend)
    );

    setMessages([...messages, messageToSend]);
  };

  const messageFrom = (userId, messageToSend) => {
    return {
      [userId]: [...messages, messageToSend],
    };
  };

  return (
    <Stack spacing={4} style={{ flex: 1 }}>
      <View style={{ flex: 2 }}>
        <FlatList
          data={messages}
          renderItem={renderMessageItem}
          keyExtractor={(item, index) => index}
        />
      </View>
      <View>
        <TextInput
          placeholder="Message"
          multiline={true}
          value={chatMessage}
          onChangeText={(text) => setChatMessage(text)}
          trailing={(props) => (
            <IconButton
              disabled={!chatMessage?.length}
              onPress={sendChatMessage}
              icon={(props) => (
                <MaterialCommunityIcons
                  name="send"
                  size={props.size}
                  color={Constants.primary}
                />
              )}
              {...props}
            />
          )}
        />
      </View>
    </Stack>
  );
}

const styles = StyleSheet.create({
  messageLeft: {
    padding: 16,
    backgroundColor: '#eb7bd1',
    margin: 8,
    marginRight: '25%',
    borderRadius: 8,
  },
  messageRight: {
    padding: 16,
    backgroundColor: '#e9d9e5',
    margin: 8,
    marginLeft: '25%',
    borderRadius: 8,
  },
});