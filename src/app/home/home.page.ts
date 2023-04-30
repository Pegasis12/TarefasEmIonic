import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ModalController } from '@ionic/angular';

import { TarefaService } from '../services/tarefa.service';
import { Tarefa } from '../models/tarefa.model';
import { NovaTarefaPage } from '../nova-tarefa/nova-tarefa.page';
import { AtualizaTarefaPage} from '../atualiza-tarefa/atualiza-tarefa.page'

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class HomePage implements OnInit {
  public hoje:number = Date.now();

  public tarefasLista: Array<Tarefa> = [ ];

  constructor(private TarefaService: TarefaService,
              private modalCtrl: ModalController) { }

  ngOnInit() {
    this.listar();
  }

public async adicionar(){
  const modal =  await this.modalCtrl.create({
    component: NovaTarefaPage
  });

  modal.onDidDismiss().then( novaTare =>{
    this.listar();
  });
  return (await modal).present();
}  


public listar(){
  this.TarefaService.carregar().then((tarefas: Tarefa[])=>{
    this.tarefasLista = tarefas;
  })
}

  public deletar(id: string){
    this.TarefaService.deletar(id).then(()=>{
      this.listar();
    })
  }


  public prioridadeCor(prioridade: string) {
    let cor: string = 'danger';

    if(prioridade === 'medio') {
      cor = 'warning';
    }else if(prioridade === 'baixo'){
      cor = 'success';
    }

    return cor;
  }

  public async atualizar(tarefaSelecionada: Tarefa){
    const modal = await this.modalCtrl.create({
      component: AtualizaTarefaPage,
      componentProps:{
        minhaTarefa: tarefaSelecionada
      }
    });

    modal.onDidDismiss().then(()=>{
      this.listar();
    });
  
    return await modal.present();
  }
}
