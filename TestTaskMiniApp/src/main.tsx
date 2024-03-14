import vkBridge from '@vkontakte/vk-bridge'
import { AppConfig } from './AppConfig.tsx'
import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react'

vkBridge.send('VKWebAppInit').then(() => console.log('[bridge] init'))

const root = document.getElementById('root')

if (!root) throw new Error('#root container not found')

ReactDOM.createRoot(root).render(
  <StrictMode>
    <AppConfig />
  </StrictMode>
)

if (import.meta.env.MODE === 'development') {
  import('./eruda.ts')
}
