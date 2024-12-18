import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-statement',
  standalone: true,
  imports: [],
  templateUrl: './detail-statement.component.html',
  styleUrl: './detail-statement.component.css'
})
export class DetailStatementComponent  implements OnInit {
  @Input() sleepDetector!: string;
  @Input() driver!: string;
  @Input() vehicle!: string;
  @Input() destination!: string;
  @Input() pathPdf!: string;
  @Input() index!: number;  // Recibe el índice de la tarjeta

  avatarColor!: string;

  // Array de colores oscuros
  private colors: string[] = [
    '#2c3e50', // Azul marino
    '#8e44ad', // Púrpura oscuro
    '#27ae60', // Verde oscuro
    '#c0392b', // Rojo oscuro (bordó)
    '#2980b9', // Azul fuerte
    '#d35400', // Naranja oscuro
    '#7f8c8d', // Gris oscuro
    '#34495e', // Gris azulado
    '#16a085', // Verde azulado oscuro
    '#4E342E', // Marrón oscuro 
  ];

  ngOnInit(): void {
    this.avatarColor = this.getSequentialColor();
  }

  // Método para obtener un color en secuencia
  private getSequentialColor(): string {
    return this.colors[this.index % this.colors.length];
  }
}