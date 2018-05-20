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
    },
    vote: async (parent, { canvassId, optionId, username }, { models }) => {
      try {
        const { id } = await models.User.findOne({ username });
        const canvass = await models.Canvass.findOne({ id: canvassId });

        canvass.options.forEach((option) => {
          if (option.id === optionId && !option.voter_ids.includes(id)){
            option.voter_ids = option.voter_ids.concat(id)
          } else {
            if( option.voter_ids.includes(id) ){
              option.voter_ids = option.voter_ids.filter((option) => option !== id)
            }
          }
        });

        await canvass.save();

        return true;

      } catch (err) {
        console.log(err);
        return false;
      }
    }
  }
}
