import { AfterViewChecked, Component, ElementRef, OnChanges, OnInit, ViewChild } from '@angular/core';
import {
  select,
  forceSimulation,
  forceManyBody,
  forceCenter,
  forceLink,
  scaleOrdinal,
  schemeCategory10,
  drag
} from 'd3';
import { ConnectionService } from '../services/connection-service';
import { Connection } from '../models/connection';

@Component({
  selector: 'app-connection-graph',
  templateUrl: './connection-graph.component.html',
  styleUrls: ['./connection-graph.component.scss']
})
export class ConnectionGraphComponent implements OnInit {
  private nodes = [
    { index: 0, "uid": "7417ce9f-05d4-469d-9c0e-f0412a2c9b45", name: 'Payal Thakur (MBA)', group: 0, email: null },
    { index: 1, "uid": "c0321748-fe1a-4ebc-874f-6ca40fd6bfef", name: 'Jason Ward', group: 0,email: "ward@jobsohio.com" },
    { index: 2, "uid": "42949678311", name: 'Jessica Villa-Cruz', group: 0, email: "villa-cruz@jobsohio.com" },
    { index: 3, "uid": "51539608192", name: 'Joe Guenther', group: 1, email: "JGuenther@covermymeds.com" },
    { index: 4, "uid": "4324", name: 'Matt Scantland', group: 1, email: "mscantland@covermymeds.com" },
  ];
  private links = [
    { source: this.nodes[0], target: this.nodes[1], relation: "L,C", weight: 11 },
    { source: this.nodes[1], target: this.nodes[2], relation: "C", weight: 1 },
    { source: this.nodes[2], target: this.nodes[3], relation: "E,E", weight: 10 },
    { source: this.nodes[3], target: this.nodes[4], relation: "C", weight: 1 },
    
  ];
  private color = scaleOrdinal(schemeCategory10);
  div: HTMLElement;

  
  ngOnInit(): void {
    const div: HTMLElement = document.querySelector('mat-card') as HTMLElement;
   
    const svg = select('div').append('svg').attr('viewBox', '50 0 400 400').attr("width", 900).attr("height", 900).attr("margin-left", 1).classed("svg-content", true);;

    const link = svg
      .append('g')
      .attr('stroke', '#000')
      .selectAll('line')
      .data(this.links)
      .attr("stroke-width", function(d: any){ return d.weight; })
      .join('line');

    const node = svg
      .append('g')
      .attr('class', 'nodes')
      .selectAll('g')
      .data(this.nodes)
      .enter()
      .append('g');

      const circles = node
      .append('circle')
      .attr('r', 5)
      .style('fill', (n: any) => this.color(n.group))
      .style('border', '1px solid black')
      .style('cursor', 'pointer')
      .on('dblclick', (e) => alert(e.srcElement.__data__.name))
      ;

      //  .on('dblclick', (e) => alert(e.srcElement.__data__.name))

    const labels = node
      .append('text')
      .text((n) => n.name)
      .attr('x', 5)
      .attr('y', 5)
      .style('font-weight', 'bold')
      .style('font-size', '6px')
      .style('color', (n) => this.color('' + n.group));

    // Tooltip when hover over node
    node.append('title').text((n) => n.name + (n.email != null ? ("\n" + n.email) : ''));
    link.append('title').text((n) => n.relation);


        const edgepaths = svg.selectAll(".edgepath") //make path go along with the link provide position for link labels
        .data(this.links)
        .enter()
        .append('path')
        .attr('class', 'edgepath')
        .attr('fill-opacity', 0)
        .attr('stroke-opacity', 0)
        .attr('id', function (d, i) {return 'edgepath' + i})
        .style("pointer-events", "none");

        const edgelabels = svg.selectAll(".edgelabel")
        .data(this.links)
        .enter()
        .append('text')
        .style("pointer-events", "none")
        .attr('class', 'edgelabel')
        .attr('id', function (d, i) {return 'edgelabel' + i})
        .attr('font-size', 8)
        .attr('fill', 'blue');
        edgelabels.append('textPath') .attr('xlink:href', function (d, i) {return '#edgepath' + i})
        .style("text-anchor", "middle")
        .style("pointer-events", "none")
        .attr("startOffset", "50%")
        .text(d => d.relation);;

    const simulation = forceSimulation(this.nodes)
      .force(
        'link',
        forceLink(this.links).id((d: any) => d.uid)
        .distance(50)
      )
      .force('charge', forceManyBody().strength(-200))
      .force('center', forceCenter(div.clientWidth / 2, 200))
      .tick()
      .on('tick', () => {
        node.attr('transform', (n: any) => 'translate(' + n.x + ',' + n.y + ')');
        link
          .attr('x1', (l: any) => l.source.x)
          .attr('y1', (l: any) => l.source.y)
          .attr('x2', (l: any) => l.target.x)
          .attr('y2', (l: any) => l.target.y);
          edgepaths.attr('d', (d: any) => 'M ' + d.target.x + ' ' + d.target.y + ' L ' + d.source.x + ' ' + d.source.y);
      });

    let dragstarted = (e: any, d: any) => {
      if (!e.active) {
        simulation.alphaTarget(0.3).restart();
      }
      d.fx = d.x;
      d.fy = d.y;
    };

    let dragged = (e: any, d: any) => {
      d.fx = e.x;
      d.fy = e.y;
    };

    let dragended = (e: any, d: any) => {
      if (!e.active) {
        simulation.alphaTarget(0);
      }
      d.fx = null;
      d.fy = null;
    };
  }
}