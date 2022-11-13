const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            id:{
                type: Sequelize.STRING(20),
                allowNull: false,
                primaryKey: true,
            },
            password:{
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            name:{
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            birth:{
                type: Sequelize.STRING(10),
                allowNull: false,
            },
            gender:{
                type: Sequelize.STRING(10),
                allowNull: false,
            },
            number:{
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            email:{
                type: Sequelize.STRING(45),
                allowNull: false,
                unique: true,
            },
            nickname:{
                type: Sequelize.STRING(20),
                allowNull: false,
                unique: true,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'User',
            tableName: 'users',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associations(db){}
};