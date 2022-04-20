export type KeyFn<Key, Entity> = (entity: Entity) => Key;
export type DiscernmentFn<Entity> = (current: Entity, candidate: Entity) => Entity;

/*
 *  Order stable partial implementation of a set. The `id` function determines the
 *  value of the comparison, and the `discern` function determines how to handle a
 *  duplicate add.
 */
export class SetWithDiscernment<Key, Entity> {
  private dictionary: Map<Key, Entity>;

  constructor(private id: KeyFn<Key, Entity>, private discern: DiscernmentFn<Entity>) {
    this.dictionary = new Map<Key, Entity>();
  }

  public add(value: Entity): SetWithDiscernment<Key, Entity> {
    const key: Key = this.id(value);
    const current = this.dictionary.get(this.id(value));
    if (typeof current === 'undefined') {
      this.dictionary.set(key, value);
    } else {
      this.dictionary.set(key, this.discern(current, value));
    }
    return this;
  }

  public values(): IterableIterator<Entity> {
    return this.dictionary.values();
  }

  public toArray(): ReadonlyArray<Entity> {
    return Array.from(this.values());
  }
}
