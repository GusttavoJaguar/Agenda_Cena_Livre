const eventForm = document.getElementById('event-form');
        const eventList = document.getElementById('event-list');

        const events = [];

        function renderEvents() {
            eventList.innerHTML = '';
            events.forEach((event, index) => {
                const eventElement = document.createElement('div');
                eventElement.className = 'event';
                eventElement.innerHTML = `
                    <span>${event.title} - ${new Date(event.date).toLocaleString()}</span>
                    <div>
                        <button class="edit" onclick="editEvent(${index})">Editar</button>
                        <button class="delete" onclick="deleteEvent(${index})">Excluir</button>
                    </div>
                `;
                eventList.appendChild(eventElement);
            });
        }

        function addEvent(title, date) {
            events.push({ title, date });
            renderEvents();
        }

        function editEvent(index) {
            const newTitle = prompt('Editar título do evento:', events[index].title);
            const newDate = prompt('Editar data e hora do evento:', events[index].date);
            if (newTitle && newDate) {
                events[index] = { title: newTitle, date: newDate };
                renderEvents();
            }
        }

        function deleteEvent(index) {
            events.splice(index, 1);
            renderEvents();
        }

        eventForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = document.getElementById('event-title').value;
            const date = document.getElementById('event-date').value;
            addEvent(title, date);
            eventForm.reset();
        });


function salvarEvento(titulo, descricao, data) {
    const novoEvento = {
        titulo,
        descricao,
        data,
    };
    firebase.database().ref("eventos").push(novoEvento);
    }
    
    // Exemplo: salvar um evento
    salvarEvento("Reunião", "Planejar próximos passos", "2025-01-08");
          

        function carregarEventos() {
        const eventosRef = firebase.database().ref("eventos");
        eventosRef.on("value", (snapshot) => {
            const eventos = snapshot.val();
            document.getElementById("agenda").innerHTML = ""; // Limpar a agenda

            for (const id in eventos) {
            const evento = eventos[id];
            const divEvento = document.createElement("div");
            divEvento.innerHTML = `
                <h3>${evento.titulo}</h3>
                <p>${evento.descricao}</p>
                <p>${evento.data}</p>
            `;
            document.getElementById("agenda").appendChild(divEvento);
            }
        });
        }


        // Chamar ao carregar a página
        carregarEventos();
        
        
        
const punycode = require('punycode/');