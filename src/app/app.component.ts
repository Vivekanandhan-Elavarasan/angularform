import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularform';
  'userForm': FormGroup
  countryData = {
    IN: {
      code: "IN",
      name: "India",
      states: [
        {
          code: "TN",
          name: "Tamil Nadu",
          cities: [
            {
              code: "CH",
              name: "Chennai"
            },
            {
              code: "MD",
              name: "Madurai",
            }
          ]
        }
        ,
        {
          code: "KL",
          name: "Kerala",
          cities: [
            {
              code: "PK",
              name: "palakad"
            },
            {
              code: "KO",
              name: "kochi",
            }
          ]
        }
      ],
    },
    US: {
      code: "US",
      name: "United States of America",
      states: [
        {
          code: "NY",
          name: "New York",
          cities: [
            {
              code: "NYC",
              name: "New York City"
            },
            {
              code: "NYC2",
              name: "New York City 2",
            }
          ]
        },
        {
          code: "NJ",
          name: "NJ 1",
          cities: [
            {
              code: "NJC",
              name: "NJ City 1"
            },
            {
              code: "NJC2",
              name: "NJ City 2",
            }
          ]
        }
      ]
    }
  }

  countryList;
  stateList;
  cityList;

  constructor(fb: FormBuilder) {
    this.userForm = new FormGroup({
      'username': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'phonenumber': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
      'cpassword': new FormControl('', Validators.required),
      'country': new FormControl('', Validators.required),
      'state': new FormControl('', Validators.required),
      'city': new FormControl('', Validators.required),
      'gender': new FormControl('', Validators.required),
      'mstatus': new FormControl('', Validators.required),
      'favfood': new FormControl('', Validators.required),
      'favcolor': new FormControl('', Validators.required),
    })



    let countrykeys = Object.keys(this.countryData);
    console.log(countrykeys);
    this.countryList = countrykeys.map((key) => this.countryData[key])
    console.log(this.countryList);

    this.userForm.get("country").valueChanges.subscribe((data) => {
      this.stateList = this.countryData[data].states
    })

    this.userForm.get("state").valueChanges.subscribe((data) => {
      let tempCityList = this.stateList.find(state => state.code == data)
      this.cityList = tempCityList.cities;
      console.log(this.cityList);
    });

    // this.cityList = this.countryData[data].states[0].cities
    //  console.log(this.stateList);
    // console.log(this.stateList[0].cities);
    // console.log(statekeys);
    //console.log(this.cityList);


  }




  submitData() {
    console.log(this.userForm.value);
    console.log(this.userForm.valid);
  }



}
