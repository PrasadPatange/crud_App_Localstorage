import { Component, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {


  // list_users : any = [];

  newListUser: any = [];

  // User: any;

  constructor() { }

  ngOnInit(): void {
    this.newListUser = JSON.parse(localStorage.getItem("User")) || [];

    // null,0,undefined,false-boolean
    // if (!this.newListUser) {
    //   this.newListUser = [];
    // }

    console.log(this.newListUser);
  }

  
  addUser(form : any) {

    this.newListUser.push({...form.value, id: uuidv4()});
    localStorage.setItem('User', JSON.stringify(this.newListUser));

    form.resetForm();
   
    

  }


  deleteUser(index) {

    console.log(index);
    this.newListUser.splice(index, 1);
    localStorage.setItem("User", JSON.stringify(this.newListUser));


  }

  
  editUser(form : any, selectedValues: any, addBtn: any){

    // console.log("from edit: - ", form, selectedValues, addBtn);
    form.setValue(selectedValues)
    addBtn.setAttribute("hidden", false);
   
  }

  updateUser(form: any){
    const customID = form.value.id;
    console.log('Updating Values',form, customID);
    let newList = [];
    for (let index = 0; index < this.newListUser.length; index++) {
      const element = this.newListUser[index];
      // console.log("element: - ", element);
      if (element.id === customID) {
        newList.push(form.value);
      } else {
        newList.push(element);
      }
    }
    localStorage.setItem("User", JSON.stringify(newList));
    // to ReLoad Page
    location.reload();
  }

}

