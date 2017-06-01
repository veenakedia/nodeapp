var userListData = [];

$(document).ready(function(){
	$('td a.linkdeleteuser').click(function(e){
		deleteUser($(this).attr('rel'));
		});
	//populateTable();
});



// Delete User
function deleteUser(id) {

    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this user?');

    // Check and make sure the user confirmed
    if (confirmation === true) {
		
        // If they did, do our delete
        $.ajax({
            type: 'DELETE',
            url: '/users/deleteuser/' + id
        }).done(function( response ) {

			if(response == 'success');
				return true;
        });
    }
    else {

        // If they said no to the confirm, do nothing
        return false;

    }

};


function populateTable(){
	var tablecontent = '';
	$.getJSON('/users/userlist', function(data){
		userListData = data;
		$.each(data, function(){
			tablecontent += '<tr>';
			tablecontent += '<td><a href="#" rel="' + this._id + '">Delete</a></td>';
			tablecontent += '<td>' + this.first_name + ' '  + this.last_name + '</td>';
			tablecontent += '<td><a href="#" rel="' + this._id + '">Show</a>' + this.username + '</td>';
			tablecontent += '<td>' + this.email + '</td>';
		});
	});
	$('#userList table tbody').html(tablecontent);
};

function showUserInfo(event){
	// Prevent Link from Firing
	event.preventDefualt();
	
	var thisUserName = $(this).attr('rel');
	
	var arrayPosition = userListData.map(function(arrayitem){
		return arrayitem.username;
	}).indexOf(thisUserName);
	
	var thisUserObject = userListData[arrayPosition];
	
	//Populate Info Box
    $('#userFirstName').text(thisUserObject.first_name );
	$('#userLastName').text(thisUserObject.last_name );
    $('#userEmail').text(thisUserObject.email);
	$('#userPassword').text(thisUserObject.password);

};

