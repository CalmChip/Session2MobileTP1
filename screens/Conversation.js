import {FlatList,StyleSheet,Text,View} from "react-native";
import { Stack, TextInput, IconButton } from '@react-native-material/core';
import React, { useEffect, useState } from "react";
import { getMessages, sendMessage } from '../services/msgServices';
import { getProfile, getData } from '../services/userServices';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const adminData = {
  id: 'ExNr00GVAEcfu2oBpouqbsRoIvt2',
  email: 'support@contoso.ca',
  displayName: 'TESTEUR',
};

export default function Conversation({ navigation }) {
  const [chatMessage, setChatMessage] = useState();
  const [messages, setMessages] = useState([]);
  const [userData, setUserData] = useState();
  const [idToken, setIdToken] = useState();
    useEffect(() => {
      const getUserData = async () => {
        const tokenData = await getData();
        if (tokenData && tokenData.idToken) {
          const userProfile = await getProfile(tokenData.idToken);
          setUserData(userProfile.users[0]);
          setIdToken(tokenData.idToken);
        }
      }
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
                  color={styles.primary}
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
  primary:{
    color: "#F012BE",
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    padding: 10,
  },
  container: {
    minHeight: "100%",
  },
  convoContainer: {
    minHeight: 680,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "blue",
    marginHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "white",
  },
  input: {
    minHeight: 50,
    borderTopWidth: 1,
    borderColor: "blue",
    textAlign: "center",
    borderRadius: 15,
    backgroundColor: "lightyellow",
  },
  button: {
    width: 150,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "blue",
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 130,
    marginTop: 20,
  },
  button2: {
    height: 40,
    borderWidth: 1,
    borderRadius: 19,
    borderColor: "black",
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  message: {
    borderWidth: 1,
    borderRadius: 25,
    maxWidth: 200,
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    backgroundColor: "lightyellow",
  },
  message2: {
    borderWidth: 1,
    borderRadius: 25,
    maxWidth: 200,
    marginLeft: 150,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    backgroundColor: "lightblue",
  },
  textMsg: {
    textAlign: "center",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    color: "#fff",
    borderRadius: 19,
    borderColor: "blue",
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
  },
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
