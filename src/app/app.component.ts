import { Component } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularform';
  'userForm':FormGroup
  countryData={
    IN:{
      code: "IN",
      name: "India",
      states:[
        {
            code:"TN",
            name: "Tamil Nadu",
            cities:[
              {
                CH:{
                  code:"CH",
                  name:"Chennai"
                }
              },
              {
                MD:{
                  code:"MD",
                  Name:"Madurai"
                }
              }
            ]
          }
        ,
        {
            code:"KL",
            name: "Kerala",
            cities:[
              {
                PK:{
                  code:"PK",
                  name:"Palakad"
                }
              },
              {
                KO:{
                  code:"KO",
                  Name:"Kochi"
                }
              }
            ]
          }
        
      ],
    },
    US:{
      code: "US",
      name: "United States of America",
      states:[
        {
            code:"NY",
            name: "New York",
            cities:[
              {
                NYC:{
                  code: "NYC",
                  name:"New York City"
                }
              },
              {
                NYC2:{
                  code:"NYC2",
                  name:"New York City 2",
                }
              }
            ]
          }
        ,
        {
            code:"NJ",
            name: "NJ 1",
            cities:[
              {
                NJC:{
                  code:"NJC",
                  name:"NJ City 1",
                }
              },
              {
                NJC2:{
                  code:"NJC2",
                  Name:"NJ City 2"
                }
              }
            ]
          }
        
      ]
    }
}

countryList;
stateList;
cityList;
  
constructor(){
    this.userForm = new FormGroup({
      'username':new FormControl('',Validators.required),
      'email':new FormControl('',[Validators.required,Validators.email]),
      'phonenumber':new FormControl('',Validators.required),
      'password': new FormControl('',Validators.required),
      'cpassword': new FormControl('',Validators.required),
      'country': new FormControl('',Validators.required),
      'state': new FormControl('',Validators.required),
      'city': new FormControl('',Validators.required),
      'gender': new FormControl('',Validators.required),
      'mstatus': new FormControl('',Validators.required),
      'favfood': new FormControl('',Validators.required),
      'favcolor': new FormControl('',Validators.required),    
    })

    let countrykeys = Object.keys(this.countryData);
    console.log(countrykeys);
    this.countryList = countrykeys.map((key)=> this.countryData[key])
    console.log(this.countryList);

    this.userForm.get("country").valueChanges.subscribe((data)=>{
       this.stateList = this.countryData[data].states
       
      this.userForm.get("state").valueChanges.subscribe((data1)=>{
        console.log("state",data1);
        this.cityList=this.stateList.filter(person => person.code == data1);
       // this.cityList = this.countryData[data].
        console.log("state",this.cityList);
      })
      
     // this.cityList = this.countryData[data].states[0].cities
       console.log(this.stateList);
       console.log(this.stateList[0].cities);
      // console.log(statekeys);
      //console.log(this.cityList);
    });

    
  }



  
  submitData(){
    console.log(this.userForm.value);
    console.log(this.userForm.valid);
  }



}
