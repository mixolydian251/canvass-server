import bcrypt from 'bcrypt'
const SALT_ROUNDS = 10;

export default (sequelize, DataTypes) => {
 const User = sequelize.define("user", {
   username: {
     type: DataTypes.STRING,
     unique: {
       args: true,
       msg: "This username is taken."
     },
     validate: {
       isAlphanumeric: {
         args: true,
         msg: "Username can only contain letters and numbers."
       },
       len: {
         args: [3, 20],
         msg: "Username must be between 3 and 20 characters."
       },
     }
   },
   email: {
     type: DataTypes.STRING,
     unique: {
       args: true,
       msg: "There is already an account linked to this email."
     },
     validate: {
       isEmail: {
         args: true,
         msg: "Invalid email address."
       }
     }
   },
   password: {
     type: DataTypes.STRING,
     validate: {
       len: {
         args: [6, 50],
         msg: "Password must be between 6 to 50 characters long"
       }
     }
   }
 }, {
   hooks: {
     afterValidate: async (user) => {
       user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
       return user;
     }
   }
 });

 User.associate = (models) => {
   //  Belong to many is an N:M relationship ( user can belong to more than one category )
   User.belongsToMany(models.Category, {
     through:'subscriptions',
     foreignKey: "category_id"
   });

   User.hasMany(models.Option);
   User.hasMany(models.Comment);
   User.hasMany(models.Canvass);
 };

 return User;
};
