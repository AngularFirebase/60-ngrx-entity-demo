import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as actions from '../pizza.actions';
import * as fromPizza from '../pizza.reducer';


@Component({
  selector: 'pizza-order',
  templateUrl: './pizza-order.component.html',
  styleUrls: ['./pizza-order.component.sass']
})
export class PizzaOrderComponent implements OnInit {

  pizzas: Observable<any>;


  constructor(private store: Store<fromPizza.State>) { }

  ngOnInit() {
    this.pizzas = this.store.select(fromPizza.selectAll)
  }

  createPizza() {
    const pizza: fromPizza.Pizza = {
      id: new Date().getUTCMilliseconds().toString(),
      size: 'small'
    }

    this.store.dispatch( new actions.Create(pizza) )
  }

  updatePizza(id, size) {
    this.store.dispatch( new actions.Update(id, { size: size }) )
  }

  deletePizza(id) {
    this.store.dispatch( new actions.Delete(id) )
  }

}
