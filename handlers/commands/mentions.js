'use strict';

// Utils
const { scheduleDeletion } = require('../../utils/tg');

// DB
const { managesGroup } = require('../../stores/group');
const { getGroupUsers } = require('../../stores/groupUsers');

const linkHandler = async ({ chat, replyWithHTML }, next) => {
	if (chat.type === 'private') {
		return next();
	}

	const group = await managesGroup({ id: chat.id });
	console.log(chat.id)
	var myString = chat.id;
	var myNewString = Remove(myString.toString(),0,4)
	console.log(parseInt(myNewString))
	let users = await getGroupUsers(parseInt(myNewString));
	users = chunk(users, 5);
	for (const i in users) {
		setTimeout(()=>{
			let localD = '';
			for (const j in users[i]) {
				const val = users[i][j];
				// eslint-disable-next-line max-len
				localD += '<a href="tg://user?id=' + val.id + '">' + val.name + '</a>\n';
			}
			replyWithHTML(localD).then(scheduleDeletion());
		},3000);
	}
	return replyWithHTML('Finish Mention').then(scheduleDeletion());
};


module.exports = linkHandler;

// eslint-disable-next-line no-unused-vars
function chunk(arr, n) {
	return arr.slice(0, (arr.length + n - 1) / n | 0)
		.map((c, i) => arr.slice(n * i, n * i + n));
}

// eslint-disable-next-line no-unused-vars
function Remove(str, startIndex, count) {
	return str.substr(0, startIndex) + str.substr(startIndex + count);
}
