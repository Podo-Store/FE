export const maskAccountNumber = (accountNumber: string): string => {
  if (accountNumber.length <= 7) {
    return accountNumber;
  }

  const front = accountNumber.slice(0, 3);
  const back = accountNumber.slice(-4);
  const masked = "*".repeat(accountNumber.length - 7);

  return `${front}${masked}${back}`;
};
