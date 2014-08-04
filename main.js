
Parse.Cloud.define('editUser', function(request, response) {
    var userId = request.params.userId;

    var User = Parse.Object.extend('_User'),
        user = new User({ objectId: userId });
        
    var currentUser = request.user;
        
    var relation = user.relation("friendsRelation");
    relation.add(currentUser);


    Parse.Cloud.useMasterKey();
    user.save().then(function(user) {
        response.success(user);
    }, function(error) {
        response.error(error)
    });
});