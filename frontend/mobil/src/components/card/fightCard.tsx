import React from 'react'
import {StyleSheet, View, Text} from 'react-native'
import {Fonts, FontSizes} from '../../constants/fonts'
import {Colors} from '../../constants/colors'
import {Margins} from '../../constants/margins'
import {FightDetails} from '../../model/fight/fightDetails'

interface Props {
  fights: FightDetails[]
}

const FightCard = ({fights}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.countryText, Margins.mbNormal]}>{}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countryText: {
    color: Colors.white,
    fontFamily: Fonts.OpenSans_Bold,
    fontSize: FontSizes.os_large,
  },
  unitText: {
    color: Colors.white,
    fontFamily: Fonts.OpenSans_Regular,
    fontSize: FontSizes.os_large,
  },
})

export default FightCard
