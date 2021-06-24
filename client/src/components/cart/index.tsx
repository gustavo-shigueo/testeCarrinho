import { useEffect, useState } from 'react'
import '../../css/Cart.css'
import { Carrinho, ItemDisplay, ItemRequest } from '../../interfaces/items'
import { sendRequest } from '../../utils/sendRequest'
import Button from '../Button'
import Separator from '../Separator'
import CartItem from './CartItem'

interface CartProps {
	cart: ItemRequest[]
}

const getCartItems = async (cart: any): Promise<Carrinho> => {
	const response = await sendRequest({
		path: '/carrinho',
		method: 'POST',
		body: cart,
	})
	return response.json()
}
const Cart = ({ cart }: CartProps) => {
	const [cartItems, setCartItems] = useState<ItemDisplay[]>([])
	const [value, setValue] = useState(0)

	useEffect(() => {
		getCartItems(cart).then(({ items, value: total }) => {
			setCartItems(
				items.map(
					({
						productId,
						name,
						imageUrl,
						price,
						sellingPrice,
						quantity,
					}): ItemDisplay => ({
						productId,
						name,
						imageUrl,
						price,
						sellingPrice,
						quantity: quantity!,
					})
				)
			)
			setValue(total)
		})
	}, [cart])

	const cartItem = (product: ItemDisplay) => {
		return <CartItem product={product} key={product.productId} />
	}

	return (
		<>
			<h2 style={{ textAlign: 'center' }}>Meu Carrinho</h2>
			<Separator />

			<section className="carrinho">
				{cartItems.length > 0 ? (
					cartItems.map(cartItem)
				) : (
					<h3>Não há produtos no carrinho</h3>
				)}

				{cartItems.length > 0 && (
					<div className="subtotal">
						<Separator />
						<div className="price-container">
							<h2>Total</h2>
							<h2>
								{(value / 100).toLocaleString('pt-BR', {
									style: 'currency',
									currency: 'BRL',
								})}
							</h2>
						</div>

						{value >= 1000 && (
							<div className="free-shipping">
								<h2>Parabéns, sua compra tem frete grátis!</h2>
							</div>
						)}

						<Separator />
						<div className="button-container">
							<Button
								color="primary"
								text="Finalizar compra"
								action={() => null}
							/>
						</div>
					</div>
				)}
			</section>
		</>
	)
}

export default Cart
