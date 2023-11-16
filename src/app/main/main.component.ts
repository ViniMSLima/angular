import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { ShopListService } from '../services/shop-list.service';
import { Product } from '../model/Product';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent implements OnInit{
  list : Product[] = []
  constructor(private route: ActivatedRoute, private router: Router, private service: ShopListService) {}

  ngOnInit(): void {
    this.service.initItems();
    this.list = this.service.getItems();
  }

  editItem(item: Product) {
    this.router.navigate(['edit', item.produto]);
  }

  savedText = '';
  text = '';

  update(event: any) {
    this.savedText = event.target.value;
  }

  produto = '';
  quantidade = 0;

  SaveQuantidade(event: any) {
    this.quantidade = event.target.value;
  }

  SaveProduto(event: any) {
    this.produto = event.target.value;
  }

  AddProduto() {
    var added = false;
    this.list.map((it) => {
      if (it.produto == this.produto) {
        it.quantidade = Number(this.quantidade) + Number(it.quantidade);
        added = true;
      }
    });

    if (!added) {
      this.list.push({
        produto: this.produto,
        quantidade: this.quantidade,
        comprado: false,
      });
    }

    this.service.updateList(this.list);
    
  }

  deleteItem(event: any, product: string) 
  {
    this.list.map((it) => {
      if (it.produto == product) {
        this.list = this.list.filter((item) => item.produto != product);
        console.log('deleted item: ', it.produto);
      }
    });

    this.service.updateList(this.list);
  }

  mostrarComprados = true;

  showComprados(event: any) {
    this.mostrarComprados = !event.target.checked;
  }

  markCheckbox(event: any, produto: string) {
    console.log(produto);
    console.info(event.target.checked);

    this.list.map((it) => {
      if (it.produto == produto) {
        it.comprado = event.target.checked;
      }
    });
  }

}
