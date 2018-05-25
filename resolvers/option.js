import { formatErrors } from "../utils/formatErrors"
import { requiresAuth } from "../authentication/permissions"
import uuid from 'uuid';

export default {
  Query: {
    allOptions: async (parent, args, { models }) => (
      await models.Option.find()
    )
  },
  Mutation: {
    addOption: async (parent, { text, canvassId }, { models }) => {
      try {
        await models.Canvass.findOneAndUpdate({ id: canvassId }, {
          $push: { options: await models.Option.create({ id: uuid(), text }) }
        });
        return true;

      } catch (err) {
        console.log(err);
        return false;
      }
    }
  }
}
