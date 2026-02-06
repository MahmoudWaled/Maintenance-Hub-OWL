{
    'name': 'Maintenance Hub',
    'version': '1.0',
    'author': 'Mahmoud Waled',
    'summary': 'Manage maintenance requests using OWL',
    'category': 'Maintenance',
    'depends': ['base', 'web', 'maintenance'],
    'data': [
        'views/maintenance_menus.xml',
    ],
    'assets': {
        'web.assets_backend': [
            'maintenance_hub/static/src/components/*.js',
            'maintenance_hub/static/src/components/*.xml',
            'maintenance_hub/static/src/components/card/*.js'
            'maintenance_hub/static/src/components/card/*.xml'
        ],
    },
    'installable': True,
    'application': True,
}
