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
} from 'react-native'
import {Colors} from '../constants/colors'
import ScrollablePagesTemplate from '../components/pages/scrollablePagesTemplate'
import {Strings} from '../constants/strings'
import {StackNavigationProp} from '@react-navigation/stack'
import PagesTemplate from '../components/pages/pagesTemplate'
import {Fonts, FontSizes} from '../constants/fonts'
import {UnitCount, FightDetails} from '../model/fight/fightDetails'
import SeparatorComponent from '../components/separator/separatorComponent'
import {Margins} from '../constants/margins'
import {useSelector, useDispatch} from 'react-redux'
import {IApplicationState} from '../../store'
import {getFights} from '../store/fights/fights.action'

const mockFightDetails = [
  {
    title: 'Atlantisz',
    data: [
      {
        count: 6,
        name: 'Cápa',
      },
      {
        count: 6,
        name: 'Fóka',
      },
      {
        count: 6,
        name: 'Csikó',
      },
    ],
  },
  {
    title: 'Atlantisz 1',
    data: [
      {
        count: 6,
        name: 'Cápa',
      },
      {
        count: 6,
        name: 'Fóka',
      },
      {
        count: 6,
        name: 'Csikó',
      },
    ],
  },
  {
    title: 'Atlantisz 2',
    data: [
      {
        count: 6,
        name: 'Cápa',
      },
      {
        count: 6,
        name: 'Fóka',
      },
      {
        count: 6,
        name: 'Csikó',
      },
    ],
  },
]

interface FightScreenProps {
  navigation: StackNavigationProp<any>
}

const FightScreen = ({navigation}: FightScreenProps) => {
  const {fights, error, isLoading} = useSelector(
    (state: IApplicationState) => state.app.fight,
  )

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getFights())
  }, [dispatch])

  const renderSectionHeader = () => {
    return <Text style={[styles.sectionHeaderText, Margins.mbNormal]}>{}</Text>
  }

  const renderItem = () => {
    return (
      <Text style={[styles.sectionItemText, Margins.mbNormal]}>
        {} {}
      </Text>
    )
  }

  return (
    <PagesTemplate title={Strings.fight}>
      <SectionList
        style={styles.sectionlistPadding}
        keyExtractor={(item, index) => `${item}${index}`}
        sections={mockFightDetails}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
      />
    </PagesTemplate>
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
