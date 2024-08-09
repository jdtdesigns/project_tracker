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
    const formData = req.body;
    // Get the user
    const user = await User.findOne({
      where: {
        email: formData.email
      }
    });

    // If the user was not found, redirect them to register
    if (!user) {
      return res.redirect('/register');
    }

    // Check the password that was provided through the form to ensure it's the same as the stored password in the database
    const valid_pass = await user.validatePassword(formData.password);

    if (!valid_pass) {
      return res.redirect('/login');
    }

    // The user is validated and now we need to create a session for them and send a cookie
    req.session.user_id = user.id;

    res.redirect('/dashboard');
  },

  logoutUser(req, res) {
    req.session.destroy();

    res.redirect('/');
  }
}