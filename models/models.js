import Sequelize from 'sequelize';

const sequelize = new Sequelize('canvass', 'postgres', 'postgres', {
  dialect: 'postgres',
  operatorsAliases: Sequelize.Op,
  define: {
    underscored: true,
  }
});

const models = {
  Canvass: sequelize.import('./canvass'),
  Comment: sequelize.import('./comment'),
  Category: sequelize.import('./category'),
  Option: sequelize.import('./option'),
  User: sequelize.import('./user'),
};

Object.keys(models).forEach(modelName => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models