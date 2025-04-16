// Sample data for users, bills, and votes
const users = [
    { id: 1, voter_id: "9720978470", password: "Bharat", name: "Bharat" },
    { id: 1, voter_id: "6395589646", password: "Chetan", name: "Chetan" },
    { id: 1, voter_id: "9520393105", password: "Harsh", name: "Harsh" },
    { id: 2, voter_id: "7818909557", password: "Shiva", name: "Shiva" }
];

const bills = [
    { id: 1, title: "Bill on Renewable Energy", description: "A bill to promote renewable energy sources in India.", status: "Ongoing" },
    { id: 2, title: "Bill on Data Protection", description: "A bill to ensure data privacy and protection for citizens.", status: "Upcoming" }
];

const votes = [
    { billId: 1, voterId: "9720978470", vote: "Support" },
    { billId: 1, voterId: "6395589646", vote: "Dissent" },
    { billId: 1, voterId: "9520393105", vote: "Abstain" },
    { billId: 2, voterId: "VOTER12345", vote: "Support" }
];

// Admin password
const adminPassword = "admin123"; // Change this to a secure password

// User login functionality
document.getElementById('loginForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const voterId = document.getElementById('voterId').value;
    const password = document.getElementById('password').value;
    const user = users.find(u => u.voter_id === voterId && u.password === password);
    if (user) {
        alert(`Welcome, ${user.name}!`);
        // Redirect to voting page
        window.location.href = 'voting.html';
    } else {
        document.getElementById('errorMessage').innerText = 'Invalid credentials. Please try again.';
    }
});

// Function to display bills in the voting page
function displayBills() {
    const billsContainer = document.getElementById('billsContainer');
    bills.forEach(bill => {
        const billDiv = document.createElement('div');
        billDiv.innerHTML = `<h3>${bill.title}</h3><p>${bill.description}</p><button onclick="vote('${bill.id}', 'Support')">Vote Support</button>
        <button onclick="vote('${bill.id}', 'Abstain')">Vote Abstain</button> <button onclick="vote('${bill.id}', 'Dissent')">Vote Dissent</button>`;
        billsContainer.appendChild(billDiv);
    });
}

// Function to handle voting
function vote(billId, voteType) {
    const voterId = prompt("Please enter your Voter ID to confirm your vote:");
    if (users.some(user => user.voter_id === voterId)) {
        votes.push({ billId: billId, voterId: voterId, vote: voteType });
        alert(`Your vote for "${voteType}" on Bill ID ${billId} has been recorded.`);
    } else {
        alert("Invalid Voter ID. Please try again.");
    }
}

// Function to prompt for admin password
function promptAdminPassword() {
    const password = prompt("Please enter the admin password:");
    if (password === adminPassword) {
        displayAdminBills();
        displayAdminVotes();
    } else {
        alert("Incorrect password. Access denied.");
    }
}

// Function to display bills in the admin dashboard
function displayAdminBills() {
    const billsContainer = document.getElementById('billsContainer');
    bills.forEach(bill => {
        const billDiv = document.createElement('div');
        billDiv.innerHTML = `<h3>${bill.title}</h3><p>${bill.description}</p><p>Status: ${bill.status}</p>`;
        billsContainer.appendChild(billDiv);
    });
}

// Function to display user votes in the admin dashboard
function displayAdminVotes() {
    const votesContainer = document.getElementById('votesContainer');
    votes.forEach(vote => {
        const bill = bills.find(b => b.id === vote.billId);
        const voteDiv = document.createElement('div');
        voteDiv.innerHTML = `<p>Voter ID: ${vote.voterId} voted "${vote.vote}" on "${bill.title}"</p>`;
        votesContainer.appendChild(voteDiv);
    });
}

// Call the function to prompt for admin password when accessing the admin dashboard
if (document.getElementById('billsContainer') && document.getElementById('votesContainer')) {
    promptAdminPassword();
}

// Call the function to display bills on the voting page
if (document.getElementById('billsContainer') && !document.getElementById('votesContainer')) {
    displayBills();
}