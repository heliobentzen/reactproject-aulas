import axios from 'axios'

import StorageService from './StorageService'

export const LOGGED_USER = 'username'
export const TOKEN = 'access_token'
export const TOKEN_EXPIRES = 'expires_at'
export const BASE_URL = 'https://api.pensacare.tdsc.dev'

export const httpClient = axios.create({
  baseURL: BASE_URL,
})

export default class ApiService {
  endpoint: string
  storageService: StorageService

  constructor(endpoint: string) {
    this.endpoint = endpoint
    this.storageService = new StorageService()

    const hasToken = this.storageService.getItem(TOKEN)

    if (hasToken) this.registerToken(hasToken)
  }

  registerToken(token: string) {
    if (token)
      httpClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  unregisterToken() {
    httpClient.defaults.headers.common['Authorization'] = null;
  }

  setHeader(name: string, value: string) {
    httpClient.defaults.headers.common[name] = `${value}`
  }

  post(url: string, params: any, options?: any) {
    url = this.buildUrl(url)
    return httpClient.post(url, params, options)
  }

  put(url: string, params: any) {
    url = this.buildUrl(url)
    return httpClient.put(url, params)
  }

  patch(url: string, params: any, options?: any) {
    url = this.buildUrl(url)
    return httpClient.patch(url, params, options)
  }

  delete(url: string) {
    url = this.buildUrl(url)
    return httpClient.delete(url)
  }

  get(url: string, params?: any) {
    url = this.buildUrl(url)
    return httpClient.get(url, params)
  }

  buildUrl(url: string) {
    return `${this.endpoint}${url}`
  }

  getBaseUrl() : string{
    return httpClient.defaults.baseURL || '';
  }

  getPlain(url: string) {
    return httpClient.get(url)
  }
}