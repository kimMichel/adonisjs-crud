import { BaseSchema } from '@adonisjs/lucid/schema'

export default class AddActiveToBooks extends BaseSchema {
  protected tableName = 'books'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.enum('active', ['0', '1']).defaultTo('1').notNullable()
    })
  }

  async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('active')
    })
  }
}
