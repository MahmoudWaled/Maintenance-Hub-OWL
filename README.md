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
   git clone https://github.com/MahmoudWaled/Maintenance-Hub-OWL.git
   ```
2. Add the module path to odoo.conf.
3. Restart Odoo.
4. Install Maintenance Hub from the Apps menu.


## Dependencies

base
web
maintenance

## Screenshots from the app

<img width="1920" height="875" alt="Screenshot_20260207_183630" src="https://github.com/user-attachments/assets/e3298d51-5c74-4038-a5e5-8c5a9631fa51" />
<img width="1920" height="877" alt="Screenshot_20260207_183820" src="https://github.com/user-attachments/assets/e7f0e16b-546d-44ec-a435-d91c3d63ab64" />
<img width="1920" height="876" alt="Screenshot_20260207_183944" src="https://github.com/user-attachments/assets/7b8dd05e-6a13-4f2c-abbe-7d5121df285e" />
<img width="1920" height="816" alt="Screenshot_20260207_184532" src="https://github.com/user-attachments/assets/c458a014-81c8-4807-843f-2ac2d5f2e9cd" />
<img width="1920" height="810" alt="Screenshot_20260207_184603" src="https://github.com/user-attachments/assets/a68d6716-d920-4967-a4e4-99c2b806b596" />
<img width="1920" height="809" alt="Screenshot_20260207_184623" src="https://github.com/user-attachments/assets/25f55a70-383f-47aa-a4bd-5168c747f251" />
<img width="1920" height="816" alt="Screenshot_20260207_184636" src="https://github.com/user-attachments/assets/4370c498-4e40-4d9d-9946-d4da1a885cc5" />


