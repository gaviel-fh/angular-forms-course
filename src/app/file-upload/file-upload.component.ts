import { Component, Input } from "@angular/core";
import { HttpClient, HttpEventType } from "@angular/common/http";
import {
  catchError,
  debounceTime,
  finalize,
  throttleTime,
} from "rxjs/operators";
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  Validator,
} from "@angular/forms";
import { from, noop, of } from "rxjs";

@Component({
  selector: "file-upload",
  templateUrl: "file-upload.component.html",
  styleUrls: ["file-upload.component.scss"],
})
export class FileUploadComponent implements ControlValueAccessor {
  @Input()
  public requiredFileType: string;
  public fileName: string = "";
  public fileUploadError: boolean = false;
  public uploadProgress: number;
  private onChange: Function = (fileName: string) => {};
  private onTouched: Function = () => {};
  public disabled: boolean = false;

  constructor(private http: HttpClient) {}

  onFileSelected(files: File[]) {
    const file = files[0];

    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append("thumbnail", file);
      this.fileUploadError = false;
      this.http
        .post("/api/thumbnail-upload", formData, {
          reportProgress: true,
          observe: "events",
        })
        .pipe(
          catchError((error) => {
            this.fileUploadError = true;
            return of(error);
          }),
          finalize(() => {
            this.uploadProgress = null;
          })
        )
        .subscribe((event) => {
          if (event.type == HttpEventType.UploadProgress) {
            this.uploadProgress = Math.round(
              100 * (event.loaded / event.total)
            );
          } else if (event.type == HttpEventType.Response) {
            this.onChange(this.fileName);
          }
        });
    }
  }

  public onClick(fileInputElement: HTMLInputElement) {
    fileInputElement.click();
    this.onTouched();
  }

  writeValue(value: any) {
    this.fileName = value;
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }
}
