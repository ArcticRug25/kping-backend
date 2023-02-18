export enum ConfigEnum {
  DB = 'DB',
  LOG = 'LOG',
  SECRET = 'SECRET',
}

export enum DBConfigEnum {
  type = 'type',
  host = 'host',
  name = 'name',
  password = 'password',
  database = 'database',
  synchronize = 'synchronize',
  port = 'port',
}

export enum RedisConfigEnum {
  host = 'host',
  port = 'port',
  password = 'password',
  db = 'db',
}
