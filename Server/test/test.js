import chai from 'chai';
import chaiHttp from 'chai-http';
import generateToken from '../helper/generateToken';
import server from '../server';

chai.use(chaiHttp);
chai.should();
const userToken = generateToken.generate('andrea@gmail.com', 'user');
describe('BroadCaster Api', () => {
  const wrongToken = 'IsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJ0YUBnbWFpbC5jb20iLCJ1c2VyVHlwZSI6InVzZXIiLCJpYXQiOjE1NzM0NzgzNzZ9.9rJCaBlriG8j5JDqRTkhB-SICNc';
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
      userName: 'andre@gmail.com',
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
  // Create a new RedFlag
  it('should create a new RedFlag record', (done) => {
    const newRedFlag = {
      title: 'corruption',
      type: 'redFlag',
      comment: 'this corruption was very dangerous',
      location: 'Gasabo',
      status: 'solved',
    };
    chai.request(server)
      .post('/api/v1/redFlags')
      .set('token', userToken)
      .send(newRedFlag)
      .end((error, res) => {
        res.status.should.be.equal(201);
        res.body.message.should.be.equal('RedFlag created successifully');
      });
    done();
  });
  // user can not create a new redFlag if user did not authenticate themselves
  it('should not be able to create a new redFlag if user did not authenticate', (done) => {
    const newRedFlag = {
      title: 'corruption',
      type: 'redFlag',
      comment: 'this corruption was very dangerous',
      location: 'Gasabo',
      status: 'solved',
    };
    chai.request(server)
      .post('/api/v1/redFlags')
      .set('token', wrongToken)
      .send(newRedFlag)
      .end((error, res) => {
        res.status.should.be.equal(403);
        res.body.error.should.be.equal('Authentication failed');
      });
    done();
  });
  // user should not be able to create a redFlag if some fields are not filled yet
  it('should not be able to create a redFlag if some fields are not filled yet', (done) => {
    const newRedFlag = {
      title: 'corruption',
      comment: 'this corruption was very dangerous',
      location: 'Gasabo',
    };
    chai.request(server)
      .post('/api/v1/redFlags')
      .set('token', userToken)
      // .send(newRedFlag)
      .end((error, res) => {
        res.status.should.be.equal(400);
      });
    done();
  });
  // view all redFlags created
  it('should be able to view all redFlags created', (done) => {
    chai.request(server)
      .get('/api/v1/red-flags')
      .set('token', userToken)
      .end((error, res) => {
        res.status.should.be.equal(200);
      });
    done();
  });
  // user should not be able to view all redFlags created without aunthenticate
  it('should not able to view all redFlags created if you are not aunthenticate', (done) => {
    chai.request(server)
      .get('/api/v1/red-flags')
      .set('token', wrongToken)
      .end((error, res) => {
        res.status.should.be.equal(403);
        res.body.error.should.be.equal('Authentication failed');
      });
    done();
  });
  // view a specific redFlag created
  it('should be able to view a specific redFlag created', (done) => {
    chai.request(server)
      .get('/api/v1/red-flags/2')
      .set('token', userToken)
      .end((error, res) => {
        res.status.should.be.equal(200);
      });
    done();
  });
  // User should not view a specific redFlag created without aunthenticate
  it('should not be able to view a specific redFlag created without aunthenticate', (done) => {
    chai.request(server)
      .get('/api/v1/red-flags/2')
      .set('token', wrongToken)
      .end((error, res) => {
        res.status.should.be.equal(403);
        res.body.error.should.be.equal('Authentication failed');
      });
    done();
  });
  // User should not view a specific redFlag if that redFlag is not availabe.
  it('should not be able to view a specific redFlag if that redFlag is not yet created.', (done) => {
    chai.request(server)
      .get('/api/v1/red-flags/50')
      .set('token', userToken)
      .end((error, res) => {
        res.status.should.be.equal(404);
        res.body.error.should.be.equal('The RedFlag you are looking for is not available');
      });
    done();
  });
  // comment should not be possible to be updated with empty content
  it('should not be possible to update the comment which is empty', (done) => {
    const newRedFlag = {
      title: 'corruption',
      type: 'redFlag',
      comment: '',
      location: 'Gasabo',
      status: 'draft',
    };
    chai.request(server)
      .patch('/api/v1/red-flags/3/comment')
      .set('token', userToken)
      .send(newRedFlag)
      .end((error, res) => {
        res.status.should.be.equal(400);
        res.body.message.should.be.equal('comment can not be empty');
      });
    done();
  });
  // user should  be able to update comment if redFlag status is draft
  it('should be able to update comment if redFlag status is draft', (done) => {
    const newRedFlag = {
      title: 'corruption',
      type: 'redFlag',
      comment: 'this corruption causes the poverty',
      location: 'Gasabo',
      status: 'draft',
    };
    chai.request(server)
      .patch('/api/v1/red-flags/3/comment')
      .set('token', userToken)
      .send(newRedFlag)
      .end((error, res) => {
        res.status.should.be.equal(200);
      });
    done();
  });
  // user should not be able to update comment if redFlag is not present or redFlag is already marked
  it('should not be able to update comment if redFlag is not present or redFlag is already marked', (done) => {
    const newRedFlag = {
      title: 'corruption',
      type: 'redFlag',
      comment: 'This is a huge disaster',
      location: 'Gasabo',
      status: 'solved',
    };
    chai.request(server)
      .patch('/api/v1/red-flags/35/comment')
      .set('token', userToken)
      .send(newRedFlag)
      .end((error, res) => {
        res.status.should.be.equal(404);
      });
    done();
  });
});