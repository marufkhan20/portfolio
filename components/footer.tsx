"use client";

import { motion } from "framer-motion";
import {
  ExternalLink,
  Github,
  Heart,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "#",
      color: "bg-[#0077B5]/10 text-[#0077B5] hover:bg-[#0077B5]/20",
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "#",
      color: "bg-[#E4405F]/10 text-[#E4405F] hover:bg-[#E4405F]/20",
    },
    {
      name: "Github",
      icon: Github,
      url: "#",
      color: "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20",
    },
    {
      name: "Fiverr",
      icon: ExternalLink,
      url: "#",
      color: "bg-[#1DBF73]/10 text-[#1DBF73] hover:bg-[#1DBF73]/20",
    },
    {
      name: "Upwork",
      icon: ExternalLink,
      url: "#",
      color: "bg-[#6FDA44]/10 text-[#6FDA44] hover:bg-[#6FDA44]/20",
    },
  ];

  const footerLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/#about" },
    { name: "Projects", href: "/#projects" },
    { name: "Contact", href: "/#contact" },
    { name: "Admin", href: "/admin" },
  ];

  return (
    <footer className="relative bg-muted/50 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full mix-blend-multiply filter blur-xl opacity-70" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-300/5 rounded-full mix-blend-multiply filter blur-xl opacity-70" />

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Portfolio</h3>
            <p className="text-muted-foreground">
              Showcasing my creative work and professional journey in web
              development and design.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-full transition-colors ${link.color}`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <link.icon className="w-4 h-4" />
                  <span className="sr-only">{link.name}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 text-muted-foreground">
                <Mail className="w-4 h-4 text-primary" />
                <span>your.email@example.com</span>
              </li>
              <li className="flex items-center space-x-3 text-muted-foreground">
                <Phone className="w-4 h-4 text-primary" />
                <span>+1 (234) 567-8900</span>
              </li>
              <li className="flex items-center space-x-3 text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                <span>New York, NY</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Portfolio. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground mt-2 md:mt-0 flex items-center">
            Made with <Heart className="w-4 h-4 text-red-500 mx-1" /> using
            Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}
