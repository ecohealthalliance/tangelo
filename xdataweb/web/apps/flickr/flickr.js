flickr = {};
flickr.map = null;

function getLocations(){
    // TODO(choudhury): replace the following line with code to collect together
    // the filtering operations from the various UI elements on the page, then
    // issue a database search command to retrieve the appropriate location
    // data.
    flickr.map.locations([10, 20, 30]);

    // After data is reloaded to the map-overlay object, redraw the map.
    flickr.map.draw();
}

function GMap(elem, options){
    // Create the map object and place it into the specified container element.
    var map = new google.maps.Map(elem, options);

    // Record the container element.
    this.container = elem;

    // Store a null 'overlay' property, which will be filled in with a
    // transparent SVG element when the overlay is sized and placed in the
    // draw() callback.
    this.overlay = null;

    this.setMap(map);
}

window.onload = function(){
    // TODO(choudhury): Probably the GMap prototype extension stuff should all
    // go in its own .js file.
    //
    // Equip ourselves with the overlay prototype.
    GMap.prototype = new google.maps.OverlayView();

    // Implement the callbacks for controlling the overlay.
    //
    // onAdd() signals that the map's panes are ready to receive the overlaid
    // DOM element.
    GMap.prototype.onAdd = function(){
        console.log("onAdd()!");

        // Grab the overlay layer element, wrap it in a D3 selection, and add
        // the SVG element to it.
        var overlayLayer = this.getPanes().overlayLayer;
        var svg = d3.select(overlayLayer).append("svg")
            .style("fill", "white")
            .attr("width", this.container.offsetWidth)
            .attr("height", this.container.offsetHeight);

        svg.append("g")
            .attr("id", "markers");

        // Record the SVG element in the object for later use.
        this.overlay = svg.node();
    }

    // draw() sizes and places the overlaid SVG element.
    GMap.prototype.draw = function(){
        console.log("draw()!");

        // Just for fun add some circles to the SVG element.
        var markers = d3.select(this.overlay).select("#markers");
        markers.selectAll("circle")
            .remove();

        var that = this;
        markers.selectAll("circle")
            .data([1,2,3,4,5,6])
            .enter()
            .append("circle")
            .style("fill", "pink")
            .style("fill-opacity", 0.6)
            .style("stroke", "red")
            .style("opacity", 0.0)
            .attr("cx", function() { return Math.random() * that.container.offsetWidth; })
            .attr("cy", function() { return Math.random() * that.container.offsetHeight; })
            .attr("r", 25)
            .transition()
            .duration(500)
            .style("opacity", 1.0);
    }

    // onRemove() destroys the overlay when it is no longer needed.
    GMap.prototype.onRemove = function(){
        // TODO(choudhury): implement this function by removing the SVG element
        // from the pane.
        console.log("onRemove()!");

    }

    GMap.prototype.locations = function(locs){
        // TODO(choudhury): This function should load the lat/long data in
        // 'locs' into a property, for drawing as markers later.
        $.each(locs, function(value,index){
            console.log(index + ": " + value);
        });
    }

    // Create a range slider for slicing by time.
    var timeslider = rangeSliderInit("time-slider", "low", "high");
    timeslider.setConfig();

    // Attach an action to the "data" button.
    d3.select("#data-button").node().onclick = getLocations;

    // Some options for initializing the google map.
    var options = {
        zoom: 3,
        center: new google.maps.LatLng(65.67, 95.17),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var div = d3.select("#map").node();
    flickr.map = new GMap(div, options);
}
