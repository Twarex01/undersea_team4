import React, {useState} from 'react'
import {View, StyleSheet, Image, StyleProp, ViewStyle, Text} from 'react-native'
import {Margins} from '../../constants/margins'
import {Colors} from '../../constants/colors'
import {Fonts, FontSizes} from '../../constants/fonts'
import Slider from '@react-native-community/slider'
import {Config} from '../../constants/config'

interface Props {
  image: string
  name?: string
  count: number
  style?: StyleProp<ViewStyle>
  maxCount: number
  unitTypeId: number
  setCount?: (id: number, count: number) => void
}

const AttackSecondCard = ({
  image,
  name,
  style,
  maxCount,
  count,
  unitTypeId,
  setCount,
}: Props) => {
  const setValue = (value: number) => {
    if (setCount) {
      setCount(unitTypeId, value)
    }
  }

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.imageBackground, Margins.mtBig, Margins.mbNormal]}>
        <Image
          source={{uri: `${Config.baseURL}${image}`}}
          style={[styles.image]}
        />
      </View>

      <View style={[styles.contentView, Margins.mlBig]}>
        <Text style={[styles.nameText, Margins.mbNormal]}>
          {name}
          {': '} {count}
          {'/'}
          {maxCount}
        </Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={maxCount}
          step={1}
          thumbTintColor={Colors.vibrantLightBlue}
          minimumTrackTintColor={Colors.vibrantLightBlue}
          maximumTrackTintColor={Colors.lightGray}
          onValueChange={setValue}
          value={count}
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
  image: {
    height: 40,
    width: 40,
  },
  imageBackground: {
    backgroundColor: Colors.vibrantLightBlue,
    height: 60,
    width: 60,
    borderColor: Colors.lightBlue,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default AttackSecondCard
