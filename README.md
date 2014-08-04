friends-relation-parse-cloud-code
=================================

Parse Cloud Code file for adding a friends relationship for both users.

Usually with Cloud Code, you can only make changes to the currently logged in user.

However, this Parse Cloud Code file utilizes the Master Key. This allows a friends relationship to be added for both
the currently logged in user, and the other user.

Here is what the file contains:

```
Parse.Cloud.define('editUser', function(request, response) {
    var userId = request.params.userId;

    var User = Parse.Object.extend('_User'),
        user = new User({ objectId: userId });
        
    var currentUser = request.user;
        
    var relation = user.relation("INSERT-RELATION-KEY-HERE");
    relation.add(currentUser);

    Parse.Cloud.useMasterKey();
    user.save().then(function(user) {
        response.success(user);
    }, function(error) {
        response.error(error)
    });
});
```
Simply replace INSERT-RELATION-KEY-HERE with the name of your relation key in Parse, and submit your new Cloud Code file
to Parse.
