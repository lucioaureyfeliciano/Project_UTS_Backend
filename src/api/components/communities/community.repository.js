const Community = require('../../../models/community');

const findAll = (filter = {}) => {
  return Community.find(filter)
    .populate('creator', 'username name profilePicture')
    .sort({ createdAt: -1 });
};

const findById = (id) => {
  return Community.findById(id)
    .populate('creator', 'username name profilePicture')
    .populate('members', 'username name profilePicture')
    .populate('moderators', 'username name profilePicture');
};

const findByName = (name) => {
  return Community.findOne({ name });
};

const create = (data) => {
  return Community.create(data);
};

const findByIdAndUpdate = (id, update, options = { new: true }) => {
  return Community.findByIdAndUpdate(id, update, options);
};

const countDocuments = (filter = {}) => {
  return Community.countDocuments(filter);
};

module.exports = {
  findAll,
  findById,
  findByName,
  create,
  findByIdAndUpdate,
  countDocuments,
};
