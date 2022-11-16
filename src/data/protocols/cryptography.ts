export interface ICryptography {
  encrypt: (userId: string) => Promise<string>
}
