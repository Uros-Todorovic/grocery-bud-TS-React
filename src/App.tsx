import { useState, type ChangeEvent } from 'react';
import Form from './Form';
import Input from './Input';
import Button from './Button';
import { nanoid } from 'nanoid';
import Items from './Items';

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

	console.log(items);

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
		}
	};

	const removeItem = (itemID: string) => {
		const newItems = items.filter((item) => item.id !== itemID);
		setItems(newItems);
		setLocalStorage(newItems);
	};

	return (
		<section className="section-center">
			<h4>Grocery Bud</h4>
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
