import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { Button, Screen, Text } from "../components"
import { useStores } from "../models"
import { api } from "../services/api"
import { HomeTabsScreenProps } from "../navigators"
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"

export const ProfileScreen: FC<BottomTabScreenProps<HomeTabsScreenProps<"Profile">>> = observer(
  function ProfileScreen() {
    const {
      authenticationStore: { logout },
    } = useStores()

    function onLogout() {
      api.logout()
      logout()
    }

    return (
      <Screen style={$root} preset="scroll" safeAreaEdges={["top"]}>
        <Text text="profile" />
        <Button onPress={onLogout}>
          <Text size="md">Logout</Text>
        </Button>
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
}
