export interface Carrinho {
	value: number
	items: Item[]
	totalizers: Totalizer[]
	itemMetadata: ItemMetadata
}

export interface ItemMetadata {
	items: ItemMetadataItem[]
}

export interface ItemMetadataItem {
	id: string
	seller: string
	name: string
	skuName: string
	productId: string
	refId: null
	ean: string
	imageUrl: string
	detailUrl: string
	assemblyOptions: any[]
}

export interface Item {
	uniqueId: string
	id: string
	productId: string
	productRefId: null
	refId: null
	ean: string
	name: string
	skuName: string
	modalType: null
	parentItemIndex: null
	parentAssemblyBinding: null
	assemblies: any[]
	priceValidUntil: string
	tax: number
	price: number
	listPrice: number
	manualPrice: null
	sellingPrice: number
	rewardValue: number
	isGift: boolean
	additionalInfo: AdditionalInfo
	preSaleDate: null
	productCategoryIds: string
	productCategories: ProductCategories
	quantity?: number
	seller: string
	sellerChain: string[]
	imageUrl: string
	detailUrl: string
	components: any[]
	bundleItems: any[]
	attachments: any[]
	attachmentOfferings: any[]
	offerings: any[]
	priceTags: PriceTag[]
	availability: string
	measurementUnit: string
	unitMultiplier: number
	manufacturerCode: null
}

export interface AdditionalInfo {
	brandName: string
	brandId: string
	offeringInfo: null
	offeringType: null
	offeringTypeId: null
}

export interface PriceTag {
	name: string
	value: number
	rawValue: number
	isPercentual: boolean
	identifier: string
}

export interface ProductCategories {
	'29': string
}

export interface Totalizer {
	id: string
	name: string
	value: number
}

export interface ItemDisplay {
	productId: string
	name: string
	imageUrl: string
	price: number
	sellingPrice: number
	quantity: number
}

export interface ItemRequest {
	productId: string
	quantity: number
}
