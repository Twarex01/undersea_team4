import React from 'react'
import {
  View,
  StyleSheet,
  ImageSourcePropType,
  Image,
  StyleProp,
  ViewStyle,
  Text,
} from 'react-native'
import {Fonts, FontSizes} from '../../constants/fonts'
import {Colors} from '../../constants/colors'
import {Margins} from '../../constants/margins'
import {TouchableOpacity} from 'react-native-gesture-handler'
import UpgradesScreen from '../../screens/upgradesScreen'

interface Props {
  style?: StyleProp<ViewStyle>
  image: ImageSourcePropType
  title?: String
  description?: String
}

const UpgradeCard = ({style, image, title, description}: Props) => {
  return (
    <TouchableOpacity style={[styles.container, style]}>
      <Image source={image} style={[Margins.mtBig, Margins.mbNormal]} />
      <Text style={styles.titleText}>{title}</Text>
      <Text style={[styles.descriptionText, Margins.mbBig]}>{description}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderRadius: 10,
    borderColor: Colors.transparentWhite,
    borderWidth: 1,
  },
  titleText: {
    fontFamily: Fonts.OpenSans_Bold,
    fontSize: FontSizes.os_small,
    color: Colors.white,
    textAlign: 'center',
  },
  descriptionText: {
    fontFamily: Fonts.OpenSans_Regular,
    fontSize: FontSizes.os_small,
    color: Colors.white,
    textAlign: 'center',
  },
})

export default UpgradeCard