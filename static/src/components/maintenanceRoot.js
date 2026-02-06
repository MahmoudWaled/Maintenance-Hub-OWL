/** @odoo-module **/
import { Component, onWillStart, useState } from '@odoo/owl';
import {registry } from '@web/core/registry';
import { MaintenanceCard } from './card/maintenanceCard';
import {useService} from '@web/core/utils/hooks';

export class MaintenanceRoot extends Component {

    static template = 'maintenance_hub.MaintenanceRoot';
    static components = {MaintenanceCard};
    
    setup(){
        this.state = useState({
            requests:[],
        });

        this.orm = useService('orm');
        onWillStart(async()=>await this.fetchPortalData());

        this.stages=[
            { id: 1, name: 'New', text_class: 'text-bg-primary' },
            { id: 2, name: 'In Progress', text_class: 'text-bg-warning' },
            { id: 3, name: 'Repaired', text_class: 'text-bg-success' },
            { id: 4, name: 'Scrap', text_class: 'text-bg-danger' }
        ]
    };

    async fetchPortalData(){
        const result = await this.orm.call('maintenance.request','get_portal_data',);
        this.state.requests = result;
    };


    getRequestsByStage(stageId){
        const results= this.state.requests.filter(req=>req.stage_id[0] == stageId);
        return results;
    }

    onDragOver(ev) {
        ev.preventDefault(); 
        ev.dataTransfer.dropEffect = "move"; 
    }

    async onDrop(stageId, ev) {
        ev.preventDefault();
        const requestId = parseInt(ev.dataTransfer.getData("request_id"));
        if (!requestId) return;
        await this.updateRequestStage(requestId, stageId);
    }

    async updateRequestStage(requestId, newStageId) {
        const request = this.state.requests.find(r => r.id === requestId);
        if (request) {
            const stageName = this.stages.find(s => s.id === newStageId)?.name || "Unknown";
            request.stage_id = [newStageId, stageName];
        }

        try {
            await this.orm.write("maintenance.request", [requestId], {
                stage_id: newStageId,
            });
        } catch (error) {
            console.error("Failed to move card", error);
        }
    }
   
}

registry.category('actions').add('maintenance_hub.dashboard_action',MaintenanceRoot)