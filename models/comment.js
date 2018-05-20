export default (sequelize, DataTypes) => {
  const Comment = sequelize.define("comment", {
    text: {
      type: DataTypes.STRING,
    },
  });

  Comment.associate = (models) => {
    Comment.belongsTo(models.Canvass, {
      foreignKey: {
        name: 'canvassId',
        field: 'canvass_id'
      }
    });

    Comment.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        field: 'user_id'
      }
    });


    Comment.belongsTo(models.Comment, {
      as: 'parent',
      through: 'parent_comment',
    });

    Comment.hasMany(models.Comment)
  };

  return Comment;
};