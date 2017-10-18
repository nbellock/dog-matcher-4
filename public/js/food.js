// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  //the default position of modal is to the top of the window. I like it centered.
  function alignModal(){
    var modalDialog = $(this).find(".modal-dialog");

    // Applying the top margin on modal dialog to align it vertically center
    modalDialog.css("margin-top", Math.max(0, ($(window).height() - modalDialog.height()) / 2));
  }

  // Align modal when it is displayed
  $("#validationModal").on("shown.bs.modal", alignModal);

  // Align modal when user resize the window
  $(window).on("resize", function(){
    $("#validationModal:visible").each(alignModal);
  }); 

  $("#food-form").on("submit", function(event) {
    //stop submission if there is no name specified
    if ($("#food-name").val().trim() === "") {
      $("#validationModal").modal('show');
      return false;
    }

    event.preventDefault();

    //to become req.body server side
    var newFood = {
      name: $("#food-name").val().trim(),
      eaten: false
    };

    // Send the POST request.
    $.ajax("/api/foods", {
      type: "POST",
      data: newFood
    }).then(
      function(result) {
        console.log("Created new food");
        console.log(result);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });


  //.btn-eat and .btn-remove are conditionally written out by HB helpers in partials/foods/food-block

  //mark the food eaten
  $(".btn-eat").on("click", function(event) {
    //used the id of the parent. I don't like extraneous use of data attributes. Do with the standard stuff as much as you can it comes off more semantic
    var id = $(this).parent().attr("id");

    var foodState = {
      eaten: true
    };

    // Send the PUT request.
    $.ajax("/api/foods/" + id, {
      type: "PUT",
      data: foodState
    }).then(
      function() {
        console.log("Food has been eaten", foodState);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  //remove the food, it's been digested :)
  $(".btn-remove").on("click", function(event) {
    var id = $(this).parent().attr("id");

    // Send the DELETE request.
    $.ajax("/api/foods/" + id, {
      type: "DELETE",
    }).then(
      function() {
        console.log("deleted cat", id);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
});
