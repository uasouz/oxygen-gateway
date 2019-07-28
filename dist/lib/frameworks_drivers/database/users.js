"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = require("./index");
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: sequelize_1.DataTypes.STRING(60),
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING(60),
        allowNull: true
    },
    email: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    phone: {
        type: sequelize_1.DataTypes.STRING(15),
        allowNull: false,
        unique: true
    },
    bio: {
        type: sequelize_1.DataTypes.STRING(280),
        allowNull: true
    },
    active: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: '0'
    },
    type: {
        type: sequelize_1.DataTypes.STRING(15),
        allowNull: false,
        defaultValue: 'user'
    },
    photo: {
        type: sequelize_1.DataTypes.STRING(60),
        allowNull: true
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('0', '1'),
        allowNull: false,
        defaultValue: '1'
    }
}, { tableName: "users", sequelize: index_1.default });
//# sourceMappingURL=users.js.map