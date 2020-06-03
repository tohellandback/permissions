import React from 'react'
import { View, Text } from 'react-native'
import { observer, useQuery, useDoc, useModel, $root } from 'startupjs'
import { AddItem, Card } from 'components'
import './index.styl'

function PClasses () {
  const [classes, $classes] = useQuery('classes', {})

  async function addClass (data) {
    const classId = await $classes.add(data)
    console.log(classId)
  }

  return pug`
    View.root
      AddItem(onOk=addClass placeholder='class name')
      each _class in classes
        ClassCard(classId=_class.id key=_class.id)
      else
        Text Hello PClasses
  `
}

function ClassCard ({ classId }) {
  const [_class, $class] = useDoc('classes', classId)
  const [users, $users] = useQuery('users', { _id: { $in: _class.userIds || [] } })
  const [team, $team] = useDoc('teams', _class.teamId)
  const [teamUsers, $teamUsers] = useQuery('users', { teamIds: _class.teamId || '_dummy_' })
  const $teams = useModel('teams')

  async function addUser (data) {
    const id = $root.id()
    await $users.add({ id, ...data })
    if (_class.userIds) {
      $class.push('userIds', id)
    } else {
      $class.set('userIds', [id])
    }
  }

  async function addTeam (data) {
    const id = $root.id()
    await $teams.add({ id, ...data })
    await $class.set('teamId', id)
  }

  async function addTeamUser (data) {
    const id = $root.id()
    await $users.add({ id, teamIds: [team.id], ...data })
  }
  return pug`
    Card.class
      Text.title Class name:&nbsp;
        Text= _class.name
      Text ID:&nbsp;
        Text= _class.id
      View.users
        Text.title Users:
        AddItem(onOk=addUser placeholder='user name')
        each user in users
          Card.user(key=user.id)
            Text= user.name
            Text= user.id
      View.teams
        if team
          Text.title Teams:
          Text.subtitle= team.name
          AddItem(onOk=addTeamUser placeholder='user in team name')
          each user in teamUsers
            Card.teamUser(key=user.id)
              Text= user.name
              Text= user.id
          else
            Text No users in team
        else
          Text no teams
          AddItem(onOk=addTeam placeholder='team name')
  `
}

export default observer(PClasses)
