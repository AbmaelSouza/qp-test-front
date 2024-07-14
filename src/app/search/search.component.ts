import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {ApiService} from "../api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  //options must come from service api
  options: {id:string,name:string }[] = [];
  fromOption: string | null = '';
  alerts: string = '';

  constructor(private api: ApiService, private router:Router) {
    this.fetchStops()
  }

  fetchStops() {
    this.api.getStops().subscribe({
      next: (data) => {
        this.options = [];
        data.forEach((d: any) => {
          this.options.push({name: d.name, id: d.id});

          if (d.substops) {
            d.substops.forEach((s: any) => {
              this.options.push({name: s.name, id: s.id});
            });
          }
        });
      },
      error: (error) => {
        console.error('Error fetching stops:', error);
      }
    });

  }

  myForm = new FormGroup({
    textInput1: new FormControl('', [Validators.required, this.optionValidator.bind(this)]),
    textInput2: new FormControl('', [Validators.required, this.optionValidator.bind(this)]),
    dateInput1: new FormControl('', [Validators.required, this.dateValidator]),
  });

  onSubmit() {
    if (this.myForm.controls.textInput1.value === this.myForm.controls.textInput2.value) {
      this.alerts = this.alerts + "A Partida e o Destino são iguais!";
    }
    const values = [
      this.myForm.controls.textInput1.value,
      this.myForm.controls.textInput2.value
    ];

    let invalidRegion = false;

    values.forEach(value => {
      if (!value || !['SP', 'PR', 'São Paulo'].some(region => value.includes(region))) {
        invalidRegion = true;
      }
    });

    if (invalidRegion) {
      this.alerts = this.alerts + "\nNão são aceitos UF's diferentes de SP e PR";
    }

    if (this.myForm.valid && !invalidRegion) {

      const from = this.options.find(
        (option)=>option.name === this.myForm.controls.textInput1.value)

      const to   = this.options.find(
        (option)=>option.name === this.myForm.controls.textInput2.value)

      const whenGo = this.myForm.controls.dateInput1.value ?? '';
      if(from && to){
      this.submitForm(from.id, to.id, whenGo);
      }
    } else {
      this.markAllAsDirty(this.myForm);
      if (this.alerts) {
        alert(this.alerts)
      }
      this.alerts = '';
    }
  }

  filteredOptions: { id: string; name: string }[] = [];
  filteredOptions2: { id: string; name: string }[] = [];
  showDropdown = false;
  showDropdown2 = false;

  onInput(event: any) {
    if (this.options.length === 0) {
      this.fetchStops();
    }
    const value = event.target.value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    this.filteredOptions = this.options.filter(option => option.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(value)).slice(0, 6);
    this.showDropdown = this.filteredOptions.length > 0;
    if (!value) {
      this.showDropdown = false;
    }
  }

  onInput2(event: any) {
    if (this.options.length === 0) {
      this.fetchStops();
    }
    const value = event.target.value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    this.filteredOptions2 = this.options.filter(option => option.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(value)).slice(0, 6);
    this.showDropdown2 = this.filteredOptions2.length > 0;
    if (!value) {
      this.showDropdown2 = false;
    }
  }

  selectOption(option: string) {
    this.myForm.controls.textInput1.setValue(option);
    this.showDropdown = false;
  }

  selectOption2(option: string) {
    this.myForm.controls.textInput2.setValue(option);
    this.showDropdown2 = false;
  }

  dropdown() {
    setTimeout(() => {
        this.showDropdown = false;
        this.showDropdown2 = false;
      }
      , 100)
  }


  markAllAsDirty(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(controlName => {
      const control = formGroup.get(controlName);
      if (control) {
        control.markAsDirty();
      }
    });
  }

  dateValidator(control: AbstractControl): ValidationErrors | null {
    let inputDate = new Date(control.value);
    inputDate.setHours(inputDate.getHours() + 3); // set to brazilian time
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set today's date to midnight

    if (inputDate < today) {
      return {'invalidDate': true};
    }
    return null;
  }

  optionValidator(control: AbstractControl): { [key: string]: any } | null {
    let invalidOpt = true;
    this.fromOption = this.myForm?.controls?.textInput1?.value;
    if (this.myForm?.controls?.textInput1?.value === this.myForm?.controls?.textInput2?.value) {
      return {invalidOption: true};
    }
    this.options.forEach((option)=>{
      if(option.name === control.value) invalidOpt = false;
    })

    if (control.value && invalidOpt) {
      return {invalidOption: true};
    }
    return null;
  }

  private submitForm(from: string, to: string, travelDate: string) {
    this.api.search(from, to, travelDate).subscribe({
      next: (response) => {
        this.api.setBusesData(response);
        this.router.navigate(['/bus-list']);
      },
      error: (error) => {
        console.error('Error submitting form:', error);
      }
    });
  }
}
