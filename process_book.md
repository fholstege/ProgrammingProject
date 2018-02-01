# Processbook 

This document describes my daily progress for the project. It will contain for each day: 

I) Summaries of the work done each day.

II) Contemplations about the design of the project.

III) Descriptions of any significant struggles that come up during the project. 

### Day 1 

Progress: 
Finished project proposal. Created initial set-up for Github

Design: 
Made a hand-drawn sketch of the design. Discussed with peers which components to include. 

### Day 2

Progress:  
Project proposal passed. Created map with markers, and put this map as iframe on another HTML. 

Design:  
Decided to initially depict the houses as grey circles. I personally find having lots of different colours on a single map quite distracting. I knew that other components would require the map to be coloured, so therefore decided to keep the original colour of the houses quite plain. 

[first map](https://github.com/fholstege/ProgrammingProject/blob/master/doc/pictures_process/first_map.png)

Struggles: 
Initially found it hard to enable the user select elements that were in an Iframe. It requires selecting the HTML of the map within the HTML of the visualisation. 

### Day 3

Progress: 
Made it possible for users to select houses on Iframe. Handed in Design document. Created barchart that is interactive with the map. 

Design:  
Decided to colour the barchart steelblue, and make colour houses that are depicted on the barchart with the same colour. 

[barchart + map](https://github.com/fholstege/ProgrammingProject/blob/master/doc/pictures_process/map_barchart.png)

Struggles: 
The division of space on the webpage between the map and barchart is a difficult design issue. Making the map smaller allows for a more appealing version of the barchart, but enlarging the map enables the user to see each house clearly.
Decided to give both a quarter of the page.  

### Day 4

Progress: 
Added dropdown menu to select variables on the barchart, and added interactive table using bootstrap.

[table](https://github.com/fholstege/ProgrammingProject/blob/master/doc/pictures_process/first_table.png)

Design:  
Created dropdown menu in similar colour as the barchart. Dropdown menu slightly overlaps with barchart's svg, but does not hurt how the barchart looks. Made sure to put the button in the upper right corner to not overlay with the bars. 

! include screenshot of dropwdown menu

Struggles: 
Had to change the names of some variables in the dataset to enhance the titles on the X and Y axis. Required some editing of the dataset, but nothing significant. 

### Day 5

Progress: 
Created possibility to track houses with the mouse. Houses will now colour red on both the map and the barchart when a user hovers over their mouse on either a house or a bar. 

! include screenshot of mouse on house

Design:  
Got some useful feedback from peers on the design. Decided to make houses sligtly bigger, as well as giving each circle depicting a house a black border. 

Struggles: 
My initial plan was to colour houses according to a certain variable e.g make houses more yellow if they are older, and more blue if they are recently built. However, this potentially makes the map very messy, since selecting houses also now happens with colouring. Discusses other options such as enlarging selected houses, or changing their borders. Neither of these is really satisfying. Enlarging houses would ensure other houses are harder to depict on the map, and borders are hard to be seen by the user. Definitively decided against colouring houses according to a variable. 

### Day 6 

Progress:
Added yellow colour for house that the user initially has searched. Made it possible to delete houses from the selection on the map and barchart by clicking on the bars. 

! include screenshot of legend

Design: 
It is important that the user can track which house they initially searched. Giving it a distinct colour like yellow makes this easy. 
 

### Day 7 

Progress:
Added scatterplot. Also enabled users to select X and Y variable.

Design: 
Decided to put the scatterplot underneath the map, with the barchart on the right. Most users will start off with the barchart since its the easiest to use, hence why it makes sense to put it next to the map so users will immediately see it when they look up a house. 

### Day 8 

Progress: 
Added moving average line for scatterplot. Made scatterplot interactive with both the barchart and the map e.g houses highlighted on one of these graphs will also be highlighted on the other. 

Design:
Considering to remove the moving average line, since it is not very accurate when there are not a lot of observations. However, in the majority of cases more than 30 houses are depicted. In such a case, the moving average line has enough observations to say something about the relationship between particular variables. Therefore, in the majority of cases, the moving average line provides useful insights. 

! include screenshot of moving average line both good/bad

Struggle: 
Had to write own function for the moving average line, since there is no standard for D3. First was unable to make a moving average line was on par with the X-axis, but after some thinking managed to get it right. 


### Day 9 

Progress: 
Added ability for users to see the building year of each house. This required scale changes for all graphs. Although seemingly a simple task, it took longer than expected. 



### Day 10 

Progress: 
Implemented bootstrap containers to divide the four parts of the visualisation. 

Design: 
Again, got some useful pointers for design. Circles are now enlarged when the mouse is on them to make it even more clear which one is selected. 

! include screenshot of the four visualisations combined. 

Struggles: 
Unable to create a tooltip for the map. Cannot use d3.tip since Mapbox will not depict this. Have to figure out the syntax of Mapbox to create a tooltip with addresses. 

### Day 11 

Progress: 
Managed to create tooltip for the map using Mapbox syntax. 

[https://github.com/fholstege/ProgrammingProject/blob/master/doc/pictures_process/tooltip.png]

Struggles:
Currently when graphs are updated, the entire graph is removed and appended again. This makes transitions not very pretty. Need to rewrite all update functions in order to ensure smooth transitions. 

### Day 12 

Progress: 
Met with the administrator of the database I am using. Made some changes to the original database in order to ensure that the labels for each chart would come out better. Subsequently edited code to be complementary with the new structure of the database. 


### Day 13

Progress: 
Rewrote update functions for barchart and scatterplot 

Design: 
Included some specifications to ensure that when a user changes variables for both the barchart and scatterplot, they remain on the same part of the page. This ensures users don't have to scroll after changing variables, and can see the smooth transitions in full force. 

Struggles:
There is no clear example as to writing an update function for a table. Currently figuring out how to do this, examining examples of other update functions


### Day 14

Progress: 
Managed with the help of the TA's to write an update function for the table. 

Design: 
Tested some different sizes for each container. Decided that each visualization gets a quarter of the screen to ensure that the user can see the interactivity between them all. Moreover, it is easier for the user when they don't have to scroll up and down constantly. 

### Day 15

Progress: 
Started working on the ability of users to search different houses. 

Design: 
Contemplated whether or not to create a separate search page, or to create the search function and visualisation on the same page. Decided to put them on the same page instead, since this allows users to quickly switch between looking at different houses. 

Struggles:
Figuring out the syntax regarding API calls in javascript was a bit daunting at first, but I am slowly getting my head around it. Didn't manage to completely finish the search function yet. 

### Day 16

Progress: 
Able to get data of selected houses through typing in an address in the search bar. 

Struggles: 
Worked most of the day on making the HTML page of the map respond to an action on the HTML page of the visualisation. The pretty way to do this would be using a backend, for example the flask framework of Python. Given time constraints, I decided to use amplify.js to I) pass the data of a house to the map HTML and II) to make the map respond to users typing in an address. This is however, a work around, and after handing in the project I will likely take the time to do this in a less crude way. 


### Day 17

Progress: 
Created a title and prettier searchbar for the website. Worked on a loading screen that updates the user at different stages of creating the visualisation. 

Design: 
Decided to keep the overall design of the website quite simple, with a white background. This is because a white background does not distract the user with extreme colours. On the other hand, the visualisation should use bright colours to highlight important bits, such as the searched house and which houses are selected. 

### Day 18 

Progress: 
Added question buttons to the page, so that users can get instructions. Debugged the website by trying a wide variety of houses, and multitude of combinations of house queries. Enhanced code, for example a callback when the address of the house cannot be found. 


### Day 20








