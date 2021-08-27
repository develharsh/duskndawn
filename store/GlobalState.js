import { createContext, useReducer, useEffect } from "react";
import reducers from './Reducers'
import cookie from 'js-cookie'

export const DataContext = createContext()

export const DataProvider = ({ children }) => {
    const initialState = { notify: {}, auth: {}, cart: [] }
    const [state, dispatch] = useReducer(reducers, initialState)
    const { cart } = state

    useEffect(() => {
        const firstLogin = cookie.get('lvl')
        const token = cookie.get('token');
        if (firstLogin && token) {
            dispatch({ type: 'AUTH', payload: { token, user: firstLogin } })
        }
        else {
            dispatch({ type: 'AUTH', payload: {} })
        }
    }, [])
    useEffect(() => {
        const __next__cart01__harshv = JSON.parse(cookie.get('__next__cart01__harshv'))
        if (__next__cart01__harshv) {
            dispatch({ type: 'ADD_CART', payload: __next__cart01__harshv })
        }
    }, [])
    useEffect(() => {
        cookie.set('__next__cart01__harshv', JSON.stringify(cart))
    }, [cart])

    return (
        <DataContext.Provider value={{ state, dispatch }}>
            {children}
        </DataContext.Provider>
    )
}