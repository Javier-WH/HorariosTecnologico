export default interface DataBase {
  tableName: string
  buildTable(): Promise<boolean>
  dropTable(): Promise<boolean>
  create(data): Promise<boolean>
  destroy(id): Promise<boolean>
  update(data): Promise<boolean>
  select(): Promise<object | null>
  where(id): Promise<object>
  getTableName(): string
}
