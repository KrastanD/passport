import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import React from "react"
import { Button, Screen, Text } from "../components"
import { AppStackParamList } from "../navigators"

export const WelcomeScreen = observer(function WelcomeScreen() {
  const navigation = useNavigation<StackNavigationProp<AppStackParamList>>()
  return (
    <Screen safeAreaEdges={["top", "bottom"]}>
      <Button
        onPress={() => {
          navigation.navigate("Login")
        }}
      >
        <Text size="md">Go to Login</Text>
      </Button>
      <Button
        onPress={() => {
          navigation.navigate("Register")
        }}
      >
        <Text size="md">Go to Register</Text>
      </Button>
    </Screen>
  )
})
