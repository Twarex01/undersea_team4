import React, {useEffect} from 'react'
import {View, StyleSheet, ListRenderItemInfo} from 'react-native'
import {Colors} from '../constants/colors'
import {Strings} from '../constants/strings'
import {Fonts, FontSizes} from '../constants/fonts'

import {StackNavigationProp} from '@react-navigation/stack'

import CustomTextInput from '../components/text-input/customTextInput'
import {Margins} from '../constants/margins'
import {PlayerDetails} from '../model/player/playerDetails'
import AttackFirstCard from '../components/card/attackFirstCard'
import PagesTemplate from '../components/pages/pagesTemplate'
import {FlatList} from 'react-native-gesture-handler'
import SeparatorComponent from '../components/separator/separatorComponent'
import RankingCard from '../components/card/rankingCard'
import {useSelector, useDispatch} from 'react-redux'
import {IApplicationState} from '../../store'
import {getPlayers} from '../store/players/players.action'

interface RankingScreenProps {
  navigation: StackNavigationProp<any>
}

const RankingScreen = ({navigation}: RankingScreenProps) => {
  const {players, error, isLoading} = useSelector(
    (state: IApplicationState) => state.app.player,
  )
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPlayers())
  }, [dispatch])

  const onItemPressed = () => {}
  const renderItem = (itemInfo: ListRenderItemInfo<PlayerDetails>) => {
    const {name} = itemInfo.item
    return (
      <RankingCard
        place={itemInfo.item.countryID}
        username={name}
        onPress={onItemPressed}
      />
    )
  }

  const renderHeaderComponent = () => {
    return (
      <CustomTextInput
        placeholder={Strings.user_name}
        placeholderTextColor={Colors.darkBlue}
        style={[Margins.mbNormal, {backgroundColor: Colors.transparentWhite}]}
      />
    )
  }

  const keyExtractor = (item: PlayerDetails) => {
    return item.countryID.toString()
  }

  return (
    <View style={styles.container}>
      <PagesTemplate title={Strings.city_name}>
        <FlatList
          data={players}
          renderItem={renderItem}
          ListHeaderComponent={renderHeaderComponent}
          ItemSeparatorComponent={SeparatorComponent}
          keyExtractor={keyExtractor}
          style={styles.flatlistPadding}
          contentContainerStyle={{paddingBottom: 120}}
        />
      </PagesTemplate>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatlistPadding: {
    flex: 1,
    paddingTop: 25,
    paddingHorizontal: 20,
  },
})

export default RankingScreen
