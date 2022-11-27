import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {Role} from "../../interfaces/user";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  role = Role
  constructor(public auth: AuthenticationService) { }

  ngOnInit(): void {
  }

}
