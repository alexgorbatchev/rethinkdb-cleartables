declare module "rethinkdb" {
  interface Cursor {
    toArray(): Promise<any[]>;
  }
}
