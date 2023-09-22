import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  select,
  forceSimulation,
  forceManyBody,
  forceCenter,
  forceLink,
  schemeCategory10,
  scaleOrdinal
} from 'd3';
import { ConnectionService } from '../services/connection-service';
import { Connection } from '../models/connection';
import { Subscription } from 'rxjs';
import { AppService } from '../app.service';
import { Person } from '../models/person';
import { DashboardService } from '../services/dashboard-service';

@Component({
  selector: 'app-connection-graph',
  templateUrl: './connection-graph.component.html',
  styleUrls: ['./connection-graph.component.scss']
})
export class ConnectionGraphComponent implements OnInit, OnDestroy {
  private color = scaleOrdinal(schemeCategory10);
  div: HTMLElement;
  viewConnection: boolean = false;
  _subscr: Subscription;
  selectedPerson: Person;
  _subscrip: Subscription;
  connectionsData: Connection;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
      this._subscrip = this.dashboardService.viewSelectedConnection.subscribe(viewSelectedConnection => this.connectionsData = viewSelectedConnection);
      const div: HTMLElement = document.querySelector('mat-card') as HTMLElement;


      const svg = select('div#graph').append('svg').attr('viewBox', '0 0 500 400').attr("width", 800).attr("height", 720).attr("margin-left", 1).classed("svg-content", true);;



      const link = svg
        .append('g')
        .attr('stroke', '#000')
        .attr('opacity', 0.5)
        .selectAll('line')
        .data(this.connectionsData.edges)
        .attr("stroke-width", function (d: any) { return d.weight; })
        .join('line');

      const node = svg
        .append('g')
        .attr('class', 'nodes')
        .selectAll('g')
        .data(this.connectionsData.nodes)
        .enter()
        .append('g');

      const circles = node
        .append('circle')
        .attr('r', 5)
        .style('fill', (n: any) => this.color(n.group))
        .style('border', '1px solid black')
        .style('cursor', 'pointer')
        //.attr("x", ".31em").attr("dy", 100).text((d: any) => "aa" )
        // .on('dblclick', (e) => alert(e.srcElement.__data__.name))
        ;

      //  .on('dblclick', (e) => alert(e.srcElement.__data__.name))

      const labels = node
        .append('text')
        .text((n) => n.name)
        .attr('x', 15)
        .attr('y', 10)
        .style("text-anchor", "end")
        .style('font-weight', 'bold')
        .style('font-size', '6px')
        .style('color', (n) => this.color('' + n.group));

      // Tooltip when hover over node
      node.append('title').text((n) => n.name + (n.email != null ? ("\n" + n.email) : ''));
      link.append('title').text((n) => n.relation);


      const edgepaths = svg.selectAll(".edgepath") //make path go along with the link provide position for link labels
        .data(this.connectionsData.edges)
        .enter()
        .append('path')
        .attr('class', 'edgepath')
        .attr('fill-opacity', 0)
        .attr('stroke-opacity', 0)
        .attr('id', function (d, i) { return 'edgepath' + i })
        .style("pointer-events", "none");

      const edgelabels = svg.selectAll(".edgelabel")
        .data(this.connectionsData.edges)
        .enter()
        .append('text')
        .style("pointer-events", "none")
        .attr('class', 'edgelabel')
        .attr('id', function (d, i) { return 'edgelabel' + i })
        .attr('font-size', 6)
        .style('font-weight', 'bold')
        .attr('fill', 'red');
      edgelabels.append('textPath').attr('xlink:href', function (d, i) { return '#edgepath' + i })
        .style("text-anchor", "middle")
        .style("pointer-events", "none")
        .attr("startOffset", "50%")
        .text(d => d.relation);;

      const simulation = forceSimulation(this.connectionsData.nodes)
        .force(
          'link',
          forceLink(this.connectionsData.edges).id((d: any) => d.index)
            .distance(25)
        )
        .force('charge', forceManyBody().strength(-800))
        .force('center', forceCenter(div.clientWidth / 2, div.clientHeight / 2))
        .tick()
        .on('tick', () => {
          node.attr('transform', (n: any) => 'translate(' + n.x + ',' + 100 + ')');
          link
            .attr('x1', (l: any) => l.source.x)
            .attr('y1', (l: any) => 100)
            .attr('x2', (l: any) => l.target.x)
            .attr('y2', (l: any) => 100);
          edgepaths.attr('d', (d: any) => {
            console.log('d.source.x', d.source.x);
            console.log('d.source.x', d.source.x);
             console.log('d.target.x', d.target.x);
              console.log('d.target.y', d.target.y);
            if ((d.source.x < d.target.x) && (d.source.y > d.target.y)) {
              return 'M ' + (d.target.x) + ' ' + (98) + ' L ' + (d.source.x) + ' ' + (98)
              
            } else {
              return 'M ' + (d.source.x) + ' ' + (98) + ' L ' + (d.target.x) + ' ' + (98)
            }
           
          });
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

  ngOnDestroy(): void {
    select("svg").remove();
    this._subscrip.unsubscribe();
  }
}