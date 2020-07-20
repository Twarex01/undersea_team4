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
import {Margins} from '../../constants/margins'
import {Colors} from '../../constants/colors'
import {Fonts, FontSizes} from '../../constants/fonts'
import {Strings} from '../../constants/strings'
import Slider from '@react-native-community/slider'

interface Props {
  image: ImageSourcePropType
  name?: string
  number: number
  style?: StyleProp<ViewStyle>
  count: number
}

const AttackSecondCard = ({image, name, number, style, count}: Props) => {
  return (
    <View style={[styles.container, style]}>
      <Image source={image} />
      <View style={[styles.contentView, Margins.mlBig]}>
        <Text style={[styles.nameText, Margins.mbNormal]}>
          {name} {number} {Strings.copy}
        </Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={count}
          step={1}
          thumbTintColor={Colors.vibrantLightBlue}
          minimumTrackTintColor={Colors.vibrantLightBlue}
          maximumTrackTintColor={Colors.lightGray}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  contentView: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  nameText: {
    color: Colors.white,
    fontFamily: Fonts.OpenSans_Regular,
    fontSize: FontSizes.os_small,
  },
  slider: {
    width: '100%',
  },
})

export default AttackSecondCard
