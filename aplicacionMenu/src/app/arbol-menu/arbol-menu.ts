import { Component } from '@angular/core';

interface Menu {
  titulo: string;
  link: string;
  componente: string;
  abierto?: boolean;
  submenus?: Menu[];
}

@Component({
  selector: 'app-arbol-menu',
  standalone: true,
  templateUrl: './arbol-menu.html',
  styleUrl: './arbol-menu.css'
})
export class ArbolMenu {
  menuAbierto = false;

  menus: Menu[] = [
    {
      titulo: 'Profile',
      link: '#',
      componente: 'ProfileComponent'
    },
    {
      titulo: 'Messages',
      link: '#',
      componente: 'MessagesComponent'
    },
    {
      titulo: 'Settings',
      link: '#',
      componente: 'SettingsComponent',
      submenus: [
        {
          titulo: 'Account',
          link: '#',
          componente: 'AccountComponent'
        },
        {
          titulo: 'Profiles',
          link: '#',
          componente: 'ProfilesComponent'
        },
        {
          titulo: 'Security & Privacy',
          link: '#',
          componente: 'SecurityComponent'
        },
        {
          titulo: 'Password',
          link: '#',
          componente: 'PasswordComponent'
        },
        {
          titulo: 'Notifications',
          link: '#',
          componente: 'NotificationsComponent'
        }
      ]
    },
    {
      titulo: 'Help',
      link: '#',
      componente: 'HelpComponent',
      submenus: [
        {
          titulo: 'FAQs',
          link: '#',
          componente: 'FaqsComponent'
        },
        {
          titulo: 'Submit a Ticket',
          link: '#',
          componente: 'TicketComponent'
        },
        {
          titulo: 'Network Status',
          link: '#',
          componente: 'NetworkComponent'
        }
      ]
    },
    {
      titulo: 'Logout',
      link: '#',
      componente: 'LogoutComponent'
    }
  ];

  abrirMenu() {
    this.menuAbierto = !this.menuAbierto;
  }

  desplegar(menu: Menu) {
    if (menu.submenus) {
      menu.abierto = !menu.abierto;
    }
  }
}