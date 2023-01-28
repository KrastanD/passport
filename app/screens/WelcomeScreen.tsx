import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { ViewStyle } from "react-native"
import { Button, Screen, Text } from "../components"
import { AppStackParamList, AppStackScreenProps } from "../navigators"
import { spacing } from "../theme"

export const WelcomeScreen: FC<StackScreenProps<AppStackScreenProps<"Welcome">>> = observer(
  function WelcomeScreen() {
    const navigation = useNavigation<StackNavigationProp<AppStackParamList>>()
    return (
      <Screen safeAreaEdges={["top", "bottom"]}>
        <Button
          onPress={() => {
            navigation.navigate("Login")
          }}
          style={$button}
        >
          <Text size="md">Login</Text>
        </Button>
        <Button
          onPress={() => {
            navigation.navigate("Register")
          }}
          style={$button}
        >
          <Text size="md">Register</Text>
        </Button>
      </Screen>
    )
  },
)

const $button: ViewStyle = {
  marginTop: spacing.medium,
  marginHorizontal: spacing.medium,
}
