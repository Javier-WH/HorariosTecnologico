import { ipcMain } from 'electron'
import DBinterface from '../../dataBase/interface/DBinterface'
export default function callSchema(table: DBinterface): void {
  const tableName = table.getTableName()

  ipcMain.handle(`${tableName}-buildTable`, async () => {
    return await table.buildTable()
  })

  ipcMain.handle(`${tableName}-dropTable`, async () => {
    return await table.dropTable()
  })

  ipcMain.handle(`${tableName}-select`, async () => {
    return await table.select()
  })

  ipcMain.handle(`${tableName}-create`, async (_event, data) => {
    return await table.create(data)
  })

  ipcMain.handle(`${tableName}-destroy`, async (_event, id) => {
    return await table.destroy(id)
  })

  ipcMain.handle(`${tableName}-update`, async (_event, data) => {
    return await table.update(data)
  })

  ipcMain.handle(`${tableName}-where`, async (_event, id) => {
    return await table.where(id)
  })
}
