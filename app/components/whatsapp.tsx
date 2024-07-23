// @ts-nocheck
"use client";
import { FloatingWhatsApp } from 'react-floating-whatsapp'
import "@/app/styles/whatsapp-custom.css";

export function WhatsappIcon()
{
    return (
        <FloatingWhatsApp
            accountName='Daisho Gold'
            phoneNumber='+81 80-3327-9070'
            avatar='/logo.png'
        />
    )
}