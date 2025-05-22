export interface Aplicacion {
    acronym: string,
    name: string,
    url: string,
    icon:string,
    id:string,
    profiles?: ProfileBasic[],
    isHover?: boolean;
  }

  export interface MenuItem {
    id?: number | string;
    label?: any;
    code?: string;
    icon?: string;
    link?: string;
    subItems?: any;
    isTitle?: boolean;
    badge?: any;
    parentId?: number;
    isLayout?: boolean;
  }

export interface ProfileBasic{
  id:    string;
  name:  string;
  state: number;
}

export interface MenuBasic {
  id:          string;
  name:        string;
  orderNumber: number;
  level:       string;
  code:        string;
  icon:        string;
  url:         string;
  parent:      Parent | null;
  actions:     Action[] | null;
  children:    MenuBasic[];
}

export interface Action {
  id:       string;
  code:     string;
  name:     string;
  type:     boolean;
  isActive: boolean;
  method:   null;
  url:      string;
  menu:     Menu;
}

export interface Menu {
  id:          string;
  orderNumber: number;
  level:       string;
  code:        string;
  name:        string;
}

export interface Parent {
  id:   string;
  name: string;
}
