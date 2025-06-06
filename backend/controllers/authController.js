const User = require("../models/User");
const Recruiter = require("../models/Recruiter");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/jwt");

exports.register = async (req, res) => {
  const { email, password, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  try {
    const Model = role === "recruiter" ? Recruiter : User;
    const existing = await Model.findOne({ email });
    if (existing) return res.status(400).json({ msg: "Already exists" });

    const user = await Model.create({ email, password: hashed, role });
    res.json({ token: generateToken(user) });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password, role } = req.body;
  const Model = role === "recruiter" ? Recruiter : User;

  try {
    const user = await Model.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "Invalid creds" });

    res.json({ token: generateToken(user) });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
