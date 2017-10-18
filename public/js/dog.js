//`fileselect` event to all file inputs on the page
$(document).on('change', ':file', function() {
    var input = $(this),
        numFiles = input.get(0).files ? input.get(0).files.length : 1,
        label = input.val().replace(/\\/g, '/').replace(/.*\//, '');

    input.trigger('fileselect', [numFiles, label]);
});

$(document).ready(function () {
    $("#dog-preview-container").hide();

    // Watch for custom `fileselect` event
    $(':file').on('fileselect', function(event, numFiles, label) {
        var input = $(this).parents('.input-group').find(':text'),
            log = numFiles > 1 ? numFiles + ' files selected' : label;

        if( input.length ) {
            input.val(log);
        } else {
            if( log ) alert(log);
        }
    });

    $("#upload-image").on("click", function() {
        $(".success-message").html("Image uploaded successfully!");
        //add an image to the success area
        //add a hidden input element to contain the filepath to the uploaded image
        //style the image to bs4
    });

    //Create a Profile - upload an image
    $("#upload-image").on("click", function (event) {
        event.preventDefault();

        $.ajax({
            // Your server script to process the upload
            url: '/api/photo',
            type: 'POST',
    
            // Form data
            data: new FormData($("#uploadForm")[0]),
    
            // Tell jQuery not to process data or worry about content-type
            // You *must* include these options!
            cache: false,
            contentType: false,
            processData: false,
    
            // Custom XMLHttpRequest
            xhr: function() {
                var myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload) {
                    // For handling the progress of the upload
                    myXhr.upload.addEventListener('progress', function(e) {
                        if (e.lengthComputable) {
                            $('progress').attr({
                                value: e.loaded,
                                max: e.total,
                            });
                        }
                    } , false);
                }
                return myXhr;
            },
        }).then(function (result) {
            $("#imagepath").val(result);
            $("#dog-preview").attr("src", "/uploads/" + result);
            $("#dog-preview-container").show();
        });
    });
    
    //Create a profile - submit questionaire
    $("#dog-profile").on("submit", function (event) {
        event.preventDefault();
        var questionaireAnswers = {};
        var formData = $("#dog-profile").serializeArray();

        for (var i=0; i < formData.length; i++) {
            questionaireAnswers[formData[i].name] = formData[i].value;
        }
        
        $.ajax({
            url: "/api/new", 
            method: "POST",
            data: questionaireAnswers
        }).then(function (result) {
            window.location = "/newprofile/" + result.id;
        });
    });

    //New Profile - delete
    $("#btn-delete-dog").on("click", function (result) {
        var id = $(this).attr("data-id");
        $.ajax({
            url: "/api/deletedog/" + id,
            type: "DELETE"
        }).then(function() {
            console.log("deleted dog", id);
            // Reload the page to get the updated list
            window.location = "/finddog";
        });
    });

    //Get Matched
    $("#dog-survey").on("submit", function (event) {
        event.preventDefault();
        var surveyAnswers = {};
        var formData = $("#dog-survey").serializeArray();

        for (var i=0; i < formData.length; i++) {
            surveyAnswers[formData[i].name] = formData[i].value;
        }
        console.log(surveyAnswers);

        $.ajax({
            url: "/api/newsurvey", 
            method: "POST",
            data: surveyAnswers
        }).then(function (result) {
            console.log(result);
            window.location = "/match/" + result.id;
        });        
    });

});