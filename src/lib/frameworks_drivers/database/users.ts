import * as Knex from "knex";

export async function setupDatabase(database: Knex) {
    const hasTableUsers = await database.schema.hasTable("users");
    if(!hasTableUsers){
        await database.schema.createTable("users", (table) => {
            table.increments();
            table.string("username", 60).notNullable();
            table.string("password", 60).notNullable();
            table.string("email", 255).notNullable().unique();
            table.string("phone", 15).notNullable().unique();
            table.string("bio", 280).nullable();
            table.boolean("active").notNullable().defaultTo(0);
            table.string("type", 15).notNullable().defaultTo("user");
            table.string("photo", 60).nullable();
            table.enum("status", [0, 1]).notNullable().defaultTo(1);
            table.timestamps(true,true)
        });
    }
}