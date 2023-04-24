import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  load = true; 
  products: Product[] =[];
  productsFilter: Product[]= [];
  constructor(private http: HttpClient) {
      this.loadProducts();
   }

  private loadProducts(){ 

    return new Promise<void>((resolve, reject) => { 
      this.http.get('https://angular-html-d12c1-default-rtdb.firebaseio.com/productos_idx.json')
      .subscribe((response : any) =>{
          this.products = response;
          setTimeout(() => {
            this.load= false;
          }, 1000);
          resolve();
      });
    });

   
  }

  public getProduct(id: string){ 
    return this.http.get(`https://angular-html-d12c1-default-rtdb.firebaseio.com/productos/${id}.json`);
  }  


  public searchProduct(termino:  string){ 

    if(this.products.length === 0 ){ 
      //load products
      this.loadProducts().then(() => { 
          //codigo que se ejecuta despues de tener los productos. 
          //aplicar filtro 
          this.filterProducts(termino);
      });
    }else{ 
      //aplicar el filtro
      this.filterProducts(termino);
    }
    
  }

  private filterProducts(termino: string){ 
    this.productsFilter = [];
    termino = termino.toLocaleLowerCase();
    this.products.forEach( p => { 
      const titleLower = p.titulo.toLocaleLowerCase();
      if(p.categoria.indexOf(termino)>= 0 || titleLower.indexOf(termino)>= 0){ 
        this.productsFilter.push(p);
      }
    });
  }
}

