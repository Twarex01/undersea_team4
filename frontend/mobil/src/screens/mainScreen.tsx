import React, {useState, useEffect} from 'react'
import {View, ImageBackground, StyleSheet, Image} from 'react-native'
import {StatusBar} from 'expo-status-bar'
import {Images} from '../constants/images'
import {Colors} from '../constants/colors'
import MainHeader from '../components/main/mainHeader'
import RoundBar from '../components/main/roundBar'
import PopupMenu from '../components/main/popupMenu'
import {StackNavigationProp} from '@react-navigation/stack'
import {Screens} from '../constants/screens'
import Constants from 'expo-constants'
import {useSelector, useDispatch} from 'react-redux'
import {IApplicationState} from '../../store'
import {getRound} from '../store/round/round.actions'
import {postNextRound} from '../store/nextRound/nextRound.actions'
import FlashMessage, {showMessage} from 'react-native-flash-message'
import {createSelector} from 'reselect'
import {Config} from '../constants/config'
import {getBuildings} from '../store/buildings/buildings.actions'
import {getMyBuildings} from '../store/myBuildings/myBuildings.action'

interface MainscreenProps {
  navigation: StackNavigationProp<any>
}

const MainScreen = ({navigation}: MainscreenProps) => {
  const {round, isLoading, error} = useSelector(
    (state: IApplicationState) => state.app.round,
  )
  const buildingsDataSelector = createSelector(
    (state: IApplicationState) => state.app,
    appstate =>
      appstate.building.buildings.map(building => {
        const myBuildingInfo = appstate.myBuilding.myBuildings.find(
          b => building.buildingTypeID === b.buildingTypeID,
        )
        return {
          name: building.name,
          count: myBuildingInfo?.count,
          backgroundURL: building.backgroundURL,
        }
      }),
  )

  const buildings = useSelector(buildingsDataSelector)

  const reef_castle = buildings.find(b => b.name === 'Zátonyvár')
  const flow_control = buildings.find(b => b.name === 'Áramlásirányító')
  const stone_mine = buildings.find(b => b.name === 'Kőbánya')

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getRound())
    dispatch(getBuildings())
    dispatch(getMyBuildings())
  }, [dispatch])

  const onProfilePress = () => {
    if (showPopup === true) setShowPopup(!showPopup)
    navigation.navigate(Screens.Profil)
  }
  const onStarPress = () => {
    navigation.navigate(Screens.Ranking)
  }
  const onNextRoundPressed = () => {
    dispatch(postNextRound())
    showMessage({
      message: 'Körváltás',
      backgroundColor: Colors.darkBlue,
      color: Colors.vibrantLightBlue,
    })
  }

  const [showPopup, setShowPopup] = useState(false)

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ImageBackground style={styles.imageBackground} source={Images.main_bg}>
        <MainHeader
          onPressProfil={onProfilePress}
          onNextRoundPressed={onNextRoundPressed}
        />
        <RoundBar
          round={round.round}
          place={round.rank}
          onPress={onStarPress}
        />
        <View style={styles.emptyView}>
          {reef_castle && reef_castle.count && reef_castle.count > 0 ? (
            <Image
              source={{uri: `${Config.baseURL}${reef_castle.backgroundURL}`}}
              style={styles.reefCastleImage}
            />
          ) : null}
          {flow_control && flow_control.count && flow_control.count > 0 ? (
            <Image
              source={{uri: `${Config.baseURL}${flow_control.backgroundURL}`}}
              style={styles.flowControlImage}
            />
          ) : null}
          {stone_mine && stone_mine.count && stone_mine.count > 0 ? (
            <Image
              source={{uri: `${Config.baseURL}${stone_mine.backgroundURL}`}}
              style={styles.stoneMineImage}
            />
          ) : null}
        </View>
        <PopupMenu />
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.middleBlue,
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: Constants.statusBarHeight,
  },
  emptyView: {
    flex: 1,
    width: '100%',
  },
  reefCastleImage: {
    position: 'absolute',
    left: 90,
    top: 150,
    width: 140,
    height: 140,
  },
  flowControlImage: {
    position: 'absolute',
    left: 170,
    top: 220,
    width: 110,
    height: 110,
  },
  stoneMineImage: {
    position: 'absolute',
    left: 40,
    top: 200,
    width: 140,
    height: 140,
  },
})

export default MainScreen
