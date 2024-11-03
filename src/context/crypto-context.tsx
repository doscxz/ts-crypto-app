import { createContext, useEffect, useState } from "react";
import { TCryptoAssets, TCryptoData, TResult } from "../data";
import { FetchCryptoAssets, FetchCryptoData } from "../api";
import { percentDifference } from "../utility/utilis";

type TCryptoContext = {
  loading: boolean,
  CryptoAssets: TCryptoAssets[],
  CryptoData: TCryptoData['result'],
  addAsset: (newAsset: TCryptoAssets) => void
}
const CryptoContext = createContext<TCryptoContext>({
  loading: false,
  CryptoAssets: [],
  CryptoData: [],
  addAsset: () => { },
})

export function CryptoContextProvider({ children }: { children: JSX.Element }) {
  const [loading, setLoading] = useState<boolean>(false)
  const [CryptoData, setCryptoData] = useState<TCryptoData['result']>(Array)
  const [CryptoAssets, setCryptoAssets] = useState<TCryptoAssets[]>([])

  function mapAssets(CryptoAssets: TCryptoAssets[], result: TResult[]) {
    return CryptoAssets.map(asset => {
      const coin: (TResult | undefined) = result.find(coin => coin.id === asset.id)
      if (typeof coin === "object") {
        const grow: boolean = (asset.price < coin.price)
        return {
          grow: grow,
          growPercent: percentDifference(asset.price, coin.price),
          totalAmount: asset.amount * coin.price,
          totalProfit: asset.amount * coin.price - asset.amount * asset.price,
          name: coin.name,
          ...asset
        }
      }
      return {
        ...asset
      }
    })

  }

  useEffect(() => {
    async function preload(): Promise<void> {
      setLoading(true)
      const CryptoAssets = await FetchCryptoAssets()
      const { result } = await FetchCryptoData()

      setCryptoAssets(mapAssets(CryptoAssets, result))

      setCryptoData(result)
      setLoading(false)
    }
    preload()
  }, [])
  function addAsset(newAsset: TCryptoAssets): void {
    setCryptoAssets(prev => mapAssets([...prev, newAsset], CryptoData))
  }


  return (
    <CryptoContext.Provider value={{ loading, CryptoAssets, CryptoData, addAsset }} >
      {children}
    </CryptoContext.Provider >
  )
}

export default CryptoContext