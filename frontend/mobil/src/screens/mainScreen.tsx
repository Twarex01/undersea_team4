import React, {useState, useEffect} from 'react'
import {View, ImageBackground, StyleSheet, LayoutAnimation} from 'react-native'
import {StatusBar} from 'expo-status-bar'
import {Images} from '../constants/images'
import {Colors} from '../constants/colors'
import {Margins} from '../constants/margins'
import MainHeader from '../components/main/mainHeader'
import RoundBar from '../components/main/roundBar'
import BottomMenu from '../components/main/bottomMenu'
import PopupMenu from '../components/main/popupMenu'
import {StackNavigationProp} from '@react-navigation/stack'
import {Screens} from '../constants/screens'
import Constants from 'expo-constants'
import {useSelector, useDispatch} from 'react-redux'
import {IApplicationState} from '../../store'
import {getRound} from '../store/round/round.actions'
import {postNextRound} from '../store/nextRound/nextRound.actions'
import {getCountry} from '../store/country/country.actions'
import {getBuildings} from '../store/buildings/buildings.actions'
import {getMyBuildings} from '../store/myBuildings/myBuildings.action'
import {getUnits} from '../store/units/units.actions'
import {getMyUnits} from '../store/myUnits/myUnits.actions'
import {getResources} from '../store/resources/resources.actions'
import {getUpgrades} from '../store/upgrades/upgrades.actions'
import {getMyUpgrades} from '../store/myUpgrades/myUpgrades.actions'

interface MainscreenProps {
  navigation: StackNavigationProp<any>
}

const MainScreen = ({navigation}: MainscreenProps) => {
  const {round, isLoading, error} = useSelector(
    (state: IApplicationState) => state.app.round,
  )

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getRound())
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
    dispatch(getRound())
    dispatch(getCountry())
    dispatch(getBuildings())
    dispatch(getMyBuildings())
    dispatch(getUnits())
    dispatch(getMyUnits())
    dispatch(getResources())
    dispatch(getUpgrades())
    dispatch(getMyUpgrades())
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

        <View style={styles.emptyView}></View>

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
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
})

export default MainScreen
