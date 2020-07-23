import React, {useEffect} from 'react'
import {View, Text, StyleSheet, ListRenderItemInfo, Image} from 'react-native'
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

  const unitDetailsSelector = createSelector(
    (state: IApplicationState) => state.app,
    appstate =>
      appstate.myUnit.myUnits.map(myUnit => {
        const unitInfo = appstate.unit.units.find(
          u => myUnit.unitTypeID === u.unitTypeID,
        )
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
          count: myUnit.count,
        }
      }),
  )

  const units = useSelector(unitDetailsSelector)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUnits())
    dispatch(getMyUnits())
  }, [dispatch])

  const onBackPressed = () => {
    navigation.pop(1)
  }
  const onAttackPressed = () => {}
  const renderItem = (
    itemInfo: ListRenderItemInfo<UnitDetails & MyUnitDetails>,
  ) => {
    const {name, count, imageURL} = itemInfo.item
    return (
      <AttackSecondCard
        style={[Margins.mtBig, Margins.mbBig]}
        image={imageURL}
        name={name}
        maxCount={count}
        // count={count}
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
