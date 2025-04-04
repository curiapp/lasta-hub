import { HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";

export function handleError(error: HttpErrorResponse): Observable<never> {
  let errorMessage = 'Unknown error occurred';
  if (error.error instanceof ErrorEvent) {
    // Client-side or network error
    errorMessage = `Client-side error: ${error.error.message}`;
  } else {
    // Server-side error
    errorMessage = `Server error: ${error.status} - ${error.message}`;
  }
  return throwError(() => new Error(errorMessage));
}

export function objectToFormData(
  obj: Record<string, any>,
  formData: any,
  parentKey: string = ''
): FormData {

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const propName = parentKey ? `${parentKey}[${key}]` : key;
      const value = obj[key];
      if (value instanceof File) {
        // Append file
        formData.append(propName, value);
      } else if (value instanceof Blob) {
        // Append Blob with a filename
        formData.append(propName, value, "blob");
      } else if (Array.isArray(value)) {
        // Handle arrays
        value.forEach((item, index) => {
          objectToFormData({ [`${key}[${index}]`]: item }, formData, parentKey);
        });
      } else if (typeof value === 'object' && value !== null) {
        // Recursively append nested objects
        objectToFormData(value, formData, propName);
      } else if (value !== undefined && value !== null) {
        // Append primitive values (string, number, boolean)
        formData.append(propName, value.toString());
      }
    }
  }

  console.log("Form Data ", formData);

  return formData;
}

export function generateNext7Days() {
  const dates = [];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + i);

    const dayOfWeek = nextDay.toLocaleDateString('en-US', { weekday: 'short' });
    const dayOfMonth = nextDay.getDate();
    const formattedDate = nextDay.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });

    dates.push({
      day: dayOfWeek,
      dayOfMonth: dayOfMonth,
      date: formattedDate
    });
  }

  return dates;
}

