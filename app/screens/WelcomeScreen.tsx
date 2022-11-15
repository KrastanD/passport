import { observer } from "mobx-react-lite"
import React from "react"
import { View, ViewStyle } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Text } from "../components"
import { colors, spacing } from "../theme"

export const WelcomeScreen = observer(function WelcomeScreen() {
  return (
    <View style={$container}>
      <SafeAreaView>
        <Text>This is the Passport App</Text>
        <Text size="xl">Welcome</Text>
      </SafeAreaView>
    </View>
  )
})

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}
