import pluralize from 'pluralize'
import { getConfig } from './../model'

export default (backend) => {
  const config = getConfig()
  const metaEntities = Object.keys(config.entities)

  metaEntities.forEach((metaEntity) => {
    backend.hook('update', 'rights', async (rightId, right) => {
      console.log('update')
      if (right.entity !== metaEntity) return
      const model = backend.createModel()
      await createOrUpdateNestedRights(model, config.entities, right)
      model.close()

      // убедиться что все удалено
      // op / !m.uniqkey + del
    })

    const { connections = [] } = config.entities[metaEntity] || {}

    for (const connection of connections) {
      const { to: connectionEntity, type: connectionType } = connection
      if (!connectionEntity || !connectionType) continue

      if (connectionType === 'belongsToMany') {
        // for hasMany (connectionEntity.*.metaEntity) the same logic
        // and switch metaEntityId - connectonId

        // add logic for belongsTo, hasOne

        // push, remove +
        // .set('userIds', [....])
        // del('userIds')

        backend.hook(
          'change',
          `${pluralize.plural(metaEntity)}.*.${connectionEntity + 'Ids'}.*`,
          async (metaEntityId, index, value, op) => {
            const connectionId = op.li || op.ld
            const model = backend.createModel()
            const promises = []
            if (op.li) {
              const $$rights = model.query('rights', { entityId: metaEntityId })
              await $$rights.subscribe()
              const rights = $$rights.get()
              for (const { base, id, entity, entityId, ...right } of rights) {
                const nestedRight = {
                  ...right,
                  clone: true,
                  entity: connectionEntity,
                  entityId: connectionId,
                  [connectionEntity + 'Id']: connectionId
                  // parentEntity, parentEntityId ?
                }
                promises.push(
                  createOrUpdateRightDoc(model, nestedRight)
                )
              }
            }

            if (op.ld) {
              const $$rights = model.query('rights', {
                entityId: connectionId,
                [metaEntity + 'Id']: metaEntityId,
                clone: true
              })
              await $$rights.subscribe()
              const rights = $$rights.get()
              for (const right of rights) {
                promises.push(model.scope(`rights.${right.id}`).del())
              }
            }
            await Promise.all(promises)
            model.close()
          }
        )
      }

      // if (connectionType === 'belongsToMany') {
      //   path = `${pluralize.plural(metaEntity)}.*.${connectionEntity + 'Id'}`
      // }
    }
  })

  backend.hook('del', 'rights', async (rightId, right) => {
    if (!right.base) return
    const model = backend.createModel()
    const { scopeId, entityId, entity } = right
    const $$rights = model.query('rights', {
      scopeId,
      [entity + 'Id']: entityId,
      clone: true
    })
    await $$rights.subscribe()
    const rightIds = $$rights.getIds()
    const promises = []
    for (const rightId of rightIds) {
      promises.push(model.at(`rights.${rightId}`).del())
    }
    await Promise.all(promises)
    model.close()
  })
}

async function createOrUpdateNestedRights (model, entities, {
  base, id, entity: rightEntity, entityId: rightEntityId, ...right
}) {
  const { connections } = entities[rightEntity] || {}
  if (!connections) return

  const promises = []

  for (const connection of connections) {
    const { to: connectionEntity, type: connectionType } = connection
    if (!connectionEntity || !connectionType) continue

    let connectionIds = []

    if (['belongsTo', 'belongsToMany'].includes(connectionType)) {
      const rightEntityCollection = pluralize.plural(rightEntity)
      const $rightEntityDoc =
        model.scope(`${rightEntityCollection}.${rightEntityId}`)
      await $rightEntityDoc.subscribe()
      const rightEntityDoc = $rightEntityDoc.get()
      if (!rightEntityDoc) continue
      connectionIds = connectionType === 'belongsTo'
        ? [rightEntityDoc[connectionEntity + 'Id']]
        : rightEntityDoc[connectionEntity + 'Ids']
    }

    if (['hasOne', 'hasMany'].includes(connectionType)) {
      const connectionEntityCollection = pluralize.plural(connectionEntity)
      const rightEntityEnding = connectionType === 'hasOne' ? 'Id' : 'Ids'
      const $$connections = model.query(connectionEntityCollection, {
        [rightEntity + rightEntityEnding]: rightEntityId
      })
      await $$connections.subscribe()
      connectionIds = $$connections.getIds()
    }

    for (const connectionId of connectionIds) {
      const nestedRight = {
        ...right,
        clone: true,
        entity: connectionEntity,
        entityId: connectionId,
        [connectionEntity + 'Id']: connectionId
        // parentEntity, parentEntityId ?
      }
      promises.push(
        createOrUpdateRightDoc(model, nestedRight)
        // createOrUpdateNestedRights(model, entities, nestedRight)
        // может удалить это ? и сделать чтобы хуки не только на base реагировал
      )
    }
  }

  await Promise.all(promises)
}

async function createOrUpdateRightDoc (model, doc) {
  const { roles, ...last } = doc
  const $$rights = model.query('rights', { ...last, $limit: 1 })
  await $$rights.subscribe()
  let rightId = $$rights.getIds()[0]
  if (!rightId) {
    rightId = model.id()
    await model.add('rights', { id: rightId })
  }
  model.at('rights').setDiffDeep(rightId, doc)
  return rightId
}
