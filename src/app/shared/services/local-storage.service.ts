import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { Form } from "../models/form.model";

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {
  private historySubject = new BehaviorSubject<string[]>(this.loadFromStorage());
  public history$ = this.historySubject.asObservable();

  historyData: string[] = []

  saveToHistory(form: FormGroup<Form>) {
    const searchValue = form.getRawValue().search;
    const currentValue = this.historySubject.getValue()
    const isNotEptyString = !(searchValue.trim() === '')
    const isNotExistInData = !currentValue.includes(searchValue)

    if (isNotEptyString && isNotExistInData) {
      const updatedValue = [...currentValue, searchValue];
      this.historySubject.next(updatedValue);
      this.saveToStorage(updatedValue)
    }
  }

  saveFormState(form: FormGroup<Form>) {
    const formData = form.getRawValue();
    const currentHistory = this.historySubject.getValue();
    localStorage.setItem('formState', JSON.stringify(formData));
    this.saveToStorage(currentHistory)
  }

  private saveToStorage(data: string[]): void {
    localStorage.setItem('historyData', JSON.stringify(data));
  }

  private loadFromStorage(): string[] {
    const raw = localStorage.getItem('historyData');
    return raw ? JSON.parse(raw) : [];
  }
}