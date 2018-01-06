$(document).ready(function(){

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

    function saveNoteToArticle(){
        //make post request to /notes and save note to the article.
        
    }

    $("#unSaveBtn").click(unsaveArticle);
    $(".saveArticle").click(saveArticle);
    $(".leaveNoteBtn").click(saveNoteToArticle);
});