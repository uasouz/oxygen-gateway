import {Model, DataTypes} from "sequelize";
import sequelize from './index';

export class User extends Model {
    public id?: number;
    public username!: string;
    public password!: string;
    public email!: string;
    public phone!: string;
    public bio?: string;
    public type?: string;
    public active?: number;
    public photo?: string;
    public status?: number;
}

User.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(60),
        allowNull: true
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    phone: {
        type: DataTypes.STRING(15),
        allowNull: false,
        unique: true
    },
    bio: {
        type: DataTypes.STRING(280),
        allowNull: true
    },
    active: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: '0'
    },
    type: {
        type: DataTypes.STRING(15),
        allowNull: false,
        defaultValue: 'user'
    },
    photo: {
        type: DataTypes.STRING(60),
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('0', '1'),
        allowNull: false,
        defaultValue: '1'
    }
}, {tableName: "users", sequelize: sequelize});