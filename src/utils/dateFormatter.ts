import dayjs, { Dayjs } from 'dayjs'

import { DATE_FORMAT } from '../constants'

export const dateFormatter = (date: Date | undefined | Dayjs) => {
  return dayjs(date).format(DATE_FORMAT)
}
