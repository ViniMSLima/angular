import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopListService } from '../services/shop-list.service';
import { TagContentType } from '@angular/compiler';

@Component({
  selector: 'app-second',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent implements OnInit, OnDestroy {

  newProductQtd = 0;

  updateProductQtd(event: any) {
    this.newProductQtd = event.target.value;
  }
  updateProductName(event: any) {
    this.newProduto = event.target.value;
  }
  
  salvar() 
  {
    if(this.newProductQtd == 0)
      this.newProductQtd = this.quantidade;

    if(this.newProduto == "" || this.newProduto == null)
      this.newProduto = this.produto;
    
    this.service.EditItem(this.produto, this.newProduto, this.newProductQtd);
    this.router.navigate(['']);
  }

  constructor(private route: ActivatedRoute, private router: Router, private service: ShopListService) {}

  produto = '';
  quantidade = 0;
  newProduto = '';

  subscription: any;
  

  ngOnDestroy(): void 
  {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void 
  {
    this.subscription = this.route.params.subscribe((p) => {
      this.produto = p['produto'];
      this.quantidade = this.service.getQtdByName(this.produto);
    });
  }
}
