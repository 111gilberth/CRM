import { Injectable } from "@angular/core";
import { Session } from "../constants/model/sesion";
import { Router } from "@angular/router";
@Injectable()
export class StorageService {
  private localStorageService;
  private currentSession: Session = null;

  constructor(private router: Router) {
    this.localStorageService = localStorage;
    this.currentSession = this.loadSessionData();
  }

  setCurrentSession(session): void {
    this.currentSession = session;
    this.localStorageService.setItem("currentUser", JSON.stringify(session));
  }

  loadSessionData(): Session {
    const sessionStr = this.localStorageService.getItem("currentUser");
    return sessionStr ? sessionStr : null;
  }

  getCurrentSession(): Session {
    return this.currentSession;
  }

  removeCurrentsession(): void {
    this.localStorageService.removeItem("currentUser");
    this.currentSession = null;
  }

  getCurrentUser() {
    const session = this.getCurrentSession();
    return session && session.userID ? session.userID : null;
  }

  isAuthenticated(): boolean {
    return this.getCurrentToken() != null ? true : false;
  }

  getCurrentToken() {
    const session = this.getCurrentSession();
    return session && session.jwtToken ? session.jwtToken : null;
  }

  getCurrentRestaurantID() {
    const session = this.getCurrentSession();
    return session && session.restaurantDTO.resturantID
      ? session.restaurantDTO.resturantID
      : null;
  }

  logout(): void {
    this.removeCurrentsession();
    this.router.navigate([""]);
  }
}
