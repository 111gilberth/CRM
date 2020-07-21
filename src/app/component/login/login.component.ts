import { Component } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";
import { UserForm } from "src/app/constants/form/user.form";
import { StorageService } from "src/app/services/storage.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  public loginForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private storageService: StorageService,
    public userService: UserService
  ) {
    this.loginForm = fb.group({
      username: ["", [Validators.required, Validators.email]],
      password: [
        "",
        [Validators.required, Validators.min(5), Validators.max(8)],
      ],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const form = new UserForm(this.loginForm);

      this.userService.signInUser(form).subscribe(
        (response) => {
          this.storageService.setCurrentSession(response);
          this.router.navigate(["dashboard"]);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
