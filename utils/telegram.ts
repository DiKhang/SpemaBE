/** @format */
const TelegramBot = require("node-telegram-bot-api");

const token = "5151119789:AAFSQUrqQV-k38s9UAoLNGiybDpB560-8jw";

const bot = new TelegramBot(token, { polling: true });

const chatID = -630195107;

const botNotifi = (mess: string) => {
	bot.sendMessage(chatID, mess);
};

export { botNotifi };
