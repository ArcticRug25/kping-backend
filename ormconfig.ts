import { DataSource, DataSourceOptions } from 'typeorm'
import { getConfig, getEnv } from './src/utils/config'
import { ConfigEnum, DBConfigEnum } from './src/enum/config.enum'

const entitiesDir = getEnv() === 'dev' ? [__dirname + '/**/*.entity{.js,.ts}'] : [__dirname + '/**/*.entity{.js,.ts}']
console.log('entitiesDir', entitiesDir)
function buildConnectionParamsByEnv() {
  const dbParams = getConfig(ConfigEnum.DB)
  return {
    type: dbParams[DBConfigEnum.type],
    host: dbParams[DBConfigEnum.host],
    username: dbParams[DBConfigEnum.name],
    password: dbParams[DBConfigEnum.password],
    database: dbParams[DBConfigEnum.database],
    entities: entitiesDir,
    synchronize: dbParams[DBConfigEnum.synchronize],
    // logging: true,
    logging: ['error'],
  }
}

export const connectionParams = buildConnectionParamsByEnv()
export default new DataSource({
  ...connectionParams,
  migrations: ['migrations/**'],
  subscribers: [],
} as DataSourceOptions)
