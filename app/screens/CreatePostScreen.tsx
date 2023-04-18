import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { CompositeNavigationProp, useNavigation } from "@react-navigation/native"
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useState } from "react"
import { View, ViewStyle } from "react-native"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import { Header, Screen } from "../components"
import { AppStackParamList, AppStackScreenProps, HomeTabsParamList } from "../navigators"
import { api } from "../services/api"

export const CreatePostScreen: FC<StackScreenProps<AppStackScreenProps<"CreatePost">>> = observer(
  function CreatePostScreen() {
    const [apiKey, setApiKey] = useState("")

    const navigation =
      useNavigation<
        CompositeNavigationProp<
          StackNavigationProp<AppStackParamList, "Login">,
          BottomTabNavigationProp<HomeTabsParamList>
        >
      >()

    useEffect(() => {
      const runEffect = async () => {
        const key = await api.getMapsApiKey()
        setApiKey(key)
      }
      runEffect()
    })

    return (
      <Screen style={$root}>
        <Header leftIcon="back" onLeftPress={() => navigation.goBack()} title="Create Post" />
        <View style={$wrapper}>
          <GooglePlacesAutocomplete
            placeholder="Search"
            minLength={3}
            onPress={(data) => {
              console.log(data)
            }}
            query={{
              key: apiKey,
              language: "en",
            }}
            onFail={(error) => console.log(error)}
            onNotFound={() => console.log("no results")}
            enablePoweredByContainer={false}
          />
        </View>
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
}

const $wrapper: ViewStyle = {
  flexDirection: "row",
}
