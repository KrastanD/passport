import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { useNavigation, CompositeNavigationProp } from "@react-navigation/native"
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import React, { FC, useCallback, useState } from "react"
import { ViewStyle } from "react-native"
import {
  Button,
  Icon,
  Screen,
  TextField,
  TextFieldAccessoryProps,
  Text,
  Header,
} from "../components"
import { useStores } from "../models"
import { AppStackParamList, AppStackScreenProps, HomeTabsParamList } from "../navigators"
import { api } from "../services/api"
import { spacing } from "../theme"

export const LoginScreen: FC<StackScreenProps<AppStackScreenProps<"Login">>> = observer(
  function LoginScreen() {
    const navigation =
      useNavigation<
        CompositeNavigationProp<
          StackNavigationProp<AppStackParamList, "Login">,
          BottomTabNavigationProp<HomeTabsParamList>
        >
      >()
    const { authenticationStore } = useStores()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [isPasswordHidden, setIsPasswordHidden] = useState(true)

    async function submitCredentials() {
      const { error } = await api.loginWithEmail(email, password)
      if (error) {
        setError(error.message)
      } else {
        authenticationStore.setProp("isUserLoggedIn", true)
        navigation.navigate("HomeTabs", { screen: "Feed" })
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
      <Screen style={$root} preset="scroll" safeAreaEdges={["bottom"]}>
        <Header leftIcon="back" onLeftPress={() => navigation.goBack()} title="Login" />
        <TextField
          value={email}
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          keyboardType="email-address"
          onChangeText={setEmail}
          label="Email"
          containerStyle={$textField}
        />
        <TextField
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          autoComplete="password"
          autoCorrect={false}
          secureTextEntry={isPasswordHidden}
          RightAccessory={PasswordRightAccessory}
          label="Password"
          containerStyle={$textField}
        />
        <Button
          disabled={!email || !password}
          onPress={submitCredentials}
          text="Login"
          style={$button}
          testID="LoginScreen.LoginButton"
        />
        {error && <Text>{error}</Text>}
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
}

const $textField: ViewStyle = {
  marginBottom: spacing.medium,
  marginHorizontal: spacing.medium,
}

const $button: ViewStyle = {
  marginTop: spacing.medium,
  marginHorizontal: spacing.medium,
}
