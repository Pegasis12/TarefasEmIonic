import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import {ModalController } from '@ionic/angular'

import { Tarefa } from './../models/tarefa.model';
import { TarefaService } from '../services/tarefa.service';

@Component({
  selector: 'app-atualiza-tarefa',
  templateUrl: './atualiza-tarefa.page.html',
  styleUrls: ['./atualiza-tarefa.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AtualizaTarefaPage implements OnInit {
  public categorias = ['Domestico', 'Pessoal', 'Trabalhos'];
  public categoriaSelecionada: string = '';

  public dataSelecionada: any;

  @Input() minhaTarefa: Tarefa = {
    id: '',
    nome: '',
    data: '',
    prioridade: '',
    categoria: ''
  };

  constructor(private modalCtrl: ModalController,
    private tarefaServ: TarefaService) { }

  ngOnInit() {

  }

  public async editar(){
    await this.tarefaServ.gravar(this.minhaTarefa);
    this.dismiss();
  }

  public async dismiss(){
    await this.modalCtrl.dismiss();
  }

  public selecionarCategoria(indice: number){
  this.minhaTarefa.categoria = this.categorias[indice];
  }
}
