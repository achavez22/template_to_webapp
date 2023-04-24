import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit{

  product: any;
  id: string | undefined;
  constructor(private route: ActivatedRoute,
              public productsService: ProductosService){ 

  }
  ngOnInit(): void {
    this.route.params.subscribe(  params => { 
      this.productsService.getProduct(params['id']).subscribe(
        (response) => {
          this.id = params['id'];
          this.product = response; 
          console.log(this.product);
        }
        
      );
      
    })
  }



}
