import { type SvgIconComponent } from '@mui/icons-material';

export interface NavigationItem {
  name: string;
  icon?: SvgIconComponent;
  path: string;
  children?: NavigationItem[];
}

const navigationItems: NavigationItem[] = [
  {
    name: 'Владельцы',
    path: '/owners',
    children: [
      {
        name: 'Список владельцев',
        path: '/list',
      },
    ],
  },
  {
    name: 'Животные',
    path: '/animals',
    children: [
      {
        name: 'Список животных',
        path: '/list',
      },
    ],
  },
  {
    name: 'Приемы',
    path: '/appointments',
    children: [
      {
        name: 'Список приемов',
        path: '/list',
      },
    ],
  },
  {
    name: 'Диагнозы',
    path: '/diagnoses',
    children: [
      {
        name: 'Список диагнозов',
        path: '/list',
      },
    ],
  },
];

export default navigationItems;
