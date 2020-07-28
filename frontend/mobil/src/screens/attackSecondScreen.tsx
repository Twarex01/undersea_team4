import React, {useEffect} from 'react'
import {
  View,
  Text,
  StyleSheet,
  ListRenderItemInfo,
  Image,
  RefreshControl,
} from 'react-native'
import {Colors} from '../constants/colors'
import {Strings} from '../constants/strings'
import {Fonts, FontSizes} from '../constants/fonts'
import TransparentButton from '../components/button/transparentButton'
import {StackNavigationProp} from '@react-navigation/stack'
import {UnitDetails} from '../model/unit/unitDetails'
import AttackSecondCard from '../components/card/attackSecondCard'
import {Images} from '../constants/images'
import PagesTemplate from '../components/pages/pagesTemplate'
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler'
import {Margins} from '../constants/margins'
import {IApplicationState} from '../../store'
import {useSelector, useDispatch} from 'react-redux'
import {createSelector} from 'reselect'
import {MyUnitDetails} from '../model/unit/myUnitDetails'
import {getUnits} from '../store/units/units.actions'
import {getMyUnits} from '../store/myUnits/myUnits.actions'
import {Battle} from '../model/battle/battleRequest'
import {
  setCount,
  attack,
  explore,
  resetBattleCount,
} from '../store/battle/battle.actions'
import {AttackRequest} from '../model/battle/attackRequest'
import {ExploreRequest} from '../model/battle/exploreRequest'
import {resetCount} from '../store/putUnits/putUnits.actions'
import {getFights} from '../store/fights/fights.action'
import {getExplorations} from '../store/explorations/explorations.actions'

interface AttacSecondScreenProps {
  navigation: StackNavigationProp<any>
}

const AttacSecondScreen = ({navigation}: AttacSecondScreenProps) => {
  const {unitsError, isUnitsLoading} = useSelector(
    (state: IApplicationState) => state.app.unit,
  )
  const {myUnitsError, isMyUnitsLoading} = useSelector(
    (state: IApplicationState) => state.app.myUnit,
  )
  const {battle, error, isLoading} = useSelector(
    (state: IApplicationState) => state.app.battle,
  )

  const fightDataSelector = createSelector(
    (state: IApplicationState) => state.app,
    appstate => {
      return {
        fightError: appstate.fight.error,
        isFightLoading: appstate.fight.isLoading,
        explorationError: appstate.exploration.error,
        isExplorationLoading: appstate.exploration.isLoading,
      }
    },
  )
  const fightData = useSelector(fightDataSelector)

  const fightSumSelector = createSelector(
    (state: IApplicationState) => state.app,
    appstate => {
      var temp: Array<{unitTypeId: number; count: number}> = []
      appstate.unit.units.map(u => {
        var sum: number = 0
        appstate.fight.fights.map(f => {
          const n = f.units.find(un => un.name === u.name)?.count
          n ? (sum += n) : (sum += 0)
        })
        appstate.exploration.explorations.find(e => {
          if (u.unitTypeID === 4) {
            sum += e.numberOfExplorers
          }
        })
        temp.push({unitTypeId: u.unitTypeID, count: sum})
      })
      return temp
    },
  )

  const fightSum = useSelector(fightSumSelector)

  const unitDetailsSelector = createSelector(
    (state: IApplicationState) => state.app,
    appstate =>
      appstate.myUnit.myUnits.map(myUnit => {
        const unitInfo = appstate.unit.units.find(
          u => myUnit.unitTypeID === u.unitTypeID,
        )
        const battleInfo = appstate.battle.battle.battle.find(
          b => myUnit.unitTypeID === b.unitTypeID,
        )
        const fight = fightSum.find(f => myUnit.unitTypeID === f.unitTypeId)
        return {
          unitTypeID: unitInfo?.unitTypeID,
          name: unitInfo?.name,
          atk: unitInfo?.atk,
          def: unitInfo?.def,
          salary: unitInfo?.salary,
          consumption: unitInfo?.consumption,
          price: unitInfo?.price,
          salaryTypeName: unitInfo?.salaryTypeName,
          consumptionTypeName: unitInfo?.consumptionTypeName,
          priceTypeName: unitInfo?.priceTypeName,
          imageURL: unitInfo?.imageURL,
          unitCount: myUnit.unitCount - (fight?.count ? fight.count : 0),
          count: battleInfo?.count,
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
    dispatch(getFights())
    dispatch(getExplorations())
  }

  const onBackPressed = () => {
    navigation.pop(1)
  }

  const setValue = (unitTypeID: number, count: number) => {
    dispatch(setCount(unitTypeID, count))
  }

  const onAttackPressed = () => {
    var army: AttackRequest = {idAtt: 0, idDef: 0, army: []}
    var explorers: ExploreRequest = {
      senderCountryID: 0,
      victimCountryID: 0,
      numberOfExplorers: 0,
    }
    army.idDef = battle.idDef
    explorers.victimCountryID = battle.idDef
    battle.battle.map(b => {
      if (b.unitTypeID === 4) {
        explorers.numberOfExplorers = b.count
      } else {
        army.army.push({unitTypeID: b.unitTypeID, unitCount: b.count})
      }
    })
    dispatch(attack(army))
    dispatch(explore(explorers))
    successAction()
  }

  const successAction = () => {
    refreshUnits()
    dispatch(resetBattleCount())
  }

  const renderItem = (
    itemInfo: ListRenderItemInfo<UnitDetails & MyUnitDetails & Battle>,
  ) => {
    const {name, unitCount, imageURL, count, unitTypeID} = itemInfo.item
    return (
      <AttackSecondCard
        unitTypeId={unitTypeID}
        style={[Margins.mtBig, Margins.mbBig]}
        image={imageURL}
        name={name}
        maxCount={unitCount}
        count={count ? count : 0}
        setCount={setValue}
      />
    )
  }

  const renderHeaderComponent = () => {
    return (
      <View>
        <Text style={styles.titleText}>{Strings.attack_second_title}</Text>
        <Text style={styles.descriptionText}>
          {Strings.attack_second_description}
        </Text>
      </View>
    )
  }

  const renderFooterComponent = () => {
    return (
      <TouchableOpacity
        style={[styles.footerButton, Margins.mtBig]}
        onPress={onBackPressed}>
        <Image source={Images.back_arrow} style={styles.footerImage} />
        <Text style={[styles.footerText, Margins.mlNormal]}>
          {Strings.back}
        </Text>
      </TouchableOpacity>
    )
  }

  const keyExtractor = (item: UnitDetails) => {
    return item.unitTypeID.toString()
  }

  return (
    <View style={styles.container}>
      <PagesTemplate title={Strings.attack}>
        <FlatList
          data={units}
          renderItem={renderItem}
          ListHeaderComponent={renderHeaderComponent}
          ListFooterComponent={renderFooterComponent}
          keyExtractor={keyExtractor}
          style={styles.flatlistPadding}
          contentContainerStyle={{paddingBottom: 120}}
          refreshControl={
            <RefreshControl
              refreshing={
                isUnitsLoading &&
                isMyUnitsLoading &&
                isLoading &&
                fightData.isExplorationLoading &&
                fightData.isFightLoading
              }
              onRefresh={refreshUnits}
            />
          }
        />
      </PagesTemplate>
      <TransparentButton
        title={Strings.attack_button}
        onPress={onAttackPressed}
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
    textTransform: 'uppercase',
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
  footerButton: {
    flexDirection: 'row',
  },
  footerImage: {
    tintColor: Colors.vibrantLightBlue,
  },
  footerText: {
    color: Colors.vibrantLightBlue,
    fontFamily: Fonts.Baloo2_ExtraBold,
    fontSize: FontSizes.b2_normal,
  },
})

export default AttacSecondScreen
