import {Component, OnInit} from '@angular/core';
import {IParallaxLabels} from "../../shared/parallax/parallax.module";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  full_code: string = "import torch.nn as nn\n" +
    "from tfs import RNN\n" +
    "\n" +
    "n_hidden = 128\n" +
    "rnn = RNN(n_letters, n_hidden, n_categories)\n" +
    "input = letterToTensor('A')\n" +
    "hidden = torch.zeros(1, n_hidden)\n" +
    "\n" +
    "output, next_hidden = rnn(input, hidden)";
  labels: IParallaxLabels[] = [{label: "DNA", top: 710, left: -90}, {
    label: "ATF-2/c-Jun",
    top: 500,
    left: -260,
    standingOut: true
  }, {label: "IRF", top: 470, left: 60, standingOut: true}, {label: "NF-kB", top: 600, left: 480, standingOut: true}]
  isPrinted: boolean = false;
  isRun: boolean = false;
  isCompleted: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

}
