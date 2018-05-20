import mongoose from 'mongoose';

export const userSchema = mongoose.Schema({
  id: {
    type: String,
    default: undefined
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  category_ids: [ String ]
});

export const commentSchema = mongoose.Schema({
  id: {
    type: String,
    default: undefined
  },
  text : {
    type: String,
    required: true
  },
  creator_id: {
    type: String,
    required: true
  },
  created_at: {
    type: Number,
    required: true
  },
});
commentSchema.add({ reply_ids: [ String ] });

export const optionSchema = mongoose.Schema({
  id: {
    type: String,
    default: undefined
  },
  text: {
    type: String,
    required: true
  },
  voter_ids: [ String ]
});

export const canvassSchema = mongoose.Schema({
  id: {
    type: String,
    default: undefined
  },
  title: {
    type: String,
    required: true
  },
  category_id: {
    type: String,
    required: true
  },
  creator_id: {
    type: String,
    required: true
  },
  options: {
    type: [ optionSchema ]
  },
  comment_ids: {
    type: [ String ]
  }
});

export const categorySchema = mongoose.Schema({
  id: {
    type: String,
    default: undefined
  },
  name: {
    type: String,
    unique: true,
    required: true
  },
  canvass_ids: [ String ]
});