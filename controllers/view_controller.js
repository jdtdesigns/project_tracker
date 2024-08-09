const { User } = require('../models');

module.exports = {
  showHomepage(req, res) {
    res.render('homepage', {
      title: 'Project Tracker - Homepage'
    });
  },

  showRegisterPage(req, res) {
    res.render('register', {
      title: 'Project Tracker - Register'
    })
  },

  async showDashboardPage(req, res) {
    const user = await User.findByPk(req.session.user_id, {
      attributes: ['email']
    });

    res.render('dashboard', {
      title: 'Project Tracker - Dashboard',
      user: user.get({ plain: true })
    });
  }
};