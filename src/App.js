import Navbar from "./Components/Navbar";
import Card from "./Components/Card";
import { useEffect, useState, useMemo, useCallback } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
    const [tickets, setTickets] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [groupBy, setGroupBy] = useState(
        localStorage.getItem("groupBy") || "status"
    );
    const [sortBy, setSortBy] = useState(
        localStorage.getItem("sortBy") || "priority"
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "https://api.quicksell.co/v1/internal/frontend-assignment"
                );
                setTickets(response.data.tickets);
                setUsers(response.data.users);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        localStorage.setItem("groupBy", groupBy);
        localStorage.setItem("sortBy", sortBy);
    }, [groupBy, sortBy]);

    const handleGroupChange = (newGroup) => {
        setGroupBy(newGroup);
    };

    const handleSortChange = (newSort) => {
        setSortBy(newSort);
    };

    const getUserById = useCallback(
        (userId) => {
            return (
                users.find((user) => user.id === userId)?.name || "Unknown User"
            );
        },
        [users]
    );

    const sortTickets = useCallback(
        (tickets) => {
            return tickets.sort((a, b) => {
                if (sortBy === "priority") {
                    return b.priority - a.priority;
                }
                return a.title.localeCompare(b.title);
            });
        },
        [sortBy]
    );

    const priorityLabels = useMemo(
        () => ({
            0: "No priority",
            1: "Low",
            2: "Medium",
            3: "High",
            4: "Urgent",
        }),
        []
    );

    const groupTickets = useMemo(() => {
        let groupedTickets = {};
        if (groupBy === "status") {
            groupedTickets = tickets.reduce((acc, ticket) => {
                const groupKey = ticket.status;
                if (!acc[groupKey]) acc[groupKey] = [];
                acc[groupKey].push(ticket);
                return acc;
            }, {});
        } else if (groupBy === "user") {
            groupedTickets = tickets.reduce((acc, ticket) => {
                const groupKey = getUserById(ticket.userId);
                if (!acc[groupKey]) acc[groupKey] = [];
                acc[groupKey].push(ticket);
                return acc;
            }, {});
        } else if (groupBy === "priority") {
            groupedTickets = tickets.reduce((acc, ticket) => {
                const groupKey = priorityLabels[ticket.priority]; // Use priority label
                if (!acc[groupKey]) acc[groupKey] = [];
                acc[groupKey].push(ticket);
                return acc;
            }, {});
        }
        return groupedTickets;
    }, [tickets, groupBy, getUserById, priorityLabels]);

    const sortedGroupedTickets = useMemo(
        () =>
            Object.entries(groupTickets).map(([group, tickets]) => [
                group,
                sortTickets(tickets),
            ]),
        [groupTickets, sortTickets]
    );

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="App">
            <h1>Kanban Board</h1>
            <Navbar
                group={groupBy}
                order={sortBy}
                onGroupchange={handleGroupChange} // Make sure this matches the Navbar prop name
                onOrderChange={handleSortChange} // Make sure this matches the Navbar prop name
            />
            <div className="kanban-board">
                {sortedGroupedTickets.map(([group, tickets]) => (
                    <div key={group} className="kanban-column">
                        <h2>
                            {group} ({tickets.length})
                        </h2>
                        {tickets.map((ticket) => (
                            <Card
                                key={ticket.id}
                                ticket={ticket}
                                user={users.find((u) => u.id === ticket.userId)}
                                icon={null}
                                statusIcon={null}
                                statusColor="#000"
                                bgColor="#f0f0f0"
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
