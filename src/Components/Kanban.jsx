import React, { useMemo } from "react";
import Column from "./Column";
import "../App.css";
const Kanban = ({ tickets, users, groupBy, sortBy }) => {
    const getUserById = (userId) => {
        const user = users.find((user) => user.id === userId);
        return user ? user.name : "Unknown User";
    };

    const groupedTickets = useMemo(() => {
        let result = {};
        if (groupBy === "status") {
            result = tickets.reduce((acc, ticket) => {
                const groupKey = ticket.status;
                if (!acc[groupKey]) acc[groupKey] = [];
                acc[groupKey].push(ticket);
                return acc;
            }, {});
        } else if (groupBy === "user") {
            result = tickets.reduce((acc, ticket) => {
                const groupKey = getUserById(ticket.userId);
                if (!acc[groupKey]) acc[groupKey] = [];
                acc[groupKey].push(ticket);
                return acc;
            }, {});
        } else if (groupBy === "priority") {
            result = tickets.reduce((acc, ticket) => {
                const groupKey = ticket.priority.toString(); // Convert priority number to string for key
                if (!acc[groupKey]) acc[groupKey] = [];
                acc[groupKey].push(ticket);
                return acc;
            }, {});
        }
        return result;
    }, [tickets, groupBy, users]);

    const sortTickets = (tickets) => {
        return tickets.sort((a, b) => {
            if (sortBy === "priority") {
                return b.priority - a.priority; // Descending order of priority
            }
            return a.title.localeCompare(b.title); // Ascending order by title
        });
    };

    const sortedGroupedTickets = useMemo(() => {
        return Object.entries(groupedTickets).map(([group, tickets]) => [
            group,
            sortTickets(tickets),
        ]);
    }, [groupedTickets, sortBy]);
    return (
        <div className="kanban-board">
            {sortedGroupedTickets.map(([group, tickets]) => (
                <Column
                    key={group}
                    group={group}
                    tickets={tickets}
                    users={users}
                />
            ))}
        </div>
    );
};

export default Kanban;
