import React, {useEffect} from 'react'
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  ListRenderItemInfo,
  SectionListData,
  SectionListRenderItem,
  SectionListRenderItemInfo,
  RefreshControl,
} from 'react-native'
import {Colors} from '../constants/colors'
import {StackNavigationProp} from '@react-navigation/stack'
import {Fonts, FontSizes} from '../constants/fonts'
import {UnitCount, FightDetails} from '../model/fight/fightDetails'
import {Margins} from '../constants/margins'
import {useSelector, useDispatch} from 'react-redux'
import {IApplicationState} from '../../store'
import {getFights} from '../store/fights/fights.action'
import {createSelector} from 'reselect'

const sectionDataSelector = createSelector(
  (state: IApplicationState) => state.app.fight.fights,
  fights =>
    fights.map(fight => ({
      title: fight.defenderName,
      data: fight.units,
    })),
)
const FightScreen = () => {
  const {error, isLoading} = useSelector(
    (state: IApplicationState) => state.app.fight,
  )

  const fights = useSelector(sectionDataSelector)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getFights())
  }, [dispatch])

  const refreshFights = () => {
    dispatch(getFights())
  }

  const renderSectionHeader = (info: {section: SectionListData<UnitCount>}) => {
    return (
      <Text style={[styles.sectionHeaderText, Margins.mbNormal]}>
        {info.section.title}
      </Text>
    )
  }

  const renderItem = (itemInfo: SectionListRenderItemInfo<UnitCount>) => {
    const {count, name} = itemInfo.item
    return (
      <Text style={[styles.sectionItemText, Margins.mbNormal]}>
        {count} {name}
      </Text>
    )
  }

  return (
    <SectionList
      style={styles.sectionlistPadding}
      keyExtractor={(item, index) => `${item}${index}`}
      sections={fights}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refreshFights} />
      }
    />
  )
}

const styles = StyleSheet.create({
  text: {
    color: Colors.white,
  },
  sectionHeaderText: {
    color: Colors.white,
    fontFamily: Fonts.OpenSans_Bold,
    fontSize: FontSizes.os_large,
    borderTopColor: Colors.transparentWhite,
    borderTopWidth: 1,
    paddingTop: 10,
  },
  sectionItemText: {
    color: Colors.white,
    fontFamily: Fonts.OpenSans_Regular,
    fontSize: FontSizes.os_large,
  },
  sectionlistPadding: {
    flex: 1,
    paddingTop: 25,
    paddingHorizontal: 20,
  },
})

export default FightScreen
