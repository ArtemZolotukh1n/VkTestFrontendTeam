import { FC, useRef, useState } from 'react'
import {
  Panel,
  PanelHeader,
  NavIdProps,
  Group,
  Button,
  Div,
  Headline,
  Spinner,
  Title,
  Subhead,
  Input,
} from '@vkontakte/vkui'
import styles from './home.module.css'
import { baseApiRequest } from '../api/baseApiRequest'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useGetInfoByName } from '../api/useInfoByName'
import { useQueryClient } from '@tanstack/react-query'

type HomeProps = NavIdProps
const INPUT_PATTERN = /^[A-Za-z]+$/i

const NameSchema = yup.object().shape({
  name: yup
    .string()
    .required('Пожалуйста, введите это обязательное поле')
    .matches(INPUT_PATTERN, 'Разрешены только символы английского алфавита'),
})

export const Home: FC<HomeProps> = ({ id }) => {
  const inputElement = useRef<HTMLInputElement>(null)
  const queryClient = useQueryClient()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(NameSchema),
  })
  const [formName, setFormName] = useState<string>('')
  const { data, isLoading, error } = useGetInfoByName(formName)

  const resetInputText = (text: string) => {
    if (!inputElement.current) {
      return
    }

    inputElement.current.value = text
    const pos = text.split(' ')[0].length
    inputElement.current.setSelectionRange(pos, pos)
    inputElement.current.focus()
  }

  const fetchCatFact = async () => {
    await baseApiRequest({
      url: 'https://catfact.ninja/fact',
    }).then((data) => {
      resetInputText(data.fact)
    })
  }

  const onSubmitHandler = async ({ name }: { name: string }) => {
    await queryClient.cancelQueries({ queryKey: ['person_info'] })
    setFormName(name)
  }

  const getContent = () => {
    if (error) {
      return <Headline level='1'>{error.message}</Headline>
    }

    if (isLoading) {
      return <Spinner size='medium' />
    }

    if (data?.age !== undefined) {
      return (
        <Headline>
          Возраст {data.name} = {data?.age ? data.age : 'пирог это вранье'}
        </Headline>
      )
    }
  }

  return (
    <Panel id={id}>
      <Div className={styles['main_container']}>
        <PanelHeader>Главная</PanelHeader>
        <Group>
          <div className={styles['cat_fact_container']}>
            <Button stretched size='l' onClick={fetchCatFact}>
              Получить знания про крутых котов!
            </Button>
            <input ref={inputElement} className={styles['base_input']} />
          </div>
        </Group>
        <Group>
          <div className={styles['form_container']}>
            <form
              onSubmit={handleSubmit(onSubmitHandler)}
              className={styles['form']}
            >
              <Title>
                Введите имя, информацию о котором вы хотите получить.
              </Title>
              <Subhead>
                Отмечу, что api вернет данные только если имя написано на
                английском.
              </Subhead>
              <input
                {...register('name', { pattern: INPUT_PATTERN })}
                placeholder='Имя'
                type='text'
                required
                className={styles['base_input']}
              />
              <Input type='submit' />
              {errors.name && <span>{errors.name?.message}</span>}
            </form>
            {getContent()}
          </div>
        </Group>
      </Div>
    </Panel>
  )
}
