import { Table } from "drizzle-orm";
import { index, pgTable, varchar } from "drizzle-orm/pg-core";

export const urls = pgTable("urls", {
  short:varchar(10).primaryKey(),
  origin:varchar(255).notNull(),
}, (table)=>{
  return{
    originIdx:index("origin_idx").on(table.origin) //可以在欄位加上index加快查詢速度，若有unique屬性(short)即有index，不須另外建
  }
});
