import { AbstractControl, AsyncValidatorFn } from "@angular/forms";
import { map } from "rxjs/operators";
import { CoursesService } from "../services/courses.service";

export function courseTitleValidator(
  courses: CoursesService
): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return courses.findAllCourses().pipe(
      map((courses) => {
        const newCourseTitle: string = control.value;
        const doesTitleAlreadyExist = courses.some(
          (course) =>
            course.description.toLocaleLowerCase() ===
            newCourseTitle.toLocaleLowerCase()
        );

        return doesTitleAlreadyExist ? { titleExists: true } : null;
      })
    );
  };
}
