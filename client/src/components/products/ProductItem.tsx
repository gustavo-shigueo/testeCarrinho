import { useState } from 'react'
import { Item, ItemRequest } from '../../interfaces/items'
import Button from '../Button'

interface ProductProps {
	product: Item
	cart: ItemRequest[]
	updateCart: (newCart: ItemRequest[]) => void
}

const ProductItem = ({
	product: {
		name,
		imageUrl,
		price,
		sellingPrice,
		productId,
		unitMultiplier,
		measurementUnit,
	},
	cart,
	updateCart,
}: ProductProps) => {
	const [productQuantity, setProductQuantity] = useState<string | number>(
		cart.find((item: ItemRequest) => item.productId === productId)?.quantity ??
			0
	)

	const setQuantityToValue = (value: number) => {
		setProductQuantity(value)
		updateCart(
			cart.map((item: ItemRequest) =>
				item.productId === productId ? { ...item, quantity: value } : item
			)
		)
	}

	const roundProductQuantity = (value: number) => {
		if (value > 0 && value % unitMultiplier === 0) {
			setQuantityToValue(value)
			return productQuantity
		}
		if (value <= 0) {
			setQuantityToValue(unitMultiplier)
			return productQuantity
		}
		value = Math.ceil(value / unitMultiplier) * unitMultiplier
		setQuantityToValue(value)
		return productQuantity
	}

	const updateProductQuantity = (value: number | string) => {
		if (value <= 0 && value !== '') return roundProductQuantity(1)
		if (value === '') return setProductQuantity('')
		setQuantityToValue(Number(value))
	}

	const adicionarAoCarrinho = () => {
		if (cart.some((item: ItemRequest) => item.productId === productId)) return
		updateCart([
			...cart,
			{
				productId,
				quantity: Number(
					productQuantity !== 1 ? productQuantity : unitMultiplier ?? 1
				),
			},
		])
	}

	const removerDoCarrinho = () => {
		if (!cart.some((item: ItemRequest) => item.productId === productId)) return
		updateCart(cart.filter((item: ItemRequest) => item.productId !== productId))
	}

	return (
		<div className="card-produto">
			<div className="container-imagem">
				<img src={imageUrl} alt="imagem-produto" height="341" />
			</div>

			<div className="container-info">
				<h3 className="nome-produto">{name}</h3>
				<h2 className="preco-produto">
					{(sellingPrice / 100).toLocaleString('pt-BR', {
						style: 'currency',
						currency: 'BRL',
					})}
					<sup style={{ fontSize: '1rem' }}>/{measurementUnit}</sup>
					<sup className="sem-desconto">
						{(price / 100).toLocaleString('pt-BR', {
							style: 'currency',
							currency: 'BRL',
						})}
					</sup>
				</h2>
			</div>

			<div className="adicionar-carrinho">
				{cart.some((item: ItemRequest) => item.productId === productId) ? (
					<div className="quantidade-produto" style={{ display: 'flex' }}>
						<div className="input-group">
							<Button
								text="-"
								action={() =>
									roundProductQuantity(Number(productQuantity) - unitMultiplier)
								}
							/>
							<input
								type="number"
								min="1"
								value={productQuantity !== 0 ? productQuantity : unitMultiplier}
								onChange={e => updateProductQuantity(e.target.value)}
								onBlur={e => roundProductQuantity(Number(e.target.value))}
							/>
							<Button
								text="+"
								action={() =>
									roundProductQuantity(Number(productQuantity) + unitMultiplier)
								}
							/>
						</div>
						<Button
							color="outline-danger"
							text="Remover"
							action={removerDoCarrinho}
						/>
					</div>
				) : (
					<Button
						color="primary"
						text="Adicionar ao carrinho"
						action={adicionarAoCarrinho}
					/>
				)}
			</div>
		</div>
	)
}

export default ProductItem
