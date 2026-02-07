/** @odoo-module **/

import {Component} from "@odoo/owl";
import { ConfirmationDialog } from '@web/core/confirmation_dialog/confirmation_dialog';
import { useService } from '@web/core/utils/hooks';
const { DateTime } = luxon;
export class MaintenanceCard extends Component{
    static template = "maintenance_hub.MaintenanceCard";

    static props = {
        request:Object,
        onDelete:Function,
        onEdit:Function
    };

    setup(){
        this.dialog = useService("dialog");
    }

    formatDate(dateStr) {
        if (!dateStr) return "";
        const date = DateTime.fromSQL(dateStr); 
        return date.toFormat('MMM d, h:mm a');
    }
    onDragStart(ev) {
        ev.dataTransfer.setData("request_id", this.props.request.id);
    }

    onDeleteClick() {
    this.dialog.add(ConfirmationDialog, {
        body: `Are you sure you want to delete "${this.props.request.name}"?`,
        confirm: () => this.props.onDelete(this.props.request.id),
        cancel: () => {},
    });
    }
    onCardClick() {
        this.props.onEdit(this.props.request);
    }
}