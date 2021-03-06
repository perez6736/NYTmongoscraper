$(document).ready(function(){
    // hide the notes 
    $(".notes").hide();

    function saveArticle(){
        // Grab the id associated with the article from the submit button
        var thisId = $(this).attr("data-id");

        $.ajax({
            method: "POST",
            url: "/save/" + thisId,
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

        $.ajax({
            method: "POST",
            url: "/unsave/" + thisId,
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
        $(".notes[data-id="+thisId+"]").show();

        
        $.ajax({
            method: "GET",
            url: "/notes/" + thisId,
        })
        .done(function(data) {
            $(".title[data-id="+thisId+"]").val(data.title);
            $(".note[data-id="+thisId+"]").val(data.body);
        });

    }
    
    function hideNotePanel(){
        var thisId = $(this).attr("data-id");
        $(".notes[data-id="+thisId+"]").hide();

    }

    function saveNote(){
        //id of article 
        var thisId = $(this).attr("data-id");
        //
        var title = $(".title[data-id="+thisId+"]").val();
        var note = $(".note[data-id="+thisId+"]").val();
        
        $.ajax({
            method: "POST",
            url: "/notes/" + thisId,
            data: {
                title: title,
                body: note
            }
        })
        .done(function(data) {
            // Log the response
            console.log(data);
        });
    }

    $("#unSaveBtn").click(unsaveArticle);
    $(".saveArticle").click(saveArticle);
    $(".leaveNoteBtn").click(displayNotePanel);
    $(".closeNotePanelBtn").click(hideNotePanel);
    $(".saveNote").click(saveNote);

});