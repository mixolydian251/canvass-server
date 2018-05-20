import mongoose from 'mongoose'
import {
  userSchema,
  optionSchema,
  canvassSchema,
  commentSchema,
  categorySchema
} from "./shema";

export default {
  Canvass:  mongoose.model('Canvass', canvassSchema),
  Category: mongoose.model('Category', categorySchema),
  Comment: mongoose.model('Comment', commentSchema),
  Option: mongoose.model('Option', optionSchema),
  User: mongoose.model('User', userSchema),
};