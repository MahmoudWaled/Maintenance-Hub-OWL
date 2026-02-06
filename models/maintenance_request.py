from odoo import api, models


class MaintenanceRequest(models.Model):
    _inherit = 'maintenance.request'

    @api.model
    def get_portal_data(self):
        results = self.search_read(
            [], [
                'id',
                'name',
                'stage_id',
                'technician_user_id',
                'equipment_id',
                'priority',
                'kanban_state',
                'request_date',
                'description'
            ])
        return results
