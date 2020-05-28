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
      states: {
        TN:{
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
        KL:{
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
      },
    },
    US: {
      code: "US",
      name: "United States of America",
      states: {
       NY: {
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
       NJ: {
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
      }
    }
  }

  countryList=[];
  stateList=[];
  cityList=[];
  i:string;
  constructor(private fb: FormBuilder) {
    this.countryList = Object.keys(this.countryData);
    this.userForm = this.fb.group({
      username: this.fb.control("", Validators.required),
      email: this.fb.control("", [Validators.required, Validators.email]),
      phonenumber: this.fb.control("", Validators.required),
      password: this.fb.control("", Validators.required),
      cpassword: this.fb.control("", Validators.required),
      address: this.fb.array([
        this.fb.group({
          country: this.fb.control("", Validators.required),
          state: this.fb.control("", Validators.required),
          city: this.fb.control("", Validators.required),
        }),
        this.fb.group({
          country: this.fb.control("", Validators.required),
          state: this.fb.control("", Validators.required),
          city: this.fb.control("", Validators.required),
        }),
        this.fb.group({
          country: this.fb.control("", Validators.required),
          state: this.fb.control("", Validators.required),
          city: this.fb.control("", Validators.required),
        })]),
      gender: this.fb.control('', Validators.required),
      mstatus: this.fb.control('', Validators.required),
      favfood: this.fb.control('', Validators.required),
      favcolor: this.fb.control('', Validators.required),

    });
    /* this.userForm = new FormGroup({
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
     })*/



    

   /* this.userForm.get("address").get("country").valueChanges.subscribe(data => {
      this.stateList = this.countryData[data].states
    })

    

    this.userForm.get("address").get("state").valueChanges.subscribe(data => {
      let tempCityList = this.stateList.find(state => state.code == data)
      this.cityList = tempCityList.cities;
      console.log(this.cityList);
    });*/

    for(let  i in this.userForm.get('address').value){
      this.userForm.get('address').get(i).get('country').valueChanges.subscribe((data) => {
        this.stateList[i] = Object.keys(this.countryData[data].states).map((item) => {
          console.log(this.countryData[data].states[item]);
          return this.countryData[data].states[item]; 
        });
      });
    }
    for(let i in this.userForm.get('address').value){
      // console.log( this.myForm.get('address').get(i).get('state'))
      this.userForm.get('address').get(i).get('state').valueChanges.subscribe((data) => {
        this.cityList[i] = this.countryData[this.userForm.get('address').get(i).get('country').value]['states'][data]['cities'];
        console.log(this.cityList);
      });
    }

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
