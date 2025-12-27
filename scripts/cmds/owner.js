const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
	config: {
		name: "owner",
		author: "ShAn",
		role: 0,
		shortDescription: " ",
		longDescription: "",
		category: "admin",
		guide: "{pn}"
	},

	onStart: async function ({ api, event }) {
		try {
			const ownerInfo = {
				name: '𝗝𝗶𝗵𝗮𝗱 𝗦𝗵𝗲𝗶𝗸𝗵',
				gender: '𝗠𝗮𝗹𝗲',
				Birthday: '𝟬𝟮-𝟬𝟰-𝟮𝟬𝟬𝟱',
				religion: '𝗜𝘀𝗹𝗮𝗺',
				hobby: '𝗠𝗲𝘆𝗲 𝗣𝗼𝘁𝗮𝗻𝗼𝗼',
				Fb: 'https://www.facebook.com/MUHAMMAD.J1HAD',
				Relationship: '𝗦𝗶𝗻𝗴𝗹𝗲𝗲𝗲𝗵',
				Height: '𝟓"𝟖''
			};

			const bold = 'https://i.imgur.com/0RuZ9LK.jpeg';
			const tmpFolderPath = path.join(__dirname, 'tmp');

			if (!fs.existsSync(tmpFolderPath)) {
				fs.mkdirSync(tmpFolderPath);
			}

			const videoResponse = await axios.get(bold, { responseType: 'arraybuffer' });
			const videoPath = path.join(tmpFolderPath, 'owner_video.mp4');

			fs.writeFileSync(videoPath, Buffer.from(videoResponse.data, 'binary'));

			const response = `
◈ 𝖮𝖶𝖭𝖤𝖱 𝖨𝖭𝖥𝖮𝖱𝖬𝖠𝖳𝖨𝖮𝖭:\n
 ~Name: ${ownerInfo.name}
 ~Gender: ${ownerInfo.gender}
 ~Birthday: ${ownerInfo.Birthday}
 ~Religion: ${ownerInfo.religion}
 ~Relationship: ${ownerInfo.Relationship}
 ~Hobby: ${ownerInfo.hobby}
 ~Fb: ${ownerInfo.Fb}
 ~Height: ${ownerInfo.Height}
			`;

			await api.sendMessage({
				body: response,
				attachment: fs.createReadStream(videoPath)
			}, event.threadID, event.messageID);
			
			fs.unlinkSync(videoPath);

			api.setMessageReaction('😍', event.messageID, (err) => {}, true);
		} catch (error) {
			console.error('Error in ownerinfo command:', error);
			return api.sendMessage('An error occurred while processing the command.', event.threadID);
		}
	},

	onChat: async function ({ api, event }) {
		if (event.body && event.body.toLowerCase() === "owner") {
			this.onStart({ api, event });
		}
	}
};
