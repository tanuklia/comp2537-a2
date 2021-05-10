let people = [];

async function getPeople() {
    let response = await fetch(window.location.origin + "/people");
    people = await response.json();
    console.log(people);
    addToTable();
}

function addToTable() {
    people.forEach(person => {
        $("#table").append(`
            <tr>
                <td>${person.id}</td>
                <td>${person.name}</td>
                <td>${person.height}</td>
                <td>${person.gender}</td>
                <td>${person.birth_year}</td>
            </tr>
        `);
    });
}

getPeople();

