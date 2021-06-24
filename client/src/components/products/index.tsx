import '../../css/Products.css'
import { Item, ItemRequest } from '../../interfaces/items'
import ProductItem from './ProductItem'

interface ProductsProps {
	products: Item[]
	cart: ItemRequest[]
	updateCart: (newCart: ItemRequest[]) => void
}

const Products = ({ products, cart, updateCart }: ProductsProps) => {
	const productItem = (product: Item) => {
		return (
			product.availability && (
				<ProductItem
					product={product}
					key={product.productId}
					cart={cart}
					updateCart={updateCart}
				/>
			)
		)
	}

	return (
		<>
			<h2 style={{ textAlign: 'center' }}>Produtos</h2>
			<hr
				style={{
					width: '120vw',
					transform: 'translateX(-20vw)',
					margin: '0.75rem 0 1.5rem 0',
				}}
			/>
			<section className="products">
				{products.length > 0 && products.map(productItem)}
			</section>
		</>
	)
}

export default Products
