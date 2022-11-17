import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { Screen, Text } from "../components"
import { api } from "../services/api"

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
export const FeedScreen = observer(function FeedScreen() {
  return (
    <Screen style={$root} preset="scroll" safeAreaEdges={["top"]}>
      <Text text="feed" />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
