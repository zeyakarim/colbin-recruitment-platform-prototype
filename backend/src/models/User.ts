import { DataTypes, Model, Optional } from 'sequelize';
import bcrypt from 'bcryptjs';
import { sequelize } from '../config/database';

interface UserAttributes {
    id: string;
    email: string;
    password: string;
    profile?: object;

    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}

type UserCreationAttributes = Optional<UserAttributes, 'id' | 'profile' | 'createdAt' | 'updatedAt' | 'deletedAt'>;

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: string;
    public email!: string;
    public password!: string;
    public profile?: object;

    public createdAt!: Date;
    public updatedAt!: Date;
    public deletedAt?: Date;

    public static async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }

    public async comparePassword(candidatePassword: string): Promise<boolean> {
        return bcrypt.compare(candidatePassword, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        profile: {
            type: DataTypes.JSONB,
            allowNull: true,
            defaultValue: {},
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updatedAt:{
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        deletedAt: {
            type: DataTypes.DATE
        }
    },
    {
        sequelize,
        tableName: 'User',
        paranoid: true,
        timestamps: true,
        hooks: {
            beforeCreate: async (user) => {
                user.password = await User.hashPassword(user.password);
            },
        },
    }
);