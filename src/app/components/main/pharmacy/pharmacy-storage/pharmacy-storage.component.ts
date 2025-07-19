import {Component, OnInit} from '@angular/core';

import {DataGridComponent} from '../../../../shared/components/grid/data-grid.component';
import {HttpErrorResponse, HttpEventType} from '@angular/common/http';
import {WaitingScreen} from '../../../../shared/utils/waiting-screen.utils';
import {catchError, map} from 'rxjs/operators';
import {of} from 'rxjs';
import {EndpointUtils} from '../../../../shared/utils/endpoint.utils';
import {ToastUtils} from '../../../../shared/utils/toast.utils';
import {RequestService} from '../../../../shared/service/request.service';
import {PharmacyStorage} from '../../../../shared/interface/pharmacy.interface';
import {ColumnDef} from '../../../../shared/interface/data-grid.interface';

@Component({
  selector: 'app-pharmacy-storage',
  imports: [
    DataGridComponent
  ],
  templateUrl: './pharmacy-storage.component.html',
  styleUrl: './pharmacy-storage.component.scss'
})
export class PharmacyStorageComponent implements OnInit {

  protected datasource: PharmacyStorage[] = [];
  protected columns: ColumnDef[];

  constructor(private _requestService: RequestService) {
    this.columns = [
      {id: 1, field: 'name', header: 'Produto'},
      {id: 2, field: 'brand', header: 'Marca'},
      {id: 3, field: 'quantity', header: 'Quantidade'},
      {id: 4, field: 'dosage', header: 'Dosagem'},
      {id: 5, field: 'type', header: 'Tipo'},
      {id: 6, field: 'expirationDate', header: 'Vencimento'},
      {id: 7, field: 'price', header: 'Preço'},
    ];
  }

  ngOnInit(): void {
  }

  upload(event: any): void {
    if (!event.target) {
      return;
    }

    const filelist: FileList = event.target['files'];
    if (filelist.length > 0) {
      Array.from(filelist).forEach(file => {
        const formData = new FormData();
        formData.append('file', file);
        this.saveFile(formData);
      });
    }
  }

  private loadDatasource(): void {
    this._requestService.get$(new EndpointUtils().ApiPharmacy.PRODUCTS).subscribe({
      next: (response: PharmacyStorage[]) => {
        response.forEach(pharmacyStorage => {
          pharmacyStorage.expirationDate = new Date(pharmacyStorage.expirationDate).toLocaleDateString();

        });
        this.datasource = response;
      }
    });
  }

  private saveFile(formData: FormData): void {
    this._requestService.post$(formData, new EndpointUtils().ApiPharmacy.UPLOAD_CSV).pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            WaitingScreen.show();
            break;
          case HttpEventType.Response:
            WaitingScreen.hide();
            return event;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        WaitingScreen.hide();
        return of(error);
      }),
    ).subscribe(() => {
      ToastUtils.success('Arquivo enviado com sucesso');
      this.loadDatasource();
    });
  }
}
