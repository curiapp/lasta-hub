import { ApplicationRef, Injectable, Injector, ViewContainerRef } from '@angular/core';


// export const DIALOG_DATA = new InjectionToken<any>('DIALOG_DATA');

// export class DialogRef {
//   constructor(private componentRef: ComponentRef<ConfirmModalComponent>) { }

//   close() {
//     this.componentRef.destroy(); // Removes dialog from DOM
//   }
// }

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  // constructor( private viewContainer: ViewContainerRef) { }

  // private injector: Injector, private appRef: ApplicationRef,

  openDialog(data: any = {}) {

    // const componentRef = this.viewContainer.createComponent(ConfirmModalComponent);

    // // Inject data into de component
    // componentRef.instance.message = data?.message;
    // componentRef.instance.action = data?.action;

    // this.appRef.attachView(componentRef.hostView);

    // return new DialogRef(componentRef);
  }


}
