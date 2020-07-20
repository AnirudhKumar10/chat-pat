import Message from "../models/message";

export const addMessage = (req, res) => {
  let message = new Message({
    msg: req.body.msg,
    sender_id: req.body.sender_id,
    rcv_id: req.body.rcv_id,
  });
  message
    .save()
    .then(() => {
      res.status(200).json({ report: "Message Send" });
    })
    .catch((err) => {
      res.status(400).json({ report: "Message Failed" });
    });
};

export const getMessage = (req, res) => {
  Message.find({
    $and: [
      { sender_id: { $in: [req.body.sender_id, req.params.rcv_id] } },
      { rcv_id: { $in: [req.params.rcv_id, req.body.sender_id] } },
    ],
  })
    .then((msg) => {
      res.status(200).json({ msg: msg });
    })
    .catch((err) => {
      res.status(400).json({ err: err });
    });
};
