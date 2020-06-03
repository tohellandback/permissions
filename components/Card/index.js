import React from 'react'
import { View } from 'react-native'
import { observer } from 'startupjs'
import './index.styl'

function Card ({ children, style }) {
  return pug`
    View.root(style=style)= children
  `
}

export default observer(Card)
