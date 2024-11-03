import { Layout, Spin } from 'antd';
import AppHeader from './components/layout/AppHeader/AppHeader';
import AppSider from './components/layout/AppSider/AppSider';
import AppContent from './components/layout/AppContent/AppContent';
import CryptoContext from './context/crypto-context';
import { useContext } from 'react';


function App() {
  const { loading } = useContext(CryptoContext)

  if (loading) {
    return (
      <Spin fullscreen />
    )
  }
  return (
    <>
      <Layout >
        <AppHeader />
        <Layout >
          <AppContent />
          <AppSider />
        </Layout>
      </Layout>
    </>
  )
}

export default App
