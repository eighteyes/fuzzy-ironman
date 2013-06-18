/*global window, app, $*/
'use strict';

var MM = window.MM || {};

MM.App = Backbone.Router.extend({
  routes: {
    "/" : "listMenus",
    "menus" : "listMenus"
  },
  initialize: function(options) {
    console.log("Backbone" + options);
  },
  listMenus: function() {
    console.log('listMenus');
    var menuList = new MM.Collections.MenuList();
    var menuListView = new MM.Views.MenuListView({
      container: $('#container'),
      collection: menuList
    });

    menuList.deferred.done( function() {
      menuListView.render();
    });
  }
});

MM.init = function() {
  console.log('MobileMenus greets you');

  MM.app = new MM.App();

  Backbone.history.start();

};

MM.Models = {};
MM.Models.Menu = Backbone.Model.extend({
  urlRoot: '/api/menus',
  defaults: {
    name: 'test',
    json: ''
  }
});

MM.Models.User = Backbone.Model.extend({
  urlRoot: '/user',
  defaults: {
    name: '',
    id: ''
  }
});

MM.Collections = {};
MM.Collections.MenuList = Backbone.Collection.extend({
  model: MM.Models.Menu,
  url: '/api/menus',
  initialize: function () {
    console.log("MenuListCollection");
    this.fetch({
      success: this.fetchSuccess,
      error: this.fetchError
    })
    this.deferred = new $.Deferred();
  },
  deferred: Function.constructor.prototype,
  fetchSuccess: function (collection, response) {
    console.log('collection:', collection)
    collection.deferred.resolve();
  },
  fetchError: function (collection, response) {
    throw new Error("Menu fetch didn't work")
  }
});

MM.Views = {};
MM.Views.MenuView = Backbone.View.extend({
  tagName: 'li',
  className: 'menu',
  initialize: function (options) {
    this.template = $('#menu-template').html();
  },
  render: function() {
    var context = JSON.parse(this.model.attributes.json);
    var template = Handlebars.compile(this.template);
    var html = template(context);
    debugger;
    this.$el.html(html).attr('id', this.model.get('_id'));
    return this;
  }
});

MM.Views.MenuListView = Backbone.View.extend({
  tagName: "ul",
  className: "menus",
  render: function() {
    var i, l = this.collection.length;
    for (i = 0; i<l; i++){
      this.renderItem(this.collection.models[i]);
    }
    $(this.container).find(this.className).remove();
    this.$el.appendTo(this.options.container);
    return this;
  },
  renderItem: function(model) {
    var item = new MM.Views.MenuView({
      model: model
    });
    item.render().$el.appendTo(this.$el);
  }
});

$(document).ready(function () {
    MM.init();
});
