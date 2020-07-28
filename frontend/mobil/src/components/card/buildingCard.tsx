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
import {color} from 'react-native-reanimated'

interface Props {
  style?: StyleProp<ViewStyle>
  name?: string
  prices: Prices[]
  description?: string
  image: string
  count: number
  selected: boolean
  disabled?: boolean
  progress?: number
}

const BuildingCard = ({
  style,
  name,
  prices,
  description,
  image,
  count,
  selected,
  disabled,
  progress,
}: Props) => {
  const renderItem = (item: Prices, index: number) => {
    const {price, priceTypeName} = item
    return (
      <Text
        key={`${item}${index}`}
        style={[
          styles.dataText,
          {color: disabled ? Colors.transparentWhite : Colors.white},
        ]}>
        {price} {priceTypeName}
        {'/'}
        {Strings.piece}
      </Text>
    )
  }

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
        style={[
          styles.image,
          Margins.mtBig,
          Margins.mbNormal,
          {opacity: disabled ? 0.65 : 1},
        ]}
      />
      <Text
        style={[
          styles.descriptionText,
          {color: disabled ? Colors.transparentWhite : Colors.white},
        ]}>
        {name}
        {'\n'}
        {description}
      </Text>
      <Text
        style={[
          styles.dataText,
          Margins.mtNormal,
          {color: disabled ? Colors.transparentWhite : Colors.white},
        ]}>
        {count} {Strings.piece}
      </Text>
      {prices.map((item, index) => renderItem(item, index))}
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
  progressText: {
    color: Colors.vibrantLightBlue,
    fontFamily: Fonts.OpenSans_SemiBold,
    fontSize: FontSizes.os_small,
    position: 'absolute',
    left: 10,
    top: 10,
  },
})

export default BuildingCard
