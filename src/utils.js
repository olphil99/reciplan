export const SERVICE_URL = 'http://127.0.0.1:8000/api';

// USER PROFILE 'CLASS'
var UserProfile = (function() {
  var userName = "";
  var userObj = {};

  var getName = function() {
    return userName;
  };

  var getUserObject = function() {
    return JSON.parse(sessionStorage.getItem('user'));
  };

  var setUserObject = function(user) {
    userObj = user;
    userName = user.username;
    sessionStorage.setItem('user', JSON.stringify(user));
  };

  var isLoggedIn = function() {
    return (sessionStorage.getItem('user') != null);
  };

  return {
    getName: getName,
    setUserObject: setUserObject,
    getUserObject: getUserObject,
    isLoggedIn: isLoggedIn
  }
})();
export default UserProfile;
