import Sequelize from 'sequelize';

export default (sequelize, DataTypes) => {
  const Canvass = sequelize.define("canvass", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    options: {
      type: Sequelize.ARRAY(DataTypes.JSON)
    },
    comments: {
      type: Sequelize.ARRAY(DataTypes.STRING)
    }
  });

  Canvass.associate = (models) => {
    Canvass.belongsTo(models.Category, {
      foreignKey: {
        name: 'categoryId', // fk adds categoryId to Canvass
        field: 'category_id'
      },
    });

    Canvass.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        field: 'user_id',
      },
    });

    Canvass.hasMany(models.Option, { as: "canvass_options"});
    Canvass.hasMany(models.Comment, { as: "canvass_comments"});
  };

  return Canvass;
};