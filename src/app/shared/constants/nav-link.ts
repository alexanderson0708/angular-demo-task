export interface NavLink {
  icon: string,
  label: string,
  path: string,
  isActive: boolean
}

export const NAV_LINK: NavLink[] = [
  { icon: 'assets/svg/link.svg', label: 'Ссылки', path: '#', isActive: true },
  {
    icon: 'assets/svg/contacts.svg',
    label: 'Контакты',
    path: '#',
    isActive: true,
  },
  { icon: 'assets/svg/tags.svg', label: 'Теги', path: '#', isActive: false },
  {
    icon: 'assets/svg/favourites.svg',
    label: 'Избранное',
    path: '#',
    isActive: true,
  },
  {
    icon: 'assets/svg/history.svg',
    label: 'Посещения',
    path: '#',
    isActive: true,
  },
];
export const TYPE_OPTIONS = ['Я участник', 'Строгий поиск', 'В заголовках'];
export const ONLY_OPTIONS = ['Теги', 'Просьбы', 'Контакты'];