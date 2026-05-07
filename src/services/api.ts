import type { TaskResponse, User } from "../types/models";
import type { Task } from "../types/models";
import type {TaskDTO}

const BASE_URL = "http://localhost:8080/TodoExample/api";

// ========================
//  USERS
// ========================

export async function crearUsuari(user: User) {
  const response = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  if (response.status === 201) {
    return await response.json();
  } else if (response.status === 409) {
    const msg = await response.json();
    throw new Error(msg);
  } else {
    throw new Error("Error inesperat del servidor.");
  }
}

export async function llistarUsuaris(): Promise<User[]> {
  const response = await fetch(`${BASE_URL}/users`);

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("Error obtenint la llista d'usuaris.");
  }
}

export async function crearTasca(task: Task) {
  const response = await fetch(`${BASE_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });

  if (response.status === 201) {
    return await response.json();
  } else if (response.status === 409) {
    const msg = await response.json();
    throw new Error(msg);
  } else {
    throw new Error("Error inesperat del servidor.");
  }
}

export async function llistarTasquesPerUsuari(nif: string): Promise<TaskResponse[]> {
    const response = await fetch(`${BASE_URL}/tasks?user=${nif}`)
    if (response.ok) {
        return await response.json()
    } else if (response.status === 404) {
        const msg = await response.json()
        throw new Error(msg)
    } else {
        throw new Error("Error obtenint les tasques.")
    }
}
export async function marcarTascaCompletada(id: number): Promise<void> {
  const response = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "PUT",
  });

  if (!response.ok) {
    throw new Error("Error marcant la tasca com a completada.");
  }
}

export async function eliminarTasca(id: number): Promise<void> {
  const response = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error eliminant la tasca.");
  }
}
export async function marcarTascaCompletada(id: number): Promise<void> {
  const response = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "PUT",
  });

  if (!response.ok) {
    throw new Error("Error marcant la tasca com a completada.");
  }
}

export async function eliminarTasca(id: number): Promise<void> {
  const response = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error eliminant la tasca.");
  }
}

export async function llistarTasquesPendents(): Promise<TaskDTO[]> {
  const response = await fetch(`${BASE_URL}/tasks`);

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("Error obtenint les tasques pendents.");
  }
}