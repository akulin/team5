const { tryAddContact } = require('./contacts');
const { tryCreateConversation, tryAddUserToConversation } = require('./conversations');

async function moveToPrivateChat(req, res, next) {
    if (!req.user) {
        return res.sendStatus(401);
    }
    if (req.user.username === req.params.username) {
        next();

        return;
    }
    await tryAddContact(req.user.username, req.params.username);
    const privateChat = {
        isPrivate: true,
        users: [req.user.username, req.params.username],
        title: 'privateDialogue'
    };
    const creationResult = await tryCreateConversation(privateChat);
    if (!creationResult.conversation) {
        return res.status(creationResult.error.status).json({ error: creationResult.error });
    }
    req.conversationId = creationResult.conversation._id;
    next();
}

module.exports.moveToPrivateChat = moveToPrivateChat;

async function moveToGroupChat(req, res, next) {
    if (!req.user) {
        return res.sendStatus(401);
    }
    const conversationId = req.params.conversationId;
    const username = req.user.username;
    const creationResult = await tryAddUserToConversation(username, conversationId);
    if (!creationResult.conversation) {
        return res.status(creationResult.error.status).json({ error: creationResult.error });
    }
    req.conversationId = creationResult.conversation._id;
    next();
}

module.exports.moveToGroupChat = moveToGroupChat;
