/** @odoo-module **/

import {Component} from "@odoo/owl";
const { DateTime } = luxon;
export class MaintenanceCard extends Component{
    static template = "maintenance_hub.MaintenanceCard";

    static props = {
        request:Object,
    };

    formatDate(dateStr) {
        if (!dateStr) return "";
        const date = DateTime.fromSQL(dateStr); 
        return date.toFormat('MMM d, h:mm a');
    }
    onDragStart(ev) {
        ev.dataTransfer.setData("request_id", this.props.request.id);
    }
}