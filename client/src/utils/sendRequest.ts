import { RequestParams } from '../interfaces/requestInterface'

export const sendRequest = async ({
	method = 'GET',
	path = '/',
	body,
}: RequestParams) => {
	const headers: HeadersInit = { 'Content-Type': 'application/json' }
	const url = `http://localhost:3001${path}`

	const options: RequestInit = {
		method,
		headers,
		body: body ? JSON.stringify(body) : undefined,
	}

	return fetch(url, options)
}
