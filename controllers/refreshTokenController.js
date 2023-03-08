const User = require('../model/Users')
const bcrypt = require('bcrypt')


const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  console.log(cookies.jwt);
  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) return res.sendStatus(403); //forbidden

  //evaluate jwt
  jwt.verify(refreshToken, 'a46452b483d3eff3496fbeb0d2b89aaa562898b72e3b566b84253462361cd6e25164e8413dd7432fe1d3d8f4d7d0a944b2bbb8c4f3d9f43b1de324a43c68fe13', (err, decoded) => {
    if (err || foundUser.username !== decoded.username) res.sendStatus(403);
    const roles = Object.values(foundUser.roles);
    const accessToken = jwt.sign(
      {
        "UserInfo": {
          "username": decoded.username,
          "roles": roles,
        },
      },
      'dfc31d6452fa8ada3a2d55a54e42d669261604e8ef8fef7ffa0619d40452044680d8e04f022a16a2e0b48b020687125b0f031195efb572ae8f918db2e47d2e8d',
      { expiresIn: "30s" }
    );
    res.json({ accessToken });
  });
};

module.exports = { handleRefreshToken };
