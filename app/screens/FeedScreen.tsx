import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { Pressable, SafeAreaView, ViewStyle } from "react-native"
import { Text } from "../components"
import { colors } from "../theme"
import { CompositeNavigationProp, useNavigation } from "@react-navigation/native"
import { BottomTabNavigationProp, BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { AppStackParamList, HomeTabsParamList, HomeTabsScreenProps } from "../navigators"
import { StackNavigationProp } from "@react-navigation/stack"

export const FeedScreen: FC<BottomTabScreenProps<HomeTabsScreenProps<"Feed">>> = observer(
  function FeedScreen() {
    const navigation =
      useNavigation<
        CompositeNavigationProp<
          BottomTabNavigationProp<HomeTabsParamList>,
          StackNavigationProp<AppStackParamList>
        >
      >()

    return (
      <SafeAreaView style={$root}>
        <Pressable style={$createButton} onPress={() => navigation.navigate("CreatePost")}>
          <Text>+</Text>
        </Pressable>
      </SafeAreaView>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
  height: "100%",
}
const $createButton: ViewStyle = {
  position: "absolute",
  bottom: 20,
  right: 20,
  height: 40,
  width: 40,
  backgroundColor: colors.palette.secondary200,
  borderRadius: 20,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}
