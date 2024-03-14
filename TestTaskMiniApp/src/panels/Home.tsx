import { FC } from 'react'
import {
  Panel,
  PanelHeader,
  NavIdProps,
  Group,
  Button,
  Div,
} from '@vkontakte/vkui'
import styles from './home.module.css'

type HomeProps = NavIdProps

export const Home: FC<HomeProps> = ({ id }) => {
  // const routeNavigator = useRouteNavigator()
  // const [coolCatFact, setCoolCatFuct] = useState<string>('')

  return (
    <Panel id={id}>
      <Div>
        <PanelHeader>Главная</PanelHeader>
        <Group>
          <div className={styles['cat_fact_container']}>
            <Button stretched size='l'>
              Получить знания про крутых котов!
            </Button>
            {/* <span contentEditable>{coolCatFact}</span> */}
          </div>
        </Group>
      </Div>
    </Panel>
  )
}
