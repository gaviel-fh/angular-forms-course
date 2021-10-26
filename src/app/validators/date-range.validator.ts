import { FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export function createPromoRangeValidator(): ValidatorFn {
  return (form: FormGroup): ValidationErrors | null => {
    const startDate: Date = form.get("promoStartAt").value;
    const endDate: Date = form.get("promoEndAt").value;
    if (startDate && endDate) {
      const isRangeValid = startDate?.getTime() < endDate?.getTime();
      return isRangeValid ? null : { promoPeriod: true };
    }
    return null;
  };
}
