import vkBridge from '@vkontakte/vk-bridge'
import { AppConfig } from './AppConfig.tsx'
import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react'
import './index.css'
vkBridge.send('VKWebAppInit').then(() => console.log('[bridge] init'))

const root = document.getElementById('root')

if (!root) throw new Error('#root container not found')

ReactDOM.createRoot(root).render(
  <StrictMode>
    <div className='main_container'>
      <AppConfig />
    </div>
  </StrictMode>
)

if (import.meta.env.MODE === 'development') {
  import('./eruda.ts')
}
