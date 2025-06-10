const Message = require("../models/Message");
const Conversation = require("../models/Conversation");
const User = require("../models/User");
const Recruiter = require("../models/Recruiter");

// Get or create conversation
const getOrCreateConversation = async (senderId, senderModel, receiverId, receiverModel) => {
  // Check if conversation exists
  let conversation = await Conversation.findOne({
    'participants': {
      $all: [
        { $elemMatch: { user: senderId, userModel: senderModel } },
        { $elemMatch: { user: receiverId, userModel: receiverModel } }
      ]
    }
  });

  // If not, create a new conversation
  if (!conversation) {
    conversation = await Conversation.create({
      participants: [
        { user: senderId, userModel: senderModel },
        { user: receiverId, userModel: receiverModel }
      ]
    });
  }

  return conversation;
};

// Send a message
exports.sendMessage = async (req, res) => {
  try {
    const { receiverId, content, receiverModel } = req.body;
    const senderId = req.user.id;
    const senderModel = req.user.role === 'recruiter' ? 'Recruiter' : 'User';

    // Validate receiver exists
    const ReceiverModel = receiverModel === 'Recruiter' ? Recruiter : User;
    const receiver = await ReceiverModel.findById(receiverId);
    if (!receiver) {
      return res.status(404).json({ message: "Receiver not found" });
    }

    // Get or create conversation
    const conversation = await getOrCreateConversation(senderId, senderModel, receiverId, receiverModel);

    // Create message
    const message = await Message.create({
      sender: senderId,
      senderModel,
      receiver: receiverId,
      receiverModel,
      content
    });

    // Update conversation
    conversation.lastMessage = message._id;
    conversation.updatedAt = Date.now();
    conversation.unreadCount += 1;
    await conversation.save();

    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ message: "Error sending message", error: err.message });
  }
};

// Get conversations
exports.getConversations = async (req, res) => {
  try {
    const userId = req.user.id;
    const userModel = req.user.role === 'recruiter' ? 'Recruiter' : 'User';

    const conversations = await Conversation.find({
      'participants': { $elemMatch: { user: userId, userModel } }
    })
      .populate('lastMessage')
      .sort({ updatedAt: -1 });

    // Populate other participant info
    const populatedConversations = await Promise.all(conversations.map(async (conv) => {
      const otherParticipant = conv.participants.find(
        p => p.user.toString() !== userId || p.userModel !== userModel
      );

      if (!otherParticipant) return conv;

      const OtherModel = otherParticipant.userModel === 'Recruiter' ? Recruiter : User;
      const participantInfo = await OtherModel.findById(otherParticipant.user)
        .select('fullName email profile.company');

      return {
        ...conv._doc,
        otherParticipant: participantInfo
      };
    }));

    res.json(populatedConversations);
  } catch (err) {
    res.status(500).json({ message: "Error fetching conversations", error: err.message });
  }
};

// Get messages in a conversation
exports.getMessages = async (req, res) => {
  try {
    const conversationId = req.params.conversationId;
    const userId = req.user.id;
    const userModel = req.user.role === 'recruiter' ? 'Recruiter' : 'User';

    // Verify conversation exists and user is a participant
    const conversation = await Conversation.findOne({
      _id: conversationId,
      'participants': { $elemMatch: { user: userId, userModel } }
    });

    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    // Get other participant
    const otherParticipant = conversation.participants.find(
      p => p.user.toString() !== userId || p.userModel !== userModel
    );

    // Get messages
    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: otherParticipant.user },
        { sender: otherParticipant.user, receiver: userId }
      ]
    }).sort({ createdAt: 1 });

    // Mark messages as read
    await Message.updateMany(
      { 
        receiver: userId, 
        receiverModel: userModel,
        read: false 
      },
      { read: true }
    );

    // Reset unread count
    conversation.unreadCount = 0;
    await conversation.save();

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Error fetching messages", error: err.message });
  }
};