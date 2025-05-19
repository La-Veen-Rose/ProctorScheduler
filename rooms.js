let rooms = [];

    function saveRoom() {
      const number = document.getElementById('roomNumber').value;
      const desc = document.getElementById('roomDescription').value;

      if (!number || !desc) return alert("Fill both fields");

      const room = {
        id: Date.now(),
        number,
        description: desc
      };

      // Here you'd save to database using fetch (backend not yet implemented)
      rooms.push(room);
      renderRooms();
      document.getElementById('roomNumber').value = '';
      document.getElementById('roomDescription').value = '';
    }

    function deleteRoom(id) {
      rooms = rooms.filter(r => r.id !== id);
      renderRooms();
    }

    function editRoom(id) {
      const room = rooms.find(r => r.id === id);
      if (room) {
        const newNumber = prompt("Edit Room Number", room.number);
        const newDesc = prompt("Edit Description", room.description);
        if (newNumber && newDesc) {
          room.number = newNumber;
          room.description = newDesc;
          renderRooms();
        }
      }
    }

    function renderRooms(filtered = rooms) {
      const list = document.getElementById('roomList');
      list.innerHTML = '';
      filtered.forEach(room => {
        list.innerHTML += `
          <div class="room-card">
            <div class="room-info">
              <strong>${room.number}</strong><br>
              <small>${room.description}</small>
            </div>
            <div class="icons">
              <img src="edit_icon.png" onclick="editRoom(${room.id})" alt="edit">
              <img src="del_icon.png" onclick="deleteRoom(${room.id})" alt="delete">
            </div>
          </div>
        `;
      });
    }

    function searchRooms() {
      const query = document.getElementById('searchInput').value.toLowerCase();
      const filtered = rooms.filter(r =>
        r.number.toLowerCase().includes(query) || r.description.toLowerCase().includes(query)
      );
      renderRooms(filtered);
    }