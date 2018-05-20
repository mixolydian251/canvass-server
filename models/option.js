export default (sequelize, DataTypes) => {
  const Option = sequelize.define("option", {
    text: {
      type: DataTypes.STRING,
    }
  });

  Option.associate = ({ Canvass, User }) => {
    Option.belongsTo(Canvass, {
      foreignKey: {
        name: 'canvassId',
        field: 'canvass_id'
      }
    });

    Option.belongsToMany(User, {
      through: "votes",
      foreignKey: "user_id"
    });
  };

  return Option;
};