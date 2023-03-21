// Switch Zoom rooms using JQuery
$(document).ready( function () {

    // $('.uw-btn')[0].onclick = null;
    // $('.uw-btn').click(function() {
    //     openNav();
    // });

    var currentRoom = 1;

    $(function() {
        $('#room-1-button').addClass("chosen"); 

        for (let i = 2; i <= 7; i++) {
            $('#room-'+i+'-button').addClass("notChosen");
        }
    });

    $('.room-button').click(function(e) {
        let roomId = $(this).attr('data-section')[5]
        switchRoom(e, roomId);
    });
        
    var switchRoom = function(e, roomId) {
        e.preventDefault();
        currentRoom = roomId;

        for (let i = 1; i <= 7; i++) {
            $('#room-' + i + "-button").removeClass("chosen").addClass("notChosen");
            $('#room-' + i + "-presentations").hide();
        }
        $('#room-' + roomId + "-button").removeClass("notChosen").addClass("chosen");
        $('#room-' + roomId + "-presentations").fadeIn(400);

        return false;
    };

    $('.sidenav-title').click(function(e) {
        e.preventDefault();
        // closeNav();
        projectId = $(this).attr('data-id');
        room = parseInt(projectId[5]);
        console.log(projectId);

        if (room !== currentRoom) {
            $.when(switchRoom(e, room)).done(scrollToProject(projectId));
        } else {
            scrollToProject(projectId);
        }
    });

    var scrollToProject = function(projectId) {
        console.log("projectId 3: ", projectId);

        $('html, body').animate({
            scrollTop: $('#' + projectId).offset().top
        }, 1000);
    }
});