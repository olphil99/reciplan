export const SERVICE_URL = 'http://127.0.0.1:8000/api/';

// USER PROFILE 'CLASS'
var UserProfile = (function() {
  var userName = "";

  var getName = function() {
    return userName;
  };

  var setName = function(name) {
    userName = name;
    sessionStorage.setItem('userName', name);
  };

  var isLoggedIn = function() {
    return (sessionStorage.getItem('userName') != null);
  }

  return {
    getName: getName,
    setName: setName,
    isLoggedIn: isLoggedIn
  }
})();
export default UserProfile;
