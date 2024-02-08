import { useState, type ChangeEvent } from 'react';
import Form from './Form';
import Input from './Input';
import Button from './Button';
import { nanoid } from 'nanoid';
import Items from './Items';
import { ToastContainer, toast } from 'react-toastify';

export type Item = {
	id: string;
	completed: boolean;
	name: string;
};

const App = () => {
	const getLocalStorage = (): Item[] => {
		let list = localStorage.getItem('list');
		if (list !== null) {
			return (list = JSON.parse(localStorage.getItem('list')!));
		}
		return [];
	};

	const setLocalStorage = (items: Item[]) => {
		localStorage.setItem('list', JSON.stringify(items));
	};

	const editItem = (itemID: string) => {
		const newItems = items.map((item) => {
			if (item.id === itemID) {
				const newItem = { ...item, completed: !item.completed };
				return newItem;
			}
			return item;
		});
		setItems(newItems);
		setLocalStorage(newItems);
	};
	const [items, setItems] = useState<Item[]>(getLocalStorage());
	const [newItemName, setNewItemName] = useState<string>('');

	const handleSave = (data: unknown) => {
		if (typeof data === 'object' && data !== null && 'item' in data && data.item !== '') {
			const { item } = data as { item: string };
			const newItem = {
				id: nanoid(),
				completed: false,
				name: item,
			};
			setItems((oldItems) => {
				setLocalStorage([...oldItems, newItem]);
				return [...oldItems, newItem];
			});
			setNewItemName('');
			toast.success('item added to the list');
		}
	};

	const removeItem = (itemID: string) => {
		const newItems = items.filter((item) => item.id !== itemID);
		setItems(newItems);
		setLocalStorage(newItems);
		toast.success('item deleted from the list');
	};

	return (
		<section className="section-center">
			<ToastContainer />
			<h4 style={{ marginBottom: '20px' }}>Grocery Bud</h4>
			<Form onSave={handleSave} className="form-control">
				<Input
					className="form-input"
					placeholder={items.length == 0 ? 'type here some groceries' : ''}
					name="item"
					value={newItemName}
					onChange={(e: ChangeEvent<HTMLInputElement>) => setNewItemName(e.target.value)}
				/>
				{newItemName === '' ? <></> : <Button type="submit" className="btn" text="add item" />}
			</Form>
			<Items items={items} onRemoveItem={removeItem} onEditItem={editItem} />
		</section>
	);
};

export default App;
