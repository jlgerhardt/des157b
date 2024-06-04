// import Runtime from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
// import define from "https://api.observablehq.com/d/a4f56aee7c678f0b@212.js?v=4";



function _1(md){return(
    md`<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Zoom to bounding box</h1><a href="https://d3js.org/">D3</a> › <a href="/@d3/gallery">Gallery</a></div>
    
    # Zoom to bounding box
    
    Pan and zoom, or click to zoom into a particular state using [*zoom*.transform](https://d3js.org/d3-zoom#zoom_transform) transitions. The bounding box is computed using [*path*.bounds](https://d3js.org/d3-geo/path#path_bounds).`
    )}
    
    function _chart(d3,topojson,us)
    {
      // Define the width and height of the SVG container
      const width = 975;
      const height = 610;
    
      // Define the zoom behavior, limiting the scale from 1 to 8
      const zoom = d3.zoom()
          .scaleExtent([1, 8])
          .on("zoom", zoomed);
    
      // Create an SVG element with specified width and height
      const svg = d3.create("svg")
          .attr("viewBox", [0, 0, width, height])
          .attr("width", width)
          .attr("height", height)
          .attr("style", "max-width: 100%; height: auto;")
          .on("click", reset);
    
      // Create a geo path generator
      const path = d3.geoPath();
    
      // Append a group element to the SVG for map elements
      const g = svg.append("g");
    
      // Append a group for state paths
      const states = g.append("g")
          .attr("fill", "#272727")
          .attr("cursor", "pointer")
        .selectAll("path")
        // Bind state data to path elements
        .data(topojson.feature(us, us.objects.states).features)
        // Enter selection to create path elements
        .join("path")
          // Add click event listener
          .on("click", clicked)
          // Generate path for each state
          .attr("d", path);
      
      // Add title element to each state path
      states.append("title")
          .text(d => d.properties.name);
    
      // Add boundary path for states
      g.append("path")
          .attr("fill", "none")
          .attr("stroke", "white")
          .attr("stroke-linejoin", "round")
          // Generate path for state boundaries
          .attr("d", path(topojson.mesh(us, us.objects.states, (a, b) => a !== b)));
    
      // Call zoom behavior on SVG
      svg.call(zoom);
    
      // Function to reset zoom and state highlighting
      function reset() {
        states.transition().style("fill", null);
        svg.transition().duration(750).call(
          zoom.transform,
          d3.zoomIdentity,
          d3.zoomTransform(svg.node()).invert([width / 2, height / 2])
        );
      }
    
      // Function called when a state is clicked
      function clicked(event, d) {
        const [[x0, y0], [x1, y1]] = path.bounds(d);
        event.stopPropagation();
        states.transition().style("fill", null);
        d3.select(this).transition().style("fill", "#2192FC");
        svg.transition().duration(750).call(
          zoom.transform,
          d3.zoomIdentity
            .translate(width / 2, height / 2)
            .scale(Math.min(8, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height)))
            .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
          d3.pointer(event, svg.node())
        );
      }
    
      // Function called when zoom event occurs
      function zoomed(event) {
        const {transform} = event;
        g.attr("transform", transform);
        g.attr("stroke-width", 1 / transform.k);
      }
    
    
      // Reset zoom and state highlighting when "Escape" key is pressed
      window.addEventListener("keydown", function(event) {
        if (event.key === "Escape") {
          reset();
        }
      });
    
      // Return the SVG node
      return svg.node();
    }
    
    
    function _us(FileAttachment){return(
    FileAttachment("data/states-albers-10m.json").json()
    )}
    
    function define(runtime, observer) {
      const main = runtime.module();
      const fileAttachments = new Map([
        ["states-albers-10m.json", {url: "https://static.observableusercontent.com/files/75faaaca1f1a4f415145b9db520349a3a0b93a53c1071346a30e6824586a7c251f45367d9262ed148b7a2b5c2694aa7703f3ac88051abc65066fd0074fdf9c9e", mimeType: "application/json"}]
      ]);
      main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
      main.variable(observer()).define(["md"], _1);
      main.variable(observer("chart")).define("chart", ["d3","topojson","us"], _chart);
      main.variable(observer("us")).define("us", ["FileAttachment"], _us);
      return main;
    }
    