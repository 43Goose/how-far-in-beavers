import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InputComponent } from './input/input.component';
import { FormControl } from '@angular/forms';
import { ButtonComponent } from './button/button.component';
import { ApiService } from './services/api.service';
import { NounInflector } from 'natural/lib/natural/inflectors';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InputComponent, ButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private apiService: ApiService) {}

  response = "";
  
  origin = new FormControl("");
  destination = new FormControl("");
  measurement = new FormControl("");

  checkData(data: any) {
    let res = true;
    ["origin", "destination", "distance", "measurement"].forEach(key => {
      if(!Object.keys(data).includes(key)) {
        res = false;
        return;
      }
    });

    return res;
  }

  fetchData() {
    const origin = this.origin.value;
    const destination = this.destination.value;
    const measurement = this.measurement.value;

    if(origin === '' || destination === '' || measurement === '') {
      this.response = "Fields can't be left empty!";
      return;
    }
    
    this.apiService.getData(origin!, destination!, measurement!).subscribe(data => {
      console.log(data);
      if(!this.checkData(data)) {
        this.response = "An error occured on our end. Feel free to try again.";
        return;
      }

      const nounInflector = new NounInflector();

      const fNumber = Intl.NumberFormat().format(data.distance / data.measurement);
      const fMeasurement = (data.distance / data.measurement) > 1 ? nounInflector.pluralize(measurement!) : nounInflector.singularize(measurement!);

      this.response = `The distance between ${data.origin} and ${data.destination} is roughly ${fNumber} ${fMeasurement}.`;
    })
  }
}
