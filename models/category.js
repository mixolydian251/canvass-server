export default (sequelize, DataTypes) => {
  const Category = sequelize.define("category", {
    name: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: "This category already exists."
      }
    },
  });

  Category.associate = (models) => {
    Category.hasMany(models.Canvass);
    Category.hasMany(models.User);
  };

  return Category;
};