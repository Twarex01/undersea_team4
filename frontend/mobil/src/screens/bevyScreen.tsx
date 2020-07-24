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
import {UnitDetails} from '../model/unit/unitDetails'
import BevyCard from '../components/card/bevyCard'
import {FlatList} from 'react-native-gesture-handler'
import {StackNavigationProp} from '@react-navigation/stack'
import SeparatorComponent from '../components/separator/separatorComponent'
import {useSelector, useDispatch} from 'react-redux'
import {IApplicationState, IAppStore} from '../../store'
import {getUnits} from '../store/units/units.actions'
import {createSelector} from 'reselect'
import {MyUnitDetails} from '../model/unit/myUnitDetails'
import {getMyUnits} from '../store/myUnits/myUnits.actions'
import TransparentButton from '../components/button/transparentButton'
import {PutUnitDetails} from '../model/unit/putUnitRequest'

interface BevyScreenProps {
  navigation: StackNavigationProp<any>
}

const BevyScreen = ({navigation}: BevyScreenProps) => {
  const {unitsError, isUnitsLoading} = useSelector(
    (state: IApplicationState) => state.app.unit,
  )
  const {myUnitsError, isMyUnitsLoading} = useSelector(
    (state: IApplicationState) => state.app.myUnit,
  )

  const unitDetailsSelector = createSelector(
    (state: IApplicationState) => state.app,
    appstate =>
      appstate.unit.units.map(unit => {
        const myUnitInfo = appstate.myUnit.myUnits.find(
          u => unit.unitTypeID === u.unitTypeID,
        )
        const putUnitInfo = appstate.putUnits.putUnits.find(
          p => unit.unitTypeID === p.unitTypeID,
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
          count: myUnitInfo?.count,
          number: putUnitInfo?.count,
        }
      }),
  )

  const units = useSelector(unitDetailsSelector)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUnits())
    dispatch(getMyUnits())
  }, [dispatch])

  const refreshUnits = () => {
    dispatch(getUnits())
    dispatch(getMyUnits())
  }

  const onBuyPressed = () => {}
  const renderItem = (
    itemInfo: ListRenderItemInfo<UnitDetails & MyUnitDetails & PutUnitDetails>,
  ) => {
    const {
      unitTypeID,
      name,
      atk,
      def,
      salary,
      consumption,
      price,
      priceTypeName,
      salaryTypeName,
      consumptionTypeName,
      imageURL,
      count,
    } = itemInfo.item

    const onMinusPressed = () => {}
    const onPlusPressed = () => {}

    return (
      <BevyCard
        image={imageURL}
        name={name}
        attack={atk}
        defense={def}
        salary={salary}
        consumption={consumption}
        price={price}
        salaryType={salaryTypeName}
        consumptionType={consumptionTypeName}
        priceType={priceTypeName}
        count={count ? count : 0}
        onMinusPress={onMinusPressed}
        onPlusPress={onPlusPressed}
        number={count}
      />
    )
  }

  const renderHeaderComponent = () => {
    return <Text style={styles.titleText}>{Strings.bevy_title}</Text>
  }

  const keyExtractor = (item: UnitDetails) => {
    return item.unitTypeID.toString()
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={units}
        renderItem={renderItem}
        ListHeaderComponent={renderHeaderComponent}
        ItemSeparatorComponent={SeparatorComponent}
        keyExtractor={keyExtractor}
        style={styles.flatlistPadding}
        contentContainerStyle={{paddingBottom: 120}}
        refreshControl={
          <RefreshControl
            refreshing={isUnitsLoading && isMyUnitsLoading}
            onRefresh={refreshUnits}
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
  flatlistPadding: {
    flex: 1,
    paddingTop: 25,
    paddingHorizontal: 20,
  },
})

export default BevyScreen
