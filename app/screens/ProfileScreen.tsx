import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { Button, Screen, Text } from "../components"
import { useStores } from "../models"
import { api } from "../services/api"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `Profile: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="Profile" component={ProfileScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const ProfileScreen = observer(function ProfileScreen() {
  // Pull in one of our MST stores
  const {
    authenticationStore: { logout },
  } = useStores()

  function onLogout() {
    api.logout()
    logout()
  }

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$root} preset="scroll" safeAreaEdges={["top"]}>
      <Text text="profile" />
      <Button onPress={onLogout}>
        <Text size="md">Logout</Text>
      </Button>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
