import { formatErrors } from "../utils/formatErrors"
import { requiresAuth } from "../authentication/permissions"
import uuid from 'uuid';

export default {
  Query: {
    allCategories: async (parent, args, { models }) => (
      await models.Category.findAll()
    )
  },
  Mutation: {
    createCategory: async (parent, args, { models }) => {
      try {
        const id = uuid();
        await models.Category.create({ id, ...args });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  }
}