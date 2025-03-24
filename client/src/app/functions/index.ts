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
