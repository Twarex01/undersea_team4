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
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler'
import {useSelector, useDispatch} from 'react-redux'
import {IApplicationState} from '../../store'
import {getBuildings} from '../store/buildings/buildings.actions'
import {getMyBuildings} from '../store/myBuildings/myBuildings.action'
import {createSelector} from 'reselect'
import {MyBuildingDetails} from '../model/building/myBuildingDetails'
import TransparentButton from '../components/button/transparentButton'
import {putBuilding} from '../store/putBuilding/putBuilding.actions'

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

  useEffect(() => {
    setDisabled(checkProgress())
  }, [buildings])

  const refreshBuildings = () => {
    dispatch(getBuildings())
    dispatch(getMyBuildings())
  }

  const successAction = () => {
    setIndex(-1)
    refreshBuildings()
  }
  const [index, setIndex] = useState(-1)
  const [disabled, setDisabled] = useState(false)

  const checkProgress = (): boolean => {
    var temp = false
    buildings.map(b => {
      if (b.progress) {
        if (b.progress > 0) {
          temp = true
        }
      }
    })
    return temp
  }

  const onBuyPressed = () => {
    if (!(index === -1)) {
      dispatch(putBuilding(index, successAction))
    }
  }

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

    const onItemPressed = () => {
      if (index === buildingTypeID) {
        setIndex(-1)
      } else {
        setIndex(buildingTypeID)
      }
    }
    return (
      <TouchableOpacity onPress={onItemPressed} disabled={disabled}>
        <BuildingCard
          style={Margins.mbNormal}
          name={name}
          prices={prices}
          description={effect}
          image={imageURL}
          count={count ? count : 0}
          selected={index === buildingTypeID ? true : false}
          disabled={disabled}
          progress={progress}
        />
      </TouchableOpacity>
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
        style={styles.button}
        disabled={index === -1 ? true : false}
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
  button: {
    position: 'absolute',
    bottom: 0,
  },
})

export default BuildingsScreen
