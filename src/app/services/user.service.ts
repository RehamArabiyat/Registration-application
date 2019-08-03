import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { ToastService } from "./toast.service";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private route: Router, private toast: ToastService) {}

  registerUser(user) {
    localStorage.setItem("userInfo", JSON.stringify(user));
  }

  checkUserName(userName, password) {
    let localStorgeUser = [];
    if (localStorage.getItem("userInfo")) {
      localStorgeUser = JSON.parse(localStorage.getItem("userInfo"));
      for (let i = 0; i < localStorgeUser.length; i++) {
        if (
          localStorgeUser[i].username == userName &&
          localStorgeUser[i].password == password
        ) {
          this.route.navigateByUrl("article");
          return;
        } else {
          this.wrongUserNamePssword();
        }
      }
    } else {
      this.wrongUserNamePssword();
    }
  }
  wrongUserNamePssword() {
    this.toast.showErrorWithTimeout("Wrong User Name or Password");
    return;
  }
}
