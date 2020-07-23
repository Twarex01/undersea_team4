import React, {useEffect} from 'react'
import {
  View,
  StyleSheet,
  ListRenderItemInfo,
  Text,
  RefreshControl,
} from 'react-native'
import {useSelector, useDispatch} from 'react-redux'
import {IApplicationState} from '../../store'
import {getExplorations} from '../store/explorations/explorations.actions'
import {ExplorationDetails} from '../model/exploration/exprorationDetails'
import {Margins} from '../constants/margins'
import {FlatList} from 'react-native-gesture-handler'
import {Fonts, FontSizes} from '../constants/fonts'
import {Colors} from '../constants/colors'
import SeparatorComponent from '../components/separator/separatorComponent'

const ExplorationScreen = () => {
  const {explorations, error, isLoading} = useSelector(
    (state: IApplicationState) => state.app.exploration,
  )
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getExplorations())
  }, [dispatch])

  const refreshExplorations = () => {
    dispatch(getExplorations())
  }

  const renderItem = (itemInfo: ListRenderItemInfo<ExplorationDetails>) => {
    const {victimCountryName, numberOfExplorers} = itemInfo.item
    return (
      <Text
        style={[styles.sectionItemText, Margins.mtNormal, Margins.mbNormal]}>
        {victimCountryName}
        {': '} {numberOfExplorers}
      </Text>
    )
  }

  return (
    <FlatList
      data={explorations}
      style={styles.sectionlistPadding}
      renderItem={renderItem}
      keyExtractor={(item, index) => `${item}${index}`}
      ItemSeparatorComponent={SeparatorComponent}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={refreshExplorations}
        />
      }
    />
  )
}

const styles = StyleSheet.create({
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

export default ExplorationScreen
