# ProgrammingProject

* Name: Floris Holstege
* Student ID: 12002151

To finish my minor in programming, I am working on a project for the month of January.  
This repository will include my progress and ultimately display the final result. 

Link to Product Demo: https://youtu.be/HrYxJeYMWLQ

## The project 

The visualisation aims to inform consumers about chosen variables that they deem important for the decision to buy a house. It will do so through an interactive map, accompanied by several graphs. 

### The problem 

When consumers or investors currently decide to buy a house, it is hard to easily compare different houses. Sites such as funda.nl or pararius.nl provide information about individual houses, but do not compare similar houses. This is problematic, since they might have been better off buying a different house they were unaware of. An visualisation that summarises the available information can solve this lack of comparison. 

### The Database 

I have the permission to work with a database from the ICT partner of Vastgoedfonds Nederland (A real estate fund). It contains the following information from houses that are up for sale in the Netherlands: longitude, latitude, address, price, building year, living area, garden (boolean), house type (villa, bungalow etc), neighbour type (attached, detached), isolation (boolean), energy label, roof type, sanitary services, availability and the amount of floors. 

Vastgoedfonds Nederland uses propietary statistical methods to select small sets of houses from this databas based on user enquiries. I have been asked to create a visualisation based on this small set using D3 (Javascript). It is important to clarify that I will not receive compensation or supervision. Vastgoedfonds Nederland is excited to see what I come up with, and hopes that this visualisation can be used to better inform both consumers and investors.

Ultimately, the visualisation should work for every susbet of the dataset, so that users when users search for a house they can receive a tailored visualisation. Searching for houses happens at http://woningwaarde.database.nl/, and based on the search query a subset of the dataset is made. 

### The visualisation 

The first component of the visualisation is an interactive map. Users can click on houses on this map, and subsequently receive information about the house through a tooltip. The map will be created using the Mapbox library. 

The second component of the visualisation is a scatterplot. The scatterplot shows all the houses from the subset of the dataset. The variables of the scatterplot can be decided by the user through a dropdown menu. Through these datapoints, a moving average line is drawn. When a user clicks on a house on the scatterplot, this house will be highlighted on the map. This also happens the other way around. By going over the house in the scatterplot, a tooltip will tell the address of the house. 

The third component is a table. This table will contain the categorical variables, such as energy label, isolation, neighbour type, house type, and garden. By clicking on houses in the map, users can add houses to the table to compare them. Users can delete entries from the table by clicking on a checkbox. 

The fourth component is a barchart. This chart will compare the continuous variables of the subset of houses. Users can pick a variable to depcit on the barchart. If the house is not represented in the barchart yet, it will be added when clicked on the map. By clicking, users can also remove bars. 

The above components fulfill the minimum viable product criterion (and the project requirements). If these are fulfilled, new visualisations and other forms of interactivity can potentially be added. The site will be in Dutch, since this is the native language of the customer base of Vastgoed Fonds Nederland. 

## Acknowledgement

The database and the server its on are managed by Menno Schellekens. 

## Installation 

Due to some constraints on the database, this site cannot function through a github page. Rather, if you are interested in the features of the website, you should clone this repository, and run a local server at its root. 

## Libraries 

* D3.v4 
* Mapbox 
* Bootstrap
* D3 - tip  
* D3 - Queue 
* Jquery 
* Axios 
* Amplify.js 

















