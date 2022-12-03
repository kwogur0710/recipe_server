const Sequelize = require('sequelize');

module.exports = class Comment extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            commentNum:{
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            postNum:{
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            id:{
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            nickname:{
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            contents:{
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            makedate:{
                type: Sequelize.DATE,
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Comment',
            tableName: 'comments',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associations(db){}
};