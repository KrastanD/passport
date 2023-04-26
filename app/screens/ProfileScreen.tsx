import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Button, Screen, Text } from "../components"
import { useStores } from "../models"
import { HomeTabsScreenProps } from "../navigators"
import { api } from "../services/api"
import { spacing } from "../theme"

export const ProfileScreen: FC<BottomTabScreenProps<HomeTabsScreenProps<"Profile">>> = observer(
  function ProfileScreen() {
    const {
      authenticationStore: { email, logout },
    } = useStores()

    function onLogout() {
      api.logout()
      logout()
    }

    return (
      <Screen style={$root} safeAreaEdges={["top"]}>
        <View style={$container}>
          <Text style={$heading}>Profile</Text>
          <View style={$body}>
            <Text>Currently logged in as {email}</Text>
          </View>
          <Button onPress={onLogout}>
            <Text size="md">Logout</Text>
          </Button>
        </View>
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
  padding: 10,
}

const $heading: TextStyle = {
  fontSize: spacing.large,
  marginBottom: spacing.medium,
}

const $body: ViewStyle = {
  flex: 1,
}

const $container: ViewStyle = {
  height: "100%",
  justifyContent: "space-between",
}
