import { app } from 'electron'
import path from 'path'
import sqlite3 from 'sqlite3'
export default class Connection {
  private static userDataDir = app.getPath('userData')
  private static dbPath = path.join(this.userDataDir, 'database.db')
  private static connection: sqlite3.Database | null = null

  public static getConnection(): sqlite3.Database | null {
    if (!this.connection) {
      this.connection = new sqlite3.Database(this.dbPath)
    }
    return this.connection
  }

  public static closeConnection(): void {
    if (this.connection) {
      this.connection.close()
      this.connection = null
    }
  }
}
