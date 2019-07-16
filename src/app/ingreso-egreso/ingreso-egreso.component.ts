import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngresoEgreso } from './ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';
import Swal from 'sweetalert2';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { using, Subscription } from 'rxjs';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  form: FormGroup;
  tipo = 'ingreso';
  loadingSub: Subscription = new Subscription();
  cargando: boolean;
  constructor(
    private ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.loadingSub = this.store.select('ui')
      .subscribe(ui => this.cargando = ui.isLoading);

    this.form = new FormGroup({
      description: new FormControl('', Validators.required),
      monto: new FormControl(0, Validators.min(0))
    });
  }

  ngOnDestroy(): void {
    this.loadingSub.unsubscribe();
  }

  crearIngresoEgreso() {
    this.store.dispatch(new ActivarLoadingAction());
    const ingresoEgreso = new IngresoEgreso({ ...this.form.value, tipo: this.tipo });
    this.ingresoEgresoService.cerarIngresoEgreso(ingresoEgreso)
      .then((resp) => {
        this.store.dispatch(new DesactivarLoadingAction());

        this.form.reset({ monto: 0 });
        Swal.fire({
          title: 'Creado',
          text: ingresoEgreso.description,
          type: 'success',
          confirmButtonText: 'Ok'
        });
      })
      .catch(err => {
        this.store.dispatch(new DesactivarLoadingAction());
        console.log(err);
      });
  }
}
