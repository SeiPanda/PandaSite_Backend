import { TypeORMError, EntityTarget } from 'typeorm';
/**
 * Thrown when a instance of an entity should is created but the same primary key already exists
 */
export declare class EntityCreationFailedAlreadyExistingError extends TypeORMError {
  constructor(entityClass: EntityTarget<any>, criteria: any);
  private stringifyTarget;
  private stringifyCriteria;
}
