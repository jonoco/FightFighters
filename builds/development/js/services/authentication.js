myApp.factory('Authentication', 
  function( $firebaseObject, $firebaseAuth, FIREBASE_URL, $rootScope, $location ) {

  var ref = new Firebase( FIREBASE_URL );
  var authObj = $firebaseAuth( ref );

  var myObject = {

    login : function( user ) {

      var userRef = new Firebase( FIREBASE_URL + '/users/' + user.uid );
      var userObj = $firebaseObject( userRef );

      return authObj.$authWithPassword({
        email: user.email,
        password: user.password
      }).then(function( user ) {
      }).catch(function( error ) {
        console.error("Login failed: " + error)
      });
    }, //login

    register : function( user ) {
      return authObj.$createUser({
        email: user.email, 
        password: user.password
      }).then(function( regUser ){
        var ref = new Firebase( FIREBASE_URL + 'users/' + regUser.uid );

        var userInfo = {
          date: Firebase.ServerValue.TIMESTAMP,
          regUser: regUser.uid,
          email: user.email
        }
        ref.set( userInfo );  
      }); //add user
    }, //register

    logout : function() {
      return authObj.$unauth();
    }, //logout

    signedIn: function() {
      return authObj.user != null;
    }, //signedIn

    user : function() {
      return authObj.$getAuth().uid;
    } //user

  } //myObject

  return myObject;
});