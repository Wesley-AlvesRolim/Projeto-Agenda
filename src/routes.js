const express = require('express');
const router = express.Router();

const homeController = require('./controllers/homeController');
const contactController = require('./controllers/contactController');
const loginController = require('./controllers/loginController');
const { loginRequired } = require('./middlewares/loginRequired');

router.get('/', homeController.homePage);
router.get('/login', loginController.loginRender);
router.get('/logout', loginController.logout);
router.post('/login', loginController.login);
router.post('/register', loginController.register);

router.get('/contact/new', loginRequired, contactController.newContact);
router.post('/contact/new', loginRequired, contactController.newContactPost);
router.get('/contact/edit/:id', loginRequired, contactController.edit);
router.post('/contact/edit/:id', loginRequired, contactController.editPost);
router.get('/contact/delete/:id', loginRequired, contactController.delete);

module.exports = router;