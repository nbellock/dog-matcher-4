#Eat Da Burder (EatFood)
* Went the extra mile and used sequelize alongside Handlebars
* All features from the demo are built in with the addition of a digest button which removes food from the "eaten" list
* Applied a better layout than the one in the demo video. The add input text box does not get pushed down with the addition of items + Use of BS4 flexbox for perfect 50/50 alignment and clean looking lists and buttons.
* Modal window was used for input validation.
* Page reload on every action is intentional to demonstrate that the database is a fresh grab from SQL when the "/" route is hit again. All route methods do return an object back to the client side which could be used to manipulate the DOM instead of reload but in this case, I left those interfaces alone as the reload had a purpose and the app was simple enough in nature that a reload would not disturb the state of any other components on the page.
* Learned to use all the latest stuff in sequelize activities and mashed it up with the handlebars activities piece by piece. All code was typed. No cutting and pasting from Cats activity.
* Used partials in Handlebars
* minimized code in the index view by loading as much static content onto the main layout.
* single page app with no exposed api links => so single routes.js, clean
* code comments in non bolier plate areas
