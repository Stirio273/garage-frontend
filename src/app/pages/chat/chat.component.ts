import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { BadgeModule } from 'primeng/badge';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';

interface User {
    id: number;
    name: string;
    avatar: string;
    status: 'online' | 'offline';
    lastActive?: string;
    lastMessage?: string;
    unreadCount?: number;
}

interface Message {
    id: number;
    text: string;
    sender: string;
    timestamp: Date;
    avatar: string;
    status?: 'sent' | 'delivered' | 'read';
}

@Component({
    selector: 'app-chat',
    standalone: true,
    imports: [CommonModule, FormsModule, AvatarModule, ButtonModule, InputTextModule, IconFieldModule, CardModule, ScrollPanelModule, BadgeModule, InputIconModule],
    templateUrl: './chat.component.html',
    styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit {
    users: User[] = [
        {
            id: 1,
            name: 'Ioni Bowcher',
            avatar: 'assets/avatars/avatar1.jpg',
            status: 'online',
            lastActive: '1 hour ago',
            lastMessage: 'Lorem ipsum dolor sit amet',
            unreadCount: 2
        },
        {
            id: 2,
            name: 'Stephen Shaw',
            avatar: 'assets/avatars/avatar2.jpg',
            status: 'offline',
            lastActive: '2d',
            lastMessage: 'Consequat mauris nunc'
        },
        {
            id: 3,
            name: 'Xuxue Feng',
            avatar: 'assets/avatars/avatar3.jpg',
            status: 'online',
            lastActive: '2d',
            lastMessage: 'Adipiscing tristique ri'
        }
    ];

    messages: Message[] = [
        {
            id: 1,
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
            sender: 'Ioni Bowcher',
            timestamp: new Date(),
            avatar: 'assets/avatars/avatar1.jpg',
            status: 'read'
        },
        {
            id: 2,
            text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
            sender: 'Ioni Bowcher',
            timestamp: new Date(),
            avatar: 'assets/avatars/avatar1.jpg',
            status: 'read'
        }
    ];

    selectedUser: User = this.users[0];
    newMessage: string = '';
    searchQuery: string = '';
    currentUser: string = 'Asiya Javayant';
    currentUserAvatar: string = 'assets/avatars/avatar-f.jpg';
    private cdnLinkElement!: HTMLLinkElement;

    ngOnInit(): void {
        this.cdnLinkElement = document.createElement('link');
        this.cdnLinkElement.rel = 'stylesheet';
        this.cdnLinkElement.href = 'https://unpkg.com/primeflex@latest/primeflex.css';

        // Append the link element to the head of the document
        document.head.appendChild(this.cdnLinkElement);
    }

    selectUser(user: User) {
        this.selectedUser = user;
        // Here you would typically load the chat history for this user
    }

    sendMessage() {
        if (this.newMessage.trim()) {
            this.messages.push({
                id: this.messages.length + 1,
                text: this.newMessage,
                sender: this.currentUser,
                timestamp: new Date(),
                avatar: this.currentUserAvatar,
                status: 'sent'
            });
            this.newMessage = '';
        }
    }

    getFilteredUsers() {
        return this.users.filter((user) => user.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
    }

    ngOnDestroy(): void {
        // Remove the link element when the component is destroyed
        if (this.cdnLinkElement) {
            document.head.removeChild(this.cdnLinkElement);
        }
    }
}
