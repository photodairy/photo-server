const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    __v: { type: Number, select: false },
    username: { type: String, select: false  } ,
    pwd: { type: String, select: false },
    name: { type: String},
    avatar_url: { type: String },
    gender: { type: String, enum: ['male', 'female'] },
    data_of_birth: { type: Date},
    data_of_birth_ts: { type: String},
    email: { type: String },
    phoneNumber: { type: Number },
    introduction: { type: String},
    os: {type: String },
    type: {type: String, enum: ['admin','tester','user']},
    role: {type: String, enum: ['normal','profession']},
    following: {
          type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
          select: false,
        },
}, { timestamps: true })




// })
  // {
  //   locations: { type: [{ type: Schema.Types.ObjectId, ref: 'Topic' }], select: false },
  //   business: { type: Schema.Types.ObjectId, ref: 'Topic', select: false },
  //   employments: {
  //     type: [{
  //       company: { type: Schema.Types.ObjectId, ref: 'Topic' },
  //       job: { type: Schema.Types.ObjectId, ref: 'Topic' },
  //     }],
  //     select: false,
  //   },
  //   educations: {
  //     type: [{
  //       school: { type: Schema.Types.ObjectId, ref: 'Topic' },
  //       major: { type: Schema.Types.ObjectId, ref: 'Topic' },
  //       diploma: { type: Number, enum: [1, 2, 3, 4, 5] },
  //       entrance_year: { type: Number },
  //       graduation_year: { type: Number },
  //     }],
  //     select: false,
  //   },
  //   following: {
  //     type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  //     select: false,
  //   },
  //   followingTopics: {
  //     type: [{ type: Schema.Types.ObjectId, ref: 'Topic' }],
  //     select: false,
  //   },
  //   likingAnswers: {
  //     type: [{ type: Schema.Types.ObjectId, ref: 'Answer' }],
  //     select: false,
  //   },
  //   dislikingAnswers: {
  //     type: [{ type: Schema.Types.ObjectId, ref: 'Answer' }],
  //     select: false,
  //   },
  //   collectingAnswers: {
  //     type: [{ type: Schema.Types.ObjectId, ref: 'Answer' }],
  //     select: false,
  //   },
  // }, { timestamps: true })



module.exports = mongoose.model('users', userSchema);