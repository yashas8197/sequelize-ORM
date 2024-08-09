const express = require("express");
const app = express();
const { sequelize } = require("./lib/index");
const { agent } = require("./models/agent.model");
const { customers } = require("./models/customers.model");
const { tickets } = require("./models/tickets.model");

app.use(express.json());

const ticketData = [
  {
    title: "Login Issue",
    description: "Cannot login to account",
    status: "open",
    priority: 1,
    customerId: 1,
    agentId: 1,
  },
  {
    title: "Payment Failure",
    description: "Payment not processed",
    status: "closed",
    priority: 2,
    customerId: 2,
    agentId: 2,
  },
  {
    title: "Bug Report",
    description: "Found a bug in the system",
    status: "open",
    priority: 3,
    customerId: 1,
    agentId: 1,
  },
];

const customersData = [
  { customerId: 1, name: "Alice", email: "alice@example.com" },
  { customerId: 2, name: "Bob", email: "bob@example.com" },
];

const agentsData = [
  { agentId: 1, name: "Charlie", email: "charlie@example.com" },
  { agentId: 2, name: "Dave", email: "dave@example.com" },
];

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });

    await customers.bulkCreate(customersData);
    await agent.bulkCreate(agentsData);

    await tickets.bulkCreate(ticketData);

    return res.status(200).json({ message: "Data seeded successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function fetchAllTickets() {
  const result = await tickets.findAll();
  return { tickets: result };
}

app.get("/tickets", async (req, res) => {
  try {
    const response = await fetchAllTickets();

    if (response.tickets.length === 0) {
      return res.status(404).json({ message: "No Tickets Found" });
    }

    return res.status(200).json(response);
  } catch (error) {
    return req.statusCode(500).json({ error: error.message });
  }
});

async function fetchTicketById(id) {
  let result = await tickets.findOne({ where: { id } });
  return { ticket: result };
}

app.get("/tickets/details/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const response = await fetchTicketById(id);

    if (response.ticket.length === 0) {
      return res.status(404).json({ message: "No Ticket Found" });
    }

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function fetchTicketByStatus(status) {
  const results = await tickets.findAll({ where: { status } });
  return { tickets: results };
}

app.get("/tickets/status/:status", async (req, res) => {
  try {
    const status = req.params.status;
    const response = await fetchTicketByStatus(status);

    if (response.tickets.length === 0) {
      return res.status(404).json({ message: "No Tickets Found" });
    }

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function sortByPriority() {
  const result = await tickets.findAll();

  result.sort((a, b) => a.priority - b.priority);

  return { tickets: result };
}

app.get("/tickets/sort-by-priority", async (req, res) => {
  try {
    const response = await sortByPriority();

    if (response.tickets.length === 0) {
      return res.status(404).json({ message: "No Tickets Found" });
    }

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function addNewTicket(newTicket) {
  const newTickets = await tickets.create(newTicket);

  return { newTickets };
}

app.post("/tickets/new", async (req, res) => {
  try {
    const newTicket = req.body;
    const response = await addNewTicket(newTicket);

    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function updateTicketById(id, newTicketData) {
  try {
    const ticketDetail = await tickets.findOne({ where: { id } });

    if (!ticketDetail) {
      return {};
    }

    ticketDetail.set(newTicketData);
    let updatedTicket = await ticketDetail.save();

    return { message: "updated successfully", updatedTicket };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

app.post("/tickets/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const newTicketData = req.body;

    const response = await updateTicketById(id, newTicketData);

    if (!response.message) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function deleteTicketById(id) {
  const destroyedTicket = await tickets.destroy({ where: { id } });

  if (destroyedTicket === 0) return {};

  return {
    message: `Ticket deleted successfully.`,
  };
}

app.post("/tickets/delete", async (req, res) => {
  try {
    const { id } = req.body;
    const response = await deleteTicketById(id);

    if (!response.message) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function fetchByCustomerId(customerId) {
  const result = await tickets.findAll({ where: { customerId } });

  return { tickets: result };
}

app.get("/tickets/customer/:id", async (req, res) => {
  try {
    const customerId = req.params.id;
    const response = await fetchByCustomerId(customerId);

    if (response.tickets.length === 0) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function fetchByAgentId(agentId) {
  const result = await tickets.findAll({ where: { agentId } });

  return { tickets: result };
}

app.get("/tickets/agent/:id", async (req, res) => {
  try {
    const agentId = req.params.id;
    const response = await fetchByAgentId(agentId);

    if (response.tickets.length === 0) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running in port 3000");
});
