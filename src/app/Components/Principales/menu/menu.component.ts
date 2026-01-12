import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [CommonModule, RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  menus = [
    {
      title: 'Dashboard',
      icon: 'das.svg',
      subItems: [
        { title: 'Perforación Taladros Largos', path: 'taladro-largo-grafico' },
        { title: 'Servicio Lanzador', path: 'servicio-lanzador' },
        { title: 'Servicio Mixer', path: 'servicio-mixer' },
        { title: 'Acarreo', path: 'servicio-volquetes' },
      ],
    },
    {
      title: 'Planes',
      icon: 'das.svg',
      subItems: [
        { title: 'Plan de Avance', path: 'plan-avance' },
        { title: 'Plan de Metraje', path: 'plan-metraje' },
        { title: 'Plan de Producción', path: 'plan-produccion' },

      ],
    },
    {
      title: 'Carga de Datos',
      icon: 'data.svg',
      subItems: [
        { title: 'Estados', path: 'estados' },
        { title: 'Crear Data', path: 'crear-data' },

      ],
    },
    {
      title: 'Roles',
      icon: 'usuario.png',
      subItems: [
        { title: 'Usuarios', path: 'usuarios' },
        { title: 'Perfil', path: 'perfil' },
      ],
    },

  ];


  menuOpenIndex: number | null = null;
  selectedSubItemIndex: number | null = null;
  selectedSubItem: string | null = null;

  constructor(private router: Router) {
    if (this.router.url === '/' || this.router.url === '/Dashboard') {
      this.router.navigate(['/Dashboard/crear-data']);
    }
  }

  AbrirCerrar(index: number, menu: any) {
    if (menu.title === 'Home') {
      this.router.navigate(['/Dashboard/crear-data']); // Redirige directamente
    } else if (this.menuColapsado) {
      // Si el menú está colapsado, redirige a la primera subruta de ese menú
      if (menu.subItems && menu.subItems.length > 0) {
        const ruta =`/Dashboard/${menu.subItems[0].path}`;
        this.router.navigate([ruta]);
        this.selectedSubItemIndex = 0;
        this.selectedSubItem = menu.subItems[0].path;
      }
    } else {
      this.menuOpenIndex = this.menuOpenIndex === index ? null : index;
    }
  }

  selectSubItem(index: number, subItem: any) {
    this.selectedSubItemIndex = index;
    this.selectedSubItem = subItem.path;

    const ruta = `/Dashboard/${subItem.path}`;
    this.router.navigate([ruta]);
  }
  convertirRuta(subItem: string): string {
    return subItem.toLowerCase().replace(/ /g, '-'); // Convierte espacios a guiones
  }
mostrarCerrarSesion = false;
  menuColapsado = false;

  toggleMenu() {
    this.menuColapsado = !this.menuColapsado;
  }
  toggleCerrarSesion() {
    this.mostrarCerrarSesion = !this.mostrarCerrarSesion;
  }

  cerrarSesion() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
