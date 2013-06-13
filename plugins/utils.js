module.exports.exists = function exists( variable ){
  if (typeof variable == 'undefined' || variable == null){
    return false;
  }
  else
  {
    return true;
  }
}