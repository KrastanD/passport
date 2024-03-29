import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { CompositeNavigationProp, useNavigation } from "@react-navigation/native"
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import React, { FC, useCallback, useState } from "react"
import { ViewStyle } from "react-native"
import {
  Button,
  Header,
  Icon,
  Screen,
  Text,
  TextField,
  TextFieldAccessoryProps,
} from "../components"
import { useStores } from "../models"
import { AppStackParamList, AppStackScreenProps, HomeTabsParamList } from "../navigators"
import { api } from "../services/api"
import { spacing } from "../theme"

export const RegisterScreen: FC<StackScreenProps<AppStackScreenProps<"Register">>> = observer(
  function RegisterScreen() {
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
      const { data, error } = await api.registerWithEmail(email, password)
      if (error) {
        setError(error.message)
      } else {
        authenticationStore.setProp("userId", data.user.id)
        authenticationStore.setProp("email", data.user.email)
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
      <Screen style={$root} preset="scroll" safeAreaEdges={["bottom"]}>
        <Header leftIcon="back" onLeftPress={() => navigation.goBack()} title="Register" />
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
          text="Register"
          style={$button}
          testID="RegisterScreen.RegisterButton"
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
