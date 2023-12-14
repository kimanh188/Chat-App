export function getAllMessagesController(req, res, next) {
  // Access user information from req object (req.id, req.email, req.username)

  // Retrieve all messages from database

  res.status(200).json({
    answer: {
      code: 200,
      message: "All messages",
      data: "messages data",
    },
  });
}

export function getAConversationController(req, res, next) {
  // Access user information from req object (req.id, req.email, req.username)

  // Retrieve conversation with the specified user

  res.status(200).json({
    answer: {
      code: 200,
      message: "Conversation",
      data: "conversation data",
    },
  });
}
