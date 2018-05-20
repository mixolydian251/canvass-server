import { tryLogin } from "../authentication/auth";
import { formatErrors } from "../utils/formatErrors";
import { requiresAuth } from '../authentication/permissions';
import bcrypt from 'bcrypt';
import uuid from 'uuid';

export default {
  Query: {
    me: async (parent, args, { models, user }) => {
      const { id, username, email, category_ids} = await models.User.findOne({ id: user.id });
      const categories = await category_ids.map((category_id) => models.Category.findOne({ id: category_id }));
      return { id, username, email, categories }
    },
    getUserByUsername: async (parent, { userName }, { models }) => {
      const {
        id,
        username,
        email,
        password,
        category_ids
      } = await models.User.findOne({ username: userName });

      const categories = await category_ids.map((category_id) => models.User.findOne({ id: category_id }));

      return {
        id,
        username,
        email,
        password,
        categories
      }
    }
  },
  Mutation: {
    login: (parent, {email, password}, {models, SECRET, SECRET2}) => {
      return tryLogin(email, password, models, SECRET, SECRET2)
    },

    register: async (parent, args, { models }) => {
      try {
        const id = uuid();
        args.password = await bcrypt.hash(args.password, 12);

        const user = await models.User.create({
          id,
          ...args
        });
        return {
          ok: true,
          user
        };
      } catch (error) {
        console.log(error);
        return {
          ok: false,
          errors: formatErrors(error, models)
        }
      }
    },
    subscribe: async ( parent, { username, categoryName }, { models }) => {
      try {
        const { id } = await models.Category.findOne({ name: categoryName });
        if (!id) {
          console.log("Category not found");
          return false;
        }
        await models.User.update({
          username
        }, {
          $push: {
            category_ids: id
          }
        });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  }
};