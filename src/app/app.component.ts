import { Component, ViewChild } from '@angular/core';
import { FormioComponent, FormioForm } from 'angular-formio';
import { ToastrService } from 'ngx-toastr';
import { SevarthiFormService } from './services/sevarthi-form.service';
import mhtformdata from '../assets/forms/mhtformio.json';
import sevaformdata from '../assets/forms/sevarthiformio.json';
import { environment } from 'src/environments/environment';

declare global {
  interface Window { angularComponent: any; }
}

// window.angularComponent = window.angularComponent || {};


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SevarthiForm';
  @ViewChild('dynamicform') dynamicform: FormioComponent | undefined;
  @ViewChild('mhtform') mhtform: FormioComponent | undefined;
  IsFormLoaded: boolean = false;

  mht_id: string = '';
  phone: string = '';

  sevarthiFormSubmitted: boolean = false;

  sevarthiDetailsResponse: any = {};
  sevarthiDetails: any = {
    data: {
      hr_id: 1234,
      title: 'Mr.',
      first_name: 'Mehul',
      last_name: 'Sheth',
      middle_name: 'Ramesh',
      gender: 'Male',
      maritual_status: 'Married',
      blood_group: 'O+'
    }
  }

  // testing data for sevarthi details if fakeAPI env. is true
  defaultdata = {
    data: {
      "name": "1870",
      "owner": "Guest",
      "creation": "2022-07-24 12:55:47.721297",
      "modified": "2022-07-05 16:07:55.188634",
      "modified_by": "Guest",
      "parent": null,
      "parentfield": null,
      "parenttype": null,
      "idx": 0,
      "docstatus": 0,
      "person_id": "1870",
      "person_id_type": "",
      "person_category": "AS",
      "first_name": "PIYUSH",
      "old_name": "",
      "dob": "1987-09-01",
      "blood_group": "B+",
      "gender": "Male",
      "middle_name": "JADAVBHAI",
      "marital_status": "S",
      "age": 0,
      "photo": null,
      "title": "",
      "last_name": "MAVANI",
      "religion": "Hindu",
      "gnan_date": "2003-08-01",
      "mobile_no": "9624698767",
      "whatsapp_no": "1234567890",
      "address_1": "SANIDHYA(A)-07-125,",
      "landmark": "",
      "state": "Gujarat",
      "alternate_mobile_no": "",
      "address_2": "SECTOR-03(B), AMBA TOWNSHIP,",
      "pincode": "382421",
      "country": "India",
      "email_address": "piyushm10@gmail.com",
      "address_3": "AHMEDABAD-KALOL HIGHWAY,",
      "city": "Adalaj",
      "center": "Adalaj",
      "city_centre": null,
      "sevarthi_category": "AS",
      "pay_category": "Unpaid",
      "financial_support_required": 1,
      "subcenter": "Simandhar City",
      "preferred_status": "",
      "amount_needed": 1,
      "sub_centre_detail": null,
      "time_category": "Part Time",
      "fully_occupied": 0,
      "qualification": "B,.,E,., ,[,C,O,M,P,.,],,, ,D,I,P,L,O,M,A, ,[,C,O,M,P,.,]",
      "work_experience_in_brief": null,
      "hobby": "Nothing ",
      "occupation": "OTHERS",
      "work_skill": [
        ""
      ],
      "computer_familiarity": 0,
      "skills": "",
      "remarks": "",
      "seva_commitments": "Full Time",
      "start_date": "2022-07-24",
      "hoursday": 0,
      "hoursweek": 0,
      "hoursmonth": 0,
      "general_availability": "",
      "end_date": "2022-07-24",
      "daysweek": 0,
      "daysmonth": 0,
      "out_of_mumbai_frequency": "",
      "duration": 0,
      "can_drive_activa": 1,
      "can_drive_bike": 0,
      "can_drive_car": 1,
      "owns_two_wheelers": 0,
      "owns_self_car": 1,
      "has_hmv_license": 0,
      "qualifications": ["B.E. [COMP.]", " DIPLOMA [COMP.]"],
      "mobile_no_isd_code": null,
      "local_last_name": null,
      "deceased_date": null,
      "local_middle_name": null,
      "ice_no": "9574008156",
      "alternate_mobile_isd_code": null,
      "local_first_name": null,
      "geographic_location": "Adalaj-Gujarat-India",
      "whatsapp_isd_code": null,
      "dnd_remarks": null,
      "area_village": null,
      "is_address_permanent": 0,
      "expiry_date": null,
      "record_version": null,
      "dnd": 0,
      "doctype": "Composite Profile",
      "indian_languages_known": [
        "Hindi",
        "Marathi"
      ],
      "foreign_languages_known": [],
      "computer_skills": [
        ""
      ],
      "gnan_year": 2003,
      "gnan_yrs": 18
    }
  }

  // mht form details
  mhtDetails = {
    data: {
      mht_id: "",
      phone: ""
    }
  }

  // form io form components
  mhtForm: FormioForm = mhtformdata;
  sevaForm: FormioForm = sevaformdata;

 
  constructor(private _sevarthiFormService: SevarthiFormService,
    private toastr: ToastrService) {
      
    window.angularComponent = { resetSevarthiForm: () => this.resetSevarthiForm() };  
  }

  resetSevarthiForm() {  
    this.sevarthiDetails = JSON.parse(JSON.stringify(this.sevarthiDetailsResponse));
  }  

  // submit method for mht form
  submitMHTForm(data: any) {
    this._sevarthiFormService.getSevarthiForm(data.data.mht_id, data.data.phone.replaceAll('(','').replaceAll(')','').replaceAll(' ','').replaceAll('-','')).subscribe({
      next: (mhtDetails: any) => {
        this.mhtDetails.data.mht_id = data.data.mht_id;
        this.mhtDetails.data.phone = data.data.phone;
        if (mhtDetails.message.response_code == 200) {
          this.IsFormLoaded = true;
          mhtDetails.message.data.financial_support_required = mhtDetails.message.data.financial_support_required ? true : false;
          mhtDetails.message.data.computer_familiarity = mhtDetails.message.data.computer_familiarity ? true : false;
          this.sevarthiDetails = mhtDetails.message;
          this.sevarthiDetailsResponse = JSON.parse(JSON.stringify(mhtDetails.message));
        } else {
          // show server error message
          this.toastr.error(mhtDetails.message[0].message);
        }
        if (this.mhtform) {
          this.mhtform.setForm(this.mhtForm);
        }
      },
      error: (e) => {
        this.toastr.error(e.error.message);
        if (environment.fakeAPI){
          this.IsFormLoaded = true;
          this.sevarthiDetails = JSON.parse(JSON.stringify(this.defaultdata));
          localStorage.setItem('mhtDetails', JSON.stringify(this.sevarthiDetails));
        }
        if (this.mhtform) {
          this.mhtform.setForm(this.mhtForm);
        }
      },
    });
  }

  // submit sevarthi form
  submitSevarthiDetails(data: any) {
    data.data.mht_id = this.mhtDetails.data.mht_id;
    data.data.phone = this.mhtDetails.data.phone;
    
    if (environment.fakeAPI) {
      console.log(data);
      this.sevarthiFormSubmitted = true;
    } else {
      this._sevarthiFormService.SaveSevarthiForm(data.data).subscribe({
        next: (v: any) => {
          this.sevarthiFormSubmitted = true;
        },
        error: (e) => {
          if (this.dynamicform) {
            this.dynamicform.setForm(this.sevaForm);
          }
          this.toastr.error(e.error.message);
        }
      });
    }
  }

  // new form
  resetForm() {
    this.sevarthiFormSubmitted = false;
    this.IsFormLoaded = false;
    this.mhtDetails = {
      data: {
        mht_id: "",
        phone: ""
      }
    }
  }
}
