const { User } = require('../models');

module.exports = {
  async registerUser(req, res) {
    try {
      const user = await User.create(req.body);

      // Store some kind of value to the server that tracks who this user is, so later on when they make a request, we can pull specific data related to them and not someone else
      req.session.user_id = user.id;

      res.redirect('/dashboard');
    } catch (error) {
      console.log(error);
      res.redirect('/register');
    }

  },

  async loginUser(req, res) {

  }
}