export interface ICryptography {
  encrypt: (userId: string) => Promise<string>
  decrypt: (token: string) => Promise<string>
}
