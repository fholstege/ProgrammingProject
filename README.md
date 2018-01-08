# ProgrammingProject

* Name: Floris Holstege
* Student ID: 12002151

To finish my minor in programming, I need to create a programming project. 
This repository will include my progress and ultimately display the final result. 

# The project 

The visualisation aims to inform consumers about chosen variables that they deem important for the decision to buy a house. It will do so through an interactive map, accompanied by several graphs. 

## The problem 

When consumers currently need to decide to buy a house, it is almost impossible to easily compare different houses. Sites such as funda.nl provide accurate information about individual houses, but do not compare one house with another. This is problematic, since this consumers might have been better off buying a different house they were simply unaware of. An visualisation that summarises the available information can solve this lack of comparison. 

## The Database 

I have the permission to work with a database from the ICT partner of Vastgoedfonds Nederland (A real estate fund). It contains the following information from houses that are up for sale in the Netherlands: longitude, latitude, address, price, building year, living area, garden (boolean), house type (villa, bungalow etc), neighbour type (attached, detached), isolation (boolean), energy label, roof type, sanitary services, availability and the amount of floors. 

Vastgoedfonds Nederland uses propietary statistical methods to select small sets of houses from this databas based on user enquiries. I have been asked to create a visualisation based on this small set using D3 (Javascript). It is important to clarify that I will not receive compensation or supervision. Vastgoedfonds Nederland is excited to see what I come up with, and hopes that this visualisation can be used to better inform consumers.  

Ultimately, the visualisation should work for every susbet of the dataset, so that users when users search for a house they can receive a tailored visualisation. Searching for houses happens at http://woningwaarde.database.nl/, and based on the search query a subset of the dataset is made. 

## The visualisation 

The first component of the visualisation is an interactive map. Users can click on houses on this map, and subsequently receive information about the house through a tooltip. The map will be created using the Mapbox library. 

The second component of the visualisation is a scatterplot. The scatterplot shows all the houses from the subset of the dataset. The variables of the scatterplot can be decided by the user through a dropdown menu. Examples include building year on the X axis and Price per m2 on the Y axis. Through these datapoints, a line of best fit is drawn.

When a user clicks on a house on the scatterplot, this house will be highlighted on the map. This also happens the other way around, so when a user clicks on a house on the map this house is highlighted in the scatterplot. By going over the house in the linegraph, a tooltip will tell the address of the house. 

The third component is a table. This table will contain the categorical variables, such as energy label, isolation, neighbour type, house type, and garden. By clicking on houses in the map, users can add houses to the table to compare them. Users can delete entries from the table by clicking on a checkbox. 

The fourth component is a barchart. This chart will compare the continuous variables of the subset of houses. Users can pick a variable to depcit on the barchart. If the house is not represented in the barchart yet, it will be added when clicked on the map. Through a checkbox, users can also remove bars.

The above components fulfill the minimum viable product criterion (and the project requirements). If these are fulfilled, new visualisations and other forms of interactivity can potentially be added.

## Sketch 

![sketch](doc/sketch.png)



## Purpose 

This visualisation provides important insights to consumers. For example, consumers are able to see if they are paying too much for the living area that they are getting, and if there are cheaper alternatives nearby that fit their criteria. 


## Libraries 

* D3
* Mapbox 
* Bootstrap 

















