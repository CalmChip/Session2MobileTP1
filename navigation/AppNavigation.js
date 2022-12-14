import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Accueil from "../screens/Accueil";
import Login from "../screens/Login";
import Register from "../screens/Register";
import MainListe from "../screens/MainListe";
import Conversation from "../screens/Conversation";

const Drawer = createDrawerNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen
          options={{
            title: "Accueil",
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "blue",
            },
            headerTintColor: "#fff",
          }}
          name="Accueil"
          component={Accueil}
        />
        <Drawer.Screen
          options={{
            title: "Register",
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "blue",
            },
            headerTintColor: "#fff",
          }}
          name="Register"
          component={Register}
        />
        <Drawer.Screen
          options={{
            title: "Login",
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "blue",
            },
            headerTintColor: "#fff",
          }}
          name="Login"
          component={Login}
        />
        <Drawer.Screen
          options={{
            title: "Liste Contact",
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "blue",
            },
            headerTintColor: "#fff",
          }}
          name="Liste Contact"
          component={MainListe}
        />
        <Drawer.Screen
          options={{
            title: "Conversation",
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "blue",
            },
            headerTintColor: "#fff",
            drawerItemStyle: { height: 0 }, //drawerItemStyle cache un ecran dans la liste de selection
          }}
          name="Conversation"
          component={Conversation}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
