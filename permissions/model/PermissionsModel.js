import { BaseModel } from 'startupjs/orm'
import racer from 'racer'
import { getConfig } from './../model'
import {
  generateScopeFieldName,
  generateEntityFieldName,
  generateScopeFromCollection
} from './../helpers'

export default class PermissionsModel extends BaseModel {
  async addRole (scopeModel, role) {
    const scope = generateScopeFromCollection(scopeModel.getCollection())
    const entity = generateScopeFromCollection(this.getCollection())

    validateParams('addRole', scope, entity, scopeModel, role)

    const scopeId = scopeModel.getId()
    const entityId = this.getId()
    const right = {
      scope,
      scopeId,
      entity,
      entityId,
      base: true,
      [generateScopeFieldName(scope)]: scopeId,
      [generateEntityFieldName(entity)]: entityId
    }

    const $$rights = this.root.query('rights', right)
    await $$rights.subscribe()

    let rightId = $$rights.getIds()[0]
    if (!rightId) {
      rightId = this.id()
      await this.root.add('rights', { id: rightId, ...right, roles: {} })
    }

    this.scope(`rights.${rightId}`).setDiff(`roles.${role}`, true)
    $$rights.unsubscribe()
    return rightId
  }

  async removeRole (scopeModel, role) {
    const scope = generateScopeFromCollection(scopeModel.getCollection())
    const entity = generateScopeFromCollection(this.getCollection())

    validateParams('removeRole', scope, entity, scopeModel, role)

    const scopeId = scopeModel.getId()
    const entityId = this.getId()
    const $$rights = this.root.query('rights', {
      scopeId,
      entityId,
      base: true,
      $limit: 1
    })
    await $$rights.subscribe()
    const right = $$rights.get()[0]
    if (right && right.roles && right.roles[role]) {
      this.scope(`rights.${right.id}.roles`).del(role)
    }
    $$rights.unsubscribe()
  }
}

function validateParams (method, scope, entity, scopeModel, role) {
  if (!(scopeModel instanceof racer.Model)) {
    throw new Error(
      '[@dmapper/permissions] addRole: ' +
      'scopeModel must be an instance of racer model'
    )
  }

  if (!role) {
    throw new Error('[@dmapper/permissions] addRole: role is required')
  }

  const config = getConfig()
  const roles = config.roles[scope]

  if (!roles) {
    throw new Error(
      '[@dmapper/permissions] addRole: ' +
      `config does not have roles for scope: ${scope}`
    )
  }

  if (!roles.includes(role)) {
    throw new Error(
      '[@dmapper/permissions] addRole: ' +
      `config does not have role ${role} for scope ${scope}`
    )
  }
}
