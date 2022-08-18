import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SevarthiFormService {

  

  constructor(
    private _http: HttpClient
  ) { }

  getSevarthiForm(mht_id: string, phone: string) {
    const params = {
      data: {
        person_id: mht_id,
        mobile_no: phone
      }
    }
    return this._http.post(`${environment.apiURL}method/seva.seva.api.get_sevarthi_profile`, params);
  }

  SaveSevarthiForm(params: any) {
    return this._http.post(`${environment.apiURL + environment.formSubmissionEndpoint}`, params);
  }
}
