import { Component } from '@angular/core';
import * as d3 from 'd3'; 

@Component({
  selector: 'app-connection-graph',
  templateUrl: './connection-graph.component.html',
  styleUrls: ['./connection-graph.component.scss']
})
export class ConnectionGraphComponent {
  private svg: any;
  private margin = {
    top: 20,
    bottom: 50,
    right: 30,
    left: 50
  };
  private width = 960 - this.margin.left - this.margin.right;
  private height = 700 - this.margin.top - this.margin.bottom;

  private createSvg(): void {
    this.svg = d3.select("body")
    .append("svg")
    .attr("width", this.width + this.margin.left + this.margin.right)
    .attr("height", this.height + this.margin.top + this.margin.bottom)
    .append("g")
    .attr("transform","translate("+ this.margin.left+"," + this.margin.top+")");
  }

  ngOnInit(){
    this.createSvg();
  }
}
