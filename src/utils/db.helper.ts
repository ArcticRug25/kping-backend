import { SelectQueryBuilder } from 'typeorm'

export const conditionUtils = <T>(queryBuilder: SelectQueryBuilder<T>, obj: Record<string, unknown>) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key]) {
      queryBuilder.andWhere(`${key} = :${key}`, { [key]: obj[key] })
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
  return queryBuilder.andWhere(`${name}.${param} BETWEEN :start AND :end`, { start, end })
}
