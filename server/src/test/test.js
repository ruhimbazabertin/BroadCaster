import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

chai.use(chaiHttp);
chai.should();

describe('BroadCaster Api', () => {
  //signUp test
it('should be signUp', (done) => {
    const user =
    {
        firstName: 'kambanda',
        lastName :  'andrea',
        email    :  'andrea@gmail.com',
        phoneNumber : '0786960926',
        userName    : 'andrea',
        password    : 'andrea123',
        userType    : 'user'
    };
    chai.request(server)
        .post('/api/v1/signUp')
        .send(user)
        .end((error, res) =>{
            res.status.should.be.equal(201);
        });
        done();  
});
//duplication email test
it('should not be signup with email already exist.', (done) =>{
    const user =
    {
        firstName: 'ruhimbaza',
        lastName :  'bertin',
        email    :  'andrea@gmail.com',
        phoneNumber : '0786960926',
        userName    : 'andrea',
        password    : 'andrea123',
        userType    : 'user'
    };
    chai.request(server)
        .post('/api/v1/signUp')
        .send(user)
        .end((error, res) =>{
            res.status.should.be.equal(409);
        });
        done();  
});
//user should not be able to signup if some fields are not filled yet
it('should not be able to signup when some filled are missing', (done) => {
    const user =
    {
        lastName :  'bertin',
        email    :  'andrea@gmail.com',
        phoneNumber : '0786960926',
        userName    : 'andrea',
        password    : 'andrea123',
        userType    : 'user'
    };
    chai.request(server)
        .post('/api/v1/signUp')
        .send(user)
        .end((error, res) =>{
        res.status.should.be.equal(400);
    });
    done();  

});
//signin test
it('should login', (done) => {
    const user = 
    {
     userName: 'bertin',
     password: 'bertin123'
    };
    chai.request(server)
        .post('/api/v1/signIn')
        .send(user)
        .end((error, res) => {
            res.status.should.be.equal(200);
        });
       done();
});
//user should not be able to login if userName or password is not correct.
it('should not be able to login if userName is not correct', (done) =>{
    const user =
      {
          userName: 'bertin',
          password: 'jeanete123'
      };
      chai.request(server)
          .post('/api/v1/signIn')
          .send(user)
          .end((error, res) => {
              res.status.should.be.equal(401);
          });
        done();
})
//user should not be able to login if password is not correct.
it('should not be able to login if userName is not correct', (done) =>{
    const user =
      {
          userName: 'jeanete',
          password: 'bertin123'
      };
      chai.request(server)
          .post('/api/v1/signIn')
          .send(user)
          .end((error, res) => {
              res.status.should.be.equal(401);
          });
        done();
})


});