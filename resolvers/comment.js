import { formatErrors } from "../utils/formatErrors"
import { requiresAuth } from "../authentication/permissions"
import uuid from 'uuid';

export default {
  Query: {
    getComments: async (parent, { canvassId }, { models }) => {
      const canvass = await models.Canvass.find({id: canvassId});

      const comments = canvass.comment_ids.map( async (comment_id) => {
        const {
          id,
          text,
          created_at,
          creator_id,
          reply_ids
        } = await models.Comment.findOne({ id: comment_id });

        const creator = await models.User.findOne({ id: creator_id});

        const replies = reply_ids.map((reply_id) => models.Comment.findOne({ id: reply_id}));

        return {
          id,
          text,
          created_at,
          creator,
          replies
        }
      })
    },
    getReplies: async (parent, { commentId }, { models }) => {
      const comment = await models.Canvass.find({ id: commentId });

      const replies = comment.reply_ids.map( async (reply_id) => {
        const {
          id,
          text,
          created_at,
          creator_id,
          reply_ids
        } = await models.Comment.findOne({ id: reply_id });

        const creator = await models.User.findOne({ id: creator_id});

        const sub_replies = reply_ids.map((reply_id) => models.Comment.findOne({ id: reply_id}));

        return {
          id,
          text,
          created_at,
          creator,
          sub_replies
        }
      })
    },
  },
  Mutation: {
    createComment: async (parent, { text, canvassId, userId}, { models, user }) => {
      try {
        const id = uuid();

        await models.Comment.create({
          id,
          text,
          creator_id: userId,
          created_at: Number(Date.now())
        });

        await models.Canvass.update({ id: canvassId }, {
          $push: {
            comment_ids: id
          }
        });

        return true;
      } catch (error) {
        console.log(error);
        return false
      }
    },

    createReply: async (parent, { text, creatorUsername, commentId }, { models, user }) => {
      try {
        const id = uuid();
        const creator = models.User.find({ username: creatorUsername });

        const comment = await models.Comment.create({
          id,
          text,
          creator_id: creator.id,
          created_at: Number(Date.now())
        });

        await models.Comment.update({ id: commentId }, {
          $push: {
            replies: comment
          }
        });

        return true;
      } catch (error) {
        console.log(error);
        return false
      }
    }
  }
}