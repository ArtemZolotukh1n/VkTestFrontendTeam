export type CatMethods = {
  'https://catfact.ninja/fact': {
    request: unknown
    response: GetCatRes
    querystring: unknown
  }
}

export type GetCatRes = {
  fact: string
  length: number
}
