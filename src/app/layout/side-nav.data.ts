import { SideNavItems, SideNavSection } from './navigation.model';

export const sideNavSections: SideNavSection[] = [
    {
        text: '',
        items: ['productos', 'usuarios', 'clientes', 'creditos', 'ventas', 'facturas', 'proveedores', 'tiposPago', 'estadosVenta'],
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
    facturas: {
        icon: 'file-alt',
        text: 'Facturas',
        link: '/dashboard/facturas',
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
        icon: 'user-friends',
        text: 'Clientes',
        link: '/dashboard/clientes',
    },
    creditos: {
        icon: 'money-bill-wave',
        text: 'Créditos',
        link: '/creditos',
    },
    tiposPago: {
        icon: 'credit-card',
        text: 'Tipos de Pago',
        link: '/dashboard/tipos-pago',
    },
    estadosVenta: {
        icon: 'clipboard-check',
        text: 'Estados de Venta',
        link: '/dashboard/estados-venta',
    },
};
