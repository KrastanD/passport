import { Instance, SnapshotIn, SnapshotOut, applySnapshot, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

export const AuthenticationStoreModel = types
  .model("AuthenticationStore", {
    userId: types.optional(types.string, ""),
    email: types.optional(types.string, ""),
  })

  .actions(withSetPropAction)
  .views((self) => ({
    get isAuthenticated() {
      return self.userId !== ""
    },
  }))
  .actions((self) => ({
    logout() {
      applySnapshot(self, {})
    },
  }))

export interface AuthenticationStore extends Instance<typeof AuthenticationStoreModel> {}
export interface AuthenticationStoreSnapshotOut
  extends SnapshotOut<typeof AuthenticationStoreModel> {}
export interface AuthenticationStoreSnapshotIn
  extends SnapshotIn<typeof AuthenticationStoreModel> {}
export const createAuthenticationStoreDefaultModel = () =>
  types.optional(AuthenticationStoreModel, {})
