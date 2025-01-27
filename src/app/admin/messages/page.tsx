import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Mail, Trash } from "lucide-react";

const messages = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    subject: "Project Inquiry",
    message: "Hi, I'm interested in working with you...",
    date: "2024-01-27",
    read: false,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    subject: "Collaboration Opportunity",
    message: "Would love to discuss a potential collaboration...",
    date: "2024-01-26",
    read: true,
  },
];

export default function MessagesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Messages</h2>
        <p className="text-muted-foreground">
          View and manage contact form submissions.
        </p>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Status</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages.map((message) => (
              <TableRow key={message.id}>
                <TableCell>
                  <span
                    className={`inline-block h-2 w-2 rounded-full ${
                      message.read ? "bg-muted" : "bg-primary"
                    }`}
                  />
                </TableCell>
                <TableCell>{message.name}</TableCell>
                <TableCell>{message.email}</TableCell>
                <TableCell>{message.subject}</TableCell>
                <TableCell>{message.date}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button size="sm" variant="ghost">
                    <Mail className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Trash className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
