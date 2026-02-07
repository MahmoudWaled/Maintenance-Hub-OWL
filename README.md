# maintenance_hub

A custom Single Page Application (SPA) for Odoo maintenance management, built with the Odoo Web Library (OWL).

## Description

This module implements a reactive, component-based frontend within the Odoo backend, bypassing standard Kanban views. It communicates directly via RPC to provide real-time updates, drag-and-drop functionality, and instant client-side filtering.

## Features

- **Custom Kanban Board:** Reactive interface built with OWL components.
- **Drag and Drop:** HTML5 API integration for updating request stages.
- **Client-Side Search:** Instant filtering without database queries.
- **Modal Operations:** Create and Edit forms handled via Odoo Dialog service.
- **Validation:** Client-side name input validation with Odoo Notification feedback.

## Technical Stack

- **Framework:** Odoo 17.0+ (OWL)
- **Languages:** JavaScript (ES6+), XML (QWeb), Python
- **Core Concepts:** `useState`, `onWillStart`, `useService` (`orm`, `dialog`, `notification`)

## Installation

1. Clone the repository into your Odoo addons path:
   ```bash
   git clone [https://github.com/your-username/maintenance_hub.git](https://github.com/your-username/maintenance_hub.git)
   ```
2. Add the module path to odoo.conf.
3. Restart Odoo.
4. Install Maintenance Hub from the Apps menu.

## Usage

Navigate to Maintenance app > Maintenance Hub. The dashboard loads active requests. Users can drag cards to change stages, use the search bar, or toggle "My Tasks" to filter assignments.

## Dependencies

base
web
maintenance
