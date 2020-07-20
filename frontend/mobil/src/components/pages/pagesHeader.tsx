import React from 'react'
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  StyleProp,
  ViewStyle,
} from 'react-native'
import {Images} from '../../constants/images'
import {Colors} from '../../constants/colors'
import {Margins} from '../../constants/margins'
import {Fonts, FontSizes} from '../../constants/fonts'
import Constants from 'expo-constants'

interface Props {
  title: string
}

const PagesHeader = ({title}: Props) => {
  return (
    <View style={styles.headerView}>
      <Text style={[styles.headerText, Margins.mlLarge]}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  headerView: {
    backgroundColor: Colors.middleBlue,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 56,
    width: '100%',
  },
  backButton: {
    height: 25,
    width: 25,
    backgroundColor: Colors.white,
  },
  headerText: {
    fontFamily: Fonts.OpenSans_Bold,
    fontSize: FontSizes.os_normal,
    color: Colors.white,
  },
})

export default PagesHeader
