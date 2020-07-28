import React, {useState, useEffect} from 'react'
import {
  View,
  StyleSheet,
  LayoutChangeEvent,
  LayoutAnimation,
  Dimensions,
} from 'react-native'
import {Colors} from '../../constants/colors'
import PopupIcon from '../icon/popupIcon'
import {Images} from '../../constants/images'
import {Margins} from '../../constants/margins'
import PopupButton from '../button/popupButton'
import Constants from 'expo-constants'
import {useDispatch, useSelector} from 'react-redux'
import {getResources} from '../../store/resources/resources.actions'
import {getMyBuildings} from '../../store/myBuildings/myBuildings.action'
import {getMyUnits} from '../../store/myUnits/myUnits.actions'
import {IApplicationState} from '../../../store'
import {State} from 'react-native-gesture-handler'
import {createSelector} from 'reselect'
import {ResourceDetails} from '../../model/resources/resourceDetails'
import {Config} from '../../constants/config'
import {UnitDetails} from '../../model/unit/unitDetails'
import {MyUnitDetails} from '../../model/unit/myUnitDetails'
import {getUnits} from '../../store/units/units.actions'
import {getBuildings} from '../../store/buildings/buildings.actions'
import {BuildingDetails} from '../../model/building/buildingDetails'
import {MyBuildingDetails} from '../../model/building/myBuildingDetails'

const PopupMenu = () => {
  //28 button, 56 header, statusbar
  var screenHeight =
    Dimensions.get('window').height - 28 - 50 - Constants.statusBarHeight
  const [isClosed, setIsClosed] = useState(true)

  const {resources, isLoading, error} = useSelector(
    (state: IApplicationState) => state.app.resource,
  )

  const {isMyBuildingsLoading, myBuildingsError} = useSelector(
    (state: IApplicationState) => state.app.myBuilding,
  )
  const {buildingsError, isBuildingsLoading} = useSelector(
    (state: IApplicationState) => state.app.building,
  )

  const {isMyUnitsLoading, myUnitsError} = useSelector(
    (state: IApplicationState) => state.app.myUnit,
  )
  const {unitsError, isUnitsLoading} = useSelector(
    (state: IApplicationState) => state.app.unit,
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
          iconURL: building.iconURL,
          backgroundURL: building.backgroundURL,
          progress: myBuildingInfo?.progress,
          count: myBuildingInfo?.count,
        }
      }),
  )
  const unitDetailsSelector = createSelector(
    (state: IApplicationState) => state.app,
    appstate =>
      appstate.unit.units.map(unit => {
        const myUnitInfo = appstate.myUnit.myUnits.find(
          u => unit.unitTypeID === u.unitTypeID,
        )
        return {
          unitTypeID: unit.unitTypeID,
          name: unit.name,
          atk: unit.atk,
          def: unit.def,
          salary: unit.salary,
          consumption: unit.consumption,
          price: unit.price,
          salaryTypeName: unit.salaryTypeName,
          consumptionTypeName: unit.consumptionTypeName,
          priceTypeName: unit.priceTypeName,
          imageURL: unit.imageURL,
          unitCount: myUnitInfo?.unitCount,
        }
      }),
  )

  const units = useSelector(unitDetailsSelector)
  const buildings = useSelector(buildingsDataSelector)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getResources())
    dispatch(getMyBuildings())
    dispatch(getBuildings())
    dispatch(getMyUnits())
    dispatch(getUnits())
  }, [dispatch])

  const onPress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setIsClosed(!isClosed)
  }

  const unitItem = (item: UnitDetails & MyUnitDetails, index: number) => {
    const {unitCount, imageURL} = item
    return (
      <PopupIcon
        key={`${item}${index}`}
        image={{uri: `${Config.baseURL}${imageURL}`}}
        count={unitCount ? unitCount : 0}
        round={''}
        style={[Margins.mrNormal, Margins.mlNormal]}
      />
    )
  }

  const resourceItem = (item: ResourceDetails, index: number) => {
    const {amount, production, imageURL} = item
    return (
      <PopupIcon
        key={`${item}${index}`}
        image={{uri: `${Config.baseURL}${imageURL}`}}
        count={amount ? amount : 0}
        round={`${production}/kör`}
        style={[Margins.mrNormal, Margins.mlNormal]}
      />
    )
  }

  const buildingsItem = (
    item: BuildingDetails & MyBuildingDetails,
    index: number,
  ) => {
    const {iconURL, count} = item
    return (
      <PopupIcon
        key={`${item}${index}`}
        image={{uri: `${Config.baseURL}${iconURL}`}}
        count={count ? count : 0}
        round={''}
        style={[Margins.mrNormal, Margins.mlNormal]}
      />
    )
  }

  return (
    <View
      style={[styles.container, isClosed ? {top: screenHeight} : {bottom: 0}]}>
      <PopupButton onPress={onPress} isClosed={isClosed} />
      <View style={styles.transparentView}>
        <View style={[styles.rowView, Margins.mtLarge]}>
          {units.map((item, index) => unitItem(item, index))}
        </View>
        <View style={[styles.rowView, Margins.mbLarge]}>
          {resources.map((item, index) => resourceItem(item, index))}
        </View>
        <View style={[styles.rowView]}>
          {buildings.map((item, index) => buildingsItem(item, index))}
        </View>
      </View>
    </View>
  )
}

export default PopupMenu

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    position: 'absolute',
  },
  transparentView: {
    backgroundColor: Colors.transparentWhite,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
})
