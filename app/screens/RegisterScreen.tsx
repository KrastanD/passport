import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { CompositeNavigationProp, useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import React, { useCallback, useState } from "react"
import { ViewStyle } from "react-native"
import { Button, Icon, Screen, Text, TextField, TextFieldAccessoryProps } from "../components"
import { useStores } from "../models"
import { AppStackParamList, HomeTabsParamList } from "../navigators"
import { api } from "../services/api"

export const RegisterScreen = observer(function RegisterScreen() {
  const navigation =
    useNavigation<
      CompositeNavigationProp<
        StackNavigationProp<AppStackParamList, "Register">,
        BottomTabNavigationProp<HomeTabsParamList>
      >
    >()
  const { authenticationStore } = useStores()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isPasswordHidden, setIsPasswordHidden] = useState(true)

  async function submitCredentials() {
    const { error } = await api.registerWithEmail(email, password)
    if (error) {
      setError(error.message)
    } else {
      authenticationStore.setProp("isUserLoggedIn", true)
      navigation.navigate("Feed")
    }
  }

  const PasswordRightAccessory = useCallback(
    function PasswordRightAccessory(props: TextFieldAccessoryProps) {
      return (
        <Icon
          icon={isPasswordHidden ? "view" : "hidden"}
          containerStyle={props.style}
          onPress={() => setIsPasswordHidden(!isPasswordHidden)}
        />
      )
    },
    [isPasswordHidden],
  )

  return (
    <Screen style={$root} preset="scroll" safeAreaEdges={["top", "bottom"]}>
      <TextField
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        keyboardType="email-address"
        onChangeText={setEmail}
      />
      <TextField
        onChangeText={setPassword}
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        secureTextEntry={isPasswordHidden}
        RightAccessory={PasswordRightAccessory}
      />
      <Button disabled={!email || !password} onPress={submitCredentials} text="Register" />
      {error && <Text>{error}</Text>}
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
