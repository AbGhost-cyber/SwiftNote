import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  BottomTabBar,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import React from "react";

import SignUpScreen from "../screens/auth/SignUpScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import NoteScreen from "../screens/note/NoteScreen";
import PreviewNoteScreen from "../screens/note/PreviewNoteScreen";
import LogoutScreen from "../screens/LogoutScreen";
import SearchScreen from "../screens/SearchScreen";
import { IS_IPHONE_X } from "../utils/utils";
import TabBarButton from "../components/TabBarButton";
import { colors, fontsMapper } from "../constants";
import AddEditNoteModal from "../screens/modals/AddEditNoteModal";

const Stack = createStackNavigator();
const RootStack = createStackNavigator();
const BottomBar = createBottomTabNavigator();

const StackNav = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="NoteMainActivity" component={NoteTabBar} />
      <Stack.Screen name="PreviewNote" component={PreviewNoteScreen} />
      <Stack.Screen name="Log out" component={LogoutScreen} />
    </Stack.Navigator>
  );
};

export const RootStackNav = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator mode="modal">
        <RootStack.Screen
          name="Main"
          component={StackNav}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="AddNoteModal"
          component={AddEditNoteModal}
          options={{
            headerShown: false,
            cardStyle: {
              borderTopRightRadius: 10,
              marginTop: 90,
              backgroundColor: "#252525",
              borderTopLeftRadius: 10,
            },
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

const NoteTabBar = () => {
  return (
    <BottomBar.Navigator
      tabBar={(props) => (
        <View style={styles.navigatorContainer}>
          <BottomTabBar {...props} />
          {IS_IPHONE_X && (
            <View
              style={[styles.xFillLine, { backgroundColor: colors.accent }]}
            />
          )}
        </View>
      )}
      tabBarOptions={{
        showIcon: true,
        style: styles.navigator,
        tabStyle: { backgroundColor: "white" },
        activeTintColor: colors.accent,
        inactiveTintColor: "black",
        labelStyle: {
          fontFamily: fontsMapper.pro_sans,
          fontSize: 12,
        },
        showLabel: false,
      }}
    >
      <BottomBar.Screen
        name="Notes"
        component={NoteScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="book" size={23} color={color} />
          ),
        }}
      />
      <BottomBar.Screen
        name="Profile"
        component={NoteScreen}
        options={{
          tabBarIcon: () => null,
          tabBarLabel: () => {
            return null;
          },
          tabBarButton: () => <TabBarButton bgColor="white" showTab={false} />,
        }}
      />
      <BottomBar.Screen
        name="Add Note"
        component={NoteScreen}
        options={({ navigation }) => {
          return {
            tabBarButton: (props) => (
              <TabBarButton
                bgColor="white"
                showTab
                onPress={() => {
                  navigation.navigate("AddNoteModal");
                }}
              />
            ),
          };
        }}
      />
      <BottomBar.Screen
        name="Messages"
        options={{
          tabBarLabel: () => {
            return null;
          },
          tabBarButton: () => <TabBarButton bgColor="white" showTab={false} />,
        }}
      >
        {(props) => <NoteScreen {...props} />}
      </BottomBar.Screen>
      <BottomBar.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-search" size={23} color={color} />
          ),
        }}
      />
    </BottomBar.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navigatorContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  navigator: {
    borderTopWidth: 0,
    backgroundColor: "transparent",
    elevation: 30,
  },
  xFillLine: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 34,
  },
});
