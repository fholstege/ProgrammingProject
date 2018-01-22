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

Struggles: 
So far no hardship. 

### Day 2

Progress:  
Project proposal passed. Created map with markers, and put this map as iframe on another HTML. 

Design:  
Decided to initially depict the houses as grey circles. I personally find having a lot of different colours on a single map quite distracting. I knew that other components would require the map to be coloured, so therefore decided to keep the original colour of the houses quite plain. 

Struggles: 
Initially found it hard to enable the user select elements that were in an Iframe. 

### Day 3

Progress: 
Overcame challenge an made it possible for users to select houses on Iframe. Handed in Design document. Created barchart that is interactive with the map. 

Design:  
Decided to colour the barchart steelblue, and make colour houses that are depicted on the barchart with the same colour. 

Struggles: 
The division of space on the webpage between the map and barchart is a difficult design issue. Do you make the map smaller to allow a more appealing version of the barchart, or do you enlarge the map to enable the user to see each house clearly. 

### Day 4

Progress: 
Added dropdown menu to select variables on the barchart, and added interactive table with bootstrap.

Design:  
Created dropdown menu in similar colour as the barchart. Dropdown menu slightly overlaps with barchart's svg, but does not hurt how the barchart looks. 

Struggles: 
Had to change the names of some variables in the dataset to enhance the titles on the X and Y axis. Required some editing of the dataset, but nothing significant. 

### Day 5

Progress: 
Created possibility to track houses with the mouse. Houses will now colour red on both the map and the barchart when a user hovers over their mouse on either a house or a bar. 

Design:  
Got some useful feedback from peers on the design. Decided to make houses sligtly bigger, as well as giving each circle depicting a house a black border. 

Struggles: 
My initial plan was to colour houses according to a certain variable e.g make houses more yellow if they are older, and more blue if they are recently built. However, this potentially makes the map very messy, since selecting houses also now happens with colouring. Discusses other options such as enlarging selected houses, or changing their borders. Neither of these is really satisfying. Enlarging houses would ensure other houses are harder to depict on the map, and borders are hard to be seen by the user. 


### Day 6 

Progress:
Added yellow colour for house that the user initially has searched. Made it possible to delete houses from the selection on the map and barchart by clicking on the bars. 

Design: 
It is important that the user can track which house they initially searched. Giving it a distinct colour like yellow makes this easy. 

Struggles: 
No hardship for today. 

### Day 7 

Progress:
Added scatterplot. Also enabled users to select X and Y variable.

Design: 
Decided to put the scatterplot underneath the map, with the barchart on the right. 

Struggles: 


### Day 8 

Progress: 
Added moving average line for scatterplot. Made scatterplot interactive with both the barchart and the map e.g houses highlighted on one of these graphs will also be highlighted on the other. 

Design: 
Considering to remove the moving average line for certain variables, since it is not very accurate and therefore looks strange. 


### Day 9 

Progress: 
Added ability for users to see the building year of each house. This required some scale changes.

Design:  
Added legend, and highlighted the house the user has searched for as yellow. This should make it easy for the user to follow the house they looked up. 

### Day 10 

Progress: 
Implemented bootstrap containers to divide the four parts of the visualisation. 

Design: 
Bootstrap containers ensure a better division of the page between the for visualisations. 

Struggles: 
Unable to create a tooltip for the map. 



