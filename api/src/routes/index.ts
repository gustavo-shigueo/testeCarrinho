import { Item } from 'src/interfaces/items'
import json from '../json/produtos.json'

// Lista de todos os produtos, em produção seria substituído
// por um comando SQL como "SELECT * FROM produtos" ou por
// um método de ORM como sequelize ex: Produtos.findAll()
const produtos: Item[] = json
