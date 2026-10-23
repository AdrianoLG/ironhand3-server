import { Schema as MongoSchema } from 'mongoose'

import { ForbiddenException } from '@nestjs/common'

import { User } from '../../user/entities/user.entity'

type IdLike = MongoSchema.Types.ObjectId | string

const idsMatch = (a: IdLike, b: IdLike) => String(a) === String(b)

/** Throws ForbiddenException unless currentUser is the owner of ownerId. */
export function assertOwner(ownerId: IdLike, currentUser: User): void {
  if (!idsMatch(ownerId, currentUser._id)) {
    throw new ForbiddenException('No tienes permiso sobre este contenido')
  }
}

/**
 * Throws ForbiddenException unless currentUser is the owner, or the entity
 * is marked as shared (in which case both users have full access).
 */
export function assertOwnerUnlessShared(
  entity: { owner: IdLike; shared?: boolean },
  currentUser: User
): void {
  if (entity.shared) return
  assertOwner(entity.owner, currentUser)
}
