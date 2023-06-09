import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

import { Tarefa } from './../models/tarefa.model'

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  constructor(private storage: Storage) { 
    this.storage.create();
  }

  public async gravar(tarefa: Tarefa){
      await this.storage.set(tarefa.id, tarefa);
  }

  public async deletar(id: string){
      await this.storage.remove(id);
  }

  public async obter(id:string){
      return await this.storage.get(id);
  }

  public async carregar(): Promise<Tarefa[]>{
      let listaTarefas: Array<Tarefa> = [];

      await this.storage.forEach( (valor, id, index)=>{
          listaTarefas.push(valor);
      });

      return listaTarefas;
  }
 
}


