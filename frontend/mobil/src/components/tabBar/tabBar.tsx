import React from 'react'
import {StyleSheet, View} from 'react-native'
import {SceneRendererProps} from 'react-native-tab-view'
import {Colors} from '../../constants/colors'
import {Fonts, FontSizes} from '../../constants/fonts'

const TabBar = (props: SceneRendererProps) => {
  return <View></View>
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.darkBlue,
    flexDirection: 'row',
  },
  text: {
    color: Colors.white,
    fontFamily: Fonts.OpenSans_Bold,
    fontSize: FontSizes.os_large,
  },
})

export default TabBar
