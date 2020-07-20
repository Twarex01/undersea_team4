import React from 'react'
import {View, Text, StyleSheet, ListRenderItemInfo, Image} from 'react-native'
import {Colors} from '../constants/colors'
import ScrollablePagesTemplate from '../components/pages/scrollablePagesTemplate'
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
import SeparatorComponent from '../components/separator/separatorComponent'

const unitDetailsList: UnitDetails[] = [
  {
    unitTypeID: 1,
    name: 'Lézercápa',
    count: 50,
    attack: 5,
    def: 5,
    pay: 1,
    supply: 1,
    price: 200,
  },
  {
    unitTypeID: 2,
    name: 'Rohamfóka',
    count: 75,
    attack: 5,
    def: 5,
    pay: 1,
    supply: 1,
    price: 200,
  },
]

interface AttacSecondScreenProps {
  navigation: StackNavigationProp<any>
}

const AttacSecondScreen = ({navigation}: AttacSecondScreenProps) => {
  const onBackPressed = () => {
    navigation.pop(1)
  }
  const onAttackPressed = () => {}
  const renderItem = (itemInfo: ListRenderItemInfo<UnitDetails>) => {
    const {name, count} = itemInfo.item
    return (
      <AttackSecondCard
        style={[Margins.mtBig, Margins.mbBig]}
        image={Images.profil}
        name={name}
        count={count}
        number={2}
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
        <Image source={Images.profil_icon} />
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
          data={unitDetailsList}
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
  footerText: {
    color: Colors.vibrantLightBlue,
    fontFamily: Fonts.Baloo2_ExtraBold,
    fontSize: FontSizes.b2_normal,
  },
})

export default AttacSecondScreen
