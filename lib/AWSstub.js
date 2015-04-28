var expect = require('chai').expect;


/**
 * Defines a stubbed out version of the AWS S3 Node.js client.
 */ 
module.exports = {
  S3: function () {
    this.createMultipartUpload = function (details, callback) {
      // Make sure that this AWS function was called with the right parameters.
      expect(details).to.have.property('Bucket');
      expect(details.Key).to.be.a('string');

      expect(details).to.have.property('Key');
      expect(details.Key).to.be.a('string');

      if (details.Key == 'create-fail') {
        // Trigger a simulated error when a magic file name is used.
        callback('Simulated failure from mocked API');
      }
      else {
        callback(null, {
          UploadId: 'upload-id'
        });
      }
    };

    this.uploadPart = function (details, callback) {
      // Make sure that all the properties are there
      expect(details).to.have.property('Body');
      expect(details.Body).to.be.instanceof(Buffer);

      expect(details).to.have.property('Bucket');
      expect(details.Bucket).to.equal('test-bucket-name');

      expect(details).to.have.property('Key');
      expect(details.Key).to.be.a('string');

      expect(details).to.have.property('UploadId');
      expect(details.UploadId).to.contain('upload-id');

      expect(details).to.have.property('PartNumber');
      expect(details.PartNumber).to.be.an.integer;

      if (details.Key == 'upload-fail') {
        callback('Simulated failure from mocked API');
      }
      else {
        // Return an ETag
        callback(null, {
          ETag: 'etag'
        });
      }
    };

    this.abortMultipartUpload = function (details, callback) {
      // Make sure that all the properties are there
      expect(details).to.have.property('Bucket');
      expect(details.Bucket).to.equal('test-bucket-name');

      expect(details).to.have.property('Key');
      expect(details.Key).to.be.a('string');

      expect(details).to.have.property('UploadId');
      expect(details.UploadId).to.contain('upload-id');

      if (details.Key == 'abort-fail') {
        // Trigger a simulated error when a magic file name is used.
        callback('Simulated failure from mocked API');
      }
      else {
        callback();
      }
    };

    this.completeMultipartUpload = function (details, callback) {
      // Make sure that all the properties are there
      expect(details).to.have.property('Bucket');
      expect(details.Bucket).to.equal('test-bucket-name');

      expect(details).to.have.property('Key');
      expect(details.Key).to.be.a('string');

      expect(details).to.have.property('UploadId');
      expect(details.UploadId).to.contain('upload-id');

      expect(details).to.have.property('MultipartUpload');
      expect(details.MultipartUpload).to.an.object;

      expect(details.MultipartUpload).to.have.property('Parts');
      expect(details.MultipartUpload.Parts).to.an.array;

      details.MultipartUpload.Parts.forEach(function (partNumber) {
        expect(partNumber).to.be.an.integer;
      });

      if (details.Key == 'complete-fail' || details.Key == 'abort-fail') {
        // Trigger a simulated error when a magic file name is used.
        callback('Simulated failure from mocked API');
      }
      else {
        callback(null, {
          ETag: 'etag'
        });
      }
    };
  }
};