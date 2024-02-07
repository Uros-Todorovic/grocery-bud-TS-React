import React, { useState } from 'react';
import Input from './Input';
import { Item } from './App.tsx';
import Button from './Button.tsx';

type SingleItemProps = {
	item: Item;
	onremoveItem: (itemID: string) => void;
	onEditItem: (itemID: string) => void;
};
const SingleItem = ({ item, onremoveItem, onEditItem }: SingleItemProps) => {
	//const [isChecked, setIsChecked] = useState(item.completed);
	return (
		<div className="single-item">
			<Input type="checkbox" name="completed" checked={item.completed} onChange={() => onEditItem(item.id)} />
			<p style={{ textTransform: 'capitalize' }} className={item.completed ? 'lineThrough' : 'nonLineThrough '}>
				{item.name}
			</p>
			<Button className="btn remove-btn" type="button" text="delete" onClick={() => onremoveItem(item.id)} />
		</div>
	);
};

export default SingleItem;
