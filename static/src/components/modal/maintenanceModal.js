/** @odoo-module **/

import { Component, onWillStart, useState } from '@odoo/owl';
import { Dialog } from '@web/core/dialog/dialog';
import { useService } from '@web/core/utils/hooks';


export class MaintenanceModal extends Component{
    static template = 'maintenance_hub.MaintenanceModal';
    static components = { Dialog };
    static props = {
        onSave:Function,
        close:Function,
        request: { type: Object, optional: true },
    };

    setup(){
        this.orm = useService('orm')
        const initialData = this.props.request || {
            id: null,
            name:'',
            user_id:'',
            equipment_id:'',
            priority:'1',
            schedule_date:'',
            schedule_end:'',
            description:'',
        };
        
        const processedData = {
            ...initialData,
            priority: String(initialData.priority || "1"),
            user_id: Array.isArray(initialData.user_id) ? initialData.user_id[0] : (initialData.user_id || ''),
            equipment_id: Array.isArray(initialData.equipment_id) ? initialData.equipment_id[0] : (initialData.equipment_id || ''),
            schedule_date: initialData.schedule_date ? initialData.schedule_date.split(' ')[0] : '',
            schedule_end: initialData.schedule_end ? initialData.schedule_end.split(' ')[0] : '',
        };
        
        this.state = useState({
        requestData: processedData,
        nameIsEmpty:false,
        users:[],
        equipments:[],
        });

        onWillStart(async ()=>{
            this.state.users = await this.orm.searchRead('res.users',[],['id','name']);
            this.state.equipments = await this.orm.searchRead('maintenance.equipment',[],['id','name']);
        })
    };
    setPriority(value) {
        this.state.requestData.priority = value.toString();
    }
    
    clearNameError(){
        if(this.state.requestData.name.trim()){
            this.state.nameIsEmpty = false;
        }
    }
    
    async save(){
        if(!this.state.requestData.name.trim()){
            this.state.nameIsEmpty = true;
            return;
        }
        
        this.state.nameIsEmpty = false;
        
        await  this.props.onSave(this.state.requestData);
        this.props.close();
    };
   
}
