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
      d3.select(this).transition().style('fill', 'blue');
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
              <div class="state-info">
              
              <strong>${state.name} Information</strong><br>

              <section>
              <p>
              -General Information<br>
              Capital: ${state.capital}<br>
              Population: ${state.population}<br>
              Area: ${state.area}<br>
              </p>
              </section>

              <section>
              <p>
              -Major Cost Information<br>
              Cost of Living: ${state.total_cost_of_living}(#${state.total_cost_of_living_ranking})<br>
              Disposable Income: ${state.total_disposable_income}(#${state.disposable_income_ranking})<br>
              Annual Avg Wage: ${state.annual_average_wage}(#${state.wage_rank})<br>
              </p>
              </section>

              <section>
              <p>
              -Additional Cost Information<br>
              Avg Rent: ${state.average_rent}(#${state.rent_rank})<br>
              Food: ${state.food}<br>
              Avg Transportation Cost: ${state.average_transportation_cost}(#${state.transportation_rank})<br>
              </p>
              </section>

              </div>
          `;
      } else {
          console.log(`No data available for ${stateName}`);
      }
  }
  });
