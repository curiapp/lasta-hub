import { HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";

export function handleError(error: HttpErrorResponse): Observable<never> {
  let errorMessage = 'Unknown error occurred';
  if (error.error instanceof ErrorEvent) {
    errorMessage = `Network error: ${error.error.message}`;
  } else {
    if (!navigator.onLine) {
      errorMessage = 'No internet connection';
    } else if (error.status === 0) {
      errorMessage = 'Cannot connect to server. Please try again later.';
    } else if (error.status === 401) {
      errorMessage = 'Invalid email or password';
    } else if (error.status === 500) {
      errorMessage = 'Server error. Please try again later.';
    } else if (error.error?.error) {
      errorMessage = error.error.error;
    } else if (typeof error.error === 'string' && error.error.trim()) {
      errorMessage = error.error;
    } else {
      errorMessage = `Error ${error.status}: ${error.message}`;
    }
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

  return formData;
}

export function generateNext7Days() {
  const dates = [];
  const today = new Date();

  for (let i = 0; i < 2; i++) {
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() - i);

    const dayOfWeek = nextDay.toLocaleDateString('en-GB', { weekday: 'short' });
    const dayOfMonth = nextDay.getDate();
    const formattedDate = nextDay.toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' });

    if (today.toLocaleDateString('en-GB', { month: '2-digit', year: 'numeric', day: '2-digit' }) !== formattedDate) {
      dates.push({
        day: dayOfWeek,
        dayOfMonth: dayOfMonth,
        date: formattedDate
      });
    }
  }

  for (let i = 0; i < 6; i++) {
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + i);

    const dayOfWeek = nextDay.toLocaleDateString('en-GB', { weekday: 'short' });
    const dayOfMonth = nextDay.getDate();
    const formattedDate = nextDay.toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' });

    dates.push({
      day: dayOfWeek,
      dayOfMonth: dayOfMonth,
      date: formattedDate
    });
  }

  const sorted = dates.sort((a, b) => {
    const [da, ma, ya] = a.date.split("/").map(Number);
    const [db, mb, yb] = b.date.split("/").map(Number);
    const dateA = new Date(ya, ma - 1, da);
    const dateB = new Date(yb, mb - 1, db);
    return dateA.getTime() - dateB.getTime();
  });

  return sorted;
}


export function getGreeting(): string {
  const now = new Date();
  const hours = now.getHours();

  if (hours < 12) {
    return 'Good Morning!';
  } else if (hours < 18) {
    return 'Good Afternoon!';
  } else {
    return 'Good Evening!';
  }
}
