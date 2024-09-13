import React from "react";
import Card from "./Card";
import "../App.css";
const KanbanColumn = ({ group, tickets, users }) => {
    return (
        <div className="kanban-column">
            <h2>
                {group} ({tickets.length})
            </h2>
            {tickets.map((ticket) => (
                <Card
                    key={ticket.id}
                    ticket={ticket}
                    user={users.find((u) => u.id === ticket.userId)}
                />
            ))}
        </div>
    );
};

export default KanbanColumn;
