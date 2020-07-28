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
import {Margins} from '../constants/margins'
import UpgradeCard from '../components/card/upgradeCard'
import {UpgradeDetails} from '../model/upgrade/upgradeDetails'
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler'
import {StackNavigationProp} from '@react-navigation/stack'
import {useDispatch, useSelector} from 'react-redux'
import {IApplicationState} from '../../store'
import {getUpgrades} from '../store/upgrades/upgrades.actions'
import {createSelector} from 'reselect'
import {getMyUpgrades} from '../store/myUpgrades/myUpgrades.actions'
import TransparentButton from '../components/button/transparentButton'
import {putUpgrade} from '../store/putUpgrade/putUpgrade.action'

interface UpgradesScreenProps {
  navigation: StackNavigationProp<any>
}

const UpgradesScreen = ({navigation}: UpgradesScreenProps) => {
  const {upgradesError, isUpgradesLoading} = useSelector(
    (state: IApplicationState) => state.app.upgrade,
  )
  const {myUpgradesError, isMyUpgradesLoading} = useSelector(
    (state: IApplicationState) => state.app.myUpgrade,
  )

  const upgradesDataSelector = createSelector(
    (state: IApplicationState) => state.app,
    appstate =>
      appstate.upgrade.upgrades.map(upgrade => {
        const myUpgradeInfo = appstate.myUpgrade.myUpgrades.find(
          u => upgrade.upgradeTypeID === u.upgradeTypeID,
        )
        return {
          upgradeTypeID: upgrade.upgradeTypeID,
          name: upgrade.name,
          effect: upgrade.effect,
          imageURL: upgrade.imageURL,
          progress: myUpgradeInfo?.progress,
        }
      }),
  )

  const upgrades = useSelector(upgradesDataSelector)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUpgrades())
    dispatch(getMyUpgrades())
    setDisabled(checkProgress())
  }, [dispatch])

  const refreshUpgrades = () => {
    dispatch(getUpgrades())
    dispatch(getMyUpgrades())
    setDisabled(checkProgress())
  }

  const [index, setIndex] = useState(-1)
  const [disabled, setDisabled] = useState(false)

  const checkProgress = (): boolean => {
    var temp = false
    upgrades.map(u => {
      if (u.progress) {
        if (u.progress > 0) {
          temp = true
        }
      }
    })
    return temp
  }

  const onBuyPressed = () => {
    if (!(index === -1)) {
      dispatch(putUpgrade(index))
      setIndex(-1)
      refreshUpgrades()
    }
  }

  const renderItem = (itemInfo: ListRenderItemInfo<any>) => {
    const {upgradeTypeID, effect, name, imageURL, progress} = itemInfo.item
    const onItemPressed = () => {
      if (index === upgradeTypeID) {
        setIndex(-1)
      } else {
        setIndex(upgradeTypeID)
      }
    }
    return (
      <TouchableOpacity
        onPress={onItemPressed}
        disabled={progress === 0 || disabled ? true : false}>
        <UpgradeCard
          image={imageURL}
          title={name}
          description={effect}
          style={Margins.mbNormal}
          selected={index === upgradeTypeID ? true : false}
          progress={progress}
          disabled={disabled}
        />
      </TouchableOpacity>
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
      <FlatList
        data={upgrades}
        renderItem={renderItem}
        ListHeaderComponent={renderHeaderComponent}
        keyExtractor={keyExtractor}
        style={styles.flatlistPadding}
        contentContainerStyle={{paddingBottom: 120}}
        refreshControl={
          <RefreshControl
            refreshing={isUpgradesLoading && isMyUpgradesLoading}
            onRefresh={refreshUpgrades}
          />
        }
      />
      <TransparentButton
        title={Strings.buy}
        onPress={onBuyPressed}
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

export default UpgradesScreen
