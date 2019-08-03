import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { UserService } from "../services/user.service";
import { ToastService } from "../services/toast.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  userinfo = [];
  localStorgeUser = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private toast: ToastService
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      username: [
        "",
        [Validators.required, , Validators.pattern("^[^@]+@[^@]+.[^@]+$")]
      ],
      password: [
        "",
        [
          Validators.required,
          Validators.pattern(
            "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}"
          )
        ]
      ]
    });
  }
  goLogin() {
    this.router.navigateByUrl("");
  }

  get formcontrol() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.userinfo = [];

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    if (localStorage.getItem("userInfo")) {
      this.localStorgeUser = JSON.parse(localStorage.getItem("userInfo"));
      for (let i = 0; i < this.localStorgeUser.length; i++) {
        if (
          this.localStorgeUser[i].username == this.formcontrol.username.value
        ) {
          this.toast.showErrorWithTimeout("The name already exist");
          return;
        }
        this.userinfo.push(this.localStorgeUser[i]);
      }
    }
    this.userinfo.push(this.registerForm.value);
    this.userService.registerUser(this.userinfo);
    this.toast.showSuccessWithTimeout("Registration successful");
    this.goLogin();
  }
}
