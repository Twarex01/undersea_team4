import React from 'react'
import {View, Text, StyleSheet, Image} from 'react-native'
import {Colors} from '../../constants/colors'
import {Fonts, FontSizes} from '../../constants/fonts'
import {Margins} from '../../constants/margins'
import {Images} from '../../constants/images'

interface Props {
  name?: string
  selected: boolean
}

const AttackFirstCard = ({name, selected}: Props) => {
  return (
    <View style={styles.touchableOpacity}>
      <Text style={[styles.text, Margins.mlNormal]}>{name}</Text>
      <View style={{flex: 1}} />
      <Image
        source={selected ? Images.done : null}
        style={[styles.image, Margins.mrExtraLarge]}
      />
    </View>
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
  image: {
    alignSelf: 'flex-end',
  },
})

export default AttackFirstCard
