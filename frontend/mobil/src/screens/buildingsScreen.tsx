import React, {useEffect} from 'react'
import {View, Text, StyleSheet, ListRenderItemInfo} from 'react-native'
import {Colors} from '../constants/colors'
import ScrollablePagesTemplate from '../components/pages/scrollablePagesTemplate'
import {Strings} from '../constants/strings'
import {Fonts, FontSizes} from '../constants/fonts'
import {Margins} from '../constants/margins'
import BuildingCard from '../components/card/buildingCard'
import {Images} from '../constants/images'
import {BuildingDetails} from '../model/building/buildingDetails'
import {UpgradeDetails} from '../model/upgrade/upgradeDetails'
import PagesTemplate from '../components/pages/pagesTemplate'
import {FlatList} from 'react-native-gesture-handler'
import TransparentButton from '../components/button/transparentButton'
import {StackNavigationProp} from '@react-navigation/stack'
import {useSelector, useDispatch} from 'react-redux'
import {IApplicationState} from '../../store'
import {getBuildings} from '../store/buildings/buildings.actions'

interface BuildingsScreenProps {
  navigation: StackNavigationProp<any>
}

const BuildingsScreen = ({navigation}: BuildingsScreenProps) => {
  const {buildings, error, isLoading} = useSelector(
    (state: IApplicationState) => state.app.building,
  )
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getBuildings())
  }, [dispatch])

  const onBuyPressed = () => {}

  const renderItem = (itemInfo: ListRenderItemInfo<BuildingDetails>) => {
    const {
      buildingTypeID,
      name,
      price,
      priceTypeName,
      effect,
      buildTime,
      imageURL,
    } = itemInfo.item
    return (
      <BuildingCard
        style={Margins.mbNormal}
        name={name}
        price={price}
        priceType={priceTypeName}
        description={effect}
        image={Images.reef_castle}
        count={5}
      />
    )
  }

  const renderHeaderComponent = () => {
    return (
      <View style={Margins.mbBig}>
        <Text style={styles.titleText}>{Strings.buildings_title}</Text>
        <Text style={styles.descriptionText}>
          {Strings.buildings_description}
        </Text>
      </View>
    )
  }

  const keyExtractor = (item: BuildingDetails) => {
    return item.buildingTypeID.toString()
  }

  return (
    <FlatList
      data={buildings}
      renderItem={renderItem}
      ListHeaderComponent={renderHeaderComponent}
      keyExtractor={keyExtractor}
      style={styles.flatlistPadding}
      contentContainerStyle={{paddingBottom: 120}}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleText: {
    fontFamily: Fonts.OpenSans_Bold,
    fontSize: FontSizes.os_large,
    color: Colors.white,
  },
  descriptionText: {
    fontFamily: Fonts.OpenSans_Regular,
    fontSize: FontSizes.os_large,
    color: Colors.white,
  },
  flatlistPadding: {
    flex: 1,
    paddingTop: 25,
    paddingHorizontal: 20,
  },
})

export default BuildingsScreen
