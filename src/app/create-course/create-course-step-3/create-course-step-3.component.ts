import { Component } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "create-course-step-3",
  templateUrl: "create-course-step-3.component.html",
  styleUrls: ["create-course-step-3.component.scss"],
})
export class CreateCourseStep3Component {
  constructor(private fb: FormBuilder) {}
  form: FormGroup = this.fb.group({
    lessons: this.fb.array([]),
  });

  get lessons() {
    return this.form.controls["lessons"] as FormArray;
  }

  addLesson() {
    const lessonForm = this._createLessonForm();
    this.lessons.push(lessonForm);
  }

  deleteLesson(lessonIndex: number) {
    this.lessons.removeAt(lessonIndex);
  }

  private _createLessonForm() {
    return this.fb.group({
      title: ["", Validators.required],
      level: ["beginner", Validators.required],
    });
  }
}
