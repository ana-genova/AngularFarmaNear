import {RoutesUtils} from './routes.utils';

export class MenuItemsUtils {

  get pharmacy(): Array<MenuButton> {
    return [
      {id: ButtonId.STORAGE, titulo: 'Estoque', href: `${RoutesUtils.PHARMACY}/${RoutesUtils.STORAGE}`},
      {id: ButtonId.PROFILE, titulo: 'Perfil', href: `${RoutesUtils.PHARMACY}/${RoutesUtils.PROFILE}`},
    ];
  }

  get patient(): Array<MenuButton> {
    return [
      {id: ButtonId.HOME, titulo: 'Buscar', href: `${RoutesUtils.PATIENT}/${RoutesUtils.HOME}`},
      {id: ButtonId.PROFILE, titulo: 'Perfil', href: `${RoutesUtils.PATIENT}/${RoutesUtils.PROFILE}`},
    ];
  }
}

export enum ButtonId {
  PROFILE,
  STORAGE,
  HOME
}

export interface MenuButton {
  id: number;
  titulo: string;
  href: string;
}
