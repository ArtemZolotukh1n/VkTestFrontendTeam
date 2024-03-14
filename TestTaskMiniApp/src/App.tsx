// import { useState, ReactNode } from 'react'
import { View, SplitLayout, SplitCol } from '@vkontakte/vkui'
import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router'
import { DEFAULT_VIEW_PANELS } from './routes'
import { Home } from './panels/Home'

export const App = () => {
  const { panel: activePanel = DEFAULT_VIEW_PANELS.HOME } =
    useActiveVkuiLocation()
  // const [popout, setPopout] = useState<ReactNode | null>(
  //   // <ScreenSpinner size='large' />
  //   null
  // )

  return (
    <SplitLayout>
      <SplitCol>
        <View activePanel={activePanel}>
          <Home id='home' />
        </View>
      </SplitCol>
    </SplitLayout>
  )
}
