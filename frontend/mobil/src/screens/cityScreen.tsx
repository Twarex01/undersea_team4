import React, {useEffect, useState} from 'react'
import {View, Text, StyleSheet, ListRenderItemInfo} from 'react-native'
import {Colors} from '../constants/colors'
import {Strings} from '../constants/strings'
import {Fonts, FontSizes} from '../constants/fonts'
import PagesTemplate from '../components/pages/pagesTemplate'
import TransparentButton from '../components/button/transparentButton'
import {StackNavigationProp} from '@react-navigation/stack'
import {useSelector, useDispatch} from 'react-redux'
import {IApplicationState} from '../../store'
import {getBuildings} from '../store/buildings/buildings.actions'
import {TabView, SceneMap, TabBar} from 'react-native-tab-view'
import BuildingsScreen from './buildingsScreen'
import {Screens} from '../constants/screens'
import UpgradesScreen from './upgradesScreen'
import BevyScreen from './bevyScreen'

interface BuildingsScreenProps {
  navigation: StackNavigationProp<any>
}

const CityScreen = ({navigation}: BuildingsScreenProps) => {
  const {
    buildings,
    buildingsError: error,
    isBuildingsLoading: isLoading,
  } = useSelector((state: IApplicationState) => state.app.building)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getBuildings())
  }, [dispatch])

  const onBuyPressed = () => {}

  const [index, setIndex] = useState(0)
  const [routes] = useState([
    {key: 'first', title: Screens.Buildings},
    {key: 'second', title: Screens.Upgrades},
    {key: 'third', title: Screens.Bevy},
  ])
  const renderScene = SceneMap({
    first: BuildingsScreen,
    second: UpgradesScreen,
    third: BevyScreen,
  })

  return (
    <View style={styles.container}>
      <PagesTemplate title={Strings.my_city}>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          renderTabBar={props => (
            <TabBar
              {...props}
              indicatorStyle={{backgroundColor: Colors.vibrantLightBlue}}
              style={{backgroundColor: Colors.middleDarkBlue}}
              renderLabel={({route, focused, color}) => (
                <Text style={styles.tabbarText}>{route.title}</Text>
              )}
            />
          )}
        />
      </PagesTemplate>
      <TransparentButton
        title={Strings.buy}
        onPress={onBuyPressed}
        style={{position: 'absolute', bottom: 0}}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleText: {
    fontFamily: Fonts.OpenSans_Bold,
    fontSize: FontSizes.os_large,
    color: Colors.white,
  },
  descriptionText: {
    fontFamily: Fonts.OpenSans_Regular,
    fontSize: FontSizes.os_large,
    color: Colors.white,
  },
  flatlistPadding: {
    flex: 1,
    paddingTop: 25,
    paddingHorizontal: 20,
  },
  tabbarText: {
    color: Colors.white,
    fontFamily: Fonts.OpenSans_Bold,
    fontSize: FontSizes.os_large,
  },
})

export default CityScreen
