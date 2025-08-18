export const addItemToServer = async (task, date) => {
  const response = await fetch('http://localhost:3000/api/todo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ task, date }),
  });
  const item = await response.json();
  return mapServerItemToLocalItem(item);
}

export const getItemsFromServer = async () => {
  const response = await fetch('http://localhost:3000/api/todo');
  const items = await response.json();
  return items.map(mapServerItemToLocalItem);
}

export const deleteItemFromServer = async (id) => {
  const response = await fetch(`http://localhost:3000/api/todo/${id}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    return id; // Return the id of the deleted item
  }
  throw new Error('Failed to delete item');
}

export const markItemCompletedOnServer = async (id) => {
  const response = await fetch(`http://localhost:3000/api/todo/${id}/completed`, {
    method: 'PUT',
  })
  const item = await response.json();
  if (response.ok) {
    return mapServerItemToLocalItem(item);
  }
  throw new Error('Failed to mark item as completed');
}
 
const mapServerItemToLocalItem = (severItem) => {
  return {
    id: severItem._id,
    name: severItem.task,
    dueDate: severItem.date,
    completed: severItem.completed,
    createdAt: severItem.createdAt,
    updatedAt: severItem.updatedAt,
  };
}