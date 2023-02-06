const { Schema, model } = require('mongoose');
const validator = require('validator');

const cardSchema = new Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: 'name не может быть пустым',
  },
  link: {
    type: String,
    validate: {
      validator: (v) => validator.isURL(v),
      message: (props) => `${props.value} is not a valid url!`,
    },
    required: [true, 'Url required'],
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: 'owner обязательное поле',
  },
  likes: {
    type: [Schema.Types.ObjectId],
    ref: 'user',
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { versionKey: false });
module.exports = model('card', cardSchema);
