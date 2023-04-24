/**
 * This Api class lets you define an API endpoint and methods to request
 * data and process it.
 *
 * See the [Backend API Integration](https://github.com/infinitered/ignite/blob/master/docs/Backend-API-Integration.md)
 * documentation for more details.
 */
import Config from "../../config"
import { createClient, SupabaseClient } from "@supabase/supabase-js"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { ApiConfig } from "./api.types"

export const DEFAULT_API_CONFIG = {
  url: Config.API_URL,
  anonKey: Config.ANON_KEY,
}

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class Api {
  supabase: SupabaseClient
  config: string

  /**
   * Set up our API instance. Keep this lightweight!
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.supabase = createClient(config.url, config.anonKey, {
      auth: {
        storage: AsyncStorage as any,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
      },
    })
  }

  public async registerWithEmail(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
    })
    return { data, error }
  }

  public async loginWithEmail(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  }

  public async logout() {
    await this.supabase.auth.signOut()
  }

  public async getMapsApiKey() {
    const { data } = await this.supabase.functions.invoke("maps-key")
    return data as string
  }

  public async postReviewPost({
    description,
    placeId,
    mainText,
    secondaryText,
    text,
    userId,
    rating,
  }) {
    const { error } = await this.supabase.from("review_posts").insert({
      place_description: description,
      place_id: placeId,
      place_main_text: mainText,
      place_secondary_text: secondaryText,
      text,
      created_by: userId,
      rating,
    })
    return error
  }
}

// Singleton instance of the API for convenience
export const api = new Api()
