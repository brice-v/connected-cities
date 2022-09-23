# Connected Cities

Suppose an application is initialized with a string containing the pairs of city names, one pair per line, with the names on each line separated by a comma.  The string might look something like:

```
    Philadelphia, Pittsburgh
    Boston, New York
    Los Angeles, San Diego
    Hartford, New York
    New York, Croton-Harmon
    St. Petersburg, Tampa
```

Each line of the string indicates that it is possible to travel between two cities named. (More Formally, if we think of the cities as nodes in a graph, each line of the file specifies an edge between two nodes.)

In the example above it is possible to travel between Boston and New York, and also between Hartford and New York, so it follows that Boston and Hartford are connected.  On the other hand, there is no path between Boston and Tampa, so they are not connected.

## Desired Outcome

Write a program (in node or in the browser) that is initialized via such a string and outputs whether two additionally specified cities are connected.

This can be done as interactively or as simply as possible.  For example, anything from a group of input fields on a web page and an alert output, to a node application reading in a file and two city names and outputting the result to the console. The key is how you organize and present your code.

### Minimum Requirements

* Instructions for running and example usage for checking if two cities are connected
* Try and make running and testing as easy as possible
* Unit test code and instructions on how to run them

#### Note

* Commas will not appear within city names in the file. For example, "Washington, DC." will not appear in the file as a city name
* Algorithms and data structures should allow the program to handle and arbitrarily large input string efficiently
* Program is permitted to return any or no output when given malformed input
    * it shoud not crash or terminate unexpectedly
* File is considered to be a list of all connections, not all cities
    * a city not in the file is connected to no other city
* Production quality code