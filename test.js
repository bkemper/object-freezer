var Freezer = require('./');
var expect = require('chai').expect;

describe('Freezer', function () {
  describe('.deepFreeze', function () {
    it('returns frozen object', function () {
      var subject = Freezer.deepFreeze({});
      expect(Object.isFrozen(subject)).to.be.true;
    });

    it('returns frozen nested objects', function () {
      var subject = Freezer.deepFreeze({ a: {} });
      expect(Object.isFrozen(subject.a)).to.be.true;
    });

    it('silently disregards changes to froze objects', function () {
      var subject = Freezer.deepFreeze({ a: 1 });

      subject.a = 2; // attempt to change property

      expect(subject).to.eql({ a: 1 });
    });

    describe('with a function', function () {
      it('returns non frozen function', function () {
        var subject = Freezer.deepFreeze(function () { });
        expect(Object.isFrozen(subject)).to.be.false;
      });

      it('returns non frozen nested function', function () {
        var subject = Freezer.deepFreeze({ a: function () { } });

        expect(Object.isFrozen(subject)).to.be.true;
        expect(Object.isFrozen(subject.a)).to.be.false;
      });
    });

    describe('using strict', function () {
      'use strict';

      it('throws TypeError', function () {
        var subject = Freezer.deepFreeze({ a: 1 });
        expect(function () { subject.a = 2 }).to.throw(TypeError);
      });
    });
  });

  describe('.antiFreeze', function () {
    it('returns non frozen object', function () {
      var subject = Freezer.deepFreeze(Freezer.antiFreeze({}));
      expect(Object.isFrozen(subject)).to.be.false;
    });

    it('returns frozen object with non frozen nested objects', function () {
      var subject = Freezer.deepFreeze({
        a: Freezer.antiFreeze({})
      });

      expect(Object.isFrozen(subject)).to.be.true;
      expect(Object.isFrozen(subject.a)).to.be.false;
    });
  });
});
