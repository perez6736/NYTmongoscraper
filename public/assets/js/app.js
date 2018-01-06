$(document).ready(function(){
    // hide the notes 
    $(".notes").hide();

    // we can use this function to save AND unsave
    function saveArticle(){
        // Grab the id associated with the article from the submit button
        var thisId = $(this).attr("data-id");
        // Run a POST request to change the note, using what's entered in the inputs
        $.ajax({
            method: "POST",
            url: "/save/" + thisId,
            data: {
                id: thisId
            }
        })
            // With that done
        .done(function(data) {
            // Log the response
            console.log(data);
        });
    }

    // function to unsave article
    function unsaveArticle(){
        // Grab the id associated with the article from the submit button
        var thisId = $(this).attr("data-id");
        // Run a POST request to change the note, using what's entered in the inputs
        $.ajax({
            method: "POST",
            url: "/unsave/" + thisId,
            data: {
                id: thisId
            }
        })
            // With that done
        .done(function(data) {
            // Log the response
            console.log(data);
            location.reload();
        });
    }

    function displayNotePanel(){
        // since the note panel body has the id of the article we can just show that id
        var thisId = $(this).attr("data-id");
        $("#" + thisId).show();
    }

    function hideNotePanel(){
        var thisId = $(this).attr("data-id");
        $("#" + thisId).hide();
    }

    $("#unSaveBtn").click(unsaveArticle);
    $(".saveArticle").click(saveArticle);
    $(".leaveNoteBtn").click(displayNotePanel);
    $(".closeNotePanelBtn").click(hideNotePanel);

});