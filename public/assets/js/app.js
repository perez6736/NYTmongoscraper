$(document).ready(function(){
    function saveArticle(){
        // Grab the id associated with the article from the submit button
        var thisId = $(this).attr("data-id");
        console.log("id= " + thisId);
        // Run a POST request to change the note, using what's entered in the inputs
        // $.ajax({
        //     method: "POST",
        //     url: "/save/" + thisId,
        //     data: {
        //     // Value taken from title input
        //     title: $("#titleinput").val(),
        //     // Value taken from note textarea
        //     body: $("#bodyinput").val()
        //     }
        // })
        //     // With that done
        // .done(function(data) {
        // });
    }

    $(".saveArticle").click(saveArticle);
});