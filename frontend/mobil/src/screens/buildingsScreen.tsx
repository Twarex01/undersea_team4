import React, {useEffect, useState} from 'react'
import {
  View,
  Text,
  StyleSheet,
  ListRenderItemInfo,
  RefreshControl,
} from 'react-native'
import {Colors} from '../constants/colors'
import {Strings} from '../constants/strings'
import {Fonts, FontSizes} from '../constants/fonts'
import {Margins} from '../constants/margins'
import BuildingCard from '../components/card/buildingCard'
import {BuildingDetails} from '../model/building/buildingDetails'
import {FlatList} from 'react-native-gesture-handler'
import {useSelector, useDispatch} from 'react-redux'
import {IApplicationState} from '../../store'
import {getBuildings} from '../store/buildings/buildings.actions'
import {getMyBuildings} from '../store/myBuildings/myBuildings.action'
import {createSelector} from 'reselect'
import {MyBuildingDetails} from '../model/building/myBuildingDetails'
import TransparentButton from '../components/button/transparentButton'

const BuildingsScreen = () => {
  const {buildingsError, isBuildingsLoading} = useSelector(
    (state: IApplicationState) => state.app.building,
  )
  const {myBuildingsError, isMyBuildingsLoading} = useSelector(
    (state: IApplicationState) => state.app.myBuilding,
  )

  const buildingsDataSelector = createSelector(
    (state: IApplicationState) => state.app,
    appstate =>
      appstate.building.buildings.map(building => {
        const myBuildingInfo = appstate.myBuilding.myBuildings.find(
          b => building.buildingTypeID === b.buildingTypeID,
        )
        return {
          buildingTypeID: building.buildingTypeID,
          name: building.name,
          prices: building.prices,
          effect: building.effect,
          buildTime: building.buildTime,
          imageURL: building.imageURL,
          progress: myBuildingInfo?.progress,
          count: myBuildingInfo?.count,
        }
      }),
  )

  const buildings = useSelector(buildingsDataSelector)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getBuildings())
    dispatch(getMyBuildings())
  }, [dispatch])

  const refreshBuildings = () => {
    dispatch(getBuildings())
    dispatch(getMyBuildings())
  }

  const [index, setIndex] = useState(-1)

  const onBuyPressed = () => {}
  const onItemPressed = () => {}

  const renderItem = (
    itemInfo: ListRenderItemInfo<BuildingDetails & MyBuildingDetails>,
  ) => {
    const {
      buildingTypeID,
      name,
      prices,
      effect,
      buildTime,
      imageURL,
      progress,
      count,
    } = itemInfo.item
    return (
      <BuildingCard
        style={Margins.mbNormal}
        name={name}
        prices={prices}
        description={effect}
        image={imageURL}
        count={count ? count : 0}
        onPress={onItemPressed}
        selected={index === buildingTypeID ? true : false}
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
    <View style={styles.container}>
      <FlatList
        data={buildings}
        renderItem={renderItem}
        ListHeaderComponent={renderHeaderComponent}
        keyExtractor={keyExtractor}
        style={styles.flatlistPadding}
        contentContainerStyle={{paddingBottom: 120}}
        refreshControl={
          <RefreshControl
            refreshing={isBuildingsLoading && isMyBuildingsLoading}
            onRefresh={refreshBuildings}
          />
        }
      />
      <TransparentButton
        title={Strings.buy}
        onPress={onBuyPressed}
        style={{position: 'absolute', bottom: 0}}
      />
    </View>
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
