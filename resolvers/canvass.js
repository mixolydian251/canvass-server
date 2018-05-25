import { formatErrors } from "../utils/formatErrors"
import { requiresAuth } from "../authentication/permissions"

import uuid from 'uuid';

export default {
  Query: {
    getCanvasses: async (parent, { title }, { models }) => (
      await models.Canvass.find()
    ),
    getCanvassesByCategory: async (parent, { category }, { models }) => {
      const { id } = await models.Category.findOne({ name: category });
      return await models.Canvass.find({ category_id: id })
    },
    getCanvassById: async (parent, { canvassId }, { models }) => {
      let {
        id,
        title,
        creator_id,
        category_id,
        comment_ids,
        options,
      } = await models.Canvass.findOne({ id: canvassId });

      const category = await models.Category.findOne({id: category_id });
      const creator = await models.User.findOne({ id: creator_id });

      options = options.map( async ({id, text, voter_ids}) => {
        const voters = await voter_ids.map((voter_id) => models.User.findOne({ id: voter_id }));
        return { id, text, voters }
      });

      const comments = comment_ids.map( async (comment_id) => {
        const {
          id,
          text,
          created_at,
          creator_id,
          reply_ids
        } = await models.Comment.findOne({ id: comment_id });

        const creator = await models.User.findOne({ id: creator_id});

        const replies = reply_ids.map((reply_id) => models.Comment.findOne({ id: reply_id}));

        return { id, text, created_at, creator, replies }
      });

      return { id, title, options, comments, category, creator };
    }
  },
  Mutation: {

    createCanvass: async (parent, {title, categoryId, canvassOptions}, { models, user }) => {
      try {
        const id = uuid();
        const creator = await models.User.findOne({ id: user.id });
        const options = canvassOptions.map((text) => ({ text, id: uuid(),  voter_ids: [] }));

        const category = await models.Category.findOneAndUpdate({ id: categoryId }, {
          $push: { canvass_ids: id }
        });

        const canvass = await models.Canvass.create({
          id,
          title,
          options,
          creator_id: creator.id,
          category_id: category.id ,
        });

        return {
          ok: true,
          canvass
        };

      } catch (error) {

        console.log(error);

        return {
          ok: false,
          errors: error.toString()
        }
      }
    },

    vote: async (parent, { canvassId, optionId }, { models, user }) => {
      try {
        const { id } = await models.User.findOne({ id: user.id });
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

        return {
          ok: true,
          options: canvass.options
        };

      } catch (err) {
        console.log(err);
        return {
          ok: false
        };
      }
    }
  }
}

