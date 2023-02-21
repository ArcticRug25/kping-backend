export enum ConfigEnum {
  DB = 'DB',
  LOG = 'LOG',
  SECRET = 'SECRET',
  CAPTCHA = 'CAPTCHA',
  ALI_CLOUD = 'ALI_CLOUD',
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

export enum CaptchaEnum {
  size = 'size',
  fontSize = 'fontSize',
  width = 'width',
  height = 'height',
  background = 'background',
}

export enum AliCloudConfigEnum {
  accessKeyId = 'accessKeyId',
  accessKeySecret = 'accessKeySecret',
  endpoint = 'endpoint',
  apiVersion = 'apiVersion',
}
