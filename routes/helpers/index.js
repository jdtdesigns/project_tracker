module.exports = {
  redirectGuest(req, res, next) {
    if (!req.session.user_id) {
      return res.redirect('/login');
    }

    next();
  },

  redirectUser(req, res, next) {
    if (req.session.user_id) {
      return res.redirect('/dashboard');
    }

    next();
  }
}