import {Component, OnInit} from '@angular/core';
import {TerminalAnimationService} from './terminal-animation.service';
import {NgOptimizedImage} from '@angular/common';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {InputTextComponent} from '../../shared/components/input-text/input-text.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [
    NgOptimizedImage,
    ReactiveFormsModule,
    InputTextComponent
  ],
  providers: [
    TerminalAnimationService
  ]
})
export class LoginComponent implements OnInit {

  protected form: FormGroup;

  protected terminalLines = [
    'Encontre farmácias populares com o medicamento que você precisa!',
    'Crie uma conta, salve seu receituário',
    'Veja a disponibilidade em tempo real nas farmácias do SUS próximas de você!',
    'Evite filas e deslocamentos: consulte antes onde está seu remédio!',
    'Busque por nome do medicamento e veja as farmácias mais próximas!',
    'Tenha acesso rápido e gratuito à informação que importa: seu tratamento.',
    'Cadastre-se para acompanhar a chegada de medicamentos que você precisa.',
    'Ajude outras pessoas: atualize a disponibilidade da sua farmácia.',
  ];

  protected currentLine = '';
  protected resetTerminalLine = true;

  constructor(private _formBuilder: FormBuilder,
              private _terminalAnimationService: TerminalAnimationService) {
    this.form = this._formBuilder.group({
      user: new FormControl(),
      password: new FormControl()
    });
  }

  ngOnInit(): void {
    this._terminalAnimationService.resetAnimationChanged.subscribe(reset => this.resetTerminalLine = reset);
    this._terminalAnimationService.lineContentChanged.subscribe(line => this.currentLine = line);
    this._terminalAnimationService.showLinesSequentially(this.terminalLines);
  }


}
