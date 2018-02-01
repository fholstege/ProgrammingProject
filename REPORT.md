# Report 

## The website 

This website allows users to compare different houses that are up for sale on pararius.nl. Users can fill in an address, and the website will generate four visualisations accordingly: An interactive map, barchart, scatterplot and table. 

![The website](https://github.com/fholstege/ProgrammingProject/blob/master/doc/pictures_process/final_version.png) 

## The design 

I will discuss the design in two parts. First, how do the different components interact. Second, for each individual document, what are the most significant functions. 

### The components

First, there is a set of documents that create a map (map.html, map.js, map.css). Map.thml is then placed into visualisation.html in order to create an interactive map. The subsequent files discussed are all related to creating the final visualisation. Second, there is a set of .js files. First, there is functions.js. This document includes several helper functions for subsequent .js files and their respective functions. Second, barchart.js in which the relevant functions for the barchart are defined. Third, scatter.js which contains functions for the scatterplot. Fourth, the functions that are related to the table are defined in table.js. Fifth, initialize.js contains several functions that create components of the webpage, such as a legend or buttons. Finally, there is index.js in which the functions defined in previous documents are called in a specific order, so that the page works. Third, there are two complementary files to create the webpage. The first of these is visualisation.html, in which libraries are included for subsequent.js files, and several parts of the webpage are pre-defined (for example buttons containing explanations of the visualisations, and bootstrap containers). The second of these is visualisation.css, in which the style attributes of visualisation.html are given. Finally, the LIBRARIES folder contains several libraries that are used by other files, such as d3.v4 and jquery. 


#### The documents 

map.js 
- check_map is a workaround to check if the data on visualisation.html has changed * 
- makemap removes the old map, creates a new one, and puts markers for each house, colouring these accordingly. It does so using the Mapbox library and its syntax. 

functions.js
- moving_average is a function that determines the moving average for a list of observations
- prepare_average_data prepares data to be inserted into moving_average 
- prototype.splice allows users to insert strings into other strings. This is useful for the API request based on user address. 
- There is an range of functions that is used to colour different components of the visualisation: colour_map, colour_table, colour_scatter, colour_barchart. Their counterparts are made to remove colours if need be. 

barchart.js 
- draw_barchart creates the static parts of the barchart that need not be updated
- update_barchart creates the dynamic parts of the barchart that will be updated 

scatter.js 
- draw_scatter creates the static parts of the barchart that need not be updated
- update_scatter creates the dynamic parts of the barchart that will be updated 

table.js 
- draw_table creates the static parts of the barchart that need not be updated
- update_table creates the dynamic parts of the barchart that will be updated 

initialize.js
- create_legend adds a legend to the map 
- create_buttons adds interactive buttons to the map 
- initialize_charts is a function that calls on all the draw functions (draw_scatter, draw_bar, etc.) and adds the title to the page. It is therefore a function in which all the parts of the page are created that are required before the visualisation can be updated. At the end of the function, these parts are hidden to make sure the user only sees the loading screen. 

index.js
- amplify.store is used to reset the page, and remove previously used data. 
- loadscreen creates a loading screen that will be displayed until the user succesfully searches a house
  after loadscreen, calls on initalize_charts
- ensures that after user clicks submit, the address is taking from the form. 
- get_data is used to acquire data based on an address. This happens in a two step process.

1) According to an address, a token is acquired. 

2) Using that token, a subset of houses is acquired. This subset is selected using proprietary statistical methods, and returns a JSON in which each entry represents a house. 

- after the data has been retrieved, update_charts is called on. This function attached the new data to the interactive map, and contains all of the other update functions.


### The data 

I have the permission to work with a database from the ICT partner of Vastgoedfonds Nederland (A real estate fund). It contains the following information from houses that are up for sale in the Netherlands: longitude, latitude, address, price, building year, living area, garden (boolean), house type (villa, bungalow etc), neighbour type (attached, detached), isolation (boolean), energy label, roof type, sanitary services, availability and the amount of floors. Over the course of the project, I did not receive compensation or supervision from Vastgoedfonds Nederland. 

The important bit to tell is that I, in collaboration with the administrator of the dataset, changed the names of a variety of variables in order to make them more suitable for visualisation. For example, "Soort Appartement" used to be soort.appartement, which is less pretty to show in a table. 


## Challenges

There are a three challenges that I want to highlight. 

First, making one html interactive with another. This already proved to be a challenge in the beginning, since it was hard to find a way in which the user could select elements on another HTML page. This ultimately was possible, but there was an other part to it that was much harder. This was to make the map.html respond to the submit button on visualiation.html. The submit button changes the data for the barchart, scatter and table, but its quite hard to change the data attached to an .js file on another html page. If I would have had the time, I would have written a python backend using flask to account for this. For now, I settled with using amplify.js. This library provides a unified api where one can store data across multiple files. When the submit button is pressed, the data is stored using amplify, and accessed on map.js. The problem is that because of the asynchronous nature of javascript, one has to constantly check if the data has changed. This is done using setInterval, meaning both map.js and index.js check each five seconds if the data has changed. This is certainly not the prettiest way of making the pages interactive, but is one that is working for now. In hindsight, I should have earlier started thinking about using python, instead of trying to make it work with Javascript. This would have given me enough time to implement a backend, and ultimately have given me a more efficient solution. 

Second, taking the user into account. Ultimately, this page is meant to be used by consumers and investors. That means its needs to be as intuitive as possible. Throughout the creation of the page, I found myself making certain decisions about the design of the page, that on reflection did not improve user experience. For example, I initially wanted to also colour houses according to the value of a particular variable. But this would make the interactive map a lot messier, since then the user also needs to deal with this colour scheme in addition to the colours used to highlight particular houses on the map. Only at the very end realised that certain interactive elements are directly intuitive, although they felt intuitive to me. For example, there is no inherent reason why a house would only dissapear from the selection if you click on it on the barchart, but not on the scatterplot. The experience of trying to stand in the shoes of users, and to think about what would make most sense to them was a very useful one. If I had more time, I would have gathered feedback from a wider range of people, instead of a handful of friends. 

Third, there are particular parts of the code that could have been designed more effectively. For example, I could have put more of the colour and remove colour functions together. The challenge here is as follows: I wanted to later design these functions more effectively, but because other parts of the code were based on the original design, this ultimately ended up taking much more work than expected. The result of this was that I ultimately had too little time to redesign every part that I wanted. The lesson here is that before one continues with a different file or component, one needs to think about effective design first, because it will be much harder to change the code later on.

