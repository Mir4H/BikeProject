import React, { createContext, useContext, useEffect, useState } from 'react'

interface ContextData {
  searchTerm: string
  date1: Date
  date2: Date
  ridesPage: number
  ridesOrderBy: string
  ridesOrderByAsc: number
  stationsPage: number
  stationsOrderBy: string
  stationsOrderByAsc: number
}

interface ContextInterface {
  context?: ContextData
  setContext: (newData: ContextData) => void
}

export const StateContext = createContext<ContextInterface>(null!)

const getFreshContext = () => {
  if (localStorage.getItem('context') === null) {
    localStorage.setItem(
      'context',
      JSON.stringify({
        searchTerm: '',
        date1: new Date('2021-05-01T00:00'),
        date2: new Date('2021-08-01T00:00'),
        ridesPage: 1,
        ridesOrderBy: '',
        ridesOrderByAsc: 1,
        stationsPage: 1,
        stationsOrderBy: '',
        stationsOrderByAsc: 1
      })
    )
  }
  const getContext: string | null = localStorage.getItem('context')
  return getContext ? JSON.parse(getContext) : null
}

export default function useStateContext() {
  const { context, setContext } = useContext(StateContext)
  return {
    context,
    setContext: (obj: ContextData) => {
      setContext({ ...context, ...obj })
    },
    resetContext: () => {
      localStorage.removeItem('context')
      setContext(getFreshContext())
    }
  }
}

interface Props {
  children?: React.ReactNode
}

export const ContextProvider: React.FC<Props> = ({ children }) => {
  const [context, setContext] = useState<ContextData>(getFreshContext())
  useEffect(() => {
    localStorage.setItem('context', JSON.stringify(context))
  }, [context])

  return <StateContext.Provider value={{ context, setContext }}>{children}</StateContext.Provider>
}
