# rethinkdb-cleartables

A helper method to delete all records in specified or all tables in RethinkDB database.

## Installation

```
npm install rethinkdb-cleartables
```

## Usage

```js
import clearTables from "rethinkdb-cleartables";

// clears specified tables
clearTables(connection, "db_name", [ "table1", ... ]).then(() => ...);

// clears all tables
clearTables(connection, "db_name").then(() => ...);
```

## License

MIT
