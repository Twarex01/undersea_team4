import React from 'react'
import {Colors} from '../../constants/colors'
import {
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Image,
  ImageSourcePropType,
  View,
} from 'react-native'
import {Fonts, FontSizes} from '../../constants/fonts'

interface Props {
  count: number
  round: string
  style: StyleProp<ViewStyle>
  imageStyle?: StyleProp<ViewStyle>
  image: ImageSourcePropType
}

const MenuButton = ({count, round, style, image, imageStyle}: Props) => {
  return (
    <View style={[styles.popupIconContainer, style]}>
      <View style={[styles.imageBackground]}>
        <Image source={image} style={styles.image} />
      </View>
      <Text style={styles.menuButtonText}>{count}</Text>
      <Text style={styles.menuButtonText}>{round}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  popupIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuButtonText: {
    color: Colors.middleBlue,
    fontSize: FontSizes.b2_normal,
    fontFamily: Fonts.Baloo2_ExtraBold,
  },
  image: {
    height: 25,
    width: 25,
  },
  imageBackground: {
    backgroundColor: Colors.vibrantLightBlue,
    height: 35,
    width: 35,
    borderColor: Colors.lightBlue,
    borderRadius: 5,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default MenuButton
