import React from 'react'
import BevyScreen from '../../screens/bevyScreen'
import {StyleSheet, View, Image, ImageSourcePropType, Text} from 'react-native'
import {Images} from '../../constants/images'
import {Fonts, FontSizes} from '../../constants/fonts'
import {Strings} from '../../constants/strings'
import {Colors} from '../../constants/colors'
import {Margins} from '../../constants/margins'
import {TouchableOpacity} from 'react-native-gesture-handler'

interface Props {
  image: ImageSourcePropType
  name?: string
  count: number
  attack: number
  defense: number
  pay: number
  supply: number
  price: number
  onMinusPress: () => void
  onPlusPress: () => void
  number?: number
}

const BevyCard = ({
  image,
  name,
  count,
  attack,
  defense,
  pay,
  supply,
  price,
  onMinusPress,
  onPlusPress,
  number,
}: Props) => {
  return (
    <View>
      <View style={styles.centerView}>
        <Image source={image} style={[Margins.mtBig, Margins.mbNormal]} />
        <Text style={styles.nameText}>{name}</Text>
      </View>
      <View style={[styles.rowView, Margins.mtBig, Margins.mbBig]}>
        <View style={styles.leftView}>
          <Text style={styles.descriptionText}>{Strings.owned}</Text>
          <Text style={styles.descriptionText}>
            {Strings.attack_per_defense}
          </Text>
          <Text style={styles.descriptionText}>{Strings.pay}</Text>
          <Text style={styles.descriptionText}>{Strings.supply}</Text>
          <Text style={styles.descriptionText}>{Strings.price}</Text>
        </View>
        <View>
          <Text style={styles.descriptionText}>
            {count} {Strings.piece}
          </Text>
          <Text style={styles.descriptionText}>
            {attack}
            {'/'}
            {defense}
          </Text>
          <Text style={styles.descriptionText}>
            {pay} {Strings.pearl}
          </Text>
          <Text style={styles.descriptionText}>
            {supply} {Strings.coral}
          </Text>
          <Text style={styles.descriptionText}>
            {price} {Strings.pearl}
          </Text>
        </View>
      </View>
      <View style={[styles.buttonView, Margins.mbBig]}>
        <TouchableOpacity onPress={onMinusPress}>
          <Image source={Images.minus} />
        </TouchableOpacity>
        <Text style={[styles.numberText, Margins.mlLarge, Margins.mrLarge]}>
          {'3'}
        </Text>
        <TouchableOpacity onPress={onPlusPress}>
          <Image source={Images.plus} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  centerView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameText: {
    fontFamily: Fonts.OpenSans_Bold,
    fontSize: FontSizes.os_small,
    color: Colors.white,
  },
  descriptionText: {
    fontFamily: Fonts.OpenSans_Regular,
    fontSize: FontSizes.os_normal,
    color: Colors.white,
  },
  numberText: {
    fontFamily: Fonts.OpenSans_Bold,
    fontSize: FontSizes.os_large,
    color: Colors.white,
  },
  leftView: {
    width: '66%',
  },
  rightView: {
    flex: 1,
  },
  rowView: {
    flexDirection: 'row',
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default BevyCard
