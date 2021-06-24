import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import Cart from './components/cart'
import Header from './components/Header'
import Products from './components/products'
import { Item, ItemRequest } from './interfaces/items'
import { sendRequest } from './utils/sendRequest'

const productsRequest = async (): Promise<Item[]> => {
	const response = await sendRequest({ path: '/produtos' })
	return response.json()
}

function App() {
	const [products, setProducts] = useState<Item[]>([])
	const [cart, setCart] = useState<ItemRequest[]>([])

	const updateCart = (newCart: ItemRequest[]) => setCart(newCart)

	useEffect(() => {
		productsRequest().then(p => setProducts(p))
	}, [])

	return (
		<>
			<Router>
				<Header />
				<main className="container">
					<Switch>
						<Route path="/" exact>
							<Products
								products={products}
								cart={cart}
								updateCart={updateCart}
							/>
						</Route>
						<Route path="/cart">
							<Cart cart={cart} />
						</Route>
					</Switch>
				</main>
			</Router>
		</>
	)
}

export default App
