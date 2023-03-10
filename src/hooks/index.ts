import { useEffect, useState } from 'react'

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

import { rootReducer } from '../store/Store'

export function useAppDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

export type StateType = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<StateType, unknown, AnyAction>
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<StateType> = useSelector
