import chai from 'chai';
import chaiHttp from 'chai-http';
import generateToken from '../helper/generateToken';
import server from '../server';

chai.use(chaiHttp);
chai.should();
const userToken = generateToken.generate('andrea@gmail.com', 'user');
describe('BroadCaster Api', () => {
  const wrongToken = 'IsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJ0YUBnbWFpbC5jb20iLCJ1c2VyVHlwZSI6InVzZXIiLCJpYXQiOjE1NzM0NzgzNzZ9.9rJCaBlriG8j5JDqRTkhB-SICNc';

  // Create a new RedFlag
  it('should create a new RedFlag record', (done) => {
    const newRedFlag = {
      title: 'corruption',
      type: 'redFlag',
      comment: 'this corruption was very dangerous',
      location: 'Gasabo',
      status: 'draft',
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
      status: 'draft',
    };
    chai.request(server)
      .post('/api/v1/redFlags')
      .set('token', wrongToken)
      .send(newRedFlag)
      .end((error, res) => {
        res.status.should.be.equal(401);
        res.body.error.should.be.equal('Invalid token');
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
        res.status.should.be.equal(401);
        res.body.error.should.be.equal('Invalid token');
      });
    done();
  });
  // view a specific redFlag created
  it('should be able to view a specific redFlag created', (done) => {
    chai.request(server)
      .get('/api/v1/red-flags/1')
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
        res.status.should.be.equal(401);
        res.body.error.should.be.equal('Invalid token');
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
      .patch('/api/v1/red-flags/1/comment')
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
      status: 'draft',
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
  // location should not be possible to be updated with empty content
  it('should not be possible to update the location with empty content', (done) => {
    const newRedFlag = {
      title: 'road',
      type: 'Intervation',
      comment: 'This is too much',
      location: '',
      status: 'draft',
    };
    chai.request(server)
      .patch('/api/v1/red-flags/1/location')
      .set('token', userToken)
      .send(newRedFlag)
      .end((error, res) => {
        res.status.should.be.equal(400);
        res.body.message.should.be.equal('location can not be empty');
      });
    done();
  });
  // user should not be able to update the location of the record which is not present && the record status which is not draft
  it('should not be possible to update the location of record which is not present and the record status which is not draft', (done) => {
    const newRedFlag = {
      title: 'road',
      type: 'Intervation',
      comment: 'This is too much',
      location: '-1.643883, 30.40773',
      status: 'rejected',
    };
    chai.request(server)
      .patch('/api/v1/red-flags/35/location')
      .set('token', userToken)
      .send(newRedFlag)
      .end((error, res) => {
        res.status.should.be.equal(404);
      });
    done();
  });
  // user should be able to update the location of redFlag record
  it('should be able to upate the location of redFlag record', (done) => {
    const newRedFlag = {
      location: '-1.8935, 30.27849',
    };
    chai.request(server)
      .patch('/api/v1/red-flags/1/location')
      .set('token', userToken)
      .send(newRedFlag)
      .end((error, res) => {
        res.status.should.be.equal(200);
      });
    done();
  });
  // Only the user who created the ​red-flag is the one to delete the record.
  it('should not be able to delete the redFlag which is not created by you', (done) => {
    chai.request(server)
      .delete('/api/v1/red-flags/1')
      .set('token', userToken)
      .end((error, res) => {
        res.status.should.be.equal(403);
        res.body.message.should.be.equal('Only the user who created the ​red-flag is the one to delete the record.');
      });
    done();
  });
  // Only the user who created the ​red-flag ​record can delete the record.
  it('should delete a specific redFlag record', (done) => {
    const newRedFlag = {
      title: 'corruption',
      type: 'redFlag',
      comment: 'this corruption was very dangerous',
      location: 'Gasabo',
      status: 'draft',
    };
    chai.request(server)
      .post('/api/v1/redFlags')
      .set('token', userToken)
      .send(newRedFlag)
      .end((error, res) => {
        res.status.should.be.equal(201);
        res.body.message.should.be.equal('RedFlag created successifully');
      });
    chai.request(server)
      .delete('/api/v1/red-flags/2')
      .set('token', userToken)
      .end((error, res) => {
        res.status.should.be.equal(200);
      });
    done();
  });
  // User should not be able to delete the record which is not draft.
  it('should not be able to delete the record which is not draft', (done) => {
    chai.request(server)
      .delete('/api/v1/red-flags/5')
      .set('token', userToken)
      .end((error, res) => {
        res.status.should.be.equal(404);
      });
    done();
  });
  // user should not be able to delete a specific redFlag record if it is not present
  it('should not be able to delete a record if the record does not present', (done) => {
    chai.request(server)
      .delete('/api/v1/red-flags/25')
      .set('token', userToken)
      .end((error, res) => {
        res.status.should.be.equal(404);
        res.body.message.should.be.equal('The redFlag is not found or is already marked by authorities.');
      });
    done();
  });

  //  User should not be able to delete the record if that is not the one who created it.
  it('should not be able to delete the record if you are not the one to create it', (done) => {
    chai.request(server)
      .delete('/api/v1/red-flags/2')
      .set('token', userToken)
      .send((error, res) => {
        res.status.should.be.equal(401);
      });
    done();
  });

});
