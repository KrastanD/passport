import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { CompositeNavigationProp, useNavigation } from "@react-navigation/native"
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useState } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import { Header, Screen, TextField, Text, Button } from "../components"
import { AppStackParamList, AppStackScreenProps, HomeTabsParamList } from "../navigators"
import { api } from "../services/api"
import { useStores } from "../models"
import { colors, typography } from "../theme"

export const CreatePostScreen: FC<StackScreenProps<AppStackScreenProps<"CreatePost">>> = observer(
  function CreatePostScreen() {
    const {
      authenticationStore: { userId },
    } = useStores()

    // TODO: add apiKey to store.
    const [apiKey, setApiKey] = useState("")
    const [description, setDescription] = useState("")
    const [placeId, setPlaceId] = useState("")
    const [mainText, setMainText] = useState("")
    const [secondaryText, setSecondaryText] = useState("")

    const [text, setText] = useState("")
    const [rating, setRating] = useState(null)

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

    const submitValues = () => {
      api.postReviewPost({
        description,
        placeId,
        mainText,
        secondaryText,
        text,
        userId,
        rating,
      })
    }

    return (
      <Screen style={$root}>
        <Header leftIcon="back" onLeftPress={() => navigation.goBack()} title="Create Post" />
        <Text weight="medium" style={$locationText}>
          Location
        </Text>
        <View style={$wrapper}>
          <GooglePlacesAutocomplete
            placeholder="Search"
            minLength={3}
            onPress={(data) => {
              setDescription(data.description)
              setPlaceId(data.place_id)
              setMainText(data.structured_formatting.main_text)
              setSecondaryText(data.structured_formatting.secondary_text)
            }}
            query={{
              key: apiKey,
              language: "en",
            }}
            onFail={(error) => console.log(error)}
            onNotFound={() => console.log("no results")}
            enablePoweredByContainer={false}
            styles={{
              textInput: {
                fontFamily: typography.fonts.spaceGrotesk.normal,
                borderColor: colors.border,
                borderWidth: 1,
              },
            }}
            textInputProps={{ placeholderTextColor: colors.textDim }}
          />
        </View>
        <TextField
          value={text}
          label="Text"
          placeholder="Description..."
          multiline
          onChangeText={setText}
          inputWrapperStyle={$textInput}
        />
        <TextField
          value={rating}
          inputWrapperStyle={$ratingInput}
          label="Rating"
          placeholder="1-5"
          onChangeText={setRating}
          inputMode="numeric"
        />
        <Button onPress={submitValues}>Submit</Button>
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
  paddingHorizontal: 10,
}

const $locationText: TextStyle = {
  marginBottom: 10,
}

const $wrapper: ViewStyle = {
  flexDirection: "row",
  marginBottom: 5,
}

const $ratingInput: ViewStyle = {
  marginBottom: 10,
  backgroundColor: "white",
}

const $textInput: ViewStyle = {
  backgroundColor: "white",
  marginBottom: 10,
}
