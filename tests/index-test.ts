/// <reference path="./rethinkdb-patch.d.ts" />

import { expect } from "chai";
import * as r from "rethinkdb";
import clearTables from "../src";

const DB = "rethinkdb_cleartables_test_db";
const TABLES = [ "table1", "table2" ];

describe("rethinkdb-cleartables", () => {
  let connection: r.Connection;

  function tableList(): Promise<string[]> {
    return r.db(DB).tableList().run(connection);
  }

  function expectRows(table: string, rows: number) {
    return r.db(DB).table(table).run(connection)
      .then((cursor: r.Cursor) => cursor.toArray())
      .then(results => expect(results.length).to.equal(rows))
      ;
  }

  before(() =>
    r.connect({ host: "localhost", port: 28015 })
      .then(actual => connection = actual)
      .then(() => r.dbCreate(DB).run(connection))
  );

  beforeEach(() =>
    Promise.all(TABLES.map(table =>
      r.db(DB).tableCreate(table).run(connection)
        .then(() => r.db(DB).table(table).insert({ hello: 123 }).run(connection))
    ))
  );

  afterEach(() =>
    tableList().then((tables: string[]) =>
      Promise.all(tables.map(table => r.db(DB).tableDrop(table).run(connection)))
    )
  );

  it("clear all tables", () =>
    clearTables(connection, DB)
      .then(() => tableList())
      .then((tables: string[]) => tables.map(table => expectRows(table, 0)))
  );

  it("clear specified tables", () =>
    clearTables(connection, DB, [ TABLES[0] ])
      .then(() => expectRows(TABLES[0], 0))
      .then(() => expectRows(TABLES[1], 1))
  );
});
