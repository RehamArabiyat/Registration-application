import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastService } from "../services/toast.service";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { Router } from "@angular/router";

@Component({
  selector: "app-articles",
  templateUrl: "./articles.component.html",
  styleUrls: ["./articles.component.scss"]
})
export class ArticlesComponent implements OnInit {
  selectedDate;
  articleFrorm: FormGroup;
  loading = false;
  submitted = false;
  selectedFile = null;
  base64textString = [];
  localStorgeArtical;
  articalInfo = [];
  addArtical = [];
  addNewArtical = false;
  editArticle = false;
  articleId = 0;
  formatedSelect;
  maxImageSize = 4000000;

  constructor(
    private formBuilder: FormBuilder,
    private toast: ToastService,
    private router: Router
  ) {}

  ngOnInit() {
    this.addArticalList();
    this.articleFrorm = this.formBuilder.group({
      Title: ["", Validators.required],
      Content: [""]
    });
    this.hideNewArticle();
  }

  get formControl() {
    return this.articleFrorm.controls;
  }

  onFileChanged(eve) {
    let bytesToMBS;

    if (eve.target.files.length > 0) {
      if (
        eve.target.files[0].type.indexOf("image") == 0 &&
        eve.target.files[0].size < this.maxImageSize
      ) {
        let file = eve.target.files[0];
        this.selectedFile = eve.target.files[0].type;
        const reader = new FileReader();

        reader.onload = this.handleReaderLoaded.bind(this);
        reader.readAsBinaryString(file);
      } else {
        this.toast.showErrorWithTimeout("invalid Format or invalid size");
      }
    }
  }
  handleReaderLoaded(e) {
    this.base64textString = [];
    this.base64textString.push(
      "data:image/png;base64," + btoa(e.target.result)
    );
  }
  onSubmit() {
    this.submitted = true;
    let msg;
    this.localStorgeArtical = [];
    if (this.articleFrorm.invalid) {
      return;
    }
    if (localStorage.getItem("articleInfo") && !this.editArticle) {
      this.localStorgeArtical = JSON.parse(localStorage.getItem("articleInfo"));
      for (let i = 0; i < this.localStorgeArtical.length; i++) {
        if (this.localStorgeArtical[i].Title == this.formControl.Title.value) {
          this.toast.showErrorWithTimeout("The Title Name already exist");
          return;
        }
        this.articalInfo.push(this.localStorgeArtical[i]);
      }
    }
    if (this.selectedDate.length > 1) {
      this.formatedSelect = this.selectedDate;
    } else {
      this.formatedSelect =
        this.selectedDate.getFullYear() +
        "-" +
        this.selectedDate.getMonth() +
        "-" +
        this.selectedDate.getDate();
    }
    const newArray = {
      Title: this.formControl.Title.value,
      Content: this.formControl.Content.value,

      Date: this.formatedSelect,

      Image: this.base64textString[0]
    };
    if (!this.editArticle) {
      this.articalInfo.push(newArray);
      msg = "Artical added successfully";
    } else {
      this.articalInfo[this.articleId] = newArray;

      msg = "Artical updated successfully";
      this.editArticle = false;
    }
    localStorage.setItem("articleInfo", JSON.stringify(this.articalInfo));
    this.toast.showSuccessWithTimeout(msg);
    this.addArticalList();
    this.hideNewArticle();
    this.clearData();
  }
  showArticle() {
    this.addNewArtical = true;
  }
  hideNewArticle() {
    this.addNewArtical = false;
  }
  addArticalList() {
    if (localStorage.getItem("articleInfo")) {
      this.addArtical = JSON.parse(localStorage.getItem("articleInfo"));
    }
  }

  delet(articleTitle) {
    this.articalInfo = this.articalInfo.filter(
      item => item.Title !== articleTitle
    );
    localStorage.setItem("articleInfo", JSON.stringify(this.articalInfo));
    this.addArticalList();
    this.hideNewArticle();
  }
  edit(articleTitle) {
    this.showArticle();
    this.addArticalList();
    let editArtical;
    editArtical = this.addArtical.find(item => item.Title == articleTitle);
    this.formControl.Title.setValue(editArtical.Title);
    this.formControl.Content.setValue(editArtical.Content);
    this.selectedDate = editArtical.Date;
    this.base64textString.push(editArtical.Image);

    let itemIndex = this.addArtical.findIndex(
      item => item.Title == articleTitle
    );
    this.editArticle = true;
    this.articleId = itemIndex;
  }
  clearData() {
    this.formControl.Title.setValue("");
    this.formControl.Content.setValue("");
    this.selectedDate = "";
    this.base64textString = [];
  }
  back() {
    this.router.navigateByUrl("");
  }
}
