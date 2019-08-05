"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
function setupDatabase(database) {
    return __awaiter(this, void 0, void 0, function* () {
        const hasTableUsers = yield database.schema.hasTable("users");
        if (!hasTableUsers) {
            yield database.schema.createTable("users", (table) => {
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
                table.timestamps(true, true);
            });
        }
    });
}
exports.setupDatabase = setupDatabase;
//# sourceMappingURL=users.js.map