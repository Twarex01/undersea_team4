import React, {useEffect, useState} from 'react'
import {
  View,
  StyleSheet,
  ListRenderItemInfo,
  RefreshControl,
} from 'react-native'
import {Colors} from '../constants/colors'
import {Strings} from '../constants/strings'
import {StackNavigationProp} from '@react-navigation/stack'
import CustomTextInput from '../components/text-input/customTextInput'
import {Margins} from '../constants/margins'
import {PlayerDetails} from '../model/player/playerDetails'
import {FlatList} from 'react-native-gesture-handler'
import SeparatorComponent from '../components/separator/separatorComponent'
import RankingCard from '../components/card/rankingCard'
import {useSelector, useDispatch} from 'react-redux'
import {IApplicationState} from '../../store'
import {getPlayers} from '../store/players/players.action'
import PagesTemplateBack from '../components/pages/pagesTemplateBack'

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

  const refreshPlayers = () => {
    dispatch(getPlayers())
  }

  const [username, setUsername] = useState('')

  const searcPlayer = (): PlayerDetails[] => {
    var temp: PlayerDetails[] = []
    const player = players.find(p => p.name === username)
    if (player) temp.push(player)
    return temp
  }

  const onBackPressed = () => {
    navigation.goBack()
  }
  const renderItem = (itemInfo: ListRenderItemInfo<PlayerDetails>) => {
    const {name, rank} = itemInfo.item
    return <RankingCard place={rank} username={name} />
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
      <PagesTemplateBack title={Strings.ranking} onPress={onBackPressed}>
        <View style={styles.headerPadding}>
          <CustomTextInput
            placeholder={Strings.user_name}
            placeholderTextColor={Colors.darkBlue}
            onChangeText={setUsername}
            style={[
              Margins.mbNormal,
              {backgroundColor: Colors.transparentWhite},
            ]}
          />
        </View>

        <FlatList
          data={username === '' ? players : searcPlayer()}
          renderItem={renderItem}
          ItemSeparatorComponent={SeparatorComponent}
          keyExtractor={keyExtractor}
          style={styles.flatlistPadding}
          contentContainerStyle={{paddingBottom: 120}}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={refreshPlayers} />
          }
        />
      </PagesTemplateBack>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatlistPadding: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  headerPadding: {
    paddingTop: 25,
    paddingHorizontal: 20,
  },
})

export default RankingScreen
