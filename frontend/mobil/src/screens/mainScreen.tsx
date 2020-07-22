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
import WhiteButton from '../components/button/whiteButton'
import {useSelector, useDispatch} from 'react-redux'
import {IApplicationState} from '../../store'
import {getRound} from '../store/round/round.actions'

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
  const [showPopup, setShowPopup] = useState(false)
  const shell = 230
  const coral = 230

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ImageBackground style={styles.imageBackground} source={Images.main_bg}>
        <MainHeader onPressButton={onProfilePress} />

        <RoundBar
          round={round.round}
          place={round.rank}
          onPress={onStarPress}
        />

        <View style={styles.emptyView}></View>

        <PopupMenu shell={shell} coral={coral} />
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
