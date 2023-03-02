import { SelectQueryBuilder } from 'typeorm'

export const LIKE_SEARCH = 'likeSearch'

export const conditionUtils = <T>(queryBuilder: SelectQueryBuilder<T>, obj: Record<string, any>) => {
  Object.keys(obj).forEach((key) => {
    const mapValue = obj[key]
    if (!mapValue) return
    if (typeof mapValue === 'string') {
      queryBuilder.andWhere(`${key} = :${key}`, { [key]: mapValue })
    } else {
      mapValue.value && queryBuilder.andWhere(`${key} LIKE :${key}`, { [key]: `%${mapValue.value}%` })
    }
  })
  return queryBuilder
}

export const conditionBetweenUtils = <T>(
  queryBuilder: SelectQueryBuilder<T>,
  name: string,
  param: string,
  start,
  end,
) => {
  return queryBuilder.andWhere(`${name}.${param} BETWEEN :${param}start AND :${param}end`, {
    [param + 'start']: start,
    [param + 'end']: end,
  })
}
