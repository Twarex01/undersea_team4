import React from 'react'
import {View, Text, StyleSheet, Image} from 'react-native'
import {Colors} from '../../constants/colors'
import {Fonts, FontSizes} from '../../constants/fonts'
import {Margins} from '../../constants/margins'
import {Images} from '../../constants/images'
import {TouchableOpacity} from 'react-native-gesture-handler'

interface Props {
  place: number
  username?: string
  onPress: () => void
}

const RankingCard = ({place, username, onPress}: Props) => {
  return (
    <TouchableOpacity style={styles.touchableOpacity} onPress={onPress}>
      <Text style={[styles.text, Margins.mlNormal]}>
        {place}
        {'.'}
      </Text>
      <Text style={[styles.text, Margins.mlLarge]}>{username}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  touchableOpacity: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 15,
  },
  text: {
    color: Colors.white,
    fontFamily: Fonts.OpenSans_Regular,
    fontSize: FontSizes.os_large,
  },
})

export default RankingCard
