export interface Encrypted {
  encrypt: (input: string) => Promise<string>
}
