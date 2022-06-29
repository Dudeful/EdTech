interface Transfer

{ 
  origin: {
    branch: string,
    account: string
  }, 
  destination: {
    branch: string,
    account: string
  }, 
  amount: number
}

export { Transfer };