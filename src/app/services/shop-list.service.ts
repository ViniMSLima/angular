import { Injectable } from '@angular/core';
import { Product } from '../model/Product';

@Injectable({
  providedIn: 'root',
})
export class ShopListService 
{

  updateList(list: Product[]) {
    localStorage.setItem('list', JSON.stringify(list));
  }

  EditItem(produto: string, newProduto: string, quantidade: number) 
  {
    var list = localStorage.getItem('list');

    if (list === null) 
    {
      console.log("Can't edit an item from null");
      return;
    }

    let data: Product[] = JSON.parse(list);
    data.forEach((element) => {
      if (element.produto == produto)
      {
        element.produto = newProduto;
        element.quantidade = quantidade;
      }
    });

    localStorage.setItem('list', JSON.stringify(data));

  }
  
  getQtdByName(Name: string): number {
    var list = localStorage.getItem('list');

    if (list === null) {
      return 0;
    }

    let quantidade: number = 0;

    let data: Product[] = JSON.parse(list);
    data.forEach((element) => {
      if (element.produto == Name) quantidade = element.quantidade;
    });

    return quantidade;
  }

  constructor() {}

  initItems() {
    var storedData = localStorage.getItem('list');
    if (storedData !== null) return;

    let dadosIniciais: Product[] = [
      { produto: 'arroz', quantidade: 2, comprado: false },
      { produto: 'leite', quantidade: 8, comprado: false },
      { produto: 'nescau', quantidade: 1, comprado: false },
    ];

    localStorage.setItem('list', JSON.stringify(dadosIniciais));
  }

  getItems() {
    var storedData = localStorage.getItem('list');
    if (storedData === null) return null;

    let data = JSON.parse(storedData);
    return data;
  }
}
