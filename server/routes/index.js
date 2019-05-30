const user = require('./user');
const school = require('./school');
const ability = require('./ability');
const file = require('./file');
const admin = require('./admin');
const common = require('./common');

module.exports = function (server) {
    server.use('/user', user);
    server.use('/school', school)
    server.use('/ability', ability);
    server.use('/file', file);
    server.use('/admin', admin);

    server.get('/', (request, response) => {
        if (request.session.name) {
            if (request.session.auth) {
                response.redirect('/admin');
            } else {
                response.redirect('/user/info');
            }
        } else {
            response.redirect('/login');
        }
    });

    server.get('/login', async(request, response) => {
      if (request.session.name) {
        response.redirect('/');
      } else {
        response.render('login', {error: request.query.error});
      }
    });

    server.get('/about', (request, response) => {
        response.render('about');
    }); // 소개

    server.get('/contact-us', (request, response) => {
        response.render('contact_us');
    }); // 문의
}