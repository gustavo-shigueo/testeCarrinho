import { createContext, Dispatch, SetStateAction } from 'react'
import { ItemRequest } from '../interfaces/items'

export interface cartState {
	cart: ItemRequest[]
	setCart: Dispatch<SetStateAction<ItemRequest[]>>
}

type cartContext = cartState | null | []

export const CartContext = createContext<cartContext>([])
