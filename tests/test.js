var parseEmail = require('../plugins/parseEmail')
  , render = require('../views/render')
  , printMenu = require('../views/printMenu')
  , assert = require('assert')
  , fakeMenu = require('../fakes/menu');

describe('Email Workflow', function() {

  it('outputs a text version of a menu', function ( done ){
    var menuJSON = fakeMenu;
    var templateName = 'email';

    render( templateName, menuJSON, function(err, str){
      if (err) throw new Error(err + 'Render Failed');
      assert.equal(str.indexOf('=== BEGIN'), 0);
      assert.equal( str.indexOf('Grilled Cheese'), 45);
      done();
    });
  });
})