'use strict';

var app = require('../..');
import request from 'supertest';

var newChannel;

describe('Channel API:', function() {
  describe('GET /api/channels', function() {
    var channels;

    beforeEach(function(done) {
      request(app)
        .get('/api/channels')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          channels = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(channels).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/channels', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/channels')
        .send({
          name: 'New Channel',
          info: 'This is the brand new channel!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newChannel = res.body;
          done();
        });
    });

    it('should respond with the newly created channel', function() {
      expect(newChannel.name).to.equal('New Channel');
      expect(newChannel.info).to.equal('This is the brand new channel!!!');
    });
  });

  describe('GET /api/channels/:id', function() {
    var channel;

    beforeEach(function(done) {
      request(app)
        .get(`/api/channels/${newChannel._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          channel = res.body;
          done();
        });
    });

    afterEach(function() {
      channel = {};
    });

    it('should respond with the requested channel', function() {
      expect(channel.name).to.equal('New Channel');
      expect(channel.info).to.equal('This is the brand new channel!!!');
    });
  });

  describe('PUT /api/channels/:id', function() {
    var updatedChannel;

    beforeEach(function(done) {
      request(app)
        .put(`/api/channels/${newChannel._id}`)
        .send({
          name: 'Updated Channel',
          info: 'This is the updated channel!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedChannel = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedChannel = {};
    });

    it('should respond with the original channel', function() {
      expect(updatedChannel.name).to.equal('New Channel');
      expect(updatedChannel.info).to.equal('This is the brand new channel!!!');
    });

    it('should respond with the updated channel on a subsequent GET', function(done) {
      request(app)
        .get(`/api/channels/${newChannel._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let channel = res.body;

          expect(channel.name).to.equal('Updated Channel');
          expect(channel.info).to.equal('This is the updated channel!!!');

          done();
        });
    });
  });

  describe('PATCH /api/channels/:id', function() {
    var patchedChannel;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/channels/${newChannel._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Channel' },
          { op: 'replace', path: '/info', value: 'This is the patched channel!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedChannel = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedChannel = {};
    });

    it('should respond with the patched channel', function() {
      expect(patchedChannel.name).to.equal('Patched Channel');
      expect(patchedChannel.info).to.equal('This is the patched channel!!!');
    });
  });

  describe('DELETE /api/channels/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/channels/${newChannel._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when channel does not exist', function(done) {
      request(app)
        .delete(`/api/channels/${newChannel._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});