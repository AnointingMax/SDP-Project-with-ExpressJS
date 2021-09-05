const jwt = require("jsonwebtoken");
const { noAuth } = require("../constants/messages");

const verify = (req, res, next) => {
  const authHeader = req.headers.authoriztion;

  if (authHeader) {
    jwt.verify(authHeader, process.env.JWT_KEY, (err, user) => {
      if (err) {
        res.status(401).json(noAuth);
      }

      req.user = user;
      next();
    });
  } else {
    res.status(401).json(noAuth);
  }
};

const returnPerson = (person) => {
  const { password, __v, ...others } = person._doc;
  return others;
};

const returnAddress = (address) => {
  const { user, __v, ...others } = address._doc;
  return others;
};

const returnAddresses = (addressList) => {
  let list = [];
  addressList.forEach((address) => {
    list.push(returnAddress(address));
  });
  return list;
};

const returnWorkers = (workerList) => {
  let list = [];
  workerList.forEach((worker) => {
    list.push(returnPerson(worker));
  });
  return list;
};

module.exports = {
  returnPerson,
  verify,
  returnAddress,
  returnAddresses,
  returnWorkers,
};
