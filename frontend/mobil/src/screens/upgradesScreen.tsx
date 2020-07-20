import React, {useEffect} from 'react'
import {View, Text, StyleSheet, ListRenderItemInfo} from 'react-native'
import {Colors} from '../constants/colors'
import {Strings} from '../constants/strings'
import {Fonts, FontSizes} from '../constants/fonts'
import {Margins} from '../constants/margins'
import UpgradeCard from '../components/card/upgradeCard'
import {Images} from '../constants/images'
import TransparentButton from '../components/button/transparentButton'
import {UpgradeDetails} from '../model/upgrade/upgradeDetails'
import PagesTemplate from '../components/pages/pagesTemplate'
import {FlatList} from 'react-native-gesture-handler'
import {StackNavigationProp} from '@react-navigation/stack'
import {useDispatch, useSelector} from 'react-redux'
import {IApplicationState} from '../../store'
import {getUpgrades} from '../store/upgrades/upgrades.actions'

interface UpgradesScreenProps {
  navigation: StackNavigationProp<any>
}

const UpgradesScreen = ({navigation}: UpgradesScreenProps) => {
  const {upgrades, error, isLoading} = useSelector(
    (state: IApplicationState) => state.app.upgrade,
  )
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUpgrades())
  }, [dispatch])

  const onBuyPressed = () => {}

  const renderItem = (itemInfo: ListRenderItemInfo<UpgradeDetails>) => {
    const {effect, name, imageURL} = itemInfo.item
    return (
      <UpgradeCard
        image={Images.tractor}
        title={name}
        description={effect}
        style={Margins.mbNormal}
      />
    )
  }
  const renderHeaderComponent = () => {
    return (
      <View style={Margins.mbBig}>
        <Text style={styles.titleText}>{Strings.upgrades_title}</Text>
        <Text style={styles.descriptionText}>
          {Strings.upgrades_description}
        </Text>
      </View>
    )
  }
  const keyExtractor = (item: UpgradeDetails) => {
    return item.upgradeTypeID.toString()
  }
  return (
    <View style={styles.container}>
      <PagesTemplate title={Strings.upgrades}>
        <FlatList
          data={upgrades}
          renderItem={renderItem}
          ListHeaderComponent={renderHeaderComponent}
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
})

export default UpgradesScreen
