import React from 'react'
import {
  View,
  StyleSheet,
  ImageSourcePropType,
  Image,
  StyleProp,
  ViewStyle,
  Text,
  ListRenderItemInfo,
} from 'react-native'
import {Fonts, FontSizes} from '../../constants/fonts'
import {Colors} from '../../constants/colors'
import {Margins} from '../../constants/margins'
import {TouchableOpacity, FlatList} from 'react-native-gesture-handler'
import {Strings} from '../../constants/strings'
import {Prices} from '../../model/building/buildingDetails'
import {Config} from '../../constants/config'

interface Props {
  style?: StyleProp<ViewStyle>
  name?: string
  prices: Prices[]
  description?: string
  image: string
  count: number
  onPress: () => void
  selected: boolean
}

const BuildingCard = ({
  style,
  name,
  prices,
  description,
  image,
  count,
  onPress,
  selected,
}: Props) => {
  const renderItem = (item: Prices, index: number) => {
    const {price, priceTypeName} = item
    return (
      <Text key={`${item}${index}`} style={styles.dataText}>
        {price} {priceTypeName}
        {'/'}
        {Strings.piece}
      </Text>
    )
  }

  return (
    <TouchableOpacity
      style={[
        styles.container,
        style,
        {
          backgroundColor: selected
            ? Colors.transparentWhite
            : Colors.middleDarkBlue,
        },
      ]}
      onPress={onPress}>
      <Image
        source={{uri: `${Config.baseURL}${image}`}}
        style={[styles.image, Margins.mtBig, Margins.mbNormal]}
      />
      <Text style={styles.descriptionText}>
        {name}
        {'\n'}
        {description}
      </Text>
      <Text style={[styles.dataText, Margins.mtNormal]}>
        {count} {Strings.piece}
      </Text>
      {prices.map((item, index) => renderItem(item, index))}
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
    paddingBottom: 20,
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
  image: {
    width: 90,
    height: 90,
  },
})

export default BuildingCard
