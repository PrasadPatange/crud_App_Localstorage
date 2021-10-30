import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../model/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  registrationForm  : FormGroup;

  // user : any = {};
  user : User;

  userSubmitted : boolean;
  constructor(private fb : FormBuilder,private userService : UserService) { }

  ngOnInit(): void {
    this.createRegistrationForm();
  }


  createRegistrationForm() {
    this.registrationForm = this.fb.group({
      userName : [null,Validators.required],
      email : [null,[Validators.required,Validators.email]],
      password : [null,[Validators.required,Validators.minLength(8)]],
      // confirmPassword : [[null,Validators.required],
      mobile : [null,[Validators.required,Validators.maxLength(8)]],

    // },{Validators: this.passwordMatchingValidator});
    });
  }

  // --------------------------------------------
  // Getter Methods for all Form Controls
  // ---------------------------------------------

  get userName() {
    return this.registrationForm.get('userName') as FormControl;
  }
  get email() {
    return this.registrationForm.get('email') as FormControl;
  }
  get password() {
    return this.registrationForm.get('password') as FormControl;
  }
  // get confirmPassword() {
  //   return this.registrationForm.get('confirmPassword') as FormControl;
  // }
  get mobile() {
    return this.registrationForm.get('mobile') as FormControl;
  }

  // ---------------------------------------------------------

  onSubmit(){
  
    console.log(this.registrationForm.value);
    this.userSubmitted = true;
    if(this.registrationForm.valid)
    {
      // this.user = Object.assign(this.user,this.registrationForm.value);
      this.userService.addUser(this.userData());
      
      this.userSubmitted = false; 
    }
    this.registrationForm.reset();
    

  }

  userData() : User {
    return this.user = {
      userName : this.userName.value,
      email : this.email.value,
      password : this.password.value,
      mobile : this.mobile.value
    }
  }

  // addUser(user){

  //   let users = [];
  //   if(localStorage.getItem("Users")){
  //     users = JSON.parse(localStorage.getItem("Users"));
  //     users = [user , ...users];

  //   }else{
  //     user = [user];
  //   }
  //   localStorage.setItem("Users",JSON.stringify(user));

  // }
}
