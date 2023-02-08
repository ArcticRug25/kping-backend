import path from 'path'
import yaml from 'js-yaml'
import { readFileSync } from 'fs'

// 获取项目运行环境
export const getEnv = () => {
  return process.env.NODE_ENV
}

// 读取项目配置
export const getConfig = <T>(type?: string): T => {
  const environment = getEnv()
  const yamlPath = path.join(process.cwd(), `./.config/.${environment}.yml`)
  const file = readFileSync(yamlPath, 'utf8')
  const config: any = yaml.load(file)

  if (type) {
    return config[type]
  }

  return config
}
