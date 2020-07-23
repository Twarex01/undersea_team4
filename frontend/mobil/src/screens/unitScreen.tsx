import {StackNavigationProp} from '@react-navigation/stack'
import React, {useState} from 'react'
import {Screens} from '../constants/screens'
import {SceneMap, TabView, TabBar} from 'react-native-tab-view'
import FightScreen from './fightScreen'
import ExplorationScreen from './explorationScreen'
import {View, StyleSheet, Text} from 'react-native'
import PagesTemplate from '../components/pages/pagesTemplate'
import {Strings} from '../constants/strings'
import {Fonts, FontSizes} from '../constants/fonts'
import {Colors} from '../constants/colors'

interface UnitScreenProps {
  navigation: StackNavigationProp<any>
}

const UnitScreen = ({navigation}: UnitScreenProps) => {
  const [index, setIndex] = useState(0)
  const [routes] = useState([
    {key: 'first', title: Screens.Fight},
    {key: 'second', title: Screens.Exploration},
  ])

  const renderScrene = SceneMap({
    first: FightScreen,
    second: ExplorationScreen,
  })

  return (
    <PagesTemplate title={Strings.bevy}>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScrene}
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
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabbarText: {
    color: Colors.white,
    fontFamily: Fonts.OpenSans_Bold,
    fontSize: FontSizes.os_large,
  },
})

export default UnitScreen
