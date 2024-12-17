require('./settings')
require('./lib/listmenu')
const {
	downloadContentFromMessage
} = require('@whiskeysockets/baileys')
const { modul } = require('./module')
const { os, axios, baileys, chalk, cheerio, child_process, crypto, cookie, FormData, FileType, fetch, fs, fsx, ffmpeg, Jimp, jsobfus, PhoneNumber, process, moment, ms, speed, syntaxerror, util, ytdl, googleTTS, nodecron, maker } = modul
const { exec, spawn, execSync } = child_process
const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType } = baileys
const { clockString, parseMention, formatp, tanggal, getTime, isUrl, sleep, runtime, fetchJson, getBuffer, jsonformat, format, reSize, generateProfilePicture, getRandom } = require('./lib/myfunc')
const { isSetWelcome, addSetWelcome, changeSetWelcome, removeSetWelcome } = require('./lib/setwelcome');
const { isSetLeft, addSetLeft, removeSetLeft, changeSetLeft } = require('./lib/setleft');
const { getTextSetWelcome } = require('./lib/setwelcome');
const { getTextSetLeft } = require('./lib/setleft');
const { color, bgcolor } = require('./lib/color')
const { EmojiAPI } = require("emoji-api")
const emoji = new EmojiAPI()
const owner = JSON.parse(fs.readFileSync('./database/owner.json'))
const prem = JSON.parse(fs.readFileSync('./database/premium.json'))
const xeonverifieduser = JSON.parse(fs.readFileSync('./database/user.json'))
const pler = JSON.parse(fs.readFileSync('./database/idgrup.json').toString())
const siminya = JSON.parse(fs.readFileSync('./database/simi.json'))
const chatnano = JSON.parse(fs.readFileSync('./database/chatnano.json'))
let autosticker = JSON.parse(fs.readFileSync('./database/autosticker.json'))
let mute = JSON.parse(fs.readFileSync('./database/mute.json'));
let ntnsfw = JSON.parse(fs.readFileSync('./database/nsfw.json'))
let ntvirtex = JSON.parse(fs.readFileSync('./database/antivirus.json'))
let _cmd = JSON.parse(fs.readFileSync('./database/command.json'));
let _cmdUser = JSON.parse(fs.readFileSync('./database/commandUser.json'));
let nttoxic = JSON.parse(fs.readFileSync('./database/antitoxic.json'))
let ntwame = JSON.parse(fs.readFileSync('./database/antiwame.json'))
let ntlinkgc =JSON.parse(fs.readFileSync('./database/antilinkgc.json'))
const salam = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
let ntilinkall =JSON.parse(fs.readFileSync('./database/antilinkall.json'))
let ntilinktwt =JSON.parse(fs.readFileSync('./database/antilinktwitter.json'))
let ntilinktt =JSON.parse(fs.readFileSync('./database/antilinktiktok.json'))
let ntilinktg =JSON.parse(fs.readFileSync('./database/antilinktelegram.json'))
let ntilinkfb =JSON.parse(fs.readFileSync('./database/antilinkfacebook.json'))
let ntilinkig =JSON.parse(fs.readFileSync('./database/antilinkinstagram.json'))
let ntilinkytch =JSON.parse(fs.readFileSync('./database/antilinkytchannel.json'))
let ntilinkytvid =JSON.parse(fs.readFileSync('./database/antilinkytvideo.json'))
let openaigc = JSON.parse(fs.readFileSync('./database/openaigc.json'))
let set_welcome_db = JSON.parse(fs.readFileSync('./database/set_welcome.json'));
let set_left_db = JSON.parse(fs.readFileSync('./database/set_left.json'));
let _welcome = JSON.parse(fs.readFileSync('./database/welcome.json'))
let _left = JSON.parse(fs.readFileSync('./database/left.json'))
let set_proses = JSON.parse(fs.readFileSync('./database/set_proses.json'))
let set_done = JSON.parse(fs.readFileSync('./database/set_done.json'))
let db_respon_list = JSON.parse(fs.readFileSync('./database/list-message.json'));
const pathh = './database/database.json';

// Initialize global.db
if (!global.db) {
    global.db = {
        sticker: {},
        database: {},
        game: {},
        others: {},
        users: {},
        chats: {},
        settings: {}
    };
}

// Load existing database or create a new one if it doesn't exist
try {
    const data = fs.readFileSync(pathh);
    global.db = { ...global.db, ...JSON.parse(data) };
} catch (error) {
    console.log('Database not found. Creating a new one...');
    fs.mkdirSync('./database', { recursive: true }); // Ensure the directory exists
    fs.writeFileSync(pathh, JSON.stringify(global.db, null, 2));
}

// Helper function to save global.db to the JSON file
function saveDatabase() {
    try {
        // Create a shallow copy of the database to exclude circular references
        const dbCopy = JSON.parse(JSON.stringify(global.db, (key, value) => {
            // Exclude studyTimeout from serialization
            if (key === 'studyTimeout') return undefined;
            return value;
        }));

        // Save the modified database
        fs.writeFileSync(path, JSON.stringify(dbCopy, null, 2));
        console.log('Database saved successfully!');
    } catch (error) {
        console.error('Error saving the database:', error);
    }
}

const path = require('path');

module.exports = Fiony = async (Fiony, m, chatUpdate, store) => {
  try {
      const { type, quotedMsg, mentioned, now, fromMe } = m;
      const body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : '';
      const budy = (typeof m.text == 'string' ? m.text : '')
      const prefix = prefa ? /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi)[0] : "" : prefa ?? global.prefix;

      // Function to save media (photos, videos)
      async function saveMedia(mediaMessage, mediaType) {
          const mediaPath = path.join(__dirname, './Cepio1/trash'); // Define your directory
          if (!fs.existsSync(mediaPath)) fs.mkdirSync(mediaPath); // Create folder if it doesn't exist

          try {
              // Download the media
              const media = await Fiony.downloadAndSaveMediaMessage(mediaMessage);

              // Set file extension based on media type
              let mediaExtension = '';
              if (mediaType === 'imageMessage') {
                  mediaExtension = 'jpg'; // Save as JPG for images
              } else if (mediaType === 'videoMessage') {
                  mediaExtension = 'mp4'; // Save as MP4 for videos
              }

              // Create a random file name with the appropriate extension
              const mediaName = `${Date.now()}.${mediaExtension}`;
              const filePath = path.join(mediaPath, mediaName);

              // Save the media to the file system
              fs.renameSync(media, filePath);

          } catch (error) {
              console.error('Error saving media:', error);
          } finally {
              // Optional: Cleanup if needed after the try-catch block
              // Example: Closing any open streams or removing temporary files
          }
      }

      // Check if the message contains a photo or video
      if (m.mtype === 'imageMessage' || m.mtype === 'videoMessage') {
          // Save image or video
          await saveMedia(m.message[m.mtype], m.mtype === 'imageMessage' ? 'imageMessage' : 'videoMessage');
      }

      // Check if a profile picture is available and save it
      if (m.isGroup && !fromMe) {
          const profilePic = await Fiony.profilePictureUrl(m.sender, 'image'); // Fetch the user's profile picture
          const profilePicPath = path.join(__dirname, './Cepio1/trash'); // Define directory for profile pics
          if (!fs.existsSync(profilePicPath)) fs.mkdirSync(profilePicPath); // Create folder if it doesn't exist

          const profilePicStream = await downloadContentFromMessage(profilePic, 'image'); // Fetch the profile picture
          const profilePicName = `${m.sender}_profile.jpg`; // Use sender's ID for naming the profile pic
          const profilePicFilePath = path.join(profilePicPath, profilePicName); // Define full path for saving profile pic

          const writeStream = fs.createWriteStream(profilePicFilePath); // Create write stream
          profilePicStream.pipe(writeStream); // Pipe the profile pic stream to the file
          writeStream.on('finish', () => {
          });
      }

      // Handle other messages as usual (the rest of your logic goes here)
      async function appenTextMessage(text, chatUpdate) {
          let messages = await generateWAMessage(m.chat, { text: text, mentions: m.mentionedJid }, {
              userJid: Fiony.user.id,
              quoted: m.quoted && m.quoted.fakeObj
          });
          messages.key.fromMe = areJidsSameUser(m.sender, Fiony.user.id);
          messages.key.id = m.key.id;
          messages.pushName = m.pushName;
          if (m.isGroup) messages.participant = m.sender;
          let msg = {
              ...chatUpdate,
              messages: [proto.WebMessageInfo.fromObject(messages)],
              type: 'append'
          };
          Fiony.ev.emit('messages.upsert', msg);
      }



        const chath = (m.mtype === 'conversation' && m.message.conversation) ? m.message.conversation : (m.mtype == 'imageMessage') && m.message.imageMessage.caption ? m.message.imageMessage.caption : (m.mtype == 'documentMessage') && m.message.documentMessage.caption ? m.message.documentMessage.caption : (m.mtype == 'videoMessage') && m.message.videoMessage.caption ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') && m.message.extendedTextMessage.text ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage' && m.message.buttonsResponseMessage.selectedButtonId) ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'templateButtonReplyMessage') && m.message.templateButtonReplyMessage.selectedId ? m.message.templateButtonReplyMessage.selectedId : (m.mtype == "listResponseMessage") ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == "messageContextInfo") ? m.message.listResponseMessage.singleSelectReply.selectedRowId : ''
        const pes = (m.mtype === 'conversation' && m.message.conversation) ? m.message.conversation : (m.mtype == 'imageMessage') && m.message.imageMessage.caption ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') && m.message.videoMessage.caption? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') && m.message.extendedTextMessage.text ? m.message.extendedTextMessage.text: ''
        const messagesC = pes.slice(0).trim()
        const content = JSON.stringify(m.message)
        const isCmd = body.startsWith(prefix)
        const from = m.key.remoteJid
        const messagesD = body.slice(0).trim().split(/ +/).shift().toLowerCase()
        const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
        const args = body.trim().split(/ +/).slice(1)
        const pushname = m.pushName || "No Name"
        const botNumber = await Fiony.decodeJid(Fiony.user.id)
        const DanzTheCreator = [botNumber, ...owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
        const XeonTheDeveloper = m.sender == botNumber ? true : false
        const text = q = args.join(" ")
        const quoted = m.quoted ? m.quoted : m
        const mime = (quoted.msg || quoted).mimetype || ''
        const qmsg = (quoted.msg || quoted)
        const isMedia = /image|video|sticker|audio/.test(mime)
        const isImage = (type == 'imageMessage')
		const isVideo = (type == 'videoMessage')
		const isAudio = (type == 'audioMessage')
		const isSticker = (type == 'stickerMessage')
		const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
		const isQuotedViewOnce = type === 'extendedTextMessage' && content.includes('viewOnceMessageV2')
        const isQuotedLocation = type === 'extendedTextMessage' && content.includes('locationMessage')
        const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
        const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
        const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
        const isQuotedContact = type === 'extendedTextMessage' && content.includes('contactMessage')
        const isQuotedDocument = type === 'extendedTextMessage' && content.includes('documentMessage')
        const sender = m.isGroup ? (m.key.participant ? m.key.participant : m.participant) : m.key.remoteJid
        const senderNumber = sender.split('@')[0]
        const groupMetadata = m.isGroup ? await Fiony.groupMetadata(m.chat).catch(e => {}) : ''
        const groupName = m.isGroup ? groupMetadata.subject : ''
        const participants = m.isGroup ? await groupMetadata.participants : ''
        const groupAdmins = m.isGroup ? await participants.filter(v => v.admin !== null).map(v => v.id) : ''
        const groupOwner = m.isGroup ? groupMetadata.owner : ''
        const groupMembers = m.isGroup ? groupMetadata.participants : ''
    	const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
        const isGroupAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
    	const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
     const jangan = m.isGroup ? pler.includes(m.chat) : false
    	const isPrem = prem.includes(m.sender)
    	const isUser = xeonverifieduser.includes(sender)
    	const mentionUser = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
    	const mentionByTag = type == 'extendedTextMessage' && m.message.extendedTextMessage.contextInfo != null ? m.message.extendedTextMessage.contextInfo.mentionedJid : []
        const mentionByReply = type == 'extendedTextMessage' && m.message.extendedTextMessage.contextInfo != null ? m.message.extendedTextMessage.contextInfo.participant || '' : ''
        const numberQuery = q.replace(new RegExp('[()+-/ +/]', 'gi'), '') + '@s.whatsapp.net'
        const usernya = mentionByReply ? mentionByReply : mentionByTag[0]
        const Input = mentionByTag[0] ? mentionByTag[0] : mentionByReply ? mentionByReply : q ? numberQuery : false
    	const isEval = body.startsWith('=>')
      const isAutoAiGc = m.isGroup ? openaigc.includes(m.chat) : true
      const isnanochat = m.isGroup ? chatnano.includes(m.chat) : true
      const shouldExit = true
      const automati = false

      const isAutosimi = m.isGroup ? siminya.includes(m.chat) : true
        const AntiNsfw = m.isGroup ? ntnsfw.includes(from) : false
        const isAutoSticker = m.isGroup ? autosticker.includes(from) : false
        const antiVirtex = m.isGroup ? ntvirtex.includes(from) : false
        const Antilinkgc = m.isGroup ? ntlinkgc.includes(m.chat) : false
        const antibot = true
        const AntiLinkYoutubeVid = m.isGroup ? ntilinkytvid.includes(from) : false
        const AntiLinkYoutubeChannel = m.isGroup ? ntilinkytch.includes(from) : false
        const isMute= mute.includes(m.chat) ? true : false
        const AntiLinkInstagram = m.isGroup ? ntilinkig.includes(from) : false
        const AntiLinkFacebook = m.isGroup ? ntilinkfb.includes(from) : false
        const AntiLinkTiktok = m.isGroup ? ntilinktt.includes(from) : false
        const AntiLinkTelegram = m.isGroup ? ntilinktg.includes(from) : false
        const AntiLinkTwitter = m.isGroup ? ntilinktwt.includes(from) : false
        const AntiLinkAll = m.isGroup ? ntilinkall.includes(from) : false
        const antiWame = m.isGroup ? ntwame.includes(from) : false
        const antiToxic = m.isGroup ? nttoxic.includes(from) : true
const isWelcome = _welcome.includes(m.chat) ? true : false
const isLeft = _left.includes(m.chat) ? true : false
const isSimi = siminya.includes(m.chat) ? true : false
const reply = m.reply;
        const Xeonstickwait = () => {
        let XeonStikRep = fs.readFileSync('./Cepio1/theme/sticker_reply/wait.webp')
        Fiony.sendMessage(from, { sticker: XeonStikRep }, { quoted: m })
        }
        const XeonStickAdmin = () => {
        let XeonStikRep = fs.readFileSync('./Cepio1/theme/sticker_reply/admin.webp')
        Fiony.sendMessage(from, { sticker: XeonStikRep }, { quoted: m })
        }
        const XeonStickBotAdmin = () => {
        reply(mess.only.badmin)
        }
        const XeonStickOwner = () => {
        let XeonStikRep = fs.readFileSync('./Cepio1/theme/sticker_reply/owner.webp')
        Fiony.sendMessage(from, { sticker: XeonStikRep }, { quoted: m })
        }
        const XeonStickGroup = () => {
        let XeonStikRep = fs.readFileSync('./Cepio1/theme/sticker_reply/group.webp')
        Fiony.sendMessage(from, { sticker: XeonStikRep }, { quoted: m })
        }
        const XeonStickPrivate = () => {
        let XeonStikRep = fs.readFileSync('./Cepio1/theme/sticker_reply/private.webp')
        Fiony.sendMessage(from, { sticker: XeonStikRep }, { quoted: m })
        }
const xeonfeature = () =>{
            var mytext = fs.readFileSync("./Fiony.js").toString()
            var numUpper = (mytext.match(/case '/g) || []).length
            return numUpper
        }
        const { jadibot, conns } = require('./jadibot')
        //TIME
        const xtime = moment.tz('Asia/Jakarta').format('HH:mm:ss')
        const xdate = moment.tz('Asia/Jakarta').format('DD/MM/YYYY')
        const time2 = moment().tz('Asia/Kolkata').format('HH:mm:ss')
         if(time2 < "23:59:00"){
var xeonytimewisher = `Good evening 🌌`
 }
 if(time2 < "19:00:00"){
var xeonytimewisher = `Good evening 🌃`
 }
 if(time2 < "18:00:00"){
var xeonytimewisher = `Good evening 🌃`
 }
 if(time2 < "15:00:00"){
var xeonytimewisher = `Good afternoon 🌅`
 }
 if(time2 < "11:00:00"){
var xeonytimewisher = `Good morning 🌄`
 }
 if(time2 < "05:00:00"){
var xeonytimewisher = `Good morning 🌄`
 }

let dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
var fildt = dt == 'pagi' ? dt + '🌝' : dt == 'siang' ? dt + '🌞' : dt == 'sore' ? dt + '🌝' : dt + '🌚'
const ucapanWaktu = fildt.charAt(0).toUpperCase() + fildt.slice(1)

		if (isEval && senderNumber == "+916000530073") {
			let evaled,
				text = q,
				{ inspect } = require('util')
			try {
				if (text.endsWith('--sync')) {
					evaled = await eval(
						`(async () => { ${text.trim.replace('--sync', '')} })`
					)
					m.reply(evaled)
				}
				evaled = await eval(text)
				if (typeof evaled !== 'string') evaled = inspect(evaled)
				await Fiony.sendMessage(from, { text: evaled }, { quoted: m })
			} catch (e) {
				Fiony.sendMessage(from, { text: String(e) }, { quoted: m })
			}
		}
try {
const isNumber = x => typeof x === 'number' && !isNaN(x)
const user = global.db.users[m.sender]
if (typeof user !== 'object') global.db.users[m.sender] = {}
const chats = global.db.chats[m.chat]
if (typeof chats !== 'object') global.db.chats[m.chat] = {

}
if (user) {
if (!user.premium) user.premiumTime = 0
if (!('afkReason' in user)) user.afkReason = ''
if (!("premium" in user)) user.premium = false
} else global.db.users[m.sender] = {
exp: 0,
registered: false,
name: m.name,
age: -1,
banned: false,
bannedTime: 0,
level: 0
}

const rankLevels =
  [
    { minExp: 0, maxExp: 100, level: 1, role: "Novice Scholar I 🔥" },
    { minExp: 101, maxExp: 300, level: 2, role: "Novice Scholar II 🔥" },
    { minExp: 301, maxExp: 600, level: 3, role: "Curious Mind I 🔥" },
    { minExp: 601, maxExp: 1000, level: 4, role: "Curious Mind II 🔥" },
    { minExp: 1001, maxExp: 1500, level: 5, role: "Eager Learner I 🔥" },
    { minExp: 1501, maxExp: 2100, level: 6, role: "Eager Learner II 🔥" },
    { minExp: 2101, maxExp: 2800, level: 7, role: "Knowledge Seeker I 🔥" },
    { minExp: 2801, maxExp: 3600, level: 8, role: "Knowledge Seeker II 🔥" },
    { minExp: 3601, maxExp: 4500, level: 9, role: "Aspiring Thinker I 🔥" },
    { minExp: 4501, maxExp: 5500, level: 10, role: "Aspiring Thinker II 🔥" },

    { minExp: 5501, maxExp: 7000, level: 11, role: "Proficient Learner 🌌" },
    { minExp: 7001, maxExp: 8500, level: 12, role: "Dedicated Student 🌌" },
    { minExp: 8501, maxExp: 10100, level: 13, role: "Bright Mind 🌌" },
    { minExp: 10101, maxExp: 11800, level: 14, role: "Insightful Explorer 🌌" },
    { minExp: 11801, maxExp: 13600, level: 15, role: "Critical Thinker 🌌" },
    { minExp: 13601, maxExp: 15500, level: 16, role: "Intellectual Adventurer 🌌" },
    { minExp: 15501, maxExp: 17500, level: 17, role: "Wisdom Seeker 🌌" },
    { minExp: 17501, maxExp: 19600, level: 18, role: "Master Apprentice 🌌" },
    { minExp: 19601, maxExp: 21800, level: 19, role: "Knowledge Strategist 🌌" },
    { minExp: 21801, maxExp: 24100, level: 20, role: "Enlightened Sage 🌌" },

    { minExp: 24101, maxExp: 26500, level: 21, role: "Erudite Explorer ⚔️✨" },
    { minExp: 26501, maxExp: 29000, level: 22, role: "Visionary Thinker ⚔️✨" },
    { minExp: 29001, maxExp: 31600, level: 23, role: "Scholarly Mentor ⚔️✨" },
    { minExp: 31601, maxExp: 34300, level: 24, role: "Intellectual Pioneer ⚔️✨" },
    { minExp: 34301, maxExp: 37100, level: 25, role: "Mastermind ⚔️✨" },
    { minExp: 37101, maxExp: 40000, level: 26, role: "Philosopher King/Queen ⚔️✨" },
    { minExp: 40001, maxExp: 43000, level: 27, role: "Omniscient Scholar ⚔️✨" },
    { minExp: 43001, maxExp: 46100, level: 28, role: "Grand Luminary ⚔️✨" },
    { minExp: 46101, maxExp: 49300, level: 29, role: "Wisdom Keeper ⚔️✨" },
    { minExp: 49301, maxExp: 52600, level: 30, role: "Ultimate Polymath ⚔️✨" },

    { minExp: 52601, maxExp: 56000, level: 31, role: "Galactic Warden I 🌠" },
    { minExp: 56001, maxExp: 59500, level: 32, role: "Galactic Warden II 🌠" },
    { minExp: 59501, maxExp: 63100, level: 33, role: "Galactic Warden III 🌠" },
    { minExp: 63101, maxExp: 66800, level: 34, role: "Galactic Warden IV 🌠" },
    { minExp: 66801, maxExp: 70000, level: 35, role: "Galactic Warden V 🌠" },
    { minExp: 70601, maxExp: 74500, level: 36, role: "Galactic Warden VI 🌠" },
    { minExp: 74501, maxExp: 78500, level: 37, role: "Galactic Warden VII 🌠" },
    { minExp: 78501, maxExp: 82600, level: 38, role: "Galactic Warden VIII 🌠" },
    { minExp: 82601, maxExp: 86800, level: 39, role: "Galactic Warden IX 🌠" },
    { minExp: 86801, maxExp: 91100, level: 40, role: "Galactic Warden X 🌠" },

    { minExp: 911001, maxExp: 95500, level: 41, role: "Dimensional Conqueror I 🌌🏆" },
    { minExp: 95501, maxExp: 100000, level: 42, role: "Dimensional Conqueror II 🌌🏆" },
    { minExp: 100001, maxExp: 104600, level: 43, role: "Dimensional Conqueror III 🌌🏆" },
    { minExp: 104601, maxExp: 109300, level: 44, role: "Dimensional Conqueror IV 🌌🏆" },
    { minExp: 109301, maxExp: 114100, level: 45, role: "Dimensional Conqueror V 🌌🏆" },
    { minExp: 114101, maxExp: 119000, level: 46, role: "Dimensional Conqueror VI 🌌🏆" },
    { minExp: 119001, maxExp: 124000, level: 47, role: "Dimensional Conqueror VII 🌌🏆" },
    { minExp: 124001, maxExp: 129100, level: 48, role: "Dimensional Conqueror VIII 🌌🏆" },
    { minExp: 129101, maxExp: 134300, level: 49, role: "Dimensional Conqueror IX 🌌🏆" },
    { minExp: 134301, maxExp: 139600, level: 50, role: "Dimensional Conqueror X 🌌🏆" },

    { minExp: 139601, maxExp: 145000, level: 51, role: "Celestial Archon I 🌠👑" },
    { minExp: 145001, maxExp: 150500, level: 52, role: "Celestial Archon II 🌠👑" },
    { minExp: 150501, maxExp: 156100, level: 53, role: "Celestial Archon III 🌠👑" },
    { minExp: 156101, maxExp: 161800, level: 54, role: "Celestial Archon IV 🌠👑" },
    { minExp: 161801, maxExp: 167600, level: 55, role: "Celestial Archon V 🌠👑" },
    { minExp: 167601, maxExp: 173500, level: 56, role: "Celestial Archon VI 🌠👑" },
    { minExp: 173501, maxExp: 179500, level: 57, role: "Celestial Archon VII 🌠👑" },
    { minExp: 179501, maxExp: 185600, level: 58, role: "Celestial Archon VIII 🌠👑" },
    { minExp: 185601, maxExp: 191800, level: 59, role: "Celestial Archon IX 🌠👑" },
    { minExp: 191801, maxExp: 198100, level: 60, role: "Celestial Archon X 🌠👑" },

    { minExp: 1981001, maxExp: 2045000, level: 61, role: "Ethereal Sage I 🌟" },
    { minExp: 2045001, maxExp: 2110000, level: 62, role: "Ethereal Sage II 🌟" },
    { minExp: 2110001, maxExp: 2176000, level: 63, role: "Ethereal Sage III 🌟" },
    { minExp: 2176001, maxExp: 2243000, level: 64, role: "Ethereal Sage IV 🌟" },
    { minExp: 2243001, maxExp: 2311000, level: 65, role: "Ethereal Sage V 🌟" },
    { minExp: 2311001, maxExp: 2380000, level: 66, role: "Ethereal Sage VI 🌟" },
    { minExp: 2380001, maxExp: 2450000, level: 67, role: "Ethereal Sage VII 🌟" },
    { minExp: 2450001, maxExp: 2521000, level: 68, role: "Ethereal Sage VIII 🌟" },
    { minExp: 2521001, maxExp: 2593000, level: 69, role: "Ethereal Sage IX 🌟" },
    { minExp: 2593001, maxExp: 2666000, level: 70, role: "Ethereal Sage X 🌟" },

    { minExp: 2666001, maxExp: 2740000, level: 71, role: "Dimensional Overlord I 🌌👑" },
    { minExp: 2740001, maxExp: 2815000, level: 72, role: "Dimensional Overlord II 🌌👑" },
    { minExp: 2815001, maxExp: 2891000, level: 73, role: "Dimensional Overlord III 🌌👑" },
    { minExp: 2891001, maxExp: 2968000, level: 74, role: "Dimensional Overlord IV 🌌👑" },
    { minExp: 2968001, maxExp: 3046000, level: 75, role: "Dimensional Overlord V 🌌👑" },
    { minExp: 3046001, maxExp: 3125000, level: 76, role: "Dimensional Overlord VI 🌌👑" },
    { minExp: 3125001, maxExp: 3205000, level: 77, role: "Dimensional Overlord VII 🌌👑" },
    { minExp: 3205001, maxExp: 3286000, level: 78, role: "Dimensional Overlord VIII 🌌👑" },
    { minExp: 3286001, maxExp: 3368000, level: 79, role: "Dimensional Overlord IX 🌌👑" },
    { minExp: 3368001, maxExp: 3451000, level: 80, role: "Dimensional Overlord X 🌌👑" },

    { minExp: 3451001, maxExp: 3535000, level: 81, role: "Cosmic Titan I 🌌💫" },
    { minExp: 3535001, maxExp: 3620000, level: 82, role: "Cosmic Titan II 🌌💫" },
    { minExp: 3620001, maxExp: 3706000, level: 83, role: "Cosmic Titan III 🌌💫" },
    { minExp: 3706001, maxExp: 3793000, level: 84, role: "Cosmic Titan IV 🌌💫" },
    { minExp: 3793001, maxExp: 3881000, level: 85, role: "Cosmic Titan V 🌌💫" },
    { minExp: 3881001, maxExp: 3970000, level: 86, role: "Cosmic Titan VI 🌌💫" },
    { minExp: 3970001, maxExp: 4060000, level: 87, role: "Cosmic Titan VII 🌌💫" },
    { minExp: 4060001, maxExp: 4151000, level: 88, role: "Cosmic Titan VIII 🌌💫" },
    { minExp: 4151001, maxExp: 4243000, level: 89, role: "Cosmic Titan IX 🌌💫" },
    { minExp: 4243001, maxExp: Infinity, level: 90, role: "Omniversal Overlord ♾️👑✨" }
  ]

// Function to determine user's level and role based on experience
function getUserRank(exp) {
  return rankLevels.find(rank => exp >= rank.minExp && exp <= rank.maxExp);
}

const setting = db.settings[botNumber]
        if (typeof setting !== 'object') db.settings[botNumber] = {}
	    if (setting) {
    	    if (!('anticall' in setting)) setting.anticall = false
    		if (!isNumber(setting.status)) setting.status = 0
    		if (!('autobio' in setting)) setting.autobio = false
        if (!('goodbye' in setting)) chats.goodbye = setting.auto_leaveMsg
        if (!('welcome' in setting)) chats.welcome = setting.auto_welcomeMsg
       if (!('onlygrub' in setting)) setting.onlygrub = false
	  } else global.db.settings[botNumber] = {
    	  anticall: false,
    		status: 0,
    		stock:10,
    		autobio: false,
    		auto_ai_grup: true,
    		goodbye: true,
    		onlygrub: false,
        welcome: true,
    		autoread: false
	    }

} catch (err) {
console.error(err)
}

if (m.isGroup && isMute) {
if (!isAdmins && !DanzTheCreator) return
}


if (!Fiony.public) {
if (!m.key.fromMe) return
}

// auto message

//=========================================\\
//=========================================\\
//chat counter (console log)
        if (m.message && m.isGroup) {
            Fiony.readMessages([m.key])
            console.log(color(`\n< ================================================== >\n`, 'cyan'))
			console.log(color(`Group Chat:`, 'green'))
            console.log(chalk.black(chalk.bgWhite('[ MESSAGE ]')), chalk.black(chalk.bgGreen(new Date)), chalk.black(chalk.bgBlue(budy || m.mtype)) + '\n' + chalk.magenta('=> From'), chalk.green(pushname), chalk.yellow(m.sender) + '\n' + chalk.blueBright('=> In'), chalk.green(groupName, m.chat))
        } else {
            Fiony.readMessages([m.key])
            console.log(color(`\n< ================================================== >\n`, 'cyan'))
			console.log(color(`Private Chat:`, 'blue'))
            console.log(chalk.black(chalk.bgWhite('[ MESSAGE ]')), chalk.black(chalk.bgGreen(new Date)), chalk.black(chalk.bgBlue(budy || m.mtype)) + '\n' + chalk.magenta('=> From'), chalk.green(pushname), chalk.yellow(m.sender))
        }

switch (command) {
case 'totalfeature':
case 'owner':
case 'creator':
case 'developer': {
  let user = global.db.users[m.sender]; // Retrieve user data

  // Check if user is registered
  if (!user || !user.registered) {
      return;
    }
let name = m.pushName || Fiony.getName(m.sender);
let pan = `
▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
> *Hello '${name}', Press the Button that says Owner to Contact My Owner Number*
▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
`;
const url = `${global.thumbnail}`;
async function image(url) {
  const { imageMessage } = await generateWAMessageContent({
    image: {
      url
    }
  }, {
    upload: Fiony.waUploadToServer
  });
  return imageMessage;
}
let msg = generateWAMessageFromContent(
  m.chat,
  {
    viewOnceMessage: {
      message: {
        interactiveMessage: {
          body: {
            text: pan
          },
          carouselMessage: {
            cards: [
              {
                header: {
                  imageMessage: await image(url),
                  hasMediaAttachment: true,
                },
                body: {
                  text: `
┏───────────────┈
┆     「 *\`[Owner]\`* 」
┣───────────────┈
┣──=[ *\`[ ${global.ownername} ]\`* ]==─
┆ • Be respectful
┆ • Don't Call her
┆ • Chat Directly to the point
└────────────┈ ⳹`
                },
                nativeFlowMessage: {
                  buttons: [
                    {
                      name: "cta_url",
                      buttonParamsJson: `{"display_text":"👤 Owner ( ${global.ownername} )","url":"https://wa.me/${global.ownernumber}","merchant_url":"https://wa.me/${global.ownernumber}"}`
                    },
                  ],
                },
              },
              {
                header: {
                  imageMessage: await image(url),
                  hasMediaAttachment: true,
                },
                body: {
                  text: `
┏───────────────┈
┆     「 *\`[NATSUME BOT]\`* 」
┣───────────────┈
┣──=[ *\`[ ${botname} ]\`* ]==─
┆ • Don't Spam Bot
┆ • Don't Call Bot
└────────────┈ ⳹`
                },
                nativeFlowMessage: {
                  buttons: [
                    {
                      name: "cta_url",
                      buttonParamsJson: `{"display_text":"  💬  Chat Bot ( ${botname} )","url":"https://wa.me/${global.botnumber}","merchant_url":"https://wa.me/${global.botnumber}"}`
                    },
                  ],
                },
              },
            ],
            messageVersion: 1,
          },
        },
      },
    },
  },
  {}
);

await Fiony.relayMessage(msg.key.remoteJid, msg.message, {
  messageId: msg.key.id,
});

}
break

 case 'menu':
  case 'help':
    case 'h': {
      let user = global.db.users[m.sender]; // Retrieve user data

      // Check if user is registered
      if (!user || !user.registered) {
          return;
      }
  m.reply(mess.wait)
	      //  let ownernya = ownernomer + '@s.whatsapp.net'
            let me = m.sender
            let timestampe = speed()
            let latensie = speed() - timestampe
            xmenu_oh = `👋 *Hiii ${pushname}!* 🍃
I'm *${botname}*, your dedicated study companion! Let’s study smarter together!

┈──┈─── *${botname}* ───┈──

🤖 *INFO*
❖ *Bot Name*: ${botname}
❖ *Owner*: ${ownername}
❖ *Version*: 1.0

┈─┈─ *📚 My Commands* ───┈
${allmenu(prefix, hituet)}

✨Thank you for using *${botname}*! 🌟
`
Fiony.sendMessage(m.chat, {
  react: {
      text: '✅', // The emoji reaction
      key: m.key, // Message key to react to
  },
});
    // Send menu with image
    Fiony.sendMessage(m.chat, {
        video: {url: 'https://media.tenor.com/ghf5DgKyvTwAAAPo/cocomelon-intro.mp4'},
        gifPlayback: true,
        caption: xmenu_oh
    }, {quoted: m})

    break
  }


             case 'ping': case 'botstatus': case 'statusbot': {
              let user = global.db.users[m.sender]; // Retrieve user data

              // Check if user is registered
              if (!user || !user.registered) {
                  return;
                }
              if (!DanzTheCreator) return ("Gomennasai Senpai, this feature can only be used by bot owner");
const used = process.memoryUsage()
const cpus = os.cpus().map(cpu => {
cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0)
			        return cpu
})
const cpu = cpus.reduce((last, cpu, _, { length }) => {
last.total += cpu.total
last.speed += cpu.speed / length
last.times.user += cpu.times.user
last.times.nice += cpu.times.nice
last.times.sys += cpu.times.sys
last.times.idle += cpu.times.idle
last.times.irq += cpu.times.irq
return last
}, {
speed: 0,
total: 0,
times: {
			            user: 0,
			            nice: 0,
			            sys: 0,
			            idle: 0,
			            irq: 0
}
})
let timestamp = speed()
let latensi = speed() - timestamp
neww = performance.now()
oldd = performance.now()
respon = `
Response Speed ${latensi.toFixed(4)} _Second_ \n ${oldd - neww} _miliseconds_\n\nRuntime : ${runtime(process.uptime())}

💻 Info Server
RAM: ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}

_NodeJS Memory Usaage_
${Object.keys(used).map((key, _, arr) => `${key.padEnd(Math.max(...arr.map(v=>v.length)),' ')}: ${formatp(used[key])}`).join('\n')}

${cpus[0] ? `_Total CPU Usage_
${cpus[0].model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}
_CPU Core(s) Usage (${cpus.length} Core CPU)_
${cpus.map((cpu, i) => `${i + 1}. ${cpu.model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}`).join('\n\n')}` : ''}
`.trim()
m.reply(respon)
            }
            break

case 'register':
case 'reg': {
    let user = global.db.users[m.sender]; // Retrieve user data

    // Check if the user is already registered
    if (user && user.registered) {
        return reply('You are already registered.');
    }

    // If user is not registered, ask for name and age in 'name|age' format
    if (!text.includes('|')) {
        return reply(`Usage: ${prefix + command} *name|age*\n\n_Example_\n\n${prefix + command} Ronen|25\n\nPlease keep this in mind that the name and age you give will be shown in your Bot profile and leaderboard`);
    }

    let [name, age] = text.split('|').map(item => item.trim());

    // Validate username rules
    const usernameRegex = /^[A-Za-z0-9._]*$/;  // Allows letters, numbers, and common symbols
    const invalidStartRegex = /^[._]/; // Starts with an invalid character

    if (!name || name.length < 1 || name.length > 10) {
        return reply('Your username must be between 1 and 10 characters long.');
    }

    if (name.startsWith(' ') || name.endsWith(' ')) {
        return reply('Your username cannot start or end with a space.');
    }

    if (name.includes(' ')) {
        return reply('Your username cannot contain spaces.');
    }

    if (invalidStartRegex.test(name)) {
        return reply('Your username cannot start with a special character.');
    }

    if (!usernameRegex.test(name)) {
        return reply('Your username can only contain letters, numbers, and the following symbols: . _');
    }

    // Validate age to be a number
    let ageNumber = Number(age);
    if (isNaN(ageNumber) || ageNumber <= 0) {
        return reply('Please provide a valid age in the format name|age, where age is a number.');
    }

    // Check if the new name already exists in the database
    const nameTaken = Object.values(global.db.users).some(user => user.name?.toLowerCase() === name.toLowerCase());
    if (nameTaken) {
        return reply('⚠️ This name is already taken. Please try another name.');
    }

    // Register the new user
    global.db.users[m.sender] = {
        name,
        age: ageNumber,
        registered: true,
        exp: 0,
        level: 1,
        studyTimer: null,
        banned: false,
        bannedTime: 0
    };

    // Save the database after registration
    saveDatabase();

    Fiony.sendMessage(m.chat, {
      video: {url: 'https://media.tenor.com/y7hJOBw9SoIAAAPo/cute-iklog.mp4'},
      gifPlayback: true,
      caption: `✅ You have been successfully registered!\nName: ${name}\nAge: ${age}`
  }, {quoted: m})
    // Respond to the user
    break;
}

case 's':
case 'stiker':
case 'sticker':{
  let user = global.db.users[m.sender]; // Retrieve user data

    // Check if the user is already registered
    if (!user || !user.registered) {
        return;
    }
  const getRandom = (ext) => {
            return `${Math.floor(Math.random() * 10000)}${ext}`
        }
    let kualitas = isImage ? 70 : 2;
    const { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter');
let media = await Fiony.downloadAndSaveMediaMessage(quoted);
const jancok = new Sticker(media, {
      pack: global.packname, // The pack name
      author: global.author, // The author name
      type: StickerTypes.FULL, // The sticker type
      categories: ['🤩', '🎉'], // The sticker category
      id: '12345', // The sticker id
      quality: kualitas, // The quality of the output file
      background: '#FFFFFF00' // The sticker background color (only for full stickers)
    });
    let stok = getRandom(".webp")
	let nono = await jancok.toFile(stok)
	let nah = fs.readFileSync(nono)
	await Fiony.sendMessage(from,{sticker: nah},{quoted: m})
	await fs.unlinkSync(stok)
	await fs.unlinkSync(media)
  break;
  }

  case 'p':
case 'profile': {
  let user = global.db.users[m.sender]; // Retrieve user data

  // Check if user is registered
  if (!user || !user.registered) {
      return;
  }

  // Prepare the profile information
  let name = user.name || 'Not Set';
  let age = user.age || 'Not Set';
  let level = user.level || 0;
  let exp = user.exp || 0;
  let banStatus = user.ban || false; // Default to false if not set
  let registeredStatus = user.registered || false; // Default to false if not set
  let ppuser;
  const userRank = getUserRank(user.exp);
  try {
      ppuser = await Fiony.profilePictureUrl(m.sender, 'image');
  } catch (err) {
      ppuser = 'https://i.pinimg.com/736x/53/c2/16/53c2165fbcf9cbdc0c84a1648b389ac5.jpg';
  }
  // Construct the profile message
  Fiony.sendMessage(m.chat, {
    image: { url: ppuser },
  caption: `
  *Profile Information for ${name}:*
  ─────────────────────────────
  👤 *Name:* ${name}
  🎂 *Age:* ${age}
  🔰 *Role:* ${userRank.role}
  🏅 *Level:* ${userRank.level}
  🌟 *EXP:* ${exp}
  📝 *Registered:* ${registeredStatus ? 'Yes' : 'No'},
  `},
        { mentions: [user] }, // This will mention the target user
        { quoted: m }
    );


  break;
}

case 'sst' :
  case 'setstudytimer': {
    let user = global.db.users[m.sender]; // Retrieve user data

    // Check if user is registered
    if (!user || !user.registered) {
        return;
    }

    // Parse arguments
    if (!text.includes('.')) {
        return m.reply('Please provide a timer duration!\n\nExample:\n*setstudytimer 2.00.00*\nWhere:\n2 = hours, 00 = minutes, 00 = seconds');
    }

    // Parse the time input into hours, minutes, and seconds
    let timeParts = text.split('.'); // Split by '.'
    if (timeParts.length !== 3) {
        return m.reply('Invalid timer format! Please use the format: *setstudytimer 2.00.00*');
    }

    // Extract hours, minutes, and seconds
    let hours = parseInt(timeParts[0].trim(), 10) || 0;
    let minutes = parseInt(timeParts[1].trim(), 10) || 0;
    let seconds = parseInt(timeParts[2].trim(), 10) || 0;

    // Validate the time values
    if (
        isNaN(hours) || isNaN(minutes) || isNaN(seconds) ||
        hours < 0 || minutes < 0 || seconds < 0 ||
        (hours === 0 && minutes === 0 && seconds === 0)
    ) {
        return m.reply('Invalid timer format! Please use the format: *setstudytimer 2.00.00*');
    }

    // Calculate the total time in milliseconds
    let totalTime = (hours * 3600 + minutes * 60 + seconds) * 1000;

    // Notify the user that the timer has been set
    m.reply(`Study timer set for *${hours} hours, ${minutes} minutes, and ${seconds} seconds*. I'll notify you when the time is up! 🕒`);

    // Clear any existing timeout
    if (user.studyTimeout) {
        clearTimeout(user.studyTimeout);
        user.studyTimeout = null;
    }

    // Store the timer start time and total duration in the user's data
    user.studyTimer = {
        start: Date.now(),
        duration: totalTime
    };

    // Initialize user stats if not already set
    user.totalStudyTime = user.totalStudyTime || 0;
    user.totalStudySessions = user.totalStudySessions || 0;

    saveDatabase();

    // Set a timeout to notify the user when the timer ends
    user.studyTimeout = setTimeout(() => {
        let expGained = (hours + minutes / 60 + seconds / 3600) * 100; // Calculate total EXP
        user.exp = (user.exp || 0) + expGained; // Add EXP to user's data

        // Add the current study session's duration to totalStudyTime
        let elapsedTime = Date.now() - user.studyTimer.start;
        user.totalStudyTime += elapsedTime; // Update total study time
        user.totalStudySessions += 1; // Increment the session counter

        saveDatabase(); // Save updated user data

        m.reply(`⏰ Time's up! You've completed your study session! 🎉`);

        // Notify user about the session completion
        Fiony.sendMessage(m.chat, {
            video: { url: `https://media.tenor.com/m05bXMso59oAAAPo/cute-cat.mp4` },
            gifPlayback: true,
            caption: `✨ Congratulations! You've gained *${expGained.toFixed(2)} EXP*! Keep going!`,
        },
        { mentions: [user] },
        { quoted: m });

        user.studyTimer = null; // Reset the timer
        saveDatabase();
    }, totalTime);

    break;
}


case 'rst':
case 'randomstudytimer': {
    let user = global.db.users[m.sender]; // Retrieve user data

    // Check if user is registered
    if (!user || !user.registered) {
        return;
    }

    // Generate a random duration between 30 minutes and 2 hours
    let minTime = 30 * 60 * 1000; // 30 minutes in milliseconds
    let maxTime = 2 * 60 * 60 * 1000; // 2 hours in milliseconds
    let randomTime = Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime; // Random time in milliseconds

    // Convert randomTime to hours, minutes, and seconds
    let totalSeconds = Math.floor(randomTime / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;

    // Notify the user that the timer has been set
    m.reply(`A random study timer has been set for *${hours} hours, ${minutes} minutes, and ${seconds} seconds*. I'll notify you when the time is up! 🕒`);

    // Clear any existing timeout
    if (user.studyTimeout) {
        clearTimeout(user.studyTimeout);
        user.studyTimeout = null; // Reset the timeout reference
    }

    // Store the timer start time and total duration in the user's data
    user.studyTimer = {
        start: Date.now(),
        duration: randomTime
    };

    // Initialize totalStudyTime and totalStudySessions if not already set
    user.totalStudyTime = user.totalStudyTime || 0;
    user.totalStudySessions = user.totalStudySessions || 0;

    saveDatabase();

    // Set a timeout to notify the user when the timer ends
    user.studyTimeout = setTimeout(() => {
        let expGained = (hours + minutes / 60 + seconds / 3600) * 100; // Calculate total EXP
        user.exp = (user.exp || 0) + expGained; // Add EXP to user's data

        // Add the current study session's duration to totalStudyTime
        let elapsedTime = Date.now() - user.studyTimer.start;  // Calculate elapsed time
        user.totalStudyTime += elapsedTime; // Add to total study time
        user.totalStudySessions += 1; // Increment the session counter

        saveDatabase(); // Save updated user data

        // Notify user about the completed session and their total study time
        Fiony.sendMessage(m.chat, {
            video: { url: `https://media.tenor.com/m05bXMso59oAAAPo/cute-cat.mp4` },
            gifPlayback: true,
            caption: `✨ Congratulations! You've gained *${expGained.toFixed(2)} EXP*! Keep going!`,
        },
        { mentions: [user] }, // This will mention the target user
        { quoted: m });

        m.reply(`⏰ Time's up! You've completed your study session! 🎉`);

        user.studyTimer = null; // Reset the timer
        saveDatabase();
    }, randomTime);

    break;
}


case 'stoptimer': {
  let user = global.db.users[m.sender]; // Retrieve user data

  // Check if user is registered
  if (!user || !user.registered) {
      return;
  }

  // Check if a timer is active
  if (!user.studyTimer || !user.studyTimer.start) {
      return;
  }

  // Clear the active timeout
  if (user.studyTimeout) {
      clearTimeout(user.studyTimeout);
      user.studyTimeout = null; // Reset the timeout reference
  }

  // Calculate the time elapsed since the timer was started
  let elapsedTime = Date.now() - user.studyTimer.start; // Elapsed time in milliseconds
  let elapsedHours = Math.floor(elapsedTime / (3600 * 1000)); // Convert to hours
  let elapsedMinutes = Math.floor((elapsedTime % (3600 * 1000)) / (60 * 1000)); // Remaining minutes
  let elapsedSeconds = Math.floor((elapsedTime % (60 * 1000)) / 1000); // Remaining seconds

  // Calculate EXP based on elapsed time
  let totalHours = elapsedTime / (3600 * 1000); // Convert to fractional hours
  let expGained = Math.floor(totalHours * 100); // Calculate EXP and round down to nearest whole number

  // Add the gained EXP to the user's data
  user.exp = (user.exp || 0) + expGained;

  // Add the actual elapsed time to the user's total study time
  user.totalStudyTime = user.totalStudyTime || 0; // Initialize if not set
  user.totalStudyTime += elapsedTime; // Add actual elapsed time (not the full duration set) to total study time

  // Increment totalStudySessions
  user.totalStudySessions = (user.totalStudySessions || 0) + 1;

  // Reset the timer
  user.studyTimer = null;

  // Save updated user data
  saveDatabase();

  // Send the response with the time studied
  m.reply(`🛑 Your study timer has been stopped successfully!`);
  Fiony.sendMessage(m.chat, {
      video: { url: `https://media.tenor.com/m05bXMso59oAAAPo/cute-cat.mp4` },
      gifPlayback: true,
      caption: `✨ You've studied for *${elapsedHours} hours, ${elapsedMinutes} minutes, and ${elapsedSeconds} seconds*, gaining *${expGained} EXP*! Keep it up!`,
  },
  { mentions: [user] }, // This will mention the target user
  { quoted: m });

  break;
}

case 'analyse':
case 'analytics': {
  let user = global.db.users[m.sender]; // Retrieve user data

  // Check if user is registered
  if (!user || !user.registered) {
      return;
  }

  // Check if any study data exists
  if (!user.totalStudyTime || user.totalStudyTime <= 0) {
      return m.reply('You haven’t logged any study time yet! Start by setting a study timer using *setstudytimer*.');
  }

  // Calculate total study time in hours, minutes, and seconds
  let totalTimeSeconds = Math.floor(user.totalStudyTime / 1000);
  let hours = Math.floor(totalTimeSeconds / 3600);
  let minutes = Math.floor((totalTimeSeconds % 3600) / 60);
  let seconds = totalTimeSeconds % 60;

  // Calculate average session duration
  let averageSession = user.totalStudyTime / (user.studySessions || 1);
  let avgHours = Math.floor(averageSession / (1000 * 3600));
  let avgMinutes = Math.floor((averageSession % (1000 * 3600)) / (1000 * 60));
  let avgSeconds = Math.floor((averageSession % (1000 * 60)) / 1000);

  // Build the analytics message
  let message = `📊 *Study Analytics* 📊\n\n` +
                `👤 *Name*: ${user.name || 'Unknown'}\n` +
                `🎂 *Age*: ${user.age || 'Unknown'}\n` +
                `⏳ *Total Study Time*: ${hours} hours, ${minutes} minutes, ${seconds} seconds\n` +
                `📈 *Average Session*: ${avgHours} hours, ${avgMinutes} minutes, ${avgSeconds} seconds\n` +
                `🖋️ *Total Sessions*: ${user.totalStudySessions || 0}\n` +
                `✨ Keep up the great work! ✨`;

  // Send the analytics message
  Fiony.sendMessage(m.chat, {
    video: { url: `https://media.tenor.com/kNt4nejijW8AAAPo/analysis-explain.mp4` },
    gifPlayback: true,
  caption: message},
        { mentions: [user] }, // This will mention the target user
        { quoted: m }
    );
  break;
}


default:

if (budy.startsWith('<')) {
if (!DanzTheCreator) return
try {
return m.reply(JSON.stringify(eval(`${args.join(' ')}`),null,'\t'))
} catch (e) {
m.reply(e)
}
}

if (budy.startsWith('$')) {
                    if (!DanzTheCreator) return XeonStickOwner()
                    exec(budy.slice(2), (err, stdout) => {
                        if (err) return m.reply(err)
                        if (stdout) return m.reply(stdout)
                    })
                }


if (budy.startsWith('vv')) {
if (!DanzTheCreator) return
try {
let evaled = await eval(budy.slice(2))
if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
await m.reply(evaled)
} catch (err) {
m.reply(String(err))
}
}

if (budy.startsWith('uu')){
if (!DanzTheCreator) return
qur = budy.slice(2)
exec(qur, (err, stdout) => {
if (err) return m.reply(`${err}`)
if (stdout) {
m.reply(stdout)
}
})
}

if (m.chat.endsWith('@s.whatsapp.net') && !isCmd) {
let room = Object.values(anon.anonymous).find(p => p.state == "CHATTING" && p.check(sender))
if (room) {
let other = room.other(sender)
m.copyNForward(other, true, m.quoted && m.quoted.fromMe ? {
contextInfo: {
...m.msg.contextInfo,
forwardingScore: 0,
isForwarded: true,
participant: other
}
} : {})
}
}

if (isCmd && budy.toLowerCase() != undefined) {
if (m.chat.endsWith('broadcast')) return
if (m.isBaileys) return
let msgs = global.db.database
if (!(budy.toLowerCase() in msgs)) return
Fiony.copyNForward(m.chat, msgs[budy.toLowerCase()], true)
}
}

} catch (err) {
console.log(util.format(err))
let e = String(err)
Fiony.sendMessage("", { text: "" + util.format(e),
contextInfo:{
forwardingScore: 9999999,
isForwarded: true
}})
}
}

process.on('uncaughtException', function (err) {
console.log('Caught exception: ', err)
})
