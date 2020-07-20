import React from 'react'
import {View, Text, StyleSheet, Image} from 'react-native'
import {Colors} from '../../constants/colors'
import {Fonts, FontSizes} from '../../constants/fonts'
import {Margins} from '../../constants/margins'
import {Images} from '../../constants/images'
import {TouchableOpacity} from 'react-native-gesture-handler'

interface Props {
  username?: string
  onPress: () => void
}

const AttackFirstCard = ({username, onPress}: Props) => {
  return (
    <TouchableOpacity style={styles.touchableOpacity} onPress={onPress}>
      <Text style={[styles.text, Margins.mlNormal]}>{username}</Text>
      <View style={{flex: 1}} />
      <Image
        source={Images.profil_icon}
        style={[styles.image, Margins.mrExtraLarge]}
      />
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
  image: {
    alignSelf: 'flex-end',
  },
})

export default AttackFirstCard
