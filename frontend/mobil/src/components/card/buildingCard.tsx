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
import {Strings} from '../../constants/strings'

interface Props {
  style?: StyleProp<ViewStyle>
  image: ImageSourcePropType
  name?: string
  description?: string
  count: number
  price: number
}

const BuildingCard = ({
  style,
  image,
  name,
  description,
  count,
  price,
}: Props) => {
  return (
    <TouchableOpacity style={[styles.container, style]}>
      <Image source={image} style={[Margins.mtBig, Margins.mbNormal]} />
      <Text style={styles.descriptionText}>
        {name}
        {'\n'}
        {description}
      </Text>
      <Text style={[styles.dataText, Margins.mtNormal, Margins.mbBig]}>
        {count} {Strings.piece}
        {'\n'}
        {price} {Strings.pearl_per_piece}
      </Text>
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
  descriptionText: {
    fontFamily: Fonts.OpenSans_Bold,
    fontSize: FontSizes.os_small,
    color: Colors.white,
    textAlign: 'center',
  },
  dataText: {
    fontFamily: Fonts.OpenSans_Regular,
    fontSize: FontSizes.os_small,
    color: Colors.white,
    textAlign: 'center',
  },
})

export default BuildingCard
