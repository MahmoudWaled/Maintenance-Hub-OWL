/** @odoo-module **/
import {Component ,useState } from '@odoo/owl';
import {registry } from '@web/core/registry';

export class MaintenanceRoot extends Component {

    static template = 'maintenance_hub.MaintenanceRoot';

    setup(){
        this.state = useState({
            title:'hello world'
        })
    }

}

registry.category('actions').add('maintenance_hub.dashboard_action',MaintenanceRoot)