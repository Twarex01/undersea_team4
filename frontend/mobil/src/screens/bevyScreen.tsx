import React, {useEffect} from 'react'
import {View, Text, StyleSheet, ListRenderItemInfo} from 'react-native'
import {Colors} from '../constants/colors'
import ScrollablePagesTemplate from '../components/pages/scrollablePagesTemplate'
import {Strings} from '../constants/strings'
import {Fonts, FontSizes} from '../constants/fonts'
import {UnitDetails} from '../model/unit/unitDetails'
import BevyCard from '../components/card/bevyCard'
import {Images} from '../constants/images'
import PagesTemplate from '../components/pages/pagesTemplate'
import {FlatList} from 'react-native-gesture-handler'
import TransparentButton from '../components/button/transparentButton'
import {StackNavigationProp} from '@react-navigation/stack'
import SeparatorComponent from '../components/separator/separatorComponent'
import {useSelector, useDispatch} from 'react-redux'
import {IApplicationState} from '../../store'
import {getUnits} from '../store/units/units.actions'

interface BevyScreenProps {
  navigation: StackNavigationProp<any>
}

const BevyScreen = ({navigation}: BevyScreenProps) => {
  const {units, error, isLoading} = useSelector(
    (state: IApplicationState) => state.app.unit,
  )
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUnits())
  }, [dispatch])

  const onBuyPressed = () => {}
  const onMinusPressed = () => {}
  const onPlusPressed = () => {}
  const renderItem = (itemInfo: ListRenderItemInfo<UnitDetails>) => {
    const {
      name,
      attack,
      def,
      salary,
      consumption,
      price,
      priceTypeName,
      salaryTypeName,
      consumptionTypeName,
    } = itemInfo.item
    return (
      <BevyCard
        image={Images.profil}
        name={name}
        count={5}
        attack={attack}
        defense={def}
        pay={salary}
        supply={consumption}
        price={price}
        onMinusPress={onMinusPressed}
        onPlusPress={onPlusPressed}
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
      <PagesTemplate title={Strings.upgrades}>
        <FlatList
          data={units}
          renderItem={renderItem}
          ListHeaderComponent={renderHeaderComponent}
          ItemSeparatorComponent={SeparatorComponent}
          keyExtractor={keyExtractor}
          style={styles.flatlistPadding}
          contentContainerStyle={{paddingBottom: 120}}
        />
      </PagesTemplate>
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
