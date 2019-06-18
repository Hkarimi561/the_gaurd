'use strict';

const fs = require('fs');

const rawdata = fs.readFileSync('avalon.json');
const students = JSON.parse(rawdata);
const { addGroupUsers } = require('./stores/groupUsers');
for (const i in students) {
	// eslint-disable-next-line vars-on-top
	const val = students[i];
	// eslint-disable-next-line max-len
	// console.log(val['user id'],val.name, val.username !== '' ? val.username : 'NULLLLL', val['group id']);
	const data = {
		id: val['user_id'],
		name: val.name,
		username: val.username !== '' ? val.username : 'NULLLLL',
		group_id: val['group_id']
	};
	// eslint-disable-next-line max-len
	addGroupUsers(data);
}
