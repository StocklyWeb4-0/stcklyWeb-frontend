import { SideNavItems, SideNavSection } from './navigation.model';

export const sideNavSections: SideNavSection[] = [
    {
        text: '',
    items: ['productos', 'usuarios', 'clientes', 'creditos', 'ventas', 'reportes', 'proveedores'],
    },
];

export const sideNavItems: SideNavItems = {
    productos: {
        icon: 'box',
        text: 'Productos',
        link: '/productos',
    },
    ventas: {
        icon: 'shopping-cart',
        text: 'Ventas',
        link: '/venta',
    },
    reportes: {
        icon: 'file-alt',
        text: 'Reportes',
        link: '/reportes',
    },
    proveedores: {
        icon: 'truck',
        text: 'Proveedores',
        link: '/proveedores',
    },
    usuarios: {
        icon: 'users',
        text: 'Usuarios',
        link: '/usuarios',
    },
    clientes: {
        icon: 'users',
        text: 'Clientes',
        link: '/clientes',
    },
    creditos: {
        icon: 'money-bill-wave',
        text: 'Créditos',
        link: '/creditos',
    },
};
