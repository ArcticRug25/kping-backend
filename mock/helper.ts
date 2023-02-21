import { connectionParams } from 'ormconfig'
import { DataSource, DataSourceOptions } from 'typeorm'

const AppDataSource = new DataSource(connectionParams as DataSourceOptions)

export function create(count = 1, callback: (AppDataSource: DataSource) => void) {
  for (let i = 0; i < count; i++) {
    callback(AppDataSource)
  }
}
