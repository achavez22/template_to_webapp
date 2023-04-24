import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {}; 
  cargada = false; 
  team: any[] = [];

  constructor(private http: HttpClient) { 
    this.loadInfo();
    this.loadTeam();
  }

  private loadInfo(){
       //leer las propiedades JSON
    this.http.get('assets/data/data.page.json')
    .subscribe((response: InfoPagina)=> { 
        this.cargada = true; 
        this.info = response;
    });
  }


  private loadTeam(){
      this.http.get('https://angular-html-d12c1-default-rtdb.firebaseio.com/equipo.json')
      .subscribe((resp:any) =>{
          this.team = resp;
            // console.log(this.team);
          
      });
  }
}
