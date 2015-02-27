# dnaviewer
Browser Based Viewer of DNA

## Instructions

### Installation

- Install [node.js and npm](http://nodejs.org/) (these should automatically add the node and npm to your path).
- Install grunt to the command line tools - from the command line run `npm install -g grunt-cli`
- Install the development dependencies, run: `npm install`
- Install bower `npm install -g bower`
- Install the application dependencies, run: `bower install`

### Running Locally

- Run `grunt serve` to start a development server on [localhost:9000](http://localhost:9000).
- Use the [livereload extension for Chrome](https://chrome.google.com/webstore/detail/jnihajbhpnppcggbcgedagnkighmdlei) to automatically refresh the page when files are changed.

### Running Tests

- Run `grunt serve` and navigate to [localhost:9000/test.html](http://localhost:9000/test.html) to see the tests in action. Use this with livereload to continuously run the tests in a seperate tab.
- Alternatively run `grunt test` to run the tests from the command line using phantomjs.

## Discussion

I tried to create a simple and immersive experience for the user to explore the features. I did this by making the svg diagram full screen and floating the pages elements over the diagram with a slight opacity. This allows the user to get a top level overview and dive into diagram by selecting a feature. I'm not sure if this will result in the best productivity, but it was a fun experiment and I feel like it allows for fast exploration of the molecule.

Unfortunately, choosing to render the SVG as full screen meant the background path and layouts had to be responsive. I created a single view model to 
handle this and also figure out where to position the individual features. This worked well with D3 I think. I'd be interested to hear your thoughts 
on how the application is structured. I find that sometimes the main d3 view can become unwieldy. This single file could be seperated out into the different
aspects of the diagram but they will still essentially be controlled by the same view.

Features can be selected from the table and can be filtered. The dna-inspector controller maintains the view models for the features and controls selection / filtering. Other controllers reference this controller and use the view models. This keeps everything bound together without polluting the model classes.

Some other components I would implement if I had a sweet job at Desktop Genetics:

-	Show another panel with the details of the selected feature, and allow the user to edit them (I was unsure what details to show and what should be editable).
-	Show more information directly on the diagram. It would be interesting to find out what the users find interesting and what they would like to see.
-	Click + drag & scroll to zoom control from the mouse so the user can explore the diagram without using the features.
-	Add a minimize button on all the floating panels (table / future detail widget).
