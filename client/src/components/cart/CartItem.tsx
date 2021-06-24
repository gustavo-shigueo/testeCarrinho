import { ItemDisplay } from '../../interfaces/items'

interface CartItemProps {
	product: ItemDisplay
}

const CartItem = ({
	product: { name, imageUrl, price, sellingPrice, quantity },
}: CartItemProps) => {
	return (
		<div className="cart-item">
			<div className="cart-image">
				<img src={imageUrl} alt="Imagem do produto" />
			</div>
			<div className="cart-info">
				<h2 className="cart-name">
					{name} x {quantity}
				</h2>
				<p className="price">
					{((price * quantity) / 100).toLocaleString('pt-BR', {
						style: 'currency',
						currency: 'BRL',
					})}
				</p>
				<p className="selling-price">
					{((sellingPrice * quantity) / 100).toLocaleString('pt-BR', {
						style: 'currency',
						currency: 'BRL',
					})}
				</p>
			</div>
		</div>
	)
}

export default CartItem
