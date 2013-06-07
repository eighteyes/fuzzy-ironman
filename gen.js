var sqlite3 = require('sqlite3').verbose()
  , db = new sqlite3.Database('data.sql3')
  , fakeMenu = require('./fakes/menu')
  , fakeHours = require('./fakes/hours')


db.serialize(function() {
  var query = db.prepare("INSERT INTO customers VALUES (?,?,?,?,?)");
  query.run(1, 'Bubba Gump', 1, 'asd', 'foo');
  query.finalize();

  console.log(JSON.stringify(fakeMenu));
  var json = JSON.stringify(fakeMenu);

  query = db.prepare('INSERT INTO menus values (?, ?, ?, ?, ?, ?)');
  query.run(1,1,1,json,'bobs-grill','test');
  query.finalize();

  json = JSON.stringify(fakeHours);

  query = db.prepare('INSERT INTO locations values (?, ?, ?, ?, ?, ?)');
  query.run(1,1,1,json,'bobs-grill-downtown','123-456-7123');
  query.finalize();

  db.get('SELECT * FROM locations', function(err, res){
    console.log(err, res);
  });

  db.close();
});