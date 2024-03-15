export type PersonInfoMethods = {
  'https://api.agify.io': {
    request: unknown
    response: GetPersonInfoRes
    querystring: GetPersonInfoReq
  }
}

export type GetPersonInfoReq = {
  name: string
}

export type GetPersonInfoRes = {
  count: number
  name: string
  age: number
}
