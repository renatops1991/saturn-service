export interface ICryptography {
  hash: (value: string) => Promise<string>
  encrypt: (userId: string) => Promise<string>
  compare: (value: string, hash: string) => Promise<boolean>
}
