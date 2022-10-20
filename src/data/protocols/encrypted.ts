export interface IEncrypted {
  encrypt: (input: string) => Promise<string>
}
