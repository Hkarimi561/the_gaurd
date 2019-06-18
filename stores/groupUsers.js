'use strict';

// Utils
const { logError } = require('../utils/log');

const Datastore = require('nedb-promise');
const R = require('ramda');

const GroupUsers = new Datastore({
	autoload: true,
	filename: 'data/GroupUsers.db'
});

GroupUsers.ensureIndex({
	fieldName: 'id',
	unique: true
});

// eslint-disable-next-line no-unused-vars
const getUpdatedDocument = R.prop(1);

// eslint-disable-next-line max-len
const addGroupUsers = user =>
	GroupUsers.update({ id: user.id }, user, { upsert: true });
const getGroupUsers = (group_id = '') =>
	GroupUsers.find({ group_id });

module.exports = {
	addGroupUsers,
	getGroupUsers
};
