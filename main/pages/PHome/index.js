import React from 'react'
import { $root, observer } from 'startupjs'
import { ScrollView, Button } from 'react-native'
import './index.styl'
import { usePermissions } from './../../../permissions'

export default observer(function PHome () {
  const permissions = usePermissions('52629ba4-5361-4f12-ae17-a3676abeda8f', 'cc920ed4-5c11-4d18-9711-41796a770807')
  console.log('permission', permissions)

  return pug`
    ScrollView.root
      Button(title='add role' onPress=() => {
        const $course = $root.scope('courses.52629ba4-5361-4f12-ae17-a3676abeda8f')
        const $class = $root.scope('classes.8f57ae8a-0ded-41c4-a9a5-5ffe4acccbe8')
        $class.addRole($course, 'Admin')
      })
      //- Button(title='add role' onPress=() => {
      //-   const $course = $root.scope('courses.52629ba4-5361-4f12-ae17-a3676abeda8f')
      //-   const $class = $root.scope('classes.8f57ae8a-0ded-41c4-a9a5-5ffe4acccbe8')
      //-   $class.subscribe(() => {
      //-     $class.push('userIds', $root.id())
      //-   })
      //-
      //- })
      //- Button(title='remove' onPress=() => {
      //-   const $course = $root.scope('courses.52629ba4-5361-4f12-ae17-a3676abeda8f')
      //-   const $class = $root.scope('classes.8f57ae8a-0ded-41c4-a9a5-5ffe4acccbe8')
      //-   $class.subscribe(() => {
      //-     const userIds = $class.get('userIds')
      //-     const userId = userIds[userIds.length - 1]
      //-     const index = userIds.indexOf(userId)
      //-     $class.remove('userIds', index, 1)
      //-   })
      //- })
      //- Button(title='add student role' onPress=() => {
      //-   const $course = $root.scope('courses.52629ba4-5361-4f12-ae17-a3676abeda8f')
      //-   const $user = $root.scope('users.cc920ed4-5c11-4d18-9711-41796a770807')
      //-   $user.addRole($course, 'Student')
      //- })

      //- Button(title='create users' onPress=() => {
      //-   $root.add('classes', {
      //-     userIds: [
      //-       "cc920ed4-5c11-4d18-9711-41796a770807",
      //-       "845902fc-1cad-4dc1-bd87-b4b3a3e9cfe3",
      //-       "c5d8e1a3-9310-48cb-9237-b95d9a618b79"
      //-     ],
      //-     teamId: "5310dc68-41b6-4c98-aef4-791a427b5b97"
      //-   })
      //- })
  `
})
