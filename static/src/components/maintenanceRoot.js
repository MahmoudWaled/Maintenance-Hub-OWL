/** @odoo-module **/
import { Component, onWillStart, useState } from '@odoo/owl';
import {registry } from '@web/core/registry';
import { MaintenanceCard } from './card/maintenanceCard';
import {useService} from '@web/core/utils/hooks';
import { MaintenanceModal } from './modal/maintenanceModal';

export class MaintenanceRoot extends Component {

    static template = 'maintenance_hub.MaintenanceRoot';
    static components = {MaintenanceCard ,MaintenanceModal};
    
    setup(){
        this.state = useState({
            requests:[],
            searchTerm:'',
        });

        this.orm = useService('orm');
        this.dialog = useService('dialog');
        this.notification = useService('notification');

        onWillStart(async()=>await this.fetchPortalData());

        this.stages=[
            { id: 1, name: 'New', text_class: 'text-bg-primary' },
            { id: 2, name: 'In Progress', text_class: 'text-bg-warning' },
            { id: 3, name: 'Repaired', text_class: 'text-bg-success' },
            { id: 4, name: 'Scrap', text_class: 'text-bg-danger' }
        ];
        
    };

    async fetchPortalData(){
        const result = await this.orm.call('maintenance.request','get_portal_data',);
        this.state.requests = result;
    };

    openNewRequestModal(){
        this.dialog.add(MaintenanceModal,{
            request: null,
            onSave: async (requestData)=> await this.createRequest(requestData)
        })
    }

    openEditModal(requestToEdit) {
        this.dialog.add(MaintenanceModal, {
            request: requestToEdit,
            onSave: async (data) => await this.updateRequest(data)
        });
    }

    async createRequest(data){
        try {
            await this.orm.create('maintenance.request',[{
            name:data.name,
            user_id: data.user_id ? parseInt(data.user_id) : false,
            equipment_id: data.equipment_id ? parseInt(data.equipment_id) : false,
            priority:data.priority,
            schedule_date:data.schedule_date,
            schedule_end:data.schedule_end,
            description:data.description,
        }]);
        this.fetchPortalData();
        this.notification.add("Request Created Successfully", { type: "success" });
        }
        catch (error) {
            console.error("Error creating request:", error);
            this.notification.ass("Failed to create request. Please try again.",{
                type:"danger",
                title: "Database Error"
            })
        }
        
    }

    getRequestsByStage(stageId){
        return this.state.requests.filter(req=>{
            const inStage= req.stage_id[0] == stageId;
            const matchesSearch= req.name.toLowerCase().includes(this.state.searchTerm.toLowerCase());
            return inStage && matchesSearch;
        });
    }

     async deleteRequest(requestId){
        try {
            await this.orm.unlink('maintenance.request',[requestId]);
            this.state.requests = this.state.requests.filter(req=>req.id !== requestId);
            this.notification.add('Request Deleted Successfully',{type:'success'})
        } catch (error) {
            console.error("Error deleting request:", error);
            this.notification.add('Failed to delete request. Please try again.',{type:'danger', title: "Database Error"})
        }
        
    }

    async updateRequest(updatedData) {

        try {
            await this.orm.write("maintenance.request", [updatedData.id], {
            name: updatedData.name,
            description: updatedData.description,
            priority: updatedData.priority,
            user_id: updatedData.user_id ? parseInt(updatedData.user_id) : false,
            equipment_id: updatedData.equipment_id ? parseInt(updatedData.equipment_id) : false,
            schedule_date:updatedData.schedule_date,
            schedule_end:updatedData.schedule_end,
        });
        this.fetchPortalData();
        this.notification.add("Request Updated Successfully", { type: "success" });
        } catch (error) {
            console.error("Error updating request:", error);
            this.notification.ass("Failed to update request. Please try again.",{
                type:"danger",
                title: "Database Error"
            })
        }

       
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