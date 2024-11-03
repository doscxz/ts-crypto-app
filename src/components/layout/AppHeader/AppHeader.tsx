import { Button, Layout, Modal, Space, Drawer } from "antd"
import styles from './AppHeader.module.scss'
import { Select } from 'antd'
import { useContext, useEffect, useState } from "react";
import CryptoContext from "../../../context/crypto-context";
import CoinInfoModel from "./CoinInfoModel/CoinInfoModel";
import AddAssetForm from "./AddAssetForm/AddAssetForm";
import { TResult } from "../../../data";

const { Header } = Layout

function AppHeader() {
  const { CryptoData } = useContext(CryptoContext)
  const [select, setSelect] = useState<boolean>(false)
  const [coin, setCoin] = useState<TResult>(Object)
  const [modalWindow, setModalWindow] = useState<boolean>(false)
  const [drawer, setDrawer] = useState<boolean>(false);

  useEffect(() => {
    const keypress = (event: KeyboardEvent) => {
      if (event.key === '/') {
        setSelect(prev => !prev)
      }
    }
    document.addEventListener('keypress', keypress)
    return () => document.removeEventListener('keypress', keypress)
  }, [])

  function handleSelect(value: string) {
    setModalWindow(true)
    const ide = CryptoData.find((c) => c.id === value)
    if (typeof ide === 'object') {
      setCoin(ide)
    }
  }

  return (
    <Header className={styles.Header}>
      <Button type="primary" onClick={() => setDrawer(true)}>
        Add Assets
      </Button>
      <Select
        open={select}
        onSelect={handleSelect}
        onClick={() => setSelect(prev => !prev)}
        value='press / to open'
        style={{ width: 250 }}
        options={CryptoData.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon
        }))}
        optionRender={(option) => (
          <Space>
            <img style={{ width: '20px' }} src={option.data.icon} alt={option.data.label} /> {option.data.label}
          </Space>
        )}
      />


      <Modal
        open={modalWindow}
        onOk={() => setModalWindow(false)}
        onCancel={() => setModalWindow(false)}
        footer={null}>
        <CoinInfoModel coin={coin} />
      </Modal>

      <Drawer
        width={600}
        title="Add assets"
        onClose={() => setDrawer(false)}
        open={drawer}
        destroyOnClose>

        <AddAssetForm onClose={() => setDrawer(false)} />
      </Drawer>

    </Header >
  )
}

export default AppHeader