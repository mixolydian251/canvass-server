import { tryLogin } from "../authentication/auth";
import { formatErrors } from "../utils/formatErrors";
import { requiresAuth } from '../authentication/permissions';
import bcrypt from 'bcrypt';
import uuid from 'uuid';

export default {
  Query: {
    me: async (parent, args, { models, user }) => {
      const { id, username, email, category_ids} = await models.User.findOne({ id: user.id });

      console.log(id, username, email, category_ids);


      const categories = await category_ids.map( async (category_id) => {
        const { id, name, canvass_ids } = await models.Category.findOne({id: category_id});
        const canvasses = canvass_ids.map( async (canvass_id) => {
          const {
            id,
            title,
            category_id,
            creator_id,
            options,
            comment_ids
          } = await models.Canvass.findOne({ id: canvass_id });
          const creator = await models.User.findOne({ id: creator_id });
          return { id, title, category_id, creator, options, comment_ids }
        });

        return { id, name, canvasses}
      });

      return { id, username, email, categories }
    },
    getUserByUsername: async (parent, { userName }, { models }) => {
      const { id, username, email, category_ids} = await models.User.findOne({ username: userName });

      const categories = await category_ids.map( async (category_id) => {
        const { id, name, canvass_ids } = await models.Category.findOne({id: category_id});
        const canvasses = canvass_ids.map( async (canvass_id) => {
          const {
            id,
            title,
            category_id,
            creator_id,
            options,
            comment_ids
          } = await models.Canvass.findOne({ id: canvass_id });
          const creator = await models.User.findOne({ id: creator_id });
          return { id, title, category_id, creator, options, comment_ids }
        });

        return { id, name, canvasses}
      });

      return { id, username, email, categories }
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