import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack"
import { AppStackParamList, AppStackScreenProps, HomeTabsParamList } from "../navigators"
import { Header, Screen, TextField } from "../components"
import { CompositeNavigationProp, useNavigation } from "@react-navigation/native"
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { spacing } from "../theme/spacing"

export const CreatePostScreen: FC<StackScreenProps<AppStackScreenProps<"CreatePost">>> = observer(
  function CreatePostScreen() {
    const navigation =
      useNavigation<
        CompositeNavigationProp<
          StackNavigationProp<AppStackParamList, "Login">,
          BottomTabNavigationProp<HomeTabsParamList>
        >
      >()
    return (
      <Screen style={$root} preset="scroll">
        <Header leftIcon="back" onLeftPress={() => navigation.goBack()} title="Create Post" />
        <TextField label="Add location" containerStyle={$textField} />
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
