import { FC, useRef } from 'react'
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
const NameSchema = yup.object().shape({
  name: yup
    .string()
    .required('Пожалуйста, введите это обязательное поле')
    .matches(/^[aA-zZ\s]+$/, 'Разрешены только символы английского алфавита'),
})

export const Home: FC<HomeProps> = ({ id }) => {
  const inputElement = useRef<HTMLInputElement>(null)
  const queryClient = useQueryClient()
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(NameSchema),
  })
  const formName = watch('name')
  const { data, isLoading, error, refetch } = useGetInfoByName(formName)

  // Первый номер также можно сделать через useLayoutEffect -- но это будет два ререндера и будет
  // + бесполезный стейт и вообще это неправильное использование useLayoutEffect
  // useLayoutEffect(() => {
  //   setCursorPosForInput(coolCatFact.split(' ')[0].length)
  // }, [fetchCounter])

  const resetInputText = (text: string) => {
    if (!inputElement.current) {
      return
    }

    inputElement.current.value = text
    const pos = text.split(' ')[0].length
    inputElement.current.setSelectionRange(pos, pos)
    inputElement.current.focus()
    // setCoolCatFact(text)
  }

  const fetchCatFact = async () => {
    await baseApiRequest({
      url: 'https://catfact.ninja/fact',
    }).then((data) => {
      // setCoolCatFact(data.fact)
      resetInputText(data.fact)
      // setFetchCounter(fetchCounter + 1)
    })
  }

  const onSubmitHandler = async () => {
    await queryClient.cancelQueries({ queryKey: ['person_info'] })
    refetch()
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
            <input
              ref={inputElement}
              className={styles['base_input']}
              // onChange={(e) => {
              //   console.log('Text chnage', e.currentTarget.value)
              //   setCoolCatFact(text)
              // }}
            />
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
                {...register('name', { pattern: /^[A-Za-z]+$/i })}
                placeholder='Имя'
                type='text'
                required
                className={styles['base_input']}
              />
              <Input type='submit' />
              <span>{errors.name?.message}</span>
            </form>

            {error && <Headline level='1'>{error.message}</Headline>}

            {isLoading && !error && <Spinner size='medium' />}

            {!error && !isLoading && data?.age && (
              <Headline>Возраст = {data?.age}</Headline>
            )}
          </div>
        </Group>
      </Div>
    </Panel>
  )
}
