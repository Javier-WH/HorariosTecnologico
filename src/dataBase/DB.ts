import Connection from './Connection'

export default class DB {
  protected static connection = Connection.getConnection()
}
