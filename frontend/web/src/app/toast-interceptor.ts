import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { AccountService } from "./core/services/account.service";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class ToastInterceptor implements HttpInterceptor {
  constructor(
    private readonly accountService: AccountService,
    private snackBar: MatSnackBar,
    private readonly router: Router,
  ) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => {
        if (req.params.getAll('skipResponseMessage') || req.url.includes('msso')) {
          return;
        }
        if (event instanceof HttpResponse && event.ok) {
          switch (req.method) {
            case 'POST':
              if (event.url?.includes('/Attack')) {
                this.snackBar.open("Sikeresen elindítottad a támadást!");
                return;
              }
              if (event.url?.includes('/Explore')) {
                this.snackBar.open("Sikeresen elindítottad a felfedezést!", '', {panelClass: "custom-snackbar"});
                return;
              }
              if (event.url?.includes('/Round')) {
                this.snackBar.open("Körváltás történt!");
                return;
              }
            break;
            case 'PUT':
              if (event.url?.includes('/Buildings')) {
                this.snackBar.open("Sikeres vásárlás!", '', {
                  panelClass: 'custom-snackbar'
                });
                return;
              }
              if (event.url?.includes('/Upgrades')) {
                this.snackBar.open("Sikeres vásárlás!", '', {panelClass: "custom-snackbar"})
                return;
              }
              if (event.url?.includes('/Units')) {
                this.snackBar.open("Sikeres vásárlás!", '', { panelClass: "custom-snackbar-units" });
                return;
              }
            break;
          }
        }
      }),
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 403) {
            this.accountService.logout();
            this.router.navigateByUrl('/login');
            this.snackBar.open("Lejárt token");
            return of(error);
          }
          if (error.error) {
            const reader = new FileReader();
            reader.onload = () => {
              this.snackBar.open(reader.result!.toString());
            }
            reader.readAsText(error.error);
            return of(error);
          }
        }
        return of(error);
      }),
    );
  }
}