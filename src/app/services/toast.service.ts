import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: "root"
})
export class ToastService {
  constructor(private toastr: ToastrService) {}

  showErrorWithTimeout(message) {
    this.toastr.error(message, "", {
      timeOut: 3000
    });
  }

  showSuccessWithTimeout(message) {
    this.toastr.success(message, "", {
      timeOut: 3000
    });
  }

  showWorningWithTimeout(message) {
    this.toastr.warning(message, "", {
      timeOut: 3000
    });
  }
}
