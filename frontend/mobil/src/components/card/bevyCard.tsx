import React from 'react'
import BevyScreen from '../../screens/bevyScreen'
import {StyleSheet, View, Image, ImageSourcePropType, Text} from 'react-native'
import {Images} from '../../constants/images'
import {Fonts, FontSizes} from '../../constants/fonts'
import {Strings} from '../../constants/strings'
import {Colors} from '../../constants/colors'
import {Margins} from '../../constants/margins'
import {TouchableOpacity} from 'react-native-gesture-handler'
import {Config} from '../../constants/config'

interface Props {
  image: string
  name?: string
  attack: number
  defense: number
  salary: number
  consumption: number
  price: number
  salaryType: string
  consumptionType: string
  priceType: string
  onMinusPress: () => void
  onPlusPress: () => void
  count: number
  number?: number
}

const BevyCard = ({
  image,
  name,
  attack,
  defense,
  salary,
  consumption,
  price,
  salaryType,
  consumptionType,
  priceType,
  onMinusPress,
  onPlusPress,
  count,
  number,
}: Props) => {
  return (
    <View>
      <View style={styles.centerView}>
        <View style={[styles.imageBackground, Margins.mtBig, Margins.mbNormal]}>
          <Image
            source={{uri: `${Config.baseURL}${image}`}}
            style={[styles.image]}
          />
        </View>
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
        <View style={styles.rightView}>
          <Text style={styles.descriptionText}>
            {count} {Strings.piece}
          </Text>
          <Text style={styles.descriptionText}>
            {attack}
            {'/'}
            {defense}
          </Text>
          <Text style={styles.descriptionText}>
            {salary} {salaryType}
          </Text>
          <Text style={styles.descriptionText}>
            {consumption} {consumptionType}
          </Text>
          <Text style={styles.descriptionText}>
            {price} {priceType}
          </Text>
        </View>
      </View>
      <View style={[styles.buttonView, Margins.mbBig]}>
        <TouchableOpacity onPress={onMinusPress}>
          <Image source={Images.minus} />
        </TouchableOpacity>
        <Text style={[styles.numberText, Margins.mlLarge, Margins.mrLarge]}>
          {number}
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
    alignItems: 'flex-end',
  },
  rowView: {
    flexDirection: 'row',
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 50,
    width: 50,
  },
  imageBackground: {
    backgroundColor: Colors.vibrantLightBlue,
    height: 80,
    width: 80,
    borderColor: Colors.lightBlue,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default BevyCard
