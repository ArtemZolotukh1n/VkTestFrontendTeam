import { CatMethods } from './Cat'
import { PersonInfoMethods } from './PersonInfo'

export type ApiMethods = PersonInfoMethods & CatMethods

export type ApiEndpoints = keyof ApiMethods
