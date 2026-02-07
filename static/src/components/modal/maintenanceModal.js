/** @odoo-module **/

import { Component, onWillStart, useState } from '@odoo/owl';
import { Dialog } from '@web/core/dialog/dialog';
import { useService } from '@web/core/utils/hooks';


export class MaintenanceModal extends Component{
    static template = 'maintenance_hub.MaintenanceModal';
    static components = { Dialog };
    static props = {
        onSave:Function,
        close:Function
    };

    setup(){
        this.orm = useService('orm')
        this.state = useState({
        requestData:{
            name:'',
            user_id:'',
            equipment_id:'',
            priority:'1',
            schedule_date:'',
            schedule_end:'',
            description:'',
        },
        nameIsEmpty:false,
        users:[],
        equipments:[]
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
