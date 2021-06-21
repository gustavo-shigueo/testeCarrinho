"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const produtos_json_1 = __importDefault(require("../json/produtos.json"));
const produtos = produtos_json_1.default;
const router = express_1.Router();
const createTotalizer = (itens, id, name) => {
    return itens.reduce((acc, cur) => ({
        ...acc,
        value: acc.value + cur.price,
    }), { id, name, value: 0 });
};
router.get('/produtos', (_req, res, _next) => res.send(produtos));
router.get('/carrinho', (req, res, _next) => {
    const itens = req.body;
    const itensCarrinho = [];
    itens.forEach(item => {
        itensCarrinho.push({
            ...produtos.find(p => p.productId === item.productId),
            quantity: item.quantity ?? 0,
        });
    });
    const value = itensCarrinho.reduce((acc, { sellingPrice, quantity }) => acc + sellingPrice * quantity, 0);
    const totalizers = [
        createTotalizer(itensCarrinho, 'Items', 'Total dos Itens'),
        createTotalizer(itensCarrinho, 'Discounts', 'Total dos Descontos'),
    ];
    const itemMetadataArray = itensCarrinho.map(({ id, seller, name, skuName, productId, refId, ean, imageUrl, detailUrl, }) => ({
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
    }));
    const carrinho = {
        value,
        items: itensCarrinho,
        totalizers,
        itemMetadata: { items: itemMetadataArray },
    };
    res.send(carrinho);
});
exports.default = (app) => app.use(router);
//# sourceMappingURL=index.js.map