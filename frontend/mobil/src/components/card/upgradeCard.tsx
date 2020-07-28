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
import {Config} from '../../constants/config'
import {Images} from '../../constants/images'

interface Props {
  style?: StyleProp<ViewStyle>
  image: string
  title?: String
  description?: String
  selected: boolean
  progress?: number
  disabled?: boolean
}

const UpgradeCard = ({
  style,
  image,
  title,
  description,
  selected,
  progress,
  disabled,
}: Props) => {
  return (
    <View
      style={[
        styles.container,
        style,
        {
          backgroundColor: selected
            ? Colors.transparentWhite
            : Colors.middleDarkBlue,
        },
      ]}>
      <Image
        source={{uri: `${Config.baseURL}${image}`}}
        style={[styles.image, Margins.mtBig, Margins.mbNormal]}
      />
      <Text
        style={[
          styles.titleText,
          {color: disabled ? Colors.transparentWhite : Colors.white},
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.descriptionText,
          Margins.mbBig,
          {color: disabled ? Colors.transparentWhite : Colors.white},
        ]}>
        {description}
      </Text>
      <Image
        source={progress === 0 ? Images.done : null}
        style={styles.progressImage}
      />
      <Text style={styles.progressText}>
        {progress > 0 ? `még ${progress} kör` : ''}
      </Text>
    </View>
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
  image: {
    height: 70,
    width: 70,
  },
  progressImage: {
    position: 'absolute',
    left: 10,
    top: 10,
  },
  progressText: {
    color: Colors.vibrantLightBlue,
    fontFamily: Fonts.OpenSans_SemiBold,
    fontSize: FontSizes.os_small,
    position: 'absolute',
    left: 10,
    top: 10,
  },
})

export default UpgradeCard
