const Message = require('./messageModel');

const messageController = {};

messageController.getMessages = async (req, res, next) => {
    try {
        const messages = await Message.find({});
        res.locals = { messages };
        return next();
    } catch (err) {
        return next({
            log: `messageController.getMessages err: ${err}`,
            message: {
                err: 'Error occurred in message.Controller.getMessages',
            }
        })
    }
};

messageController.postMessage = async (req, res, next) => {
  try {
    const { user, message } = req.body;
    const newMessage = await Message.create({ user, message });
    res.locals = { newMessage };
    return next();
  } catch (err) {
    return next({
      log: `messageController.postMessage err: ${err}`,
      message: {
          err: 'Error occurred in message.Controller.postMessage',
      }
    })
  }
};

module.exports = messageController;