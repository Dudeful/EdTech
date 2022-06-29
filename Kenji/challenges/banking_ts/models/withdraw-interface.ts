interface Withdraw

{ 
  origin: {
    branch: string,
    account: string
  }, 
  amount: number
}

export { Withdraw };