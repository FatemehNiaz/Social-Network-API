const req = require("express/lib/request");

const { User, Thought } = require("../models");

const userController = {
  getAllUsers(req, res) {
    User.find()
      .then((users) => {
        res.json(users);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  getUserById(req, res) {
    User.findOne({
      _id: req.params.id,
    })
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: "User not found" });
        } else {
          res.json(userData);
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  createUser(req, res) {
    User.create(req.body)
      .then((userData) => {
        res.json(userData);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  updateUser(req, res) {
    //User.action().then().catch();
    User.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $set: req.body,
      },
      {
        runValidators: true,
        new: true,
      }
    )
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: "User not found" });
        } else {
          res.json(userData);
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  deleteUser(req, res) {
    User.findByIdAndDelete({
      _id: req.params.id,
    })
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: "User not found" });
        } else {
          Thought.deleteMany({
            _id: { $in: userData.thoughts },
          })
            .then(() => {
              res.json({ message: "User and associated thoughts deleted!" });
            })
            .catch((err) => {
              res.status(500).json(err);
            });
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  addFriend(req, res) {
    User.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $addToSet: {
          friends: req.params.friendsId,
        },
      },
      {
        runValidators: true,
        new: true,
      }
    )
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: "Friend not found" });
        } else {
          res.json(userData);
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  removeFriend(req, res) {
    User.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $pull: {
          friends: req.params.friendsId,
        },
      },
      {
        runValidators: true,
        new: true,
      }
    )
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: "Friend not found" });
        } else {
          res.json(userData);
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
};

module.exports = userController;
