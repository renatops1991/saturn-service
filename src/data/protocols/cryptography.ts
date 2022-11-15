export interface ICryptography {
  encrypt: (input: string) => Promise<string>
  compare: (value: string, hash: string) => Promise<boolean>
}
