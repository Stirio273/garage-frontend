import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
    selector: 'app-toolbar',
    standalone: true,
    imports: [ToolbarModule, ButtonModule],
    template: `<p-toolbar styleClass="mb-6">
        <ng-template #start>
            <p-button label="Ajouter" icon="pi pi-plus" severity="secondary" class="mr-2" (onClick)="onNew()" />
            <p-button severity="secondary" label="Supprimer" icon="pi pi-trash" outlined (onClick)="onDeleteSelected()" [disabled]="disableDelete" />
        </ng-template>

        <ng-template #end>
            <p-button label="Export" icon="pi pi-upload" severity="secondary" (onClick)="onExportCSV()" />
        </ng-template>
    </p-toolbar>`,
    styleUrls: []
})
export class ToolbarComponent {
    @Input() disableDelete: boolean = true; // Pour activer/désactiver le bouton Delete
    @Output() newClicked = new EventEmitter<void>();
    @Output() deleteClicked = new EventEmitter<void>();
    @Output() exportClicked = new EventEmitter<void>();

    onNew() {
        this.newClicked.emit();
    }

    onDeleteSelected() {
        this.deleteClicked.emit();
    }

    onExportCSV() {
        this.exportClicked.emit();
    }
}
