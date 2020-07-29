import createSagaMiddleware from '@redux-saga/core'
import {appRootReducer} from '../store'
import {applyMiddleware, createStore, combineReducers} from 'redux'
import {rootSaga} from '../saga'
import {Config} from '../src/constants/config'
import * as signalR from '@microsoft/signalr'
import {useDispatch} from 'react-redux'
import {getRound} from '../src/store/round/round.actions'
import {getBuildings} from '../src/store/buildings/buildings.actions'
import {getMyBuildings} from '../src/store/myBuildings/myBuildings.action'
import {getResources} from '../src/store/resources/resources.actions'
import {getUnits} from '../src/store/units/units.actions'
import {getMyUnits} from '../src/store/myUnits/myUnits.actions'
import {getPlayers} from '../src/store/players/players.action'
import {getUpgrades} from '../src/store/upgrades/upgrades.actions'
import {getMyUpgrades} from '../src/store/myUpgrades/myUpgrades.actions'
import {getFights} from '../src/store/fights/fights.action'
import {getExplorations} from '../src/store/explorations/explorations.actions'
import {getCountry} from '../src/store/country/country.actions'

export function configureStore() {
  const sagaMiddleware = createSagaMiddleware()
  const signalRMiddleware = createSignalRMiddleware()
  const deepRootReducer = combineReducers({app: appRootReducer})
  const store = createStore(
    deepRootReducer,
    applyMiddleware(sagaMiddleware, signalRMiddleware),
  )
  sagaMiddleware.run(rootSaga)
  return store
}

const signalRURL = `${Config.baseURL}/roundhub`

const createSignalRMiddleware = () => {
  return storeSignalR => {
    let connection = new signalR.HubConnectionBuilder()
      .withUrl(signalRURL)
      .build()

    connection.on('refreshinfo', data => {
      storeSignalR.dispatch(getRound())
      storeSignalR.dispatch(getResources())
      storeSignalR.dispatch(getCountry())
      storeSignalR.dispatch(getBuildings())
      storeSignalR.dispatch(getMyBuildings())
      storeSignalR.dispatch(getUnits())
      storeSignalR.dispatch(getMyUnits())
      storeSignalR.dispatch(getUpgrades())
      storeSignalR.dispatch(getMyUpgrades())
      storeSignalR.dispatch(getFights())
      storeSignalR.dispatch(getExplorations())
      storeSignalR.dispatch(getPlayers())
    })

    connection.onclose(() =>
      setTimeout(startSignalRConnection(connection), 5000),
    )

    startSignalRConnection(connection)

    return next => action => {
      return next(action)
    }
  }
}

const startSignalRConnection = connection =>
  connection
    .start()
    .then(() => console.info('SignalR Connected'))
    .catch(err => console.log('SignalR Connection Error: ', err))
