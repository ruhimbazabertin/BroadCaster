import chai from 'chai';
import chaiHttp from 'chai-http';
import generateToken from '../helper/generateToken';
import server from '../server';

chai.use(chaiHttp);
chai.should();
describe('BroadCaster Api', () => {
  // signUp test
  it('should be signUp', (done) => {
    const user = {
      firstName: 'kambanda',
      lastName: 'andrea',
      email: 'andrea@gmail.com',
      phoneNumber: '0786960926',
      userName: 'andrea',
      password: 'andrea123',
      userType: 'user',
    };
    chai.request(server)
      .post('/api/v1/signUp')
      .send(user)
      .end((error, res) => {
        res.status.should.be.equal(201);
        res.body.message.should.be.equal('user created successfully');
      });
    done();
  });
  // duplication email test
  it('should not be signup with email already exist.', (done) => {
    const user = {
      firstName: 'ruhimbaza',
      lastName: 'bertin',
      email: 'andrea@gmail.com',
      phoneNumber: '0786960926',
      userName: 'andrea',
      password: 'andrea123',
      userType: 'user',
    };
    chai.request(server)
      .post('/api/v1/signUp')
      .send(user)
      .end((error, res) => {
        res.status.should.be.equal(409);
        res.body.error.should.be.equal('email already exist, Please Login');
      });
    done();
  });
  // user should not be able to signup if some fields are not filled yet
  it('should not be able to signup when some filled are missing', (done) => {
    const user = {
      lastName: 'bertin',
      email: 'andrea@gmail.com',
      phoneNumber: '0786960926',
      userName: 'andrea',
      password: 'andrea123',
      userType: 'user',
    };
    chai.request(server)
      .post('/api/v1/signUp')
      .send(user)
      .end((error, res) => {
        res.status.should.be.equal(400);
      });
    done();

  });
  // signin test
  it('should login', (done) => {
    const user = {
      email: 'andrea@gmail.com',
      password: 'andrea123',
    };
    chai.request(server)
      .post('/api/v1/signIn')
      .send(user)
      .end((error, res) => {
        res.status.should.be.equal(200);
        res.body.message.should.be.equal('Logged in as kambanda');
      });
    done();
  });
  // user should not be able to login if email or password is not correct.
  it('should not be able to login if userName is not correct', (done) => {
    const user = {
      email: 'andre@gmail.com',
      password: 'jeanete123',
    };
    chai.request(server)
      .post('/api/v1/signIn')
      .send(user)
      .end((error, res) => {
        res.status.should.be.equal(401);
        res.body.error.should.be.equal('Incorrect UserName or Password');
      });
    done();
  });
  // user should not be able to login if password is not correct.
  it('should not be able to login if userName is not correct', (done) => {
    const user = {
      email: 'andre@gmail.com',
      password: 'bertin123',
    };
    chai.request(server)
      .post('/api/v1/signIn')
      .send(user)
      .end((error, res) => {
        res.status.should.be.equal(401);
        res.body.error.should.be.equal('Incorrect UserName or Password');
      });
    done();
  });
});
