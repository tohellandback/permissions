import React from 'react'
import { View, Text } from 'react-native'
import { observer } from 'startupjs'
import './index.styl'

function PTeams () {
  return pug`
    View.root
      Text Hello PTeams
  `
}

export default observer(PTeams)
