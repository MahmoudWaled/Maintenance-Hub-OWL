{
    'name': 'Maintenance Hub',
    'version': '1.0',
    'summary': 'Manage maintenance requests using OWL',
    'depends': [],
    'data': [
        'views/maintenance_menus.xml',
    ],
    'assets': {
        'web.assets_backend': [
            'maintenance_hub/static/src/components/*.js',
            'maintenance_hub/static/src/components/*.xml',
        ],
    },
    'installable': True,
    'application': True,
}
