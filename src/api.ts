import { cryptoAssets, cryptoData, TCryptoAssets, TCryptoData } from "./data";

export function FetchCryptoData(): Promise<TCryptoData> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(cryptoData)
    }, 1000)
  })
}


export function FetchCryptoAssets(): Promise<TCryptoAssets[]> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(cryptoAssets)
    }, 1000)
  })
}