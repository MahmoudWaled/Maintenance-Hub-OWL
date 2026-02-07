{
    'name': 'Maintenance Hub',
    'version': '1.0',
    'author': 'Mahmoud Waled',
    'summary': 'Manage maintenance requests using OWL',
    'category': 'Maintenance',
    'depends': ['base', 'web', 'maintenance'],
    'data': [
        'views/maintenance_menus.xml',
        'data/users_demo.xml',
        'data/maintenance_demo.xml',
    ],
    'assets': {
        'web.assets_backend': [
            'maintenance_hub/static/src/**/*.js',
            'maintenance_hub/static/src/**/*.xml',
            'maintenance_hub/static/src/**/*.css',
        ],
    },
    'installable': True,
    'application': True,
}
