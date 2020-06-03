import React from 'react'
import { View, Text } from 'react-native'
import { observer } from 'startupjs'
import './index.styl'

function PUsers () {
  return pug`
    View.root
      Text Hello PUsers
  `
}

export default observer(PUsers)
