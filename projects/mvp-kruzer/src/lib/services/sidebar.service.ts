import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private readonly sidebarSubject = new BehaviorSubject<any>(null);
  #isOpen: boolean = false
  constructor() {}

  toggleSidebar() {
    this.#isOpen = !this.#isOpen
    this.sidebarSubject.next(this.#isOpen);
  }

  get sidebar$(): BehaviorSubject<any> {
    return this.sidebarSubject;
  }
}
