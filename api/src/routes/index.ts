import { Application, NextFunction, Request, Response, Router } from 'express'
import {
	Carrinho,
	Item,
	ItemMetadataItem,
	ItemRequest,
	Totalizer,
} from 'src/interfaces/items'
import json from '../json/produtos.json'

// Lista de todos os produtos, em produção seria substituído
// por um comando SQL como "SELECT * FROM produtos" ou por
// um método de ORM como sequelize ex: Produtos.findAll()
const produtos: Item[] = json

const router = Router()

const createTotalizer = (
	itens: Item[],
	id: string,
	name: string
): Totalizer => {
	return itens.reduce(
		(acc, cur) => ({
			...acc,
			value: acc.value + cur.price,
		}),
		{ id, name, value: 0 }
	)
}

router.get('/produtos', (_req: Request, res: Response, _next: NextFunction) =>
	res.send(produtos)
)

router.post('/carrinho', (req: Request, res: Response, _next: NextFunction) => {
	const itens: ItemRequest[] = req.body
	const itensCarrinho: Item[] = []

	itens.forEach(item => {
		itensCarrinho.push({
			...produtos.find(p => p.productId === item.productId)!,
			quantity: item.quantity ?? 0,
		})
	})

	const value = itensCarrinho.reduce(
		(acc, { sellingPrice, quantity }) => acc + sellingPrice * quantity!,
		0
	)

	const totalizers: Totalizer[] = [
		createTotalizer(itensCarrinho, 'Items', 'Total dos Itens'),
		createTotalizer(itensCarrinho, 'Discounts', 'Total dos Descontos'),
	]

	const itemMetadataArray: ItemMetadataItem[] = itensCarrinho.map(
		({
			id,
			seller,
			name,
			skuName,
			productId,
			refId,
			ean,
			imageUrl,
			detailUrl,
		}) => ({
			id,
			seller,
			name,
			skuName,
			productId,
			refId,
			ean,
			imageUrl,
			detailUrl,
			assemblyOptions: [],
		})
	)

	const carrinho: Carrinho = {
		value,
		items: itensCarrinho,
		totalizers,
		itemMetadata: { items: itemMetadataArray },
	}

	res.send(carrinho)
})

export default (app: Application) => app.use(router)
