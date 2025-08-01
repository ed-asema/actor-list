const API_URL = "https://688aef1c2a52cabb9f4f61ae.mockapi.io/api/v1/users"

const div = document.getElementById("users")
const addBtn = document.getElementById("add")
const box = document.querySelector(".box")
const inputs = document.querySelectorAll("input")
const add2Btn = document.getElementById("add2")

add2Btn.onclick = createUser

async function getUsers() {
  const res = await fetch(API_URL)
  const users = await res.json()
  showUsers(users)
}

getUsers()

addBtn.onclick = function () {
  box.classList.toggle("hidden")
}

async function createUser() {
  const newUser = {
    name: inputs[0].value.trim(),
    avatar: inputs[1].value.trim()
  }

  if (!newUser.name || !newUser.avatar) return alert("Enter both fields!")

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser)
  })

  inputs[0].value = ""
  inputs[1].value = ""
  getUsers()
}

async function deleteUser(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  })
  getUsers()
}

function showUsers(list) {
  div.innerHTML = ""
  for (const u of list) {
    const card = document.createElement("div")
    card.className = "border p-4 rounded-lg shadow flex flex-col items-center gap-2 "

    const avatar = document.createElement("img")
    avatar.src = u.avatar
    avatar.alt = u.name
    avatar.className = "w-28 h-28 object-cover rounded-full transition hover:scale-105"

    const name = document.createElement("h2")
    name.textContent = u.name
    name.className = "font-semibold text-center"

    const delBtn = document.createElement("button")
    delBtn.textContent = "Delete"
    delBtn.className = "bg-black text-white px-3 py-1 rounded hover:bg-gray-800 transition"
    delBtn.onclick = () => deleteUser(u.id)

    card.appendChild(avatar)
    card.appendChild(name)
    card.appendChild(delBtn)
    div.appendChild(card)
  }
}

