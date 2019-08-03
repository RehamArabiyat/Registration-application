import { Component, OnInit } from "@angular/core";
import { FormsModule, FormGroup } from "@angular/forms";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  articlesList = [];
  homeFrorm: FormGroup;
  constructor() {}

  ngOnInit() {}
}
