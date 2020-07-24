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
import TransparentButton from '../components/button/transparentButton'
import {StackNavigationProp} from '@react-navigation/stack'
import {Screens} from '../constants/screens'
import CustomTextInput from '../components/text-input/customTextInput'
import {Margins} from '../constants/margins'
import {PlayerDetails} from '../model/player/playerDetails'
import AttackFirstCard from '../components/card/attackFirstCard'
import PagesTemplate from '../components/pages/pagesTemplate'
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler'
import SeparatorComponent from '../components/separator/separatorComponent'
import {IApplicationState} from '../../store'
import {useSelector, useDispatch} from 'react-redux'
import {getPlayers} from '../store/players/players.action'

interface AttacFirstScreenProps {
  navigation: StackNavigationProp<any>
}

const AttackFirstScreen = ({navigation}: AttacFirstScreenProps) => {
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

  const [index, setIndex] = useState(-1)

  const onNextPressed = () => {
    navigation.navigate(Screens.AttackSecond)
  }

  const renderItem = (itemInfo: ListRenderItemInfo<PlayerDetails>) => {
    const {name, countryID, score} = itemInfo.item
    const onItemPressed = () => {
      if (index === countryID) {
        setIndex(-1)
      } else {
        setIndex(countryID)
      }
    }
    return (
      <TouchableOpacity onPress={onItemPressed}>
        <AttackFirstCard
          name={name}
          selected={index === countryID ? true : false}
        />
      </TouchableOpacity>
    )
  }

  const renderHeaderComponent = () => {
    return (
      <View>
        <Text style={styles.titleText}>{Strings.attack_first_title}</Text>
        <Text style={styles.descriptionText}>
          {Strings.attack_first_description}
        </Text>
        <CustomTextInput
          placeholder={Strings.user_name}
          placeholderTextColor={Colors.darkBlue}
          style={[
            Margins.mbNormal,
            Margins.mtBig,
            {backgroundColor: Colors.transparentWhite},
          ]}
        />
      </View>
    )
  }

  const keyExtractor = (item: PlayerDetails) => {
    return item.countryID.toString()
  }

  return (
    <View style={styles.container}>
      <PagesTemplate title={Strings.attack}>
        <FlatList
          data={players}
          renderItem={renderItem}
          ListHeaderComponent={renderHeaderComponent}
          ItemSeparatorComponent={SeparatorComponent}
          keyExtractor={keyExtractor}
          style={styles.flatlistPadding}
          contentContainerStyle={{paddingBottom: 120}}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={refreshPlayers} />
          }
        />
      </PagesTemplate>
      <TransparentButton
        title={Strings.next}
        onPress={onNextPressed}
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
  button: {
    position: 'absolute',
    bottom: 0,
  },
})

export default AttackFirstScreen
