import {AttackRequest} from '../../model/battle/attackRequest'
import {ExploreRequest} from '../../model/battle/exploreRequest'

export const POST_ATTACK_REQUEST = 'POST_ATTACK_REQUEST'
export const POST_ATTACK_SUCCESS = 'POST_ATTACK_SUCCESS'
export const POST_ATTACK_FAILURE = 'POST_ATTACK_FAILURE'
export const POST_EXPLORE_REQUEST = 'POST_EXPLORE_REQUEST'
export const POST_EXPLORE_SUCCESS = 'POST_EXPLORE_SUCCESS'
export const POST_EXPLORE_FAILURE = 'POST_EXPLORE_FAILURE'
export const SET_COUNT = 'SET_COUNT'
export const SET_ID = 'SET_ID'
export const RESET_COUNT = 'RESET_COUNT'

export interface PostAttackRequestAction {
  type: typeof POST_ATTACK_REQUEST
  attackRequest: AttackRequest
}

export interface PostAttackSuccessAction {
  type: typeof POST_ATTACK_SUCCESS
}

export interface PostAttackFailAction {
  type: typeof POST_ATTACK_FAILURE
  reason: string | undefined
}

export interface PostExploreRequestAction {
  type: typeof POST_EXPLORE_REQUEST
  exploreRequest: ExploreRequest
}

export interface PostExploreSuccessAction {
  type: typeof POST_EXPLORE_SUCCESS
}

export interface PostExploreFailAction {
  type: typeof POST_EXPLORE_FAILURE
  reason: string | undefined
}

export interface SetCount {
  type: typeof SET_COUNT
  unitTypeID: number
  count: number
}

export interface SetId {
  type: typeof SET_ID
  cityID: number
}

export interface ResetCount {
  type: typeof RESET_COUNT
}

export type BattleActions =
  | PostAttackRequestAction
  | PostAttackSuccessAction
  | PostAttackFailAction
  | PostExploreRequestAction
  | PostExploreSuccessAction
  | PostExploreFailAction
  | SetCount
  | SetId
  | ResetCount

export const attack = (
  attackRequest: AttackRequest,
): PostAttackRequestAction => ({
  type: POST_ATTACK_REQUEST,
  attackRequest,
})

export const postAttackSuccessActionCreator = (): PostAttackSuccessAction => ({
  type: POST_ATTACK_SUCCESS,
})

export const postAttackFailActionCreator = (
  reason: string,
): PostAttackFailAction => ({
  type: POST_ATTACK_FAILURE,
  reason,
})

export const explore = (
  exploreRequest: ExploreRequest,
): PostExploreRequestAction => ({
  type: POST_EXPLORE_REQUEST,
  exploreRequest,
})

export const postExploreSuccessActionCreator = (): PostExploreSuccessAction => ({
  type: POST_EXPLORE_SUCCESS,
})

export const postExploreFailActionCreator = (
  reason: string,
): PostExploreFailAction => ({
  type: POST_EXPLORE_FAILURE,
  reason,
})

export const setCount = (unitTypeID: number, count: number): SetCount => ({
  type: SET_COUNT,
  unitTypeID,
  count,
})

export const setId = (cityID: number): SetId => ({
  type: SET_ID,
  cityID,
})

export const resetBattleCount = (): ResetCount => ({
  type: RESET_COUNT,
})
