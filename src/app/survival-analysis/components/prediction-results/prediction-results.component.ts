import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { SurvivalPrediction } from '../../models.';

// const prediction: SurvivalPrediction = {
//   neptunCode: 'BOSXXA',
//   semester_1: 86.4,
//   semester_2: 45.3,
//   semester_3: 55.2,
//   semester_4: 78.5,
//   semester_5: 99.6,
//   semester_6: 86.8,
//   semester_7: null,
//   semester_8: null,
//   semester_9: null,
//   semester_10: null,
//   semester_11: null,
//   risk_score: 45.6
// }

@Component({
  selector: 'app-prediction-results',
  templateUrl: './prediction-results.component.html',
  styleUrls: ['./prediction-results.component.scss']
})
export class PredictionResultsComponent implements OnInit {

  @ViewChild('plotContainer', { static: true, read: ElementRef })
  private plotContainer!: ElementRef<HTMLDivElement>;

  private _prediction: SurvivalPrediction | null = null;

  @Input()
  set prediction(value: SurvivalPrediction|null) {
    this._prediction = value;
    this.reset();

    if (this._prediction) {
      this.plot();
    }
  }

  constructor() { }

  ngOnInit(): void {
    this.plot();
  }

  private reset() {
    this.plotContainer.nativeElement.innerHTML = '';
  }

  private plot() {

    if (!this._prediction) {
      return;
    }

    const X: number[] = [];
    const Y: number[] = [];
    const D: Array<{ x: number, y: number }> = [];

    let keyIdx = 1;
    for (let key in this._prediction) {
      if (key.startsWith('semester_')) {
        D.push({ x: keyIdx, y: (this._prediction[key] || 0) * 100});
        ++keyIdx;
      }
    }
    // +1 step a végére
    D.push({ x: ++keyIdx, y: 0 })

    D.forEach(data => {
      X.push(data.x);
      Y.push(data.y);
    })

    console.log(D);

    const canvasWidth = 1000;
    const canvasHeight = 400;
    const canvasPadding = 40;

    const svg = d3.select('#plot-container')
      .append('svg')
      .attr('height', canvasHeight)
      .attr('width', canvasWidth)
    // .style('border', '1px solid red');

    const xScale = d3.scaleLinear().domain([1, 12]).range([0, canvasWidth - 2 * canvasPadding]);
    const yScale = d3.scaleLinear().domain([100, 0]).range([0, canvasHeight - canvasPadding * 2]);
    const xAxis = d3.axisBottom(xScale).ticks(X.length);
    const yAxis = d3.axisLeft(yScale);

    svg.append('g').attr('transform', `translate(${canvasPadding}, ${canvasHeight - canvasPadding})`).call(xAxis);
    svg.append('g').attr('transform', `translate(${canvasPadding}, ${canvasPadding})`).call(yAxis)

    svg.append('text').attr('x', 10).attr('y', 15).attr('text-anchor', 'start').text('Survival Probability')
    svg.append('text').attr('x', canvasWidth / 2).attr('y', canvasHeight - 10).attr('text-anchor', 'middle').text('Semester')

    const line = d3.line()
      .curve(d3.curveStepAfter)
      .y((d, i) => yScale(Y[i]) + canvasPadding)
      .x((d, i) => xScale(X[i])! + canvasPadding)

    svg.append("path")
      .attr("d", line(D.map(d => [d.x, d.y])))
      .attr("fill", "none")
      .attr("stroke-width", '3')
      .attr("stroke", "#33CBFF");

    // // Defining points
    const format = d3.format('.2f');
    svg
      .selectAll('circle')
      .data(D)
      .enter()
      .append('text')
      .attr('x', (d, i) => xScale(X[i]) + canvasPadding + 30)
      .attr('y', (d, i) => yScale(Y[i]) + canvasPadding - 5)
      .attr('text-anchor', 'middle')
      .text((d) => `${format(d.y)}%`)

  }

}
