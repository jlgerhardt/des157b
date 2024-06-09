// import Runtime from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
// import define from "https://api.observablehq.com/d/a4f56aee7c678f0b@212.js?v=4";



// function _1(md){return(
//     md`<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Zoom to bounding box</h1><a href="https://d3js.org/">D3</a> › <a href="/@d3/gallery">Gallery</a></div>
    
//     # Zoom to bounding box
    
//     Pan and zoom, or click to zoom into a particular state using [*zoom*.transform](https://d3js.org/d3-zoom#zoom_transform) transitions. The bounding box is computed using [*path*.bounds](https://d3js.org/d3-geo/path#path_bounds).`
//     )}
    
//     function _chart(d3,topojson,us)
//     {
//       // Define the width and height of the SVG container
//       const width = 975;
//       const height = 610;
    
//       // Define the zoom behavior, limiting the scale from 1 to 8
//       const zoom = d3.zoom()
//           .scaleExtent([1, 8])
//           .on("zoom", zoomed);
    
//       // Create an SVG element with specified width and height
//       const svg = d3.create("svg")
//           .attr("viewBox", [0, 0, width, height])
//           .attr("width", width)
//           .attr("height", height)
//           .attr("style", "max-width: 100%; height: auto;")
//           .on("click", reset);
    
//       // Create a geo path generator
//       const path = d3.geoPath();
    
//       // Append a group element to the SVG for map elements
//       const g = svg.append("g");
    
//       // Append a group for state paths
//       const states = g.append("g")
//           .attr("fill", "#272727")
//           .attr("cursor", "pointer")
//         .selectAll("path")
//         // Bind state data to path elements
//         .data(topojson.feature(us, us.objects.states).features)
//         // Enter selection to create path elements
//         .join("path")
//           // Add click event listener
//           .on("click", clicked)
//           // Generate path for each state
//           .attr("d", path);
      
//       // Add title element to each state path
//       states.append("title")
//           .text(d => d.properties.name);
    
//       // Add boundary path for states
//       g.append("path")
//           .attr("fill", "none")
//           .attr("stroke", "white")
//           .attr("stroke-linejoin", "round")
//           // Generate path for state boundaries
//           .attr("d", path(topojson.mesh(us, us.objects.states, (a, b) => a !== b)));
    
//       // Call zoom behavior on SVG
//       svg.call(zoom);
    
//       // Function to reset zoom and state highlighting
//       function reset() {
//         states.transition().style("fill", null);
//         svg.transition().duration(750).call(
//           zoom.transform,
//           d3.zoomIdentity,
//           d3.zoomTransform(svg.node()).invert([width / 2, height / 2])
//         );
//       }
    
//       // Function called when a state is clicked
//       function clicked(event, d) {
//         const [[x0, y0], [x1, y1]] = path.bounds(d);
//         event.stopPropagation();
//         states.transition().style("fill", null);
//         d3.select(this).transition().style("fill", "#2192FC");
//         svg.transition().duration(750).call(
//           zoom.transform,
//           d3.zoomIdentity
//             .translate(width / 2, height / 2)
//             .scale(Math.min(8, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height)))
//             .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
//           d3.pointer(event, svg.node())
//         );
//       }
    
//       // Function called when zoom event occurs
//       function zoomed(event) {
//         const {transform} = event;
//         g.attr("transform", transform);
//         g.attr("stroke-width", 1 / transform.k);
//       }
    
    
//       // Reset zoom and state highlighting when "Escape" key is pressed
//       window.addEventListener("keydown", function(event) {
//         if (event.key === "Escape") {
//           reset();
//         }
//       });
    
//       // Return the SVG node
//       return svg.node();
//     }
    
    
//     function _us(FileAttachment){return(
//     FileAttachment("data/states-albers-10m.json").json()
//     )}
    
//     export default function define(runtime, observer) {
//       const main = runtime.module();
//       const fileAttachments = new Map([
//         ["states-albers-10m.json", {url: "https://static.observableusercontent.com/files/75faaaca1f1a4f415145b9db520349a3a0b93a53c1071346a30e6824586a7c251f45367d9262ed148b7a2b5c2694aa7703f3ac88051abc65066fd0074fdf9c9e", mimeType: "application/json"}]
//       ]);
//       main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
//       main.variable(observer()).define(["md"], _1);
//       main.variable(observer("chart")).define("chart", ["d3","topojson","us"], _chart);
//       main.variable(observer("us")).define("us", ["FileAttachment"], _us);
//       return main;
//     }

/*---------------------------------------------------------WORKING CODE-----------------------------------------------------------*/

let statesToColor = [];
let updateStateColors;

//Wait for the DOM content to be fully loaded before executing any JavaScript
document.addEventListener("DOMContentLoaded", function() {

  //Define the dimensions of the SVG container
  const width = 975;
  const height = 610;

  let states;

  // Function to handle zoom event
  function zoomed(event) {
    const { transform } = event;   // Destructure the 'transform' property from the 'event' object
    g.attr('transform', transform);   // Apply the zoom transformation to the group containing map elements
    g.attr('stroke-width', 1 / transform.k);   // Adjust the stroke width based on the current zoom scale
  }

  // Define the zoom behavior with scale extent and event event listener
  const zoom = d3.zoom()
    .scaleExtent([1, 8])
    .on('zoom', zoomed);

      // Function to reset zoom and state highlighting
    function reset() {
      // states.transition().style('fill', null);   // Reset the fill style of all states to null

        // Perform a transition on the SVG to reset the zoom and pan
      svg.transition().duration(750).call(
            // Call the zoom behavior to transform the SVG
        zoom.transform,

            // Reset the zoom to identity transformation
        d3.zoomIdentity,

            // Calculate the inverted transformation to center the map
        d3.zoomTransform(svg.node()).invert([width / 2, height / 2])
      );
    }

  //Select the div with the specified ID and append an SVG element to it
  const svg = d3.select('#observablehq-chart-0997c195').append('svg')
    .attr('viewBox', [0, 0, width, height]) //Set the viewBox attribute
    .attr('width', width) // Set the width attribute
    .attr('height', height) //Set the height attribute
    .attr('style', 'max-width: 100%; height: auto;') //Set the CSS style
    .on('click', reset); //Attach click event listener

    // Create a GeoPath generator
  const path = d3.geoPath(); // This creates a path generator for GeoJSON data
 
  //Append a group element to the SVG for containing map elements
  const g = svg.append('g'); // This creates a new <g> element within the SVG for grouping map elements

    // Define the array of states to change the color
    // const statesToColor = ['California', 'Texas', 'New York']; // Example states

    // Function to update the fill color of specific states
    updateStateColors = function() {
      states.each(function(d) {
        if (statesToColor.includes(d.properties.name)) {
          d3.select(this).style('fill', 'red'); // Change the fill color
        }
      });
    }

  //Load GeoJSON data asynchronously
  d3.json('data/states-albers-10m.json').then(data => {
     states = g.append('g')   // Append a <g> element to the <g> element within the SVG to contain map elements
      .attr('fill', '#272727') // Set fill color
      .attr('cursor', 'pointer') // Set cursor style
      .selectAll('path') // Select all path elements

          // Bind GeoJSON data to path elements
      .data(topojson.feature(data, data.objects.states).features) 
      
      // Enter selection to create path elements
      .join('path')
      .on('click', clicked) // Attach click event listener
      .attr('d', path); // Set path attribute

    
      // Append a <title> element to each state path for tooltips
    states.append('title')
      .text(d => d.properties.name); // Set the text of the title element


    // Append a <path> element to the SVG for state boundaries
    g.append('path')
      .attr('fill', 'none') // Set fill color to none
      .attr('stroke', 'white') // Set stroke color
      .attr('stroke-linejoin', 'round') // Set line join style

          // Generate path for state boundaries using mesh
      .attr('d', path(topojson.mesh(data, data.objects.states, (a, b) => a !== b)));
      
    // Call the zoom behavior on the SVG
    svg.call(zoom);

    updateStateColors();

    function clicked(event, d) {
      const [[x0, y0], [x1, y1]] = path.bounds(d);
      event.stopPropagation();
      console.log(`State clicked: ${d.properties.name}`);
      displayStateInfo(d.properties.name);
      // states.transition().style('fill', null);
      d3.select(this).transition().style('fill', 'red');
      svg.transition().duration(750).call(
        zoom.transform,
        d3.zoomIdentity
          .translate(width / 2, height / 2)
          .scale(Math.min(8, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height)))
          .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
        d3.pointer(event, svg.node())
      );
    }


  //-------------------------ESCAPE PRESS EVENT RESET-------------------------

    window.addEventListener('keydown', function(event) {
      if (event.key === 'Escape') {
        reset();
      }
    });
  });

  //-------------------------DISPLAY STATES DATA ON CLICK-------------------------

    d3.json('data/states.json').then(data => {
      stateData = data.reduce((acc, state) => {
          acc[state.name] = state;
          return acc;
      }, {});
  });

  function displayStateInfo(stateName) {
      const state = stateData[stateName];
      if (state) {
          const infoDiv = document.getElementById('state-info');
          infoDiv.innerHTML = `
              <p>
              <strong>Information about ${state.name}:</strong><br>
              Capital: ${state.capital}<br>
              Population: ${state.population.toLocaleString()}<br>
              Area: ${state.area.toLocaleString()} sq mi<br>
              Total Cost of Living: ${state.total_cost_of_living}<br>
              
              
              
              </p>
          `;
      } else {
          console.log(`No data available for ${stateName}`);
      }
  }
  });
