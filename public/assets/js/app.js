$(document).ready(function(){
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

    $(".saveArticle").click(saveArticle);
});