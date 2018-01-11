# Design Document 

This document aims to highlight the technical components of my project. 
It will do so by going over each component of the visualisation, indicating possible challenges. 
Advisable to first read the README.md to understand the project, and the purpose of each component. 

## The database

As mentioned in README.md, I received a subset of a database from Vastgoed Nederland. When consumers look up a house on http://woningwaarde.database.nl/, Vastgoed Nederland picks a subset of houses that are comparable to this house. It does so using propietary statistics. My task is to create a visualisation for any subset. The subset I received are comparable houses to the Nicholaas Ruyverstraat 77. Once I create a succesful visualisation for this subset, we will test if the visualisation works for other subsets. There are two Json files under data. The first is the available data for Nicholaas Ruyverstraat 77, the second is for the houses comparable to Nicholaas Ruyverstraat 77. 

From these two files, a single dataset containing all the houses will be created. The vast majority of variables in the dataset will be used, except for a few where there is not enough available data. This might seem like an overload, but since users can select themselves which variables they want to depict, it should not be too confusing. 

## The map 

The map is created using Mapbox library, and depicted through an Iframe on another webpage. This is to ensure that the map is only part of the webpage, allowing space for other plots and graphs. However, this creates a couple of difficulties. It is harder to attach events to elements on the map because it is in an Iframe. This is not impossible since both HTML pages are on the same domain, but requires some extra effort. Potentially will need Jquery for this task. It also makes linking the observations from the map to observations on the other plots slightly harder, because the dataset is spread over two pages. 

## The scatterplot

There are two parts of this scatterplot that make it slightly different than ones that I have built before. First, users should be able to pick the x and y variable. This requires some additional effort, but is very doable. Secondly and more importantly, it is my aim to draw a line of best fit in the scatterplot. This is not necessary, but can be very beneficial to users since they can see if houses are better or worse than the general trend. I am not sure if this is easy/doable with D3, and would like some input from the TA's. 

## The Barchart and the table. 

The simplest component of the project. Users can choose which continuous variable they want to depict on the barchart. They should also be able to delete charts by clicking a checkbox. I was wondering however, whether or not instead of a checkbox, it is possible to simply put crosses/delete marks underneath the barchart. Clicking these would make the bar as well as the mark dissapear. Users can choose which categorical variable they want to depict on the table. The same challenge as with the barchart comes to mind here: It seems prettier to have crosses/delete marks next to the rows of the table instead of a checkbox. Importantly, both the barchart and the table are interactive with the map. Users can add bars/rows by clicking on a house on the map. 

## Libraries 

* D3.v4
* Mapbox
* Bootstrap
* D3 - tip
* D3 - Queue
* Jquery





 































